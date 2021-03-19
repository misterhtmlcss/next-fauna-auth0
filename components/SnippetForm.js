import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import snippetActions from '../utils/snippetActions';

export default function SnippetForm({ snippet }) {
  const { createSnippet, updateSnippet } = snippetActions(snippet, useRouter);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: snippet ? snippet.data.name : '',
      language: snippet ? snippet.data.language : 'JavaScript',
      description: snippet ? snippet.data.description : '',
      code: snippet ? snippet.data.code : ''
    }
  });

  return (
    <form onSubmit={handleSubmit(snippet ? updateSnippet : createSnippet)}>
      <div className="mb-4">
        <label
          className="block text-red-100 text-sm font-bold mb-1"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
          ref={register({ required: true })}
        />
        {errors.name && (
          <p className="font-bold text-yellow-100 pl-3 bg-red-600 rounded">
            Name is required
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-red-100 text-sm font-bold mb-1"
          htmlFor="language"
        >
          Language
        </label>
        <select
          id="language"
          name="language"
          className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
          ref={register({ required: true })}
        >
          <option className="py-1">JavaScript</option>
          <option className="py-1">HTML</option>
          <option className="py-1">CSS</option>
        </select>
        {errors.language && (
          <p className="font-bold text-yellow-100 pl-3 bg-red-600 rounded">
            Language is required
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-red-100 text-sm font-bold mb-1"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          className="resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          placeholder="What does the snippet do?"
          ref={register({ required: true })}
        />
        {errors.description && (
          <p className="font-bold text-yellow-100 pl-3 bg-red-600 rounded">
            Description is required
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-red-100 text-sm font-bold mb-1"
          htmlFor="code"
        >
          Code
        </label>
        <textarea
          name="code"
          id="code"
          rows="10"
          className="resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          placeholder="ex. console.log('helloworld')"
          ref={register({ required: true })}
        />
        {errors.code && (
          <p className="font-bold text-yellow-100 pl-3 bg-red-600 rounded">
            Code is required
          </p>
        )}
      </div>
      <button
        className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        type="submit"
      >
        Save
      </button>
      <Link href="/">
        <a className="mt-3 inline-block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Cancel
        </a>
      </Link>
    </form>
  );
}

// export const getServerSideProps = withPageAuthRequired();
