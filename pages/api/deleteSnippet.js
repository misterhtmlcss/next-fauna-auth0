import { deleteSnippet } from '../../utils/Fauna';
export default async function handler(req, res) {
  const { id } = req.body;
  if (req.method !== 'DELETE') {
      return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    const snippet = await deleteSnippet(id)
    return (
      res
        .status(200)
        .json(snippet)
    )

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong.' });
  }
}