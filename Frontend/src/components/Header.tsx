import Link from 'next/link';

const Header = () => {
  return (
    <header className=" p-4 fixed w-full top-0 shadow-md z-50 bg-darkPrimary">
      <nav className="flex justify-center items-center max-w-7xl mx-auto text-lightText">
        <Link href="/" passHref>
          <h1 className=" text-2xl font-bold text-center">Gerenciador de Atividades</h1>
        </Link>
        <div className="space-x-4 ml-10 flex">
          <Link href="/category" passHref>
            <button className="btn hover:text-lightPrimary transition duration-300">
              Categorias
            </button>
          </Link>
          <Link href="/activity" passHref>
            <button className="btn hover:text-lightPrimary transition duration-300">
              Atividades
            </button>
          </Link>
          <Link href="/user" passHref>
            <button className="btn  hover:text-lightPrimary transition duration-300">
              Usuários
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
