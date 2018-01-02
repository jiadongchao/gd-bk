<template>
  <div id="app">
    <router-view></router-view>
     <div class="circle flex">
      <p>
        <span>员工号</span><br>
        <span>731792</span>
      </p>
     
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
    this.$router.push('/')
  }
}
</script>

<style lang="less">
@import 'style/css.css';

body {
  background-color: #fbf9fe;
}
.circle{
  position: fixed;
  bottom:0.2rem;
  right:0.3rem;
  background-color: rgba(119,136 , 153,.5);
  width:1.5rem;
  height:1.5rem;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  color: #9370DB;
  text-align: center;

}
</style>
