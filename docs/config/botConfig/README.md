---
sidebar: auto
sidebarDepth: 2
---


# Bot 配置

Bot 配置文件为项目根目录下的 `./config/botConfig.toml` 文件。配置文件使用 toml 格式，因此在修改前，你应该对 toml 格式有所了解。

下面列出了其中所有配置项和说明。


## 运作配置
`operation` 子键下所有配置。主要提供了 bot 运行过程中工作参数的配置。

### **`CONNECT_HOST`**
- 描述：**与 go-cqhttp 链接的主机地址**
- 类型：字符串
- 默认值："localhost"

### **`CONNECT_PORT`**
- 描述：**与 go-cqhttp 链接的主机端口**
- 类型：字符串
- 默认值："8080"

### **`WORK_QUEUE_LEN`**
- 描述：**bot 任务队列长度，即任务缓冲区长度**
- 类型：数值
- 默认值：20
- 注意：理论非负值即可，但不建议太大的数值

### **`LOG_LEVEL`**
- 描述：**控制台输出的日志等级**
- 类型：字符串字面量。可选值有 `DEBUG` `INFO` `WARNING` `ERROR` `CRITICAL`
- 默认值："INFO"

:::tip
该配置不影响日志文件的日志等级。日志文件的等级永远为 DEBUG。
:::

### **`TASK_TIMEOUT`**
- 描述：**bot 任务超时时间，超时会自动放弃任务**
- 类型：数值型，单位 秒
- 默认值：15

### **`COOLDOWN_TIME`**
- 描述：**bot 每条消息的冷却时间**
- 类型：数值型，单位 秒
- 默认值：1

### **`WORKING_TIME`**
- 描述：**bot 的运行时间**
- 类型：数值型，单位 秒
- 默认值：-1（设为 -1，为永久运行直至手动停止或命令停止）


## 个性化配置
`custom` 子键下所有配置。主要提供一些关于 bot 权限、昵称等自定义信息的配置。

如果你还不了解 MeloBot 的权限机制，请参考：
<a :href="$withBase('/guide/mechanism/#权限')">MeloBot 机制 - 权限</a>

### **`OWNER`**
- 描述：**bot 主人的 id**
- 类型：数值型
- 默认值：空

### **`ENABLE_SYS_ROLE`**
- 描述：**是否对 bot 主人启用系统权限**
- 类型：布尔型
- 默认值：false
:::warning
该配置项在 bot 中加载并生效，但目前还没有被使用
:::

### **`SUPER_USER`**
- 描述：**superuser 的 id 列表**
- 类型：数值列表
- 默认值：[]

### **`WHITE_LIST`**
- 描述：**WHITE 的 id 列表**
- 类型：数值列表
- 默认值：[]

### **`BLACK_LIST`**
- 描述：**黑名单 id 列表**
- 类型：数值列表
- 默认值：[]

### **`WHITE_GROUP_LIST`**
- 描述：**白名单群聊 id 列表**
- 类型：数值列表
- 默认值：[]
:::tip
为保证 bot 行为的安全性，群聊必须在白名单内才会响应
:::

### **`NICK_NAME`**
- 描述：**给 bot 的昵称**
- 类型：字符串列表
- 默认值：[]
:::warning
该配置项在 bot 中加载并生效，但目前还没有使用
:::

### **`BOT_NAME`**
- 描述：**bot 工作过程中对自己的称呼**
- 类型：字符串
- 默认值："MeloBot"


## 命令功能配置
`cmd` 子键下所有配置。主要提供 bot 命令响应中一些参数的配置。

如果你还不了解 MeloBot 的命令机制，请参考：
<a :href="$withBase('/guide/mechanism/#命令')">MeloBot 机制 - 命令</a>


### **`COMMAND_START`**
- 描述：**命令起始符**
- 类型：字符串列表
- 默认值：[]

### **`COMMAND_SEP`**
- 描述：**命令间隔符**
- 类型：字符串列表
- 默认值：[]

<br>
下一篇：<a :href="$withBase('/config/keyAnsConfig')">MeloBot 配置 - 关键词应答配置</a>

