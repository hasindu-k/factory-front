<template>
    <div class="edit-course-modal">
        <div class="edit-course">
            <h2>Edit Customer</h2>
   
            <form @submit.prevent="update">
                <div class="form-group">
                    <label for="cusName">Customer Name:</label>
                    <input v-model="editedCustomer.cusName" type="text" class="form-control" required>
                </div>
   
                <div class="form-group">
                    <label for="cusEmail">Email:</label>
                    <input v-model="editedCustomer.cusEmail" type="email" class="form-control" required>
                </div>
   
                <div class="form-group">
                    <label for="cusDOB">Date of Birth:</label>
                    <input v-model="editedCustomer.cusDOB" type="date" class="form-control" required>
                </div>
   
                <div class="form-group">
                    <label for="cusAddress">Address:</label>
                    <input v-model="editedCustomer.cusAddress" type="text" class="form-control" required>
                </div>

                <div class="form-group">
                    <label for="cusPhone">Phone number:</label>
                    <input v-model="editedCustomer.cusPhone" type="tel" class="form-control" required>
                </div>
   
                <div class="form-group">
                    <label for="cusPassword">Password:</label>
                    <input v-model="editedCustomer.cusPassword" type="text" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Update Manager</button>
                    <button type="button" @click="cancel" class="btn btn-secondary">Cancel</button>
                </div>
               
            </form>
        </div>
    </div>
</template>
   
<script>
    export default {
        props: {
            customer: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                editedCustomer: { ...this.customer },
            };
        },
        methods: {
            update() {

                this.$emit('update', this.editedCustomer);
            },
            cancel() {
            
                this.$emit('cancel');
            },
        },
    };
</script>
   
<style scoped>
   .edit-course-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
   }
   
   .edit-course {
        background: white;
        padding: 20px;
        border-radius: 8px;
   }
</style>
   