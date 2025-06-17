import axios from 'axios'
// Get user details
export const getUsers = async () => {
  try {
    const response = await axios.get('/api/users')
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

// Fetch single user data to edit
export const editUsers = async (id) => {
  if (!id) {
    console.error('Invalid ID passed to editUsers');
    return;
  }

  try {
    const response = await axios.get(`/api/users/${id}/edit`);
    return response.data; // return user data
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};



//  update the user data
export const updateUser = async (id) => {

  try {
    await axios.put(`/api/users/${id}`)
    return true
  } catch (error) {
    console.error('Error deleting user:', error)
    return false
  }
}



//  Delete the user data
export const deleteUser = async (id) => {

  try {
    await axios.delete(`/api/users/${id}`)
    return true
  } catch (error) {
    console.error('Error deleting user:', error)
    return false
  }
}
