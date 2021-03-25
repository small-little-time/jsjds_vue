<template>
  <div class="footer-copyright">
    <div
      class="footer-box"
      style="width:100%;height:40px;border-top: 1px solid #d8dce5;box-shadow: rgba(0, 0, 0, 0.12) 0px -2px 3px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 0px;">
      <div style="color:#97a8be;text-align: center">Copyright © 2021 计算机科学与工程学院创新实训基地. All rights reserved.</div>
      <div style="text-align: center">
        <a href="http://beian.miit.gov.cn/" style="line-height:40px;color:#97a8be;">湘ICP备2021001544号-1</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CopyRight',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.copyright{
    position:absolute;
    bottom:0px;
    height: 20px;
    width: 100%;
    background: red;
    text-align: center;
    z-index: 999;
}

</style>
