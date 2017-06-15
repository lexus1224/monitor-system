<template>
  <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
    <el-submenu index="1">
      <template slot="title">内存监控</template>
      <el-menu-item-group title="">
        <el-menu-item index="/memoryUsed">内存使用分布情况</el-menu-item>
        <el-menu-item index="/memoryLimit">内存大小限制分布情况</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">平台监控</template>
      <el-menu-item-group title="">
        <el-menu-item index="/browser">浏览器使用份额统计</el-menu-item>
        <el-menu-item index="/operateSystem">操作系统使用份额统计</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>

<script>
  export default {
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-menu {
    height: 100%;
  }

  .collapsed {
    width: 60px;
    .item {
      position: relative;
    }
    .submenu {
      position: absolute;
      top: 20px;
      z-index: 99999;
      height: auto;
      display: none;
    }
  }
</style>
