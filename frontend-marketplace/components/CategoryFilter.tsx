'use client';
import { useRouter } from 'next/navigation';
import { Category } from '@/types/product';

interface Props {
  categories: Category[];
  selectedId?: string;
}

export default function CategoryFilter({ categories, selectedId }: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <label htmlFor="category" className="font-medium text-gray-700">
        Filtrar por categoría:
      </label>
      <select
        id="category"
        value={selectedId || ''}
        onChange={(e) => {
          const val = e.target.value;
          router.push(val ? `/?categoryId=${val}` : '/');
        }}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>
      {selectedId && (
        <button
          onClick={() => router.push('/')}
          className="text-sm text-blue-600 hover:underline"
        >
          Limpiar filtro
        </button>
      )}
    </div>
  );
}
