<template>
    <div class="create-form">
        <div class="custom-modal">
            <form v-if="isNew">
                <!-- <img src="../assets/logoUruwala.png" alt="Company logo"> -->
                <h1>Sign Up</h1>


                <!-- <div class="form-group">
                <label for="cusID">ID:</label>
                <input
                type="text"
                class="form-control"
                id="cusID"
                v-model="newCustomer.cusID"
                />
                <div v-if="cusIDError" class="alert alert-danger mt-2">
                {{ cusIDError }}
                </div>
            </div> -->

                <div class="form-group">
                    <label for="">Name:</label>
                    <input type="text" class="form-control" id="cusName" v-model="newCustomer.cusName" />
                    <div v-if="cusNameError" class="alert alert-danger mt-2">
                        {{ cusNameError }}
                    </div>
                </div>

                <div class="form-group">
                    <label for="cusEmail">Email:</label>
                    <input type="email" class="form-control" id="cusEmail" v-model="newCustomer.cusEmail" />
                    <div v-if="cusEmailError" class="alert alert-danger mt-2">
                        {{ cusEmailError }}
                    </div>
                </div>

                <div class="form-group">
                    <label for="cusDOB">Date of Birth:</label>
                    <input type="date" class="form-control" id="cusDOB" v-model="newCustomer.cusDOB" />
                    <div v-if="cusDOBError" class="alert alert-danger mt-2">
                        {{ cusDOBError }}
                    </div>
                </div>

                <div class="form-group">
                    <label for="cusAddress">Address:</label>
                    <input type="text" class="form-control" id="cusAddress" v-model="newCustomer.cusAddress" />
                    <div v-if="cusAddressError" class="alert alert-danger mt-2">
                        {{ cusAddressError }}
                    </div>
                </div>

                <div class="form-group">
                    <label for="cusPhone">Phone number:</label>
                    <input type="tel" class="form-control" id="cusPhone" v-model="newCustomer.cusPhone" />
                    <div v-if="cusPhoneError" class="alert alert-danger mt-2">
                        {{ cusPhoneError }}
                    </div>
                </div>

                <div class="form-group">
                    <label for="cusPassword">Password:</label>
                    <input type="password" class="form-control" id="cusPassword" v-model="newCustomer.cusPassword" />
                    <div v-if="cusPasswordError" class="alert alert-danger mt-2">
                        {{ cusPasswordError }}
                    </div>
                </div>

                <div class="form-group">
                    <label for="cusRePassword">Re-enter password:</label>
                    <input type="password" class="form-control" id="cusRePassword" v-model="cusRePassword" />
                    <div v-if="cusRePasswordError" class="alert alert-danger mt-2">
                        {{ cusRePasswordError }}
                    </div>
                </div>

                <button class="btn btn-success" @click="addCustomer">Submit</button>
            </form>

            <UserLogin v-if="isSignedUp" />

        </div>


    </div>
</template>

<script>
import UserLogin from './Manager/UserLogin.vue';
export default {
    name: 'SignUpForm',

    data() {
        return {
            customers: [],
            newCustomer: {
                cusID: '',
                cusName: '',
                cusEmail: '',
                cusDOB: '',
                cusAddress: '',
                cusPhone: '',
                cusPassword: '',
            },
            isSignedUp: false,
            isNew: true,
            // cusIDError: null,
            cusNameError: null,
            cusEmailError: null,
            cusDOBError: null,
            cusAddressError: null,
            cusPhoneError: null,
            cusPasswordError: null,
            cusRePasswordError: null,
        };
    },

    methods: {
        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        navigateLogin() {
            this.isNew = false;
            this.isSignedUp = true;
        },
        validatePhone(phone) {
            const phoneRegex = /^\d{10}$/;
            return phoneRegex.test(phone);
        },

        validateForm() {
            let isValid = true;

            if (!this.validateEmail(this.newCustomer.cusEmail)) {
                this.cusEmailError = "Invalid email address.";
                isValid = false;
            }

            if (!this.validatePhone(this.newCustomer.cusPhone)) {
                this.cusPhoneError = "Invalid phone number.";
                isValid = false;
            }

            // this.cusIDError = null;
            this.cusNameError = null;
            this.cusEmailError = null;
            this.cusDOBError = null;
            this.cusAddressError = null;
            this.cusPhoneError = null;
            this.cusPasswordError = null;
            this.cusRePasswordError = null;

            // if (!this.newCustomer.cusID) {
            //     this.cusIDError = "Customer ID is required.";
            // }

            if (!this.newCustomer.cusName) {
                this.cusNameError = "Customer name is required.";
            }

            if (!this.newCustomer.cusEmail) {
                this.cusEmailError = "Customer email is required.";
            }

            if (!this.newCustomer.cusDOB) {
                this.cusDOBError = "Customer dob is required.";
            }

            const currentDate = new Date();
            const dob = new Date(this.newCustomer.cusDOB);

            if (dob > currentDate) {
                this.cusDOBError = "Date of Birth must be smaller than current date";
                return;
            }

            if (!this.newCustomer.cusAddress) {
                this.cusAddressError = "Customer address is required.";
            }

            if (!this.newCustomer.cusPhone) {
                this.cusPhoneError = "Customer phone is required.";
            }

            if (!this.newCustomer.cusPassword) {
                this.cusPasswordError = "Customer password is required.";
            }

            if (!this.cusRePassword) {
                this.cusRePasswordError = "Password re-enter is required.";
            }

            if (this.newCustomer.cusPassword != this.cusRePassword) {
                this.cusRePasswordError = "Password is not similar.";
            }

            return isValid;
        },

        async addCustomer() {


            console.log(this.validateForm())
            //     if (!this.validateForm()) {
            //     return;
            // }

            const newCustomerData = {
                // cusID: this.newCustomer.cusID,
                cusName: this.newCustomer.cusName,
                cusEmail: this.newCustomer.cusEmail,
                cusDOB: this.newCustomer.cusDOB,
                cusAddress: this.newCustomer.cusAddress,
                cusPhone: this.newCustomer.cusPhone,
                cusPassword: this.newCustomer.cusPassword,
            };

            console.log(newCustomerData)

            try {
                const response = await fetch("http://localhost:5154/api/Customer/PostCustomers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newCustomerData),
                });


                if (!response.ok) {
                    throw new Error(`Failed to add customer. Status: ${response.status}`);
                }


                this.navigateLogin()


                // Clear form fields
                //this.clearForm();
            } catch (error) {
                console.error("Error adding customer:", error);
            }

        }

    },
    components: {
        UserLogin,
    }
}
</script>

<style scoped>
.create-form {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    background-image: url('../assets/factory.jpeg');
    /* Replace with your image path */
    background-size: cover;
    background-position: center;
}

.custom-modal {
    background-color: rgba(255, 255, 255, 0.8);
    /* Semi-transparent white background */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 500px;
    width: 100%;
    margin-right: 20px;
    /* Add space between image and form */
}

.custom-modal img {
    max-width: 200px;
    /* Adjust the size of the image */
    margin-bottom: 20px;
}

.custom-modal h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
    text-align: left;
    /* Align form elements to the left */
    width: 100%;
    /* Ensure form elements take up the full width */
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-control {
    width: calc(100% - 22px);
    /* Subtract padding and border from the width */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
}

.alert {
    padding: 10px;
    border-radius: 4px;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
    margin-top: 5px;
}

.btn-success {
    background-color: #28a745;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.btn-success:hover {
    background-color: #218838;
}
</style>
