<template>
    <div class="footer-copyright">
        <div class="footer-box" style="width:100%;height:40px;border-top: 1px solid #d8dce5;box-shadow: rgba(0, 0, 0, 0.12) 0px -2px 3px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 0px;">
            <div style="color:#97a8be;width: 494px;margin:0 auto">Copyright © 2020 2016级计算机科学与技术2班. All rights reserved. </div>
            <div style="width:161px;margin:0 auto">
                <a href="http://www.miitbeian.gov.cn" style="line-height:40px;color:#97a8be;">苏ICP备19003177号-1</a>
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
