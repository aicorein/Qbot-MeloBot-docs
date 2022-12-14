import hljs from "highlight.js"; //导入代码高亮文件
import "highlight.js/styles/monokai-sublime.css"; //导入代码高亮样式

export default ({ Vue, router }) => {
  if (typeof process === "undefined" || process.env.VUE_ENV !== "server") {
    router.onReady(() => {
      const { app } = router;

      app.$once("hook:mounted", () => {
        setTimeout(() => {
          const { hash } = document.location;
          if (hash.length > 1) {
            const id = decodeURIComponent(hash.substring(1));
            const element = document.getElementById(id);
            if (element) element.scrollIntoView();
          }
        }, 500);
      });
    });
  }

  Vue.directive("highlight", function (el) {
    let highlight = el.querySelectorAll("code");
    console.log(highlight)
    highlight.forEach((block) => {
      hljs.highlightBlock(block);
    });
  });
};
