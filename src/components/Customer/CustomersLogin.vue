<template>
    <div class="container mt-5" v-if="isCusLogin">
        <!-- <img src="../assets/logoUruwala.png" alt="Company logo"> -->
        <h1 v-if="!authenticated">Customer Login</h1>

        <form v-if="!authenticated" @submit.prevent="login" class="mt-3">
            <div class="form-group">
                <label for="cusID">ID number:</label>
                <input type="text" v-model="cusID" class="form-control" required />
            </div>

            <div class="form-group">
                <label for="cusPassword">Password:</label>
                <input type="password" v-model="cusPassword" class="form-control" required />
            </div>

            <button type="submit" class="btn btn-primary">Login</button>
            <button type="submit" @click="navigateToManagerLogin">Manager Login</button>
            <p v-if="error" class="error-message mt-3">{{ error }}</p>
        </form>


    </div>
    <UserLogin v-if="isTrue" />
    <CustomerProfile v-if="authenticated" />
</template>

<script>
// import UserLogin from './Manager/UserLogin.vue';
import UserLogin from '../Manager/UserLogin.vue'
import CustomerProfile from "./CustomerProfile.vue";

export default {
    components: {
        UserLogin,
        CustomerProfile,
    },
    data() {
        return {
            cusID: "",
            cusPassword: "",
            error: null,
            authenticated: false,
            userDetails: {},
            isTrue: false,
            isCusLogin: true,
        };
    },
    computed: {

    },
    methods: {
        async login() {
            try {
                const response = await fetch("http://localhost:5154/api/Customer/Login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cusID: this.cusID,
                        cusPassword: this.cusPassword,
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
        navigateToManagerLogin() {
            this.isTrue = true;
            this.isCusLogin = false;
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    /*  background-image: url('../assets/factory.jpeg'); Replace with your image path */
    background-size: cover;
    background-position: center;
    height: 100%;
}

.container img {
    max-width: 200px;
    /* Adjust the size of the logo */
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
