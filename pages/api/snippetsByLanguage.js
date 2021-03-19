import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { getSnippetsByLanguage } from '../../utils/Fauna';

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const userID = session.user.sub;
  const { language } = req.query;

  if (req.method !== 'GET') {
    return res.status(405);
  }

  if (!userID) {
    return res.status(401).json({ msg: 'Unauthorized request' });
  }

  try {
    const snippets = await getSnippetsByLanguage(language);
    return res.status(200).json(snippets);
  } catch (err) {
    return res.status(500).json({ msg: 'API: Something went wrong.' });
  }
});
