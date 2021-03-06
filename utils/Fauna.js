const faunadb = require('faunadb');
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

const getSnippets = async () => {
  try {
    const { data:snippets } = await faunaClient.query(
      q.Map(
        q.Paginate(
          q.Documents(
            q.Collection('snippets')
          )
        ),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    )

    return snippets.map(snippet => {
      snippet.id = snippet.ref.id
      delete snippet.ref
      return snippet
    })

  } catch (error) {
    console.error('getSnippets Error: %s', err)
  }

};

const getSnippetById = async (id) => {
  try {
    const response = await faunaClient.query(
      q.Get(
        q.Ref(
          q.Collection('snippets'), id
        )
      )
    )

    response.id = response.ref.id
    delete response.ref
    return response

  } catch (error) {
    console.error('getSnippetById Error: %s', err)
  }
};

const createSnippet = async (code, language, description, name) => {
  try {
    const response = await faunaClient.query(
      q.Create(
        q.Collection('snippets'),
          {
            data: {
              name,
              description,
              language,
              code
            }
          }
      )
    )
    return response
  }
  catch (err)  {
    console.error('createSnippet Error: %s', err)
  }
}

const updateSnippet = async (id, code, language, name, description) => {
  try {
    const response = await faunaClient.query(
      q.Update(
        q.Ref(
          q.Collection('snippets'), id
        ),
        {
          data: { code, language, name, description },
        },
      )
    )
    return response

  } catch (err)  {
    console.error('updateSnippet: %s', err)
  }
};

const deleteSnippet = async (id) => {
    try {
      const response = await faunaClient.query(
        q.Delete(
          q.Ref(
            q.Collection('snippets'), id
          )
        )
      )
      return response

    } catch (error) {
      console.error('deleteSnippet: %s', err)
    }
};

module.exports = {
    createSnippet,
    getSnippets,
    getSnippetById,
    updateSnippet,
    deleteSnippet,
};
