import Link from 'next/link';

import NavLinks from './NavLinks';
import AuthServices from './AuthServices';

export default function Navbar() {
  // Dynamic navigation
  const navs = ['html', 'css', 'javascript'];

  return (
    <nav>
      <Link href="/">
        <a className="text-2xl mb-2 block text-center text-indigo-100 uppercase">
          Roger's code snippets
        </a>
      </Link>

      <div className="flex space-x-3 justify-center mb-6 m-x-auto">
        <Link href="/">
          <a className="hover:underline text-gray-100">All</a>
        </Link>
        {navs.map(nav => (
          <NavLinks key={nav} asFor={`/lang/${nav}`} lang={nav} />
        ))}
        <AuthServices />
      </div>
    </nav>
  );
}
