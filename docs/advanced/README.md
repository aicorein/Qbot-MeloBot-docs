---
sidebar: auto
---

# 进阶

:::tip
在查看此部分内容前，请确保你已经看过关于 MeloBot 机制、MeloBot 配置的文档介绍。
:::

## 使用备用/优先任务队列
MeloBot 平时传送所有事件和行为，都会在默认队列和默认事件处理器中。如果因为某些阻塞或异常原因，不想在默认队列等待，需要立刻执行某些操作，便可以使用备用/优先队列和备用事件处理器。**使用的方法是，在命令前加一个 prior 关键字**。比如在备用队列和备用事件处理器中运行关闭命令：
```
$prior#lifecycle#close
```



## 增加命令方法
目前 MeloBot 内置了一些基本的命令。但对于自定义或个性化的需求肯定是远远不够的。因此 MeloBot 内部实现了一些接口，帮助扩展命令的实现，以此来扩充 bot 的功能。

比如，如果我们想实现一个天气预报查询的命令。预期命令结构如下：（起始符：$, 分隔符：#）
```
$weather#城市名#天数
```

要实现这一命令，我们只需要到项目根目录的 `./templates` 目录中，新建一个名为 `weather.py` 的文件，然后写入以下代码：

```python
"""
weather.py
"""
# 导入命令接口的实例
from utils.cmdInterface import ExeI
# 导入行为接口的行为 Builder, 行为的 Encoder 和 消息类型的 packer
from utils.actInterface import Builder, Encoder, msg_send_packer


@ExeI.sync_method(userLevel=ExeI.role.USER)
def weather(event: dict, city: str, period: str=1) -> dict:
    # 假设已经实现了 get_weather_of_city 的方法
    weather_str = get_weather_of_city(city, int(period))
    action = Builder.build(
        msg_send_packer.pack(
            event,
            [Encoder.text(weather_str)],
        )
    )
    return action
```

### 命令方法的装饰器
其实，我们通过上面这段代码，就实现了一个命令方法，或者说叫命令模板。并且可以看出，这一命令方法是通过 `ExeI` 命令接口实例的装饰器所修饰的。**这一装饰器的作用非常重要，它实现了一些预先的操作**，比如这里的预先权限检查：通过设置 `userLevel` 参数为 ExeI.role.USER 这个权限常量，使得权限至少为 USER 才能调用该命令。而装饰器选择 sync_method 则是因为我们的 `weather()` 是一个同步方法。

### 命令方法的行为封装
那么再往下看，在我们获得命令执行的字符串结果之后，如何将它包装为一个行为呢？这时候，就要用到我们的行为 Builder。这里 Builder 的 build 方法接受了一个 packer 返回的 package（包装），而这个 package 的形成，又依赖于 event 和 Encoder 产出的一个 encode 列表。

听起来很乱，对吧？（<del>其实我也是这么觉得的</del>）

需要上面这些操作，是因为“行为”本身结构的复杂性所导致的。首先行为是有很多种的：发消息，加好友，撤回消息等等。**不同行为，其在行为对象中表示形式不一样，因此需要不同的 packer 来完成不同行为的封装**。这里我们要发消息，自然就使用 `msg_send_packer` 这种 packer。如果要实现撤回消息，我们就可以使用另一个叫` msg_del_packer` 的 packer：

```python
action = Builder.build(
    msg_del_packer.pack(...)
)
```

接下来，自然就是 packer 要打包东西然后返回咯。让我们想想，现在已经确定了行为的类别，还要确定的东西有：行为的具体内容和行为的接受者。行为的接受者，往往是指群 qq 号或者好友 qq 号这类信息，**这些信息在事件里有，所以 packer 打包的时候需要事件对象**。再说行为的具体操作，又有很多种了：发文本、发图片、发语音等等。这里就有两个问题：

- 一个行为对象里可以携带多个行为操作（比如一条 qq 消息可以同时发图片和文本）
- 图片和文本的表示形式是不一样的

为了解决这两个问题，**packer 第二个参数接受一个列表。每个列表项就是具体一类操作被 Encoder 编码后的结果**。Encoder 会处理好文本和图片表示形式不一样的问题；而参数为列表类型，也正是为了一次可以携带多个行为。最后这个发文本又发图片的写法就是：

```python
action = Builder.build(
    msg_send_packer.pack(event, [
            Encoder.text("这是一张图片："),
            Encoder.image(
                file='https://api.ixiaowai.cn/api/api.php',
                cache='0'
            )
        ],
    )
)
```

至此，行为的构建过程已经十分清晰。

:::tip
Encoder 编码后的这种格式，其实被称为“CQ 码”。

详情参见外链：[CQ 码/CQ Code](https://docs.go-cqhttp.org/cqcode/)
:::

## 总结
如果你认真看完了以上内容，应该对于 MeloBot 的命令机制有了更加深入的理解，也可以写一些比较简单的命令了。如果想要了解更多，可以进入下一篇关于 API 的内容。

<br>
下一篇：
<a :href="$withBase('/api/cmd.html')">MeloBot API</a>