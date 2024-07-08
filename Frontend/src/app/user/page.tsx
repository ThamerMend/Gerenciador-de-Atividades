'use client';

import { useEffect, useState } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../services/api';
import { User } from '../../types';

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<{ firstName: string; lastName: string }>({ firstName: '', lastName: '' });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleCreate = () => {
    if (!newUser.firstName || !newUser.lastName) return;
    createUser(newUser)
      .then(user => setUsers([...users, user]))
      .catch(error => console.error('Error creating user:', error));
    setNewUser({ firstName: '', lastName: '' });
  };

  const handleUpdate = (user: User) => {
    updateUser(user)
      .then(updatedUser => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        setEditingUser(null);
      })
      .catch(error => console.error('Error updating user:', error));
      window.location.reload();
  };

  const handleDelete = (id: number) => {
    deleteUser(id)
      .then(() => setUsers(users.filter(u => u.id !== id)))
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-primary text-lightText">
      <h1 className="text-3xl mb-8 font-bold">Gerenciamento de Usuários</h1>
      <div className="mb-6 w-full max-w-md">
        <input
          type="text"
          value={newUser.firstName}
          onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
          placeholder="Primeiro Nome"
          className="w-full p-2 mb-4 border border-secondary rounded bg-terciary "
        />
        <input
          type="text"
          value={newUser.lastName}
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
          placeholder="Último Nome"
          className="w-full p-2 mb-4 border border-secondary rounded bg-terciary "
        />
        <button onClick={handleCreate} className="w-full p-3 bg-lightPrimary hover:bg-lightPrimary_700 text-darkPrimary_700 rounded mb-5 ">
          Criar
        </button>
      </div>
      <ul className="w-full max-w-md">
        {users.map(user => (
          <li key={user.id} className="flex justify-between items-center p-2 mb-2 bg-secondary rounded">
            {editingUser && editingUser.id === user.id ? (
              <div className="flex w-full">
                <input
                  type="text"
                  value={editingUser.firstName}
                  onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                  className="flex-grow p-2 border border-secondary rounded bg-terciary  mr-2"
                />
                <input
                  type="text"
                  value={editingUser.lastName}
                  onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                  className="flex-grow p-2 border border-secondary rounded bg-terciary  mr-2"
                />
                <button onClick={() => handleUpdate(editingUser)} className="p-2 bg-teal-700 hover:bg-teal-800 rounded">
                  Salvar
                </button>
              </div>
            ) : (
              <>
                <span className="flex-grow">#{user.id} - {user.firstName} {user.lastName}</span>
                <div className="flex space-x-2">
                  <button onClick={() => setEditingUser(user)} className="p-2 bg-indigo-700 hover:bg-indigo-800 rounded ">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="p-2 bg-orange-700 hover:bg-orange-800 rounded ">
                    Deletar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );

};

export default UserPage;
