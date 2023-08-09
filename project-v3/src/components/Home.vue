<template>
  <div class="home">
    <Header class="headerClass"/>
    <el-container class="content">
      <Menu class="menuClass"/>
      <el-container>
        <el-main>
          <Bread/>
          <div class="cont">
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer>
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Header from './common/Header.vue';
import Footer from './common/Footer.vue';
import Menu from './common/Menu.vue';
import Bread from './common/Breadcrumb.vue';

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  .headerClass{
    box-shadow: 0 4px 10px lightgreen;
  }
  .menuClass{
    box-shadow: 5px 4px 10px lightgreen;
  }
  .content{
    position: absolute;
    width: 100%;
    top: 65px;
    bottom: 0px;
    .cont{
      margin: 20px 0;
    }
  }
}
</style>
