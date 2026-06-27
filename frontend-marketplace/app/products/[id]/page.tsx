import Link from 'next/link';
import { Product } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: Product | null = null;
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, { cache: 'no-store' });
    if (res.ok) product = await res.json();
  } catch {
    // error de conexión
  }

  if (!product) {
    return (
      <main className="container mx-auto px-6 py-8">
        <Link href="/" className="text-blue-600 hover:underline">← Volver</Link>
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">Producto no encontrado.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-6 py-8 max-w-3xl">
      <Link href="/" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        ← Volver al catálogo
      </Link>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.nombre}
            className="w-full h-80 object-cover"
          />
        ) : (
          <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-gray-400 text-6xl">
            📦
          </div>
        )}
        <div className="p-6">
          {product.Category && (
            <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full mb-3 inline-block">
              {product.Category.nombre}
            </span>
          )}
          <h1 className="text-3xl font-bold text-gray-800 mt-2">{product.nombre}</h1>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.descripcion}</p>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-3xl font-bold text-blue-600">
              ${Number(product.precio).toFixed(2)}
            </span>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
