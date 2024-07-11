<!-- <template>
    <h1>User Manager Dashboard</h1>
    <button
        class="btn btn-primary mb-3"
        style="margin-left: 0"
        @click="openAddManagerForm"
        >
        Manage Customers
    </button>

    <button
        class="btn btn-primary mb-3"
        style=""
        @click="openAddManagerForm"
        >
        Manage Managers
    </button>

</template> -->

<template>
  <PageHeader />
  <div class="container" style="margin: 250px">
    <h1>User Manager Dashboard</h1>
    <br>
    <div class="button-container">
      <button
        class="btn btn-primary"
        @click="currentPage = 'customers'; reduceMargin()"
      >
        Manage Customers
      </button>

      <button
        class="btn btn-primary"
        @click="currentPage = 'managers'; reduceMargin()"
      >
        Manage Managers
      </button>
    </div>

    <component :is="currentPageComponent"></component>
  </div>
  <PageFooter style="margin-top: 100px" />
</template>

<script>
import CustomersPage from "../Customer/ManageCustomer.vue"; // Import your CustomersPage component
import ManagersPage from "./ManageManager.vue"; // Import your ManagersPage component
import PageHeader from "../PageHeaderManager.vue";
import PageFooter from "../PageFooter.vue";

export default {
  components: {
    PageHeader,
    PageFooter,
  },
  data() {
    return {
      currentPage: "dashboard",
      currentPageComponent: null,
    };
  },
  watch: {
    currentPage(newPage) {
      this.loadPageComponent(newPage);
    },
  },
  methods: {
    reduceMargin() {
      this.$nextTick(() => {
        document.querySelector(".container").style.margin = "10px auto";
      });
    },
    loadPageComponent(page) {
      switch (page) {
        case "customers":
          this.currentPageComponent = CustomersPage;
          break;
        case "managers":
          this.currentPageComponent = ManagersPage;
          break;
        default:
          this.currentPageComponent = null;
      }
    },
  },
  mounted() {
    this.loadPageComponent(this.currentPage);
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 0 auto;
}
</style>
