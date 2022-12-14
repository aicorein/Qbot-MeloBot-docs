---
sidebarDepth: 2
---

# 行为接口

:::tip
在查看此部分内容前，你应当已经阅读文档中的“进阶”部分
:::

## Builder

先导入其实例对象：

```python
from utils.cmdInterface import Builder
```

### **Builder.build()**
行为对象构造器构造方法
<div v-highlight class="code-space">
<h4 class="code-header">
<code class="Python code">def build(self, package: dict, isEcho=False) -> dict</code>
</h4>
</div>

- **package**：packer 返回的 package
- **isEcho**：用于指定该 action 响应后， go-cqhttp 是否在响应事件附加上唯一标识符 echo，以用于区分响应事件。此处 isEcho 若为真，会自动使用纳秒时间戳作为唯一标识符
- return：行为对象


## Packer

目前在 MeloBot 中，实现了两种主要的 Packer：
- msg_send_packer
- msg_del_packer

导入使用即可：

```python
from cmdInterface import msg_send_packer
from cmdInterface import msg_del_packer
```

### **msg_send_packer.pack()**
消息发送打包器打包方法
<div v-highlight class="code-space">
<h4 class="code-header">
<code class="Python code">def pack(self, event: dict, cqEncodeMsgs: List[Union[str, dict]], isPureText: bool=False) -> dict</code>
</h4>
</div>

- **event**：事件对象
- **cqEncodeMsgs**：经过 Encoder 编码的信息的列表（格式可以是 CQ 字符串或字典）
- **isPureText**：是否是纯文本。如果为 False，则告诉 go-cqhttp 不解析结果中的 CQ 字符串，因此一般不建议设置为 True
- return：行为 package

:::danger
cqEncodeMsgs 列表中各条编码信息一定要采用相同的格式，比如都是 CQ 字符串或者都是字典，否则将导致程序异常
:::




### **msg_del_packer.pack()**
消息撤回打包器打包方法
<div v-highlight class="code-space">
<h4 class="code-header">
<code class="Python code">def pack(self, msgId: int) -> dict</code>
</h4>
</div>

- **msgId**：消息 id，存在于事件对象的 `message_id` 键
- return：行为 package




## Encoder

先导入其实例对象：

```python
from utils.actInterface import Encoder
```

### **Encoder.text()**
文本消息编码方法
<div v-highlight class="code-space">
<h4 class="code-header">
<code class="Python code">def text(self, text: str, fromEvent: bool=True, mode: Literal["str", "dict"]="str") -> Union[str, dict]</code>
</h4>
</div>

- **text**：文本字符串
- **fromEvent**：文本内容是否来自于事件内部。如果是来自事件中的，则不需要转义，因为 go-cqhttp 传给 bot 时已经转义。但如果不是来自事件的，最好转义。
- **mode**：编码的模式是字符串还是字典
- return：编码结果



### **Encoder.face()**
qq 表情消息编码方法
<div v-highlight class="code-space">
<h4 class="code-header">
<code class="Python code">def face(self, icon_id: int, mode: Literal["str", "dict"]="str") -> Union[str, dict]</code>
</h4>
</div>

- **icon_id**：qq 表情 id，请参考外链：<a :href="$withBase('https://github.com/kyubotics/coolq-http-api/wiki/%E8%A1%A8%E6%83%85-CQ-%E7%A0%81-ID-%E8%A1%A8')">表情 CQ 码 ID 表</a>
- **mode**：编码的模式是字符串还是字典
- return：编码结果




### **Encoder.record()**
语音消息编码方法
<div v-highlight class="code-space">
<h4 class="code-header">
<code class="Python code">def record(self, url: str, timeout: int=None, magic: bool=False, mode: Literal["str", "dict"]="str") -> Union[str, dict]</code>
</h4>
</div>

- **url**：语音文件的 url
- **timeout**：当语音文件是网络资源时的下载超时时间
- **magic**：是否启用变声效果
- **mode**：编码的模式是字符串还是字典
- return：编码结果




