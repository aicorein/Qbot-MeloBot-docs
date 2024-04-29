let heroElem = document.querySelector(".hero");
if (heroElem !== null) {
  let div = document.createElement("div");
  div.innerHTML = `
    <p class="description" style="font-size: 1.25rem;font-weight: bold; color: red;">
      此版本已停止维护，请及时迁移到新版：
      <a href="https://github.com/Meloland/melobot" style="text-decoration: underline;">melobot</a>
    </p>
  `
  heroElem.insertBefore(div.querySelector("p"), heroElem.querySelector('.actions'));
}