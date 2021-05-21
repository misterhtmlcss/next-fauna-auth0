import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

export default function Authservices() {
  const { user, error, isLoading } = useUser();

  if (error) return <div>{error.message}</div>;

  return (
    <>
      {!isLoading && !user ? (
        <Link href="/api/auth/login">
          <a className="hover:underline text-green-200">Login</a>
        </Link>
      ) : (
        !isLoading &&
        user && (
          <>
            <Link href="/mySnippets">
              <a className="hover:underline text-gray-100">MySnippets</a>
            </Link>
            <Link href="/api/auth/logout">
              <a className="hover:underline text-green-200">Logout</a>
            </Link>
          </>
        )
      )}
    </>
  );
}
