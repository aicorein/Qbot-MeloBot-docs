---
sidebar: auto
---

# 基本使用

## go-cqhttp 的前置配置
MeloBot 依赖于 go-cqhttp 作为前端接口。因此，你必须正确配置 go-cqhttp，才能使其与 MeloBot 协同工作。（推荐 go-cqhttp 版本 >= `v1.0.0` ）

目前版本 MeloBot 对 go-cqhttp 的配置有以下特殊要求：
- 连接类型需是正向 websockets
- 连接不开启密码加密
- 上报类型 post-format 应该为 array

在确认这些配置无误后，需要在 `./config/botConfig.toml` 的 bot 配置文件中，对应设置好 `CONNECT_HOST` 和 `CONNECT_PORT` 两个配置项。例如：

```toml
CONNECT_HOST = "localhost"
CONNECT_PORT = 8080
```

:::warning
go-cqhttp 的其他配置，不在本文档的叙述范围内，请自行参考其文档。
:::

:::tip
websockets 是效率较高的全双工通信。因此当前版本 MeloBot 只支持这一通信方式。未来可能考虑支持 go-cqhttp 提供的 http 通信和反向 websockets。
:::


## bot 的配置和启动
依然是打开上面的 bot 配置文件。修改 `OWNER` 配置为你自己的 qq 号，然后把想要 bot 做出响应的 qq 群号加入到 `WHITE_GROUP_LIST` 列表中。

配置完成后，运行 `main.py` 即可。当日志提示“与 cq 成功建立 websocket 连接”即代表已经成功建立通信，并开始正常工作。

## 使用
在白名单群聊或者与 bot 的好友聊天中输入：`$echo#Hello, Wrold!`，此时 bot 应该回复：

```
Hello World!
```

输入 `$help` 可以查看现在可用的所有命令。使用 `$help#命令名` 可查看每个命令的功能、用法。

## 进阶
想要实现更多自定义的功能，建议阅读：

<a :href="$withBase('/guide/mechanism')">MeloBot 简介 - 机制简述</a>

<a :href="$withBase('/config/botConfig')">MeloBot 配置 - bot 配置</a>

<a :href="$withBase('/config/keyAnsConfig')">MeloBot 配置 - 关键词应答配置</a>

<a :href="$withBase('/api/cmd')">MeloBot API</a>

<br>
下一篇：
<a :href="$withBase('/config/botConfig')">MeloBot 配置 - bot 配置</a>
