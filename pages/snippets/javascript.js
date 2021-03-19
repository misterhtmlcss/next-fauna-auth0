import Head from 'next/head';
import useSWR from 'swr';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Snippet from '../../components/Snippet';
import Header from '../../components/Header';

export default function javascript() {
  const { data: snippets = [], error, mutate } = useSWR(
    '../api/snippetsByLanguage?language=JavaScript'
  );

  if (error) return <div>failed to load</div>;
  if (!snippets) return <div>loading...</div>;

  return (
    <div>
      <Head>
        <title>JavaScript Snippets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="my-12">
        <Header title="JavaScript Snippets" />
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

export const getServerSideProps = withPageAuthRequired();
