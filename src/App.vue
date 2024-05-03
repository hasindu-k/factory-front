<template>
  <!-- <router-view></router-view> -->
  <PageHeader style="margin-bottom: 50px;"/>

  <addFertilizer v-if="showAddFertilizer" @addFertilizerClicked="backToFertilizerList" @cancel="backToFertilizerList" style="margin-top: 2%;" /> 
  <!-- v-if="showAddFertilizer" -->

  <fertilizerList v-if="showFertilizerList" msg="Fertilizer List"  @addFertilizerClicked="navigateToFertilizerList"
  style="margin-top: 5%;" />


  <!-- <userRequestList msg="User Request List"/> -->

  <StyleEdit/>

  <PageFooter style="margin-top: 100px;" />

</template>

<script>
import PageHeader from "./components/PageHeader.vue";
import PageFooter from "./components/PageFooter.vue";

import fertilizerList from './components/Fertilizer/fertilizerList.vue'; // runnning the fertilizerList component

// import userRequestList from './components/userRequestList.vue';
// import StyleEdit from './components/styleEdit.vue';

import addFertilizer from './components/Fertilizer/addFertilizer.vue';

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter,
    fertilizerList, //running
    addFertilizer,
    
  },
  data() {
    return {
      showFertilizerList: true,
      showAddFertilizer: false,
    };
  },
  methods: {
    navigateToFertilizerList() {
      // Handle navigation here
      this.showFertilizerList = false;
      this.showAddFertilizer = true;
    },
    backToFertilizerList(){
      this.showFertilizerList = true;
      this.showAddFertilizer = false;
    }
  },
}
</script>

<style>
*,
  *::before,
  *::after {
    box-sizing: border-box;
  }
#app {  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
  margin-top: 0px;
}

</style>
