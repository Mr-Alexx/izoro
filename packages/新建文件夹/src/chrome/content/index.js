// import Vue from "vue";
// import App from "./components/App.vue";
// import insert from "@/utils/insert";
// import stroe from "@/mixins/store";
// import "@/plugins/element-ui.js";

// 注入js到页面
injectJS();

// Vue.mixin(stroe);

// 插入组件到页面中
// insert(App);

function injectJS() {
  document.addEventListener("readystatechange", () => {
    const injectPath = "/js/inject.js";
    const temp = document.createElement("script");

    temp.setAttribute("type", "text/javascript");
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(injectPath);
    document.body.appendChild(temp);
  });
}

// element-ui icon
(function insertElementIcons() {
  let elementIcons = document.createElement("style");
  elementIcons.textContent = `
    @font-face {
    font-family: "element-icons";
    src: url('${window.chrome.extension.getURL(
      "fonts/element-icons.woff"
    )}') format('woff'),
    url('${window.chrome.extension.getURL(
      "fonts/element-icons.ttf "
    )}') format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    }
  `;
  document.head.appendChild(elementIcons);
})();
