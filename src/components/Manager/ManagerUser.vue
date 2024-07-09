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
  <div style="margin: 250px">
    <h1>User Manager Dashboard</h1>
    <button
      class="btn btn-primary mb-3"
      style="margin-left: 0"
      @click="currentPage = 'customers'"
    >
      Manage Customers
    </button>

    <button
      class="btn btn-primary mb-3"
      style=""
      @click="currentPage = 'managers'"
    >
      Manage Managers
    </button>

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
