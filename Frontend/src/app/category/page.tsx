'use client';

import { useEffect, useState } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../services/api';
import { Category } from '../../types';

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCreate = () => {
    if (!newCategory) return;
    createCategory({ description: newCategory })
      .then(category => setCategories([...categories, category]))
      .catch(error => console.error('Error creating category:', error));
    setNewCategory('');

  };

  const handleUpdate = (category: Category) => {
    updateCategory(category)
      .then(updatedCategory => {
        setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
        setEditingCategory(null);
      })
      .catch(error => console.error('Error updating category:', error));
      window.location.reload();
  };

  const handleDelete = (id: number) => {
    deleteCategory(id)
      .then(() => setCategories(categories.filter(c => c.id !== id)))
      .catch(error => console.error('Error deleting category:', error));
  };

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-primary text-lightText">
        <h1 className="text-3xl mb-8 font-bold">Gerenciamento de Categorias</h1>
        <div className="mb-6 w-full max-w-md">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nova Categoria"
            className="w-full p-2 mb-4 border border-secondary rounded bg-terciary"
          />
          <button onClick={handleCreate} className="w-full p-2 bg-lightPrimary hover:bg-lightPrimary_700 text-darkPrimary_700 rounded mb-5">
            Criar
          </button>
        </div>
        <ul className="w-full max-w-md">
          {categories.map(category => (
            <li key={category.id} className="flex justify-between items-center p-2 mb-2 bg-secondary rounded">
              {editingCategory && editingCategory.id === category.id ? (
                <div className="flex w-full">
                  <input
                    type="text"
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                    className="flex-grow p-2 border border-gray-400 rounded bg-gray-600 text-white mr-2"
                  />
                  <button onClick={() => handleUpdate(editingCategory)} className="p-2 bg-teal-700 hover:bg-teal-800 rounded ">
                    Salvar
                  </button>
                </div>
              ) : (
                <>
                  <span className="flex-grow">#{category.id} - {category.description}</span>
                  <div className="flex space-x-2">
                    <button onClick={() => setEditingCategory(category)} className="p-2 bg-indigo-700 hover:bg-indigo-800 rounded ">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(category.id)} className="p-2 bg-orange-700 hover:bg-orange-800 rounded">
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

export default CategoryPage;
