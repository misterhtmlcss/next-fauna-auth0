import React from 'react';
import Link from 'next/link';
import Code from './Code';

export default function Snippet({ snippet, snippetDeleted }) {
  const { data, id } = snippet
  const { name, language, description, code } = data
  const deleteSnippet = async () => {
    try {
      await fetch('/api/deleteSnippet', {
        method: 'DELETE',
        body: JSON.stringify({ id: snippet.id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      snippetDeleted();
    } catch (err) {
      throw new Error(`Component - attempt to delete snippet failed: ${err}`);
    }
  };
  return (
    <div className="bg-gray-100 p-4 rounded-md my-2 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl text-gray-800 font-bold">{name}</h2>
        <span className="font-bold text-xs text-red-800 px-2 py-1 rounded-lg ">
          {language}
        </span>
      </div>
      <p className="text-gray-900 mb-4">{description}</p>
      <Code code={code} />
      <Link href={`/edit/${id}`}>
        <a className="text-gray-800 mr-2">Edit</a>
      </Link>
      <button
        type="submit"
        onClick={deleteSnippet}
        className="text-gray-800 mr-2"
      >
        Delete
      </button>
    </div>
  );
}
