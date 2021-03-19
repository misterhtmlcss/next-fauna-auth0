import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

import { createSnippet } from '../../utils/Fauna';

export default withApiAuthRequired(async function handler(req, res) {
  const { sub: userID } = getSession(req, res).user;
  const { code, language, description, name } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  if (!userID) {
    return res
      .status(401)
      .json({ msg: 'Unauthorized to create Snippets, please sign in' });
  }

  try {
    const snippet = await createSnippet(
      code,
      language,
      description,
      name,
      userID
    );
    return res.status(200).json(snippet);
  } catch (err) {
    return res.status(500).json({ msg: 'Something went wrong.' });
  }
});
