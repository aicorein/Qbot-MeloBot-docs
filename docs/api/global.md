
# 全局对象

:::tip
在查看此部分内容前，你应当已经阅读文档中的“进阶”部分
:::

全局对象是 MeloBot 中可供全局使用的一个字典。其主要包含了所有配置文件中的配置项和一些运行时的数据和信息。

使用以下方法即可导入全局对象 `BOT_STORE`:

```python
from utils.globalData import BOT_STORE
```

其中，`BOT_STORE` 的结构如下：
- `operation`：该键名下存储配置文件的 `operation` 子键
- `custom`：该键名下存储配置文件的 `custom` 子键
- `cmd`：该键名下存储配置文件的 `cmd` 子键
- `kernel`：该键名下存储一些重要的运行时信息（需要使用请自行查阅 `./utils/globalData.py`）
- `data`：bot 启动后存储到全局的数据（目前只包含关键词应答规则字典，在该键下的 `KEY_ANS` 子键）

同时，如果命令模板中命令执行时，需要保留某种“会话”状态，建议在 `BOT_STORE['data']` 新建一个不重名键。每次进入命令执行时，读取判断即可。