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
                                    <small class="text-danger" v-if="errors.name">{{ errors.name }}</small>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" class="form-control" v-model="user.email">
                                    <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>
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
import { useToast } from 'vue-toast-notification';

import axios from 'axios';

const user = ref({
    name: '',
    email: '',
});

const errors = ref({
    name: '',
    email: '',
});

const route = useRoute(); 
const userId = route.params.id; 
const $toast = useToast();

const fetchUsers = async () => {
    user.value = await editUsers(userId); 
};

const validateForm = () => {
    let valid = true;
    errors.value = { name: '', email: '' };

    if (!user.value.name) {
        errors.value.name = 'Name is required.';
        valid = false;
    } else if (user.value.name.length < 3) {
        errors.value.name = 'Name must be at least 3 characters.';
        valid = false;
    }

    if (!user.value.email) {
        errors.value.email = 'Email is required.';
        valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(user.value.email)) {
        errors.value.email = 'Email format is invalid.';
        valid = false;
    }

    return valid;
};

const update = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('name', user.value.name);
    formData.append('email', user.value.email);
    formData.append('_method', 'PUT'); 

    try {
        const response = await axios.post(`/api/users/${userId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        $toast.success('User updated successfully!');
        
    } catch (error) {
        $toast.error('Failed to update user. Please try again.');
    }
};

onMounted(() => {
    fetchUsers();
});
</script>

<style scoped>
.text-danger {
    font-size: 12px;
}
</style>
