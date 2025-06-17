<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4>Create User</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="create">
            <div class="row">
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.name"
                  />
                  <small class="text-danger" v-if="errors.name">{{ errors.name }}</small>
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="user.email"
                  />
                  <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.password"
                  />
                  <small class="text-danger" v-if="errors.password">{{ errors.password }}</small>
                </div>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-primary text-white">Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import axios from 'axios';

const user = ref({
  name: '',
  email: '',
  password: '',
});

const errors = ref({
  name: '',
  email: '',
  password: '',
});

const $toast = useToast();

const create = async () => {
  errors.value = { name: '', email: '' , password: '' };
  let valid = true;

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
  if (!user.value.password) {
    errors.value.password = 'Password is required.';
    valid = false;
  } else if (user.value.password.length <= 6) {
    errors.value.password = 'Password must be 6 charater .';
    valid = false;
  }

  if (!valid) return;

  try {
    await axios.post('/api/users', {
      name: user.value.name,
      email: user.value.email,
      password: user.value.password,
    });

    $toast.success('User created successfully!');
    // Clear form
    user.value.name = '';
    user.value.email = '';
    user.value.password = '';
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      const serverErrors = error.response.data.errors;
      for (const key in serverErrors) {
        if (errors.value.hasOwnProperty(key)) {
          errors.value[key] = serverErrors[key][0];
        }
      }
    } else {
      $toast.error('Failed to create user. Please try again.');
    }
  }
};
</script>

<style scoped>
.text-danger {
  font-size: 12px;
}
</style>
