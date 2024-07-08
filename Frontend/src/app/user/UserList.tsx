'use client';

import { useEffect, useState } from 'react';
import { fetchUsers } from '../../services/api';
import { User } from '../../types';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <ul className="user-list">
      {users.map(user => (
        <li key={user.id} className="user-item">
          {user.firstName} {user.lastName}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