### **Encoder.at()**
at 消息编码方法
<div v-highlight class="code-space">
<h4 class="code-header">
<code class="Python code">def at(self, qq:Union[int, Literal['all']], notInName: str=None, mode: Literal["str", "dict"]="str") -> Union[str, dict]</code>
</h4>
</div>

- **qq**：被 at 人的 qq 号，群内 at 所有人传入 "all"
- **notInName**：在群中找不到 at 的 qq 号时，at 消息显示的名称（若确定 at 的人在群中，请勿使用）
- **mode**：编码的模式是字符串还是字典
- return：编码结果




### **Encoder.share()**
链接分享卡片消息编码方法
<div v-highlight class="code-space">
<h4 class="code-header">
<code class="Python code">def share(self, url: str, title: str, content: str=None, image: str=None, mode: Literal["str", "dict"]="str") -> Union[str, dict]</code>
</h4>
</div>

- **url**：链接地址
- **title**：卡片标题
- **content**：卡片描述语
- **image**：卡片图片
- **mode**：编码的模式是字符串还是字典
- return：编码结果




### **Encoder.music()**
音乐分享卡片消息编码方法（专有平台的音乐）
<div v-highlight class="code-space">
<h4 class="code-header">
<code class="Python code">def music(self, platType: Literal["qq", "163", "xm"], songId: str, mode: Literal["str", "dict"]="str") -> Union[str, dict]</code>
</h4>
</div>

- **platType**：平台类型，字面量，可选 "qq", "163", "xm"
- **songId**：歌曲 id
- **mode**：编码的模式是字符串还是字典
- return：编码结果




### **Encoder.custom_music()**
自定义音乐分享卡片消息编码方法
<div v-highlight class="code-space">
<h4 class="code-header">
<code class="Python code">def custom_music(self, url: str, audio: str, title: str, content: str=None, image: str=None, mode: Literal["str", "dict"]="str") -> Union[str, dict]</code>
</h4>
</div>

- **url**：自定义音乐平台的主页或网站起始页
- **audio**：歌曲链接
- **title**：卡片标题
- **content**：卡片描述语
- **image**：卡片图片
- **mode**：编码的模式是字符串还是字典
- return：编码结果





### **Encoder.image()**
图片消息编码方法
<div v-highlight class="code-space">
<h4 class="code-header">
<code class="Python code">def image(self, file: str, picType: Literal["flash", "show"]=None, subType: Literal[0, 1]=None, cache: Literal[0, 1]=1, mode: Literal["str", "dict"]="str")</code>
</h4>
</div>

- **file**：图片 url
- **picType**：图片类型，字面量，"flash" 为闪照，"show" 为秀图，不填为普通图片
- **subType**：图片子类型，只在群聊生效。0 为正常图片，1 为表情包形式
- **cache**：当图片资源来自网络时，是否启用缓存，默认不启用
- **mode**：编码的模式是字符串还是字典
- return：编码结果




### **Encoder.reply()**
回复消息编码方法
<div v-highlight class="code-space">
<h4 class="code-header">
<code class="Python code">def reply(self, messageId: int, mode: Literal["str", "dict"]="str") -> Union[str, dict]</code>
</h4>
</div>

- **messageId**：消息 id，应该存在于事件对象的 `messaage_id` 键
- **mode**：编码的模式是字符串还是字典
- return：编码结果




### **Encoder.poke()**
戳一戳消息编码方法
<div v-highlight class="code-space">
<h4 class="code-header">
<code class="Python code">def poke(self, qqId: int, mode: Literal["str", "dict"]="str") -> Union[str, dict]</code>
</h4>
</div>

- **qqId**：被戳人的 qq 号，应该存在于事件对象的 `user_id` 键
- **mode**：编码的模式是字符串还是字典
- return：编码结果




### **Encoder.tts()**
腾讯自带 tts 语音消息消息编码方法
<div v-highlight class="code-space">
<h4 class="code-header">
<code class="Python code">def tts(self, text: str, mode: Literal["str", "dict"]="str") -> Union[str, dict]</code>
</h4>
</div>

- **text**：需要被转为语音消息的文本
- **mode**：编码的模式是字符串还是字典
- return：编码结果

