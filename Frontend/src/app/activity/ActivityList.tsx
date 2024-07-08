'use client';

import { useEffect, useState } from 'react';
import { fetchActivities, createActivity, updateActivity, deleteActivity } from '../../services/api';
import { Activity } from '../../types';

const ActivityPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newActivity, setNewActivity] = useState<string>('');
  const [newUserId, setNewUserId] = useState<number | ''>('');
  const [newCategoryId, setNewCategoryId] = useState<number | ''>('');
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  useEffect(() => {
    fetchActivities()
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  const handleCreate = () => {
    if (!newActivity || !newUserId || !newCategoryId) return;

    createActivity({ description: newActivity, userId: newUserId, categoryId: newCategoryId })
      .then(activity => setActivities([...activities, activity]))
      .catch(error => console.error('Error creating activity:', error));
    setNewActivity('');
    setNewUserId('');
    setNewCategoryId('');
  };

  const handleUpdate = (activity: Activity) => {
    updateActivity(activity)
      .then(updatedActivity => {
        setActivities(activities.map(a => a.id === updatedActivity.id ? updatedActivity : a));
        setEditingActivity(null);
      })
      .catch(error => console.error('Error updating activity:', error));
      window.location.reload();
  };

  const handleDelete = (id: number) => {
    deleteActivity(id)
      .then(() => setActivities(activities.filter(a => a.id !== id)))
      .catch(error => console.error('Error deleting activity:', error));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-primary text-lightText">
      <h1 className="text-3xl mb-8 font-bold">Gerenciamento de Atividades</h1>
      <div className="mb-6 w-full max-w-md">
        <input
          type="text"
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
          placeholder="Nova Atividade"
          className="w-full p-2 mb-4 border border-secondary rounded bg-terciary"
        />
        <input
          type="number"
          value={newUserId}
          onChange={(e) => setNewUserId(parseInt(e.target.value) || '')}
          placeholder="ID do Usuário"
          className="w-full p-2 mb-4 border border-secondary rounded bg-terciary"
        />
        <input
          type="number"
          value={newCategoryId}
          onChange={(e) => setNewCategoryId(parseInt(e.target.value) || '')}
          placeholder="ID da Categoria"
          className="w-full p-2 mb-4 border border-secondary rounded bg-terciary"
        />
        <button onClick={handleCreate} className="w-full p-2 bg-lightPrimary hover:bg-lightPrimary_700 text-darkPrimary_700 rounded mb-5">
          Criar
        </button>
      </div>
      <ul className="w-full max-w-md">
        {activities.map(activity => (
          <li key={activity.id} className="flex justify-between items-center p-2 mb-2 bg-secondary rounded">
            {editingActivity && editingActivity.id === activity.id ? (
              <div className="flex w-full">
                <input
                  type="text"
                  value={editingActivity.description}
                  onChange={(e) => setEditingActivity({ ...editingActivity, description: e.target.value })}
                  className="flex-grow p-2 border border-secondary rounded bg-terciary mr-2"
                />
                <input
                  type="number"
                  value={editingActivity.userId}
                  onChange={(e) => {
                    const parsedValue = parseInt(e.target.value);
                    if (!isNaN(parsedValue)) {
                      setEditingActivity({ ...editingActivity, userId: parsedValue });
                    } else {
                      console.error("Invalid input for userId");
                    }
                  }}
                  className="flex-grow p-2 border border-secondary rounded bg-terciary mr-2"
                />
                <input
                  type="number"
                  value={editingActivity.categoryId}
                  onChange={(e) => {
                    const parsedValue = parseInt(e.target.value);
                    if (!isNaN(parsedValue)) {
                      setEditingActivity({ ...editingActivity, categoryId: parsedValue });
                    } else {
                      console.error("Invalid input for categoryId");
                    }
                  }}
                  className="flex-grow p-2 border border-secondary rounded bg-terciary mr-2"
                />
                <button onClick={() => handleUpdate(editingActivity)} className="p-2 bg-teal-700 hover:bg-teal-800 rounded">
                  Salvar
                </button>
              </div>
            ) : (
              <>
                <span className="flex-grow">#{activity.id} - {activity.description}</span>
                <div className="flex space-x-2">
                  <button onClick={() => setEditingActivity(activity)} className="p-2 bg-indigo-700 hover:bg-indigo-800 rounded">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(activity.id)} className="p-2 bg-orange-700 hover:bg-orange-800 rounded ">
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

export default ActivityPage;
