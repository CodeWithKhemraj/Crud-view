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

    const user = ref({});
    const route = useRoute(); 
    const userId = route.params.id; 

    const fetchUsers = async () => {
        user.value = await editUsers(userId); 
    };

    // const handleUpdateUser = async () => {
    //     if (confirm('Are you sure you want to delete this user?')) {
    //         const success = await updateUser(userId)
    //         if (success) { await fetchUsers() }
    //     }
    // }
    onMounted(() => {
        fetchUsers();
    });


</script>

