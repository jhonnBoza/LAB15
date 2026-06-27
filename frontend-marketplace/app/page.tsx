import Link from 'next/link';
import { Product, Category } from '@/types/product';
import CategoryFilter from '@/components/CategoryFilter';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getProducts(categoryId?: string): Promise<Product[]> {
  const url = categoryId
    ? `${API_URL}/api/products?categoryId=${categoryId}`
    : `${API_URL}/api/products`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/api/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string }>;
}) {
  const { categoryId } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(categoryId),
    getCategories(),
  ]);

  return (
    <main className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Productos disponibles</h1>
        <CategoryFilter categories={categories} selectedId={categoryId} />
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">No hay productos disponibles.</p>
          {categoryId && <p className="text-sm mt-2">Intenta con otra categoría.</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.nombre}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-4xl">
                    📦
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {product.nombre}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.descripcion}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-blue-600 font-bold text-xl">
                      ${Number(product.precio).toFixed(2)}
                    </span>
                    {product.Category && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                        {product.Category.nombre}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
