<template>
    <div class="row">
        <div class="col-12 mb-2 text-end">
            <router-link :to='{ name: "usersAdd" }' class="btn btn-primary">Create</router-link>
        </div>
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Team Data</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sr</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody v-if="users.length > 0">
                                <tr v-for="(users, key) in users" :key="key">
                                    <td>{{ users.id }}</td>
                                    <td>{{ users.name }}</td>
                                    <td>{{ users.email }}</td>
                                    <td>
                                        <router-link :to='{ name: "usersEdit", params: { id: users.id } }'
                                            class="btn btn-success ">Edit</router-link>
                                        <button type="button" @click="deleteUser(users.id)"
                                            class="btn btn-danger mx-2 text-white" color="primary">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4" align="center">No users Found.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { getUsers, deleteUser } from '../../services/userService.js'

    const users = ref([])

    const fetchUsers = async () => {   users.value = await getUsers() }

    const handleDeleteUser = async (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            const success = await deleteUser(id)
            if (success) { await fetchUsers() }
        }
    }

    onMounted(() => { fetchUsers() })
</script>