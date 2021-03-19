import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { deleteSnippet, getSnippetById } from '../../utils/Fauna';

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const userID = session.user.sub;

  const { id } = req.body;

  const existingRecord = await getSnippetById(id);

  if (!existingRecord || existingRecord.data.userID !== userID){
    return res.status(401).json({ msg: 'Unauthorized request' });
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    const deletedSnippet = await deleteSnippet(id);
    return res.status(200).json(deletedSnippet);
  } catch (err) {
    return res.status(500).json({ msg: 'Something went wrong.' });
  }
});
