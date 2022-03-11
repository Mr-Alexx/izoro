<template>
  <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <div class="rightPanel">
      <div class="handle-button" @click="show = !show">
        <i :class="show ? 'el-icon-close' : 'el-icon-setting'" />
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightPanel",
  props: {
    clickNotClose: {
      default: true,
      type: Boolean
    },
    buttonTop: {
      default: 250,
      type: Number
    }
  },
  data() {
    return {
      show: false
    };
  },
  watch: {
    show(value) {
      if (value) {
        localStorage.showEbayPluginRightPanel = 1;
      } else {
        localStorage.removeItem("showEbayPluginRightPanel");
      }
      if (value && !this.clickNotClose) {
        this.addEventClick();
      }
    }
  },
  created() {
    this.show = !!localStorage.showEbayPluginRightPanel;
  },
  mounted() {
    this.insertToBody();
  },
  beforeDestroy() {
    const elx = this.$refs.rightPanel;
    elx.remove();
  },
  methods: {
    addEventClick() {
      window.addEventListener("click", this.closeSidebar);
    },
    closeSidebar(evt) {
      const parent = evt.target.closest(".rightPanel");
      if (!parent) {
        this.show = false;
        window.removeEventListener("click", this.closeSidebar);
      }
    },
    insertToBody() {
      const elx = this.$refs.rightPanel;
      const body = document.querySelector("body");
      body.insertBefore(elx, body.firstChild);
    }
  }
};
</script>

<style lang="scss" scoped>
.rightPanel {
  width: 100%;
  max-width: 370px;
  min-height: 300px;
  position: fixed;
  bottom: 20%;
  right: 0;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.15);
  border: 1px solid #ebeef5;
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
  border-radius: 4px;
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel {
    transform: translate(0);
  }

  .handle-button {
    left: -48px;
    transform: unset !important;
  }
}

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -24px;
  text-align: center;
  top: 50%;
  margin-top: -24px;
  // font-size: 24px;
  // border-radius: 6px 0 0 6px !important;
  border-radius: 50% 0 0 50%;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 48px;
  transition: transform 0.5s;
  background-color: #409eff;

  &:hover {
    transform: translateX(-24px);
  }

  i {
    // font-size: 24px;
    font-size: 30px;
    line-height: 48px;
  }
}
</style>
