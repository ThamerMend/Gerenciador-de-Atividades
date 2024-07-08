export interface Category {
    id: number;
    description: string;
  }
  
  export interface Activity {
    id: number;
    description: string;
    userId: number;
    categoryId: number;
  }
  
  export interface User {
    id: number;
    firstName: string;
    lastName: string;
  }
  