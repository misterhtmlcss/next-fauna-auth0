import { updateSnippet } from '../../utils/Fauna';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  // TODO: Need to deal with userID; only correct user can update their snippet
  const session = getSession(req, res);
  const userID = session.user.sub;

  if (req.method !== 'PUT') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const { id, name, language, description, code } = req.body;
  console.log('-----updatedSnippet------');
  console.log('req.body', req.body);
  console.log(
    'id, name, language, description, code, userID',
    id,
    name,
    language,
    description,
    code,
    userID
  );

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
