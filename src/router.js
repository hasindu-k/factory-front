import { createRouter, createWebHistory } from "vue-router";

import PageHeader from "./components/PageHeader.vue";
import PageFooter from "./components/PageFooter.vue";

import Home from "./components/HomePage.vue";
import ManagerDashBoard from "./components/ManagerDashBoard.vue";

//anuththara
import SupplierForm from "./components/Supplier/SupplierForm.vue";
import SupplierTable from "./components/Supplier/SupplierTable.vue";
import SupplierUpdate from "./components/Supplier/SupplierUpdate.vue";
import SupplierDashBoard from "./components/SupplierDashBoard.vue";
import AddOrderDetailsForm from "./components/Order/AddOrderDetailsForm.vue";
import OrderDetailsTable from "./components/Order/OrderDetailsTable.vue";
import OrderDetailsUpdate from "./components/Order/OrderDetailsUpdate.vue";

//thenuri
import addDriver from "./components/driver/addDriver.vue";
import driverList from "./components/driver/driverList.vue";
import editDriver from "./components/driver/editDriver.vue";
import addDelivery from "./components/delivery/addDelivery.vue";
import deliveryList from "./components/delivery/deliveryList.vue";
import editDelivery from "./components/delivery/editDelivery.vue";
import driverProfile from "./components/driver/driverProfile.vue";
import dashboardDelivery from "./components/dashboardDelivery.vue";

//hasindu
import fertilizerList from "./components/Fertilizer/fertilizerList.vue";
import fertilizerForm from "./components/Fertilizer/addFertilizer.vue";

//sadith
import ProductManager from "./components/ProductManager/ListProduct.vue";
import CartList from "./components/Cart/CartList.vue";
import ProductCustomer from "./components/Products/ProductList.vue";

//daniru
import AddEmployeeLeave from "./components/EmployeeLeave/AddEmployeeLeave.vue";
import ListEmployeeLeave from "./components/EmployeeLeave/List.vue";

//durangi
import addFeedback from "./components/Feedback/addFeedback.vue";
import feedbackList from "./components/Feedback/feedbackList.vue";

//vishmee
import PayList from "./components/Payment/PayTransactionTable.vue";

//vihanga
import UserLogin from "./components/UserLogin.vue";
import ManagerUser from "./components/Manager/ManagerUser.vue";



const routes = [
  {
    path: "/", // homed 
    name: "Home",
    components: {
      default: Home,
      header: PageHeader,
      footer: PageFooter,
    }, // Include PageFooter component
  },
  {
    path: "/manager-dashboard", // manager-dashboard 
    name: "ManagerDashBoard",
    components: {
      default: ManagerDashBoard,
      header: PageHeader,
      footer: PageFooter,
    }, // Include PageFooter component
  },

  //anuththara
  {
    path: "/supplier-dashboard",
    name: "SupplierDashBoard",
    components: {
      default: SupplierDashBoard,
      header: PageHeader,
      footer: PageFooter,
    }, // Include PageFooter component
  },
  {
    path: "/supplier-form",
    name: "SupplierForm",
    components: {
      default: SupplierForm,
      header: PageHeader,
      footer: PageFooter,
    }, // Include PageFooter component
  },
  {
    path: "/supplier-table",
    name: "SupplierTable",
    components: {
      default: SupplierTable,
      header: PageHeader,
      footer: PageFooter,
    }, // Include PageFooter component
  },
  {
    path: "/supplier-update/:id",
    name: "SupplierUpdate",
    components: {
      default: SupplierUpdate,
      header: PageHeader,
      footer: PageFooter,
    }, // Include PageFooter component
  },
  {
    path: "/order-details-form",
    name: "AddOrderDetailsForm",
    components: {
      default: AddOrderDetailsForm,
      header: PageHeader,
      footer: PageFooter,
    }, // Include PageFooter component
  },
  {
    path: "/order-details-table",
    name: "OrderDetailsTable",
    components: {
      default: OrderDetailsTable,
      header: PageHeader,
      footer: PageFooter,
    }, // Include PageFooter component
  },
  {
    path: "/order-details-update/:id",
    name: "OrderDetailsUpdate",
    components: {
      default: OrderDetailsUpdate,
      header: PageHeader,
      footer: PageFooter,
    }, // Include PageFooter component
  },

  //thenuri
  {
    path: "/delivery-dashboard",
    name: "dashboardDelivery",
    components: {
      default: dashboardDelivery,
      header: PageHeader,
      footer: PageFooter,
    },
  },
  {
    path: "/add-driver-form",
    name: "addDriver",
    components: { default: addDriver, header: PageHeader, footer: PageFooter },
  },
  {
    path: "/driver-list",
    name: "driverList",
    components: { default: driverList, header: PageHeader, footer: PageFooter },
  },
  {
    path: "/driver-update/:id",
    name: "editDriver",
    components: { default: editDriver, header: PageHeader, footer: PageFooter },
  },
  {
    path: "/add-delivery-form",
    name: "addDelivery",
    components: {
      default: addDelivery,
      header: PageHeader,
      footer: PageFooter,
    },
  },
  {
    path: "/delivery-list",
    name: "deliveryList",
    components: {
      default: deliveryList,
      header: PageHeader,
      footer: PageFooter,
    },
  },
  {
    path: "/delivery-update/:id",
    name: "editDelivery",
    components: {
      default: editDelivery,
      header: PageHeader,
      footer: PageFooter,
    },
  },
  {
    path: "/profile",
    name: "driverProfile",
    components: {
      default: driverProfile,
      header: PageHeader,
      footer: PageFooter,
    },
  },

  //hasindu
  {
    path: "/ferilizer-list",
    name: "fertilizerList",
    components: {
      default: fertilizerList,
      header: PageHeader,
      footer: PageFooter,
    },
  },

  
  {
    path: "/ferilizer-form",
    name: "fertilizerForm",
    components: {
      default: fertilizerForm,
      header: PageHeader,
      footer: PageFooter,
    },
  },

   //sadith
   {
    path: "/List-Product-manager", // manager-dashboard 
    name: "ProductManager",
    components: {
      default: ProductManager,
      header: PageHeader,
      footer: PageFooter,
    }, // Include PageFooter component
  },
  {
    path: "/List-Product", // manager-dashboard 
    name: "ProductCustomer",
    components: {
      default: ProductCustomer,
      header: PageHeader,
      footer: PageFooter,
    }, // Include PageFooter component
  },
  {
    path: "/List-Cart", // manager-dashboard 
    name: "CartList",
    components: {
      default: CartList,
      header: PageHeader,
      footer: PageFooter,
    }, // Include PageFooter component
  },
  

  //daniru
  {
    path: "/employee-leave-form",
    name: "AddEmployeeLeave",
    components: {
      default: AddEmployeeLeave,
      header: PageHeader,
      footer: PageFooter,
    },
  },
  {
    path: "/employee-leave-list",
    name: "ListEmployeeLeave",
    components: {
      default: ListEmployeeLeave,
      header: PageHeader,
      footer: PageFooter,
    },
  },

  //durangi
  {
    path: "/feedback-form",
    name: "addFeedback",
    components: {
      default: addFeedback,
      header: PageHeader,
      footer: PageFooter,
    },
  },
  {
    path: "/feedback-list",
    name: "feedbackList",
    components: {
      default: feedbackList,
      header: PageHeader,
      footer: PageFooter,
    },
  },

  //vishmee
  {
    path: "/payment-list",
    name: "PayList",
    components: {
      default: PayList,
      header: PageHeader,
      footer: PageFooter,
    },
  },

  //vihanga
  {
    path: "/login",
    name: "UserLogin",
    components: {
      default: UserLogin,
      header: PageHeader,
      footer: PageFooter,
    },
  },
  {
    path: "/manager-user",
    name: "ManagerUser",
    components: {
      default: ManagerUser,
      header: PageHeader,
      footer: PageFooter,
    },
  },
  
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
