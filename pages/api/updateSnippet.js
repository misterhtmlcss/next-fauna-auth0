import { updateSnippet } from '../../utils/Fauna';

export default async function handler(req, res) {
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
      name
    );
    return res.status(200).json(updatedSnippet);
  } catch (err) {
    return res.status(500).json({ msg: `Something went wrong: ${err}` });
  }
}
