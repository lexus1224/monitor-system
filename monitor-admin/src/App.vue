<template>
  <div id="app" class="app">
    <el-row class="container">
      <el-col :span="24" class="main">
        <aside>
          <vue-nav></vue-nav>
        </aside>
        <section class="content-container">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Nav from './components/Nav'

  export default {
    name: 'app',
    components: {
      'vue-nav': Nav
    }
  }
</script>

<style scoped lang="scss">
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .main {
      display: flex;
      // background: #324057;
      position: absolute;
      top: 20px;
      bottom: 0;
      overflow: hidden;
      aside {
        flex: 0 0 230px;
        width: 230px;
        // position: absolute;
        // top: 0px;
        // bottom: 0px;
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      // background: #f1f2f7;
      flex: 1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }

</style>
