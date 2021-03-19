import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

export default function Code({ snippet, deleteSnippet }) {
  const { data, id } = snippet;
  const { user } = useUser();

  return (
    <>
      {user && user.sub === data.userID && (
        <div className="flex justify-center self-end mb-2">
          <Link href={`/edit/${id}`}>
            <a className="text-gray-800 mr-2 mt-1">Edit</a>
          </Link>
          <button
            type="button"
            onClick={() => deleteSnippet(snippetDeleted)}
            className="bg-red-800 hover:bg-red-900 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
}
