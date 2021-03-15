import Head from 'next/head';
import useSWR from 'swr';

import Header from '../components/Header';
import Snippet from '../components/Snippet';

export default function Home() {
  const { data: snippets = [], mutate } = useSWR('/api/snippets');

  return (
    <div>
      <Head>
        <title>!MHC Nextjs App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="my-12">
          <Header
            title="Code Snippet App"
            subtitle="Create and browse snippets you use every day in Web Development!"
          />
        </div>
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
