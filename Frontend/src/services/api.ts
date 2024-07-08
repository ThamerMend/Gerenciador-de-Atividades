import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchCategories = () => api.get('/category').then(res => res.data);
export const createCategory = (category: { description: string }) => api.post('/category', category).then(res => res.data);
export const updateCategory = (category: { id: number; description: string }) => api.put(`/category/${category.id}`, category).then(res => res.data);
export const deleteCategory = (id: number) => api.delete(`/category/${id}`).then(res => res.data);

export const fetchActivities = () => api.get('/activity').then(res => res.data);
export const createActivity = (activity: { description: string; userId: number; categoryId: number }) => api.post('/activity', activity).then(res => res.data);
export const updateActivity = (activity: { id: number; description: string; userId: number; categoryId: number }) => api.put(`/activity/${activity.id}`, activity).then(res => res.data);
export const deleteActivity = (id: number) => api.delete(`/activity/${id}`).then(res => res.data);

export const fetchUsers = () => api.get('/user').then(res => res.data);
export const createUser = (user: { firstName: string; lastName: string }) => api.post('/user', user).then(res => res.data);
export const updateUser = (user: { id: number; firstName: string; lastName: string }) => api.put(`/user/${user.id}`, user).then(res => res.data);
export const deleteUser = (id: number) => api.delete(`/user/${id}`).then(res => res.data);

export default api;
