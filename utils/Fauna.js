import faunadb from 'faunadb';

const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

const getSnippets = async () => {
  try {
    const { data: snippets } = await faunaClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('snippets'))),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    );

    return snippets.map(snippet => {
      snippet.id = snippet.ref.id;
      delete snippet.ref;
      return snippet;
    });
  } catch (err) {
    throw new Error(`Fauna SDK - attempt to get all snippets failed: ${err}`);
  }
};

const getSnippetById = async id => {
  try {
    const snippet = await faunaClient.query(
      q.Get(q.Ref(q.Collection('snippets'), id))
    );

    snippet.id = snippet.ref.id;
    delete snippet.ref;
    delete snippet.ts;
    return snippet;
  } catch (err) {
    throw new Error(`Fauna SDK - attempt to get snippet by ID failed: ${err}`);
  }
};
const getSnippetsByUser = async userID => {
  try {
    const { data: snippets } = await faunaClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index('snippets_by_user'), userID)),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    );
    return snippets.map(snippet => {
      snippet.id = snippet.ref.id;
      delete snippet.ref;
      delete snippet.ts;
      return snippet;
    });
  } catch (err) {
    throw new Error(
      `Fauna SDK - attempt to get snippet by UserID failed: ${err}`
    );
  }
};

const getSnippetsByLanguage = async lang => {
  try {
    const { data: snippets } = await faunaClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index('snippets_by_language'), lang)),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    );
    return snippets.map(snippet => {
      snippet.id = snippet.ref.id;
      delete snippet.ref;
      delete snippet.ts;
      return snippet;
    });
  } catch (err) {
    throw new Error(
      `Fauna SDK - attempt to get snippet by Language failed: ${err}`
    );
  }
};

const createSnippet = async (code, language, description, name, userID) => {
  try {
    const snippet = await faunaClient.query(
      q.Create(q.Collection('snippets'), {
        data: {
          name,
          description,
          language,
          code,
          userID
        }
      })
    );
    return snippet;
  } catch (err) {
    throw new Error(`Fauna SDK - attempt to create snippet failed: ${err}`);
  }
};

const updateSnippet = async (id, name, language, description, code, userID) => {
  try {
    return await faunaClient.query(
      q.Update(q.Ref(q.Collection('snippets'), id), {
        data: { name, language, description, code, userID }
      })
    );
  } catch (err) {
    throw new Error(`Fauna SDK - attempt to update snippet failed: ${err}`);
  }
};

const deleteSnippet = async id => {
  try {
    return await faunaClient.query(
      q.Delete(q.Ref(q.Collection('snippets'), id))
    );
  } catch (err) {
    throw new Error(`Fauna SDK - attempt to delete snippet failed: ${err}`);
  }
};

export {
  createSnippet,
  getSnippets,
  getSnippetById,
  getSnippetsByLanguage,
  getSnippetsByUser,
  updateSnippet,
  deleteSnippet
};
