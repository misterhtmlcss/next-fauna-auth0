export default function snippetActions(snippet, useRouter) {
  const router = useRouter();

  const createSnippet = async ({ name, language, description, code }) => {
    try {
      await fetch('/api/createSnippet', {
        method: 'POST',
        body: JSON.stringify({ name, language, description, code }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      router.push('/');
    } catch (err) {
      throw new Error(`Component - attempt to create snippet failed: ${err}`);
    }
  };

  const updateSnippet = async ({ name, language, description, code }) => {
    const { id } = snippet;
    try {
      await fetch('/api/updateSnippet', {
        method: 'PUT',
        body: JSON.stringify({ id, name, language, description, code }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      router.push('/');
    } catch (err) {
      throw new Error(`Component - attempt to update snippet failed: ${err}`);
    }
  };

  const deleteSnippet = async snippetDeleted => {
    const { id } = snippet;
    try {
      await fetch('/api/deleteSnippet', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      snippetDeleted();
    } catch (err) {
      throw new Error(`Component - attempt to delete snippet failed: ${err}`);
    }
  };
  return { createSnippet, updateSnippet, deleteSnippet };
}
