export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="container mx-auto px-6 py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Mini Marketplace — Desarrollo de Aplicaciones Web Avanzado
        </p>
        <p className="text-xs text-gray-500 mt-1">Arévalo Sermeño, Edwin William</p>
      </div>
    </footer>
  );
}
