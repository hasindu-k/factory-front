<template>
    <div class="edit-course-modal">
        <div class="edit-course">
            <h2>Edit Manager</h2>
   
            <form @submit.prevent="update">
                <div class="form-group">
                    <label for="managerName">Manager Name:</label>
                    <input v-model="editedManager.managerName" type="text" class="form-control" required>
                </div>
   
                <div class="form-group">
                    <label for="managerEmail">Email:</label>
                    <input v-model="editedManager.managerEmail" type="text" class="form-control" required>
                </div>
   
                <div class="form-group">
                    <label for="managerPhone">Phone number:</label>
                    <input v-model="editedManager.managerPhone" type="tel" class="form-control" required>
                </div>
   
                <div class="form-group">
                    <label for="managerType">Position:</label>
                    <input v-model="editedManager.managerType" type="text" class="form-control" required>
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
            manager: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                editedManager: { ...this.manager },
            };
        },
        methods: {
            update() {

                this.$emit('update', this.editedManager);
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
   