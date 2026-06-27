export interface Category {
  id: number;
  nombre: string;
}

export interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imageUrl?: string;
  CategoryId?: number;
  Category?: Category;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: 'CUSTOMER' | 'ADMIN';
}

export interface AuthResponse {
  token: string;
  user: User;
}
