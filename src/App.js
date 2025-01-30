import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from './services/userService';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch todo item from JSONPlaceholder API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => {
        console.log('Fetched Todo:', json);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async (user) => {
    try {
      const newUser = await addUser(user);
      setUsers([...users, newUser]);
    } catch (error) {
      console.error('Failed to add user', error);
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      const updatedUser = await updateUser(selectedUser.id, user);
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      setSelectedUser(null);
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  return (
    <div>
      <UserForm user={selectedUser} onSubmit={selectedUser ? handleUpdateUser : handleAddUser} />
      <UserList users={users} onEdit={setSelectedUser} onDelete={handleDeleteUser} />
    </div>
  );
};

export default App;
