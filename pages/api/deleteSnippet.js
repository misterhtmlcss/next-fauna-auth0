import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { deleteSnippet, getSnippetById } from '../../utils/Fauna';

export default withApiAuthRequired(async function handler(req, res) {
  // TODO: Need to deal with userID; only correct user can delete their snippet
  const session = getSession(req, res);
  const userID = session.user.sub;

  const { id } = req.body;

  const existingRecord = await getSnippetById(id);

  if (!existingRecord || existingRecord.data.userID !== userID)
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
