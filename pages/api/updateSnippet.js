import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { updateSnippet, getSnippetById } from '../../utils/Fauna';

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const userID = session.user.sub;

  const { id, name, language, description, code } = req.body;

  const existingRecord = await getSnippetById(id);

  if (!existingRecord || existingRecord.data.userID !== userID) {
    return res.status(401).json({ msg: 'Unauthorized request' });
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    const updatedSnippet = await updateSnippet(
      id,
      name,
      language,
      description,
      code,
      userID
    );
    return res.status(200).json(updatedSnippet);
  } catch (err) {
    return res.status(500).json({ msg: `Something went wrong: ${err}` });
  }
});
