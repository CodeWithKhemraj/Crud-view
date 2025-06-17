<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Update Profile</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="update">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" class="form-control" v-model="user.name">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="text" class="form-control" v-model="user.email">
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary text-white">Update</button>
                            </div>
                        </div>                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router'; 
    import { editUsers, updateUser } from '../../services/userService.js';
    import {useToast} from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';
    
    const user = ref({});
    const route = useRoute(); 
    const userId = route.params.id; 
    const $toast = useToast();

    const fetchUsers = async () => {
        user.value = await editUsers(userId); 
    };

    const update = async () => {
        const formData = new FormData();
        formData.append('name', user.value.name);
        formData.append('email', user.value.email);
        formData.append('_method', 'PUT'); // Laravel's method spoofing

        try {
            const response = await axios.post(`/api/users/${userId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            $toast.success('User updated successfully!');
            
        } catch (error) {
            console.error('Update failed:', error.response?.data || error);
            $toast.error('Failed to update user. Please try again.');
        }
    }

    onMounted(() => {
        fetchUsers();
    });

</script>

