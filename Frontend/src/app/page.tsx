import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
      <center>
        <h1 className="relative text-3xl mb-10 text-gray-800">
          Gerenciador de Atividades
        </h1>
        <div className="space-y-6">
          <Link href="/category">
            <button className="btn bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 rounded-full shadow-md transition duration-300">Gerenciar Categorias</button>
          </Link>
          <Link href="/activity">
            <button className="btn bg-green-500 hover:bg-green-700 text-white py-3 px-8 rounded-full shadow-md transition duration-300">Gerenciar Atividades</button>
          </Link>
          <Link href="/user">
            <button className="btn bg-red-500 hover:bg-red-700 text-white py-3 px-8 rounded-full shadow-md transition duration-300 mb-20">Gerenciar Usuários</button>
          </Link>
        </div>
      </center>
      <footer className="mt-10 text-gray-500 text-sm">
        DAW II - Thamer Felipe
      </footer>
    </main>
  );
}
