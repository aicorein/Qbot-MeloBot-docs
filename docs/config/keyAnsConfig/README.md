---
sidebar: auto
sidebarDepth: 2
---


# 关键词应答配置

关键词应答配置文件为项目根目录下的 `./corpus/key_ans.json` 文件。配置文件使用 json 格式，因此在修改前，你应该对 json 格式有所了解。

下面对配置项进行说明。

## 说明
配置文件中，每个规则为一个对象，盛装在最外层的对象数组中。每个规则对象的格式为：

```json
{
    "keys": [...],
    "prob": 1,
    "ans": [...]
},
```

- `keys` 为字符串数组，指明了哪些关键词可以触发这条规则
- `prob` 为数值，象征触发这条规则的概率
- `ans` 为应答对象数组

而每一个应答对象又是以下格式：

```json
{
    "sentence": "好耶...", 
    "ending-repeat": [0, 6],
    "total-repeat": [0, 3]
},
```

- `sentence` 为字符串，是回复的内容
- `ending-repeat` 为数值型数组，如设置为 `[0, 6]`，即代表回复时随机将**应答内容尾字符**重复 0-6 次。
- `total-repeat` 为数值型数组，如设置为 `[0, 3]`，即代表回复时随机将**整个应答内容**重复 0-3 次。

:::tip
`ending-repeat` 和 `total-repeat` 是可选的键。

提供这两个键，是为了方便某些重复搞怪的回复，如“哈哈哈”、“好耶好耶好耶”、“hhhhhc”。

:::

<br>
下一篇：<a :href="$withBase('/advanced')">MeloBot 进阶</a>

