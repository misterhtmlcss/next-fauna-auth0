import Link from 'next/link';
// import { useUser } from '@auth0/nextjs-auth0'

export default function Header({ title, subtitle }) {
  // const { user, isLoading } = useUser()
  return (
    <>
      <header className="my-12">
        <h1 className="text-white text-2xl">{title}</h1>
        {subtitle && <p className="text-white">{subtitle}</p>}
        {
          // !isLoading && !user &&
          <Link href="/api/auth/login">
            <a className="mt-3 inline-block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login to create Snippet!
            </a>
          </Link>
        }
      </header>
    </>
  );
}
