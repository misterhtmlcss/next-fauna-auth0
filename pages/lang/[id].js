import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getSnippetsByLanguage } from '../../utils/Fauna';

import Snippet from '../../components/Snippet';
import Header from '../../components/Header';

export default function Home({ snippets }) {
  // if (error) return <div>failed to load</div>;
  if (!snippets) return <div>loading...</div>;

  const lang = snippets[0].data.language;

  return (
    <div>
      <Head>
        <title>{lang} Snippets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="my-12">
        <Header title={`Snippets of ${lang}`} />
        {snippets &&
          snippets.map(snippet => (
            <Snippet key={snippet.id} snippet={snippet} />
          ))}
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    try {
      const { id: lang } = context.params;

      const snippets = await getSnippetsByLanguage(lang);

      return {
        props: {
          snippets
        }
      };
    } catch (error) {
      context.res.statusCode = 302;
      context.res.setHeader('Location', '/');
      return { props: {} };
    }
  }
});
