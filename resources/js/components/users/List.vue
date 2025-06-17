<template>
    <div class="row">
        <div class="col-12 mb-2 text-end">
            <router-link :to='{ name: "usersAdd" }' class="btn btn-primary">Create user</router-link>
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
                                <tr v-for="(user, key) in users" :key="key">
                                    <td>{{ key + 1 }}</td> <!-- Sr Number -->
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>
                                        <router-link :to='{ name: "usersEdit", params: { id: user.id } }'
                                            class="btn btn-success">Edit</router-link>
                                        <button type="button" @click="handleDeleteUser(user.id)"
                                            class="btn btn-danger mx-2 text-white">Delete</button>
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
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { getUsers, deleteUser } from '../../services/userService.js'

const route = useRoute()
const users = ref([])
const $toast = useToast() // useToast call corrected

const fetchUsers = async () => {
    try {
        users.value = await getUsers()
    } catch (error) {
        $toast.error('Error fetching users')
        console.error('Error:', error)
    }
}

const handleDeleteUser = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            const success = await deleteUser(id)
            if (success) {
                await fetchUsers()
                $toast.success('User deleted successfully!')
            } else {
                $toast.error('Failed to delete user')
            }
        } catch (error) {
            $toast.error('Error deleting user')
            console.error('Error deleting user:', error)
        }
    }
}

onMounted(() => {
    fetchUsers()
})
</script>
