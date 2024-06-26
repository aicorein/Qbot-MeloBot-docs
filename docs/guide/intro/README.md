---
sidebar: auto
---

# 简介

## 关于 MeloBot

MeloBot v1 是一个基于 Python 的 qbot 实现，其以实现了 Onebot 标准的 go-cqhttp 接口作为前端，通过对来自 go-cqhttp 的各种“事件”的处理，再产生“行为”，最后提交给 go-cqhttp 与 qq 服务器进行通信，完成 bot 的各种动作。

MeloBot v1 目前的接口设计，可以帮助使用者实现一些自定义的需求。但仍不够好，不够完善，需要进一步的迭代和更新。在未来，MeloBot 的目标是成为具有高性能、高自由度、强易用性的 qbot 开发接口和工具。

:::danger
MeloBot v1 现已经停止维护，我们建议你尽快迁移到 melobot 新版：[melobot](https://github.com/Meloland/melobot)
:::

## MeloBot 能做到什么
- 异步多协程 + 多线程的并发实现，拥有较高的处理性能
- 独立备用队列、备用事件处理器组，保证主队列和主事件处理器组阻塞时，仍有备用选择
- 支持多消息的事件处理，以及单消息中的多事件处理
- 支持特定关键词，在特定条件下触发自动应答
- 对外部消息有较强的抗注入和抗干扰功能
- 事件响应超时控制
- 命令参数错误自动提醒
- 可自定义命令错误执行时的反馈

## MeloBot 的响应范围
出于安全性考虑，MeloBot 目前只响应来自以下范围的事件：

- 白名单群聊的公开事件（非匿名、非群临时会话触发的事件）
- 好友的私聊事件

其他任何范围的事件（如频道事件）一概不响应。

## 内部架构

:::tip
该部分涉及内部原理实现，如果你只是想要使用，可以跳过。
:::

下图为 MeloBot v1 的内部架构。

<img :src="$withBase('/images/framework.png')" alt="foo">

主要模块的功能详解如下：

**连接器**：异步监听来自外部 go-cqhttp 的“事件”上报，及时传递至事件队列保存。同时也异步监听行为队列，及时将产生的“行为”发送出去。

**事件调度器**：事件调度器会尝试取出队列中的事件，然后交给事件处理器。工作时，会实例化多个调度器。由于彼此是异步的，所以在一个处理器遇到 IO 阻塞时，将及时切换其他处理器工作。

**事件处理器**：区分各类事件，分类后交给内部的各级子处理器处理。而在消息类事件子处理器中，为解析消息类事件中的“命令”信息，需要调用命令解析器解析。

**命令接口**：一方面给事件处理器提供完成事件响应的接口；另一方面给命令的执行方法（命令模板）提供装饰器接口，以完成某些预先操作（如权限校验、协程/线程加锁等）。同时，为了最大限度提升性能，对于同步的命令执行方法，在调用时将会启用线程池加速。

**命令方法（命令模板）**：定义了具体一条命令的执行方法。

:::warning
**在现在的设计中，事件处理器对于消息类外的事件，没有太多的处理需求**。因此目前只实现了命令接口和命令模板。未来如果需求增多，可能将命令接口、命令模板重构为事件接口、事件方法。实现更多事件类型的处理。
:::


<br>
下一篇：<a :href="$withBase('/guide/mechanism')">MeloBot 简介 - 机制简述</a>