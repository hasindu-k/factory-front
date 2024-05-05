<template>
    <div class="container mt-5">
        <!-- <img src="../assets/logoUruwala.png" alt="Company logo"> -->
        <h1 v-if="!authenticated">Manager Login</h1>
  
        <form v-if="!authenticated" @submit.prevent="login" class="mt-3">
            <div class="form-group">
                <label for="managerID">ID number:</label>
                <input type="text" v-model="managerID" class="form-control" required />
            </div>
  
            <div class="form-group">
                <label for="managerPassword">Password:</label>
                <input
                    type="password"
                    v-model="managerPassword"
                    class="form-control"
                    required
                />
            </div>
                
            <button type="submit" class="btn btn-primary">Login</button>
            <p v-if="error" class="error-message mt-3">{{ error }}</p>
        </form>

        <!-- <template v-if="authenticated">
            <template v-if="firstTwoLetter === 'UM'">
                <UserManager/>            
            </template>

            <template v-if="firstTwoLetter === 'FM'">
                <FertilizerManager/>            
            </template>

            <template v-if="firstTwoLetter === 'PR'">
                <ProductManager/>            
            </template>

            <template v-if="firstTwoLetter === 'SM'">
                <SupplyManager/>            
            </template>

            <template v-if="firstTwoLetter === 'DM'">
                <DeliveryManager/>            
            </template>

            <template v-if="firstTwoLetter === 'PA'">
                <PaymentManager/>            
            </template>

            <template v-if="firstTwoLetter === 'CM'">
                <CustomerAffairManager/>            
            </template>

            <template v-if="firstTwoLetter === 'EM'">
                <EmployeeManager/>            
            </template>
        </template> -->

        <user-manager v-if="authenticated && firstTwoLetter === 'UM'"/>
        <fertilizer-manager v-if="authenticated && firstTwoLetter === 'FM'"/>
        <product-manager v-if="authenticated && firstTwoLetter === 'PR'"/>
        <payment-manager v-if="authenticated && firstTwoLetter === 'PA'"/>
        <delivery-manager v-if="authenticated && firstTwoLetter === 'DM'"/>
        <supply-manager v-if="authenticated && firstTwoLetter === 'SM'"/>
        <customer-affair-manager v-if="authenticated && firstTwoLetter === 'CM'"/>
        <employee-manager v-if="authenticated && firstTwoLetter === 'EM'"/>
  
        
    </div>
</template>
  
<script>
import UserManager from "./ManagerUser.vue";
// import FertilizerManager from "./components/ManagerFertilizer.vue";
import FertilizerManager from "../ManagerFertilizer.vue";
import ProductManager from "../ManagerProduct.vue";
import DeliveryManager from "../ManagerDelivery.vue";
import SupplyManager from "../ManagerSupply.vue";
import PaymentManager from "../ManagerPayment.vue";
import CustomerAffairManager from "../ManagerCustomerAffair.vue";
import EmployeeManager from "../ManagerEmployee.vue";

export default {
    components: {
        UserManager,
        FertilizerManager,
        ProductManager,
        DeliveryManager,
        SupplyManager,
        PaymentManager,
        CustomerAffairManager,
        EmployeeManager,
    },
    data() {
        return {
            managerID: "",
            managerPassword: "",
            error: null,
            authenticated: false,
            userDetails: {},
        };
    },
    computed: {
        firstTwoLetter() {
            return this.managerID.substring(0, 2).toUpperCase();
        },
    },
    methods: {
        async login() {
            try {
                const response = await fetch("http://localhost:5207/api/User/Login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        managerID: this.managerID,
                        managerPassword: this.managerPassword,
                    }),
                });

                const result = await response.json();
                if (result === false) {
                    this.authenticated = false;
                    throw new Error("Authentication failed. Status: " + response.status);
                } else {
                    this.userDetails = result;
                    this.authenticated = true;
                }
            } catch (error) {
                console.error("Error during authentication:", error);
                this.error = "Authentication failed";
                this.authenticated = false;
                this.userDetails = {};
            }
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    /*background-image: url('../assets/factory.jpeg'); /* Replace with your image path */
    background-size: cover;
    background-position: center;
    height: 100%;
}

.container img {
    max-width: 200px; /* Adjust the size of the logo */
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
}

</style>
 <!-- <template>
    <div class="container mt-5">
      <img src="../assets/logoUruwala.png" alt="Company logo">
      <h1 v-if="!authenticated">Login</h1>
  
      <form v-if="!authenticated" @submit.prevent="login" class="mt-3">
        <div class="form-group">
          <label for="managerID">ID number:</label>
          <input type="text" v-model="managerID" class="form-control" required />
        </div>
  
        <div class="form-group">
          <label for="managerPassword">Password:</label>
          <input
            type="password"
            v-model="managerPassword"
            class="form-control"
            required
          />
        </div>
  
        <button type="submit" class="btn btn-primary">Login</button>
        <p v-if="error" class="error-message mt-3">{{ error }}</p>
      </form>
  
      <template v-if="authenticated">
        <component :is="managerComponent" />
      </template>
    </div>
  </template>
  
  <script>
  import UserManager from "./ManagerUser.vue";
  import FertilizerManager from "./ManagerFertilizer.vue";
  import ProductManager from "./ManagerProduct.vue";
  import DeliveryManager from "./ManagerDelivery.vue";
  import SupplyManager from "./ManagerSupply.vue";
  import PaymentManager from "./ManagerPayment.vue";
  import CustomerAffairManager from "./ManagerCustomerAffair.vue";
  import EmployeeManager from "./ManagerEmployee.vue";
  
  export default {
    data() {
      return {
        managerID: "",
        managerPassword: "",
        error: null,
        authenticated: false,
        userDetails: {},
        managerComponent: null,
      };
    },
    methods: {
      async login() {
        try {
          const response = await fetch("http://localhost:5207/api/User/Login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              managerID: this.managerID,
              managerPassword: this.managerPassword,
            }),
          });
  
          const result = await response.json();
          if (result === false) {
            this.authenticated = false;
            throw new Error("Authentication failed. Status: " + response.status);
          } else {
            this.userDetails = result;
            this.authenticated = true;
            // Set component based on managerID
            this.setManagerComponent();
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          this.error = "Authentication failed";
          this.authenticated = false;
          this.userDetails = {};
        }
      },
      setManagerComponent() {
        const firstTwoLetter = this.managerID.substring(0, 2).toUpperCase();
        switch (firstTwoLetter) {
          case "UM":
            this.managerComponent = UserManager;
            break;
          case "FM":
            this.managerComponent = FertilizerManager;
            break;
          case "PR":
            this.managerComponent = ProductManager;
            break;
          case "DM":
            this.managerComponent = DeliveryManager;
            break;
          case "SM":
            this.managerComponent = SupplyManager;
            break;
          case "PA":
            this.managerComponent = PaymentManager;
            break;
          case "CM":
            this.managerComponent = CustomerAffairManager;
            break;
          case "EM":
            this.managerComponent = EmployeeManager;
            break;
          default:
            this.error = "Invalid manager ID";
            break;
        }
      },
    },
  };
  </script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('../assets/factory.jpeg'); /* Replace with your image path */
    background-size: cover;
    background-position: center;
    height: 100%;
}

.container img {
    max-width: 200px; /* Adjust the size of the logo */
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
}

</style> -->
  
