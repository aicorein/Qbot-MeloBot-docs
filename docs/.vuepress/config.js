module.exports = {
  title: "MeloBot 文档", // 设置网站标题
  description: "基于 go-cqhttp，python 实现的 qbot",
  base: "/MeloBot/", // 设置站点根路径
  dest: "./ROOT", // 设置输出目录
  port: 8086,
  head: [["link", { rel: "icon", href: "/images/icon.png" }]],
  plugins: {
    "@vuepress/back-to-top": true,
    "@vuepress/last-updated": {
      transformer: (timestamp, lang) => {
        const moment = require("moment");
        moment.locale(lang);
        return moment(timestamp).fromNow();
      },
    },
  },
  themeConfig: {
    smoothScroll: true,
    search: true,
    searchMaxSuggestions: 10,
    // 添加导航栏
    nav: [
      { text: "主页", link: "/" },
      {
        text: "引导",
        items: [
          { text: "简介", link: "/guide/intro/" },
          { text: "机制简述", link: "/guide/mechanism/" },
          { text: "基本使用", link: "/guide/basic-usage/" },
        ],
      },
      {
        text: "配置",
        items: [
          { text: "bot 配置", link: "/config/botConfig/" },
          { text: "关键词应答配置", link: "/config/keyAnsConfig/" },
        ],
      },
      { text: "进阶", link: "/advanced/"},
      { text: "API", link: "/api/cmd" },
      { text: "Github", link: "https://github.com/AiCorein/Qbot-MeloBot" },
    ],
    sidebar: {
      "/api/": [
        "cmd", "action", "global", "exceptions"
      ]
    },
    lastUpdated: "Last Updated",
    markdown: {
      lineNumbers: true,
    },
  },
};
