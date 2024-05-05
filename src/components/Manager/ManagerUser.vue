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
    <div>
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
</template>

<script>
import CustomersPage from '../Customer/ManageCustomer.vue'; // Import your CustomersPage component
import ManagersPage from './ManageManager.vue'; // Import your ManagersPage component

export default {
    data() {
        return {
            currentPage: 'dashboard',
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
            switch(page) {
                case 'customers':
                    this.currentPageComponent = CustomersPage;
                    break;
                case 'managers':
                    this.currentPageComponent = ManagersPage;
                    break;
                default:
                    this.currentPageComponent = null;
            }
        },
    },
    mounted() {
        this.loadPageComponent(this.currentPage);
    }
}
</script>


