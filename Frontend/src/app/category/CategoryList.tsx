'use client';

import { useEffect, useState } from 'react';
import { fetchCategories } from '../../services/api';
import { Category } from '../../types';

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories()
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <ul className="category-list">
      {categories.map(category => (
        <li key={category.id} className="category-item">
          {category.description}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
