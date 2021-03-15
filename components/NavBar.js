import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  if (error) return <div>{error.message}</div>;
  return (
    <nav>
      <Link href="/">
        <a className="text-2xl mb-2 block text-center text-indigo-100 uppercase">
          Roger's code snippets
        </a>
      </Link>
      <div className="flex space-x-3 justify-center mb-6 m-x-auto">
        <Link href="/snippets/html">
          <a className="hover:underline text-gray-100">HTML</a>
        </Link>
        <Link href="/snippets/css">
          <a className="hover:underline text-gray-100">CSS</a>
        </Link>
        <Link href="/snippets/javascript">
          <a className="hover:underline text-gray-100">JavaScript</a>
        </Link>
        {!isLoading && !user ? (
          <Link href="/api/auth/login">
            <a className="hover:underline text-green-200">Login</a>
          </Link>
        ) : (
          !isLoading &&
          user && (
            <>
              <Link href="/api/mysnippets">
                <a className="hover:underline text-gray-100">MySnippets</a>
              </Link>
              <Link href="/api/auth/logout">
                <a className="hover:underline text-green-200">Logout</a>
              </Link>
            </>
          )
        )}
      </div>
    </nav>
  );
}
