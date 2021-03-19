import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';

import Snippet from '../components/Snippet';
import Header from '../components/Header';

export default function MySnippets() {
  const { data: snippets = [], mutate } = useSWR('/api/mySnippets');

  return (
    <div>
      <Head>
        <title>My Code Snippets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="my-12">
        <Header title="My Code Snippets" />
        {snippets &&
          snippets.map(snippet => (
            <Snippet
              key={snippet.id}
              snippet={snippet}
              snippetDeleted={mutate}
            />
          ))}
      </main>
    </div>
  );
}

//TODO: Server props, require authentication
export const getServerSideProps = withPageAuthRequired();
