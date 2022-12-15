---
sidebarDepth: 2
---

# 命令接口与命令模板

:::tip
在查看此部分内容前，你应当已经阅读文档中的“进阶”部分
:::

## 命令接口

需要先导入其实例对象：

```python
from utils.cmdInterface import ExeI
```


### **ExeI.role**
类角色常量

其下含有以下几个值，分别代表几种权限等级（值类型为 int）：

`ExeI.role.SYS`, ` ExeI.role.OWNER`, `ExeI.role.SU`, `ExeI.role.WHITE`, `ExeI.role.USER`




### **ExeI.logger**
全局日志器

其下可用方法有：
`info()`, `debug()`, `warning()`, `error()`, `critical()`





### **ExeI.sync_method()**
同步命令方法装饰器
<div v-highlight class="code-space">
<p class="code-header">
<code class="Python code">def sync_method(self, alias: list=None, userLevel: ExeI.role=au.USER, lock: bool=False, prefix: bool=False, comment: str='', paramsTip: str='无说明')</code>
</p>
</div>

- **alias**：命令方法的别称，字符串列表（命令也可以通过别称触发）
- **userLevel**：可以调用命令的用户等级，`ExeI.role` 类常量，可取值如下：`ExeI.role.SYS`, `ExeI.role.OWNER`, `ExeI.role.SU`, `ExeI.role.WHITE`, `ExeI.role.USER`
- **lock**：是否加线程锁 `threading.Lock()`
- **prefix**：是否启用前缀模式，启用前缀将会在返回的行为对象最前面附着命令和参数信息
- **comment**：指定命令方法的注释（其他命令调用该命令时可以使用）
- **paramsTip**：指定命令方法的参数提醒语句（其他命令调用该命令时可以使用）

:::warning
注意，装饰器所有参数都使用默认参数时，应该写作 `@ExeI.sync_method()`
:::



### **ExeI.async_method()**
异步命令方法装饰器
<div v-highlight class="code-space">
<p class="code-header">
<code class="Python code">def async_method(self, alias: list=None, userLevel: ExeI.role=au.USER, lock: bool=False, prefix: bool=False, comment: str='', paramsTip: str='无说明')</code>
</p>
</div>

- **alias**：命令方法的别称，字符串列表（命令也可以通过别称触发）
- **userLevel**：可以调用命令的用户等级，`ExeI.role` 类常量，可取值如下：`ExeI.role.SYS`, `ExeI.role.OWNER`, `ExeI.role.SU`, `ExeI.role.WHITE`, `ExeI.role.USER`
- **lock**：是否加协程锁 `asyncio.Lock()`
- **prefix**：是否启用前缀模式，启用前缀将会在返回的行为对象最前面附着命令和参数信息
- **comment**：指定命令方法的注释。（其他命令调用该命令时可以使用）
- **paramsTip**：指定命令方法的参数提醒语句。（其他命令调用该命令时可以使用）

:::warning
注意，装饰器所有参数都使用默认参数时，应该写作 `@ExeI.async_method()`
:::


### **ExeI.call()**
命令方法中调用其他命令
<div v-highlight class="code-space">
<p class="code-header">
<code class="Python code">async def call(self, cmdName: str, event: dict, *args, **kwargs) -> dict</code>
</p>
</div>

- **cmdName**：要调用的命令的名称
- **event**：事件对象
- **args / kwargs**：被调用命令的参数
- return：行为对象




### **ExeI.get_cmd_alias()**
获取其他命令的别称
<div v-highlight class="code-space">
<p class="code-header">
<code class="Python code">def get_cmd_alias(self, cmdName: str) -> list</code>
</p>
</div>

- **cmdName**：要调用的命令的名称
- return：别称 list




### **ExeI.get_cmd_auth()**
获取其他命令的权限限制值
<div v-highlight class="code-space">
<p class="code-header">
<code class="Python code">def get_cmd_auth(self, cmdName: str) -> ExeI.role</code>
</p>
</div>

- **cmdName**：要调用的命令的名称
- return：`ExeI.role` 类常量




### **ExeI.get_cmd_comment()**
获取其他命令的注释
<div v-highlight class="code-space">
<p class="code-header">
<code class="Python code">def get_cmd_comment(self, cmdName: str) -> str</code>
</p>
</div>

- **cmdName**：要调用的命令的名称
- return：注释字符串（即命令方法装饰器中 comment 的值）




### **ExeI.get_cmd_paramsTip()**
获取其他命令的参数说明
<div v-highlight class="code-space">
<p class="code-header">
<code class="Python code">def get_cmd_paramsTip(self, cmdName: str) -> str</code>
</p>
</div>

- **cmdName**：要调用的命令的名称
- return：参数说明字符串（即命令方法装饰器中 paramsTip 的值）




## 命令模板
命令模板应该在项目根目录 `./templates` 内定义。定义时有以下要求：
- 一个命令方法/命令模板对应一个 `.py` 文件，不能在 `templates` 文件夹内为一个命令方法定义多个文件
- 文件内必须存在与文件同名的方法，是命令的入口方法，必须被命令接口装饰器装饰
:::tip
可以在一个文件内，可以把命令方法的步骤拆作多个子函数（子过程）
:::