import { getSnippetsByLanguage } from '../../utils/Fauna';

import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  getSession(req, res);

  const { language, ...args } = req.body;

  if (req.method !== 'GET') {
    return res.status(405);
  }
  try {
    const snippets = await getSnippetsByLanguage(language);
    return res.status(200).json(snippets);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Something went wrong.' });
  }
});
