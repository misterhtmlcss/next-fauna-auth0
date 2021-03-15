import { updateSnippet } from '../../utils/Fauna';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  // TODO: Need to deal with userID; only correct user can update their snippet
  // const { user } = getSession(req, res);
  if (req.method !== 'PUT') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
  const { id, code, language, description, name } = req.body;

  try {
    const updatedSnippet = await updateSnippet(
      id,
      code,
      language,
      description,
      name,
      userID
    );
    return res.status(200).json(updatedSnippet);
  } catch (err) {
    return res.status(500).json({ msg: `Something went wrong: ${err}` });
  }
});
