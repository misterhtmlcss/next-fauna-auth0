import Link from 'next/link';
import formatLanguage from '../utils/formatLanguage';

export default function NavLinks({ asFor, lang }) {
  return (
    <Link as={asFor} href="/lang/[lang]">
      <a className="hover:underline text-gray-100">{formatLanguage(lang)}</a>
    </Link>
  );
}
