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
    throw new Error(`Fauna SDK - attempt to get snippets failed: ${err}`);
  }
};

const getSnippetById = async id => {
  try {
    const response = await faunaClient.query(
      q.Get(q.Ref(q.Collection('snippets'), id))
    );

    response.id = response.ref.id;
    delete response.ref;
    return response;
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
      return snippet;
    });
  } catch (err) {
    throw new Error(`Fauna SDK - attempt to get snippet by ID failed: ${err}`);
  }
};

const getSnippetsByLanguage = async lang => {
  try {
    const response = await faunaClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index('snippets_by_language'), userID)),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    );
    response.id = response.ref.id;
    delete response.ref;
    return response || {};
  } catch (err) {
    throw new Error(`Fauna SDK - attempt to get snippet by ID failed: ${err}`);
  }
};

const createSnippet = async (code, language, description, name, userID) => {
  try {
    const response = await faunaClient.query(
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
    return response;
  } catch (err) {
    throw new Error(`Fauna SDK - attempt to create snippet failed: ${err}`);
  }
};

const updateSnippet = async (id, code, language, name, description, userID) => {
  try {
    const response = await faunaClient.query(
      q.Update(q.Ref(q.Collection('snippets'), id), {
        data: { name, language, description, code, userID }
      })
    );
    console.log('response', response);
    return response;
  } catch (err) {
    throw new Error(`Fauna SDK - attempt to update snippet failed: ${err}`);
  }
};

const deleteSnippet = async id => {
  try {
    const response = await faunaClient.query(
      q.Delete(q.Ref(q.Collection('snippets'), id))
    );
    return response;
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
