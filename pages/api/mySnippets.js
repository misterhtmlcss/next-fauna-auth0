import { getSnippetsByUser } from '../../utils/Fauna';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const userID = getSession(req, res).user.sub;

  if (req.method !== 'GET') {
    return res.status(405);
  }
  try {
    const snippets = await getSnippetsByUser(userID);
    return res.status(200).json(snippets);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Something went wrong.' });
  }
});
