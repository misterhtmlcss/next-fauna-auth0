import ActionButtons from './ActionButtons';

import Code from './Code';

export default function Snippet({ snippet, snippetDeleted }) {
  const { data } = snippet;

  const { name, language, description, code } = data;

  return (
    <div className="bg-gray-100 p-4 rounded-md my-2 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl text-gray-800 font-bold">{name}</h2>
        <span className="font-bold text-xs text-blue-800 pl-2 py-1 rounded-lg ">
          {language}
        </span>
      </div>
      <p className="text-gray-900 mb-4">{description}</p>
      <div className="flex justify-between flex-wrap">
        <Code code={code} />
        <ActionButtons snippet={snippet} snippetDeleted={snippetDeleted} />
      </div>
    </div>
  );
}
