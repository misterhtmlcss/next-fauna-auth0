import { deleteSnippet } from '../../utils/Fauna';

import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  // TODO: Need to deal with userID; only correct user can delete their snippet
  // const { sub: userID } = getSession(req, res).user;
  const { id } = req.body;
  if (req.method !== 'DELETE') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    const snippet = await deleteSnippet(id);
    return res.status(200).json(snippet);
  } catch (err) {
    return res.status(500).json({ msg: 'Something went wrong.' });
  }
});
