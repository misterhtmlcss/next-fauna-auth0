export default function formLangForPresenation(lang) {
  let language = '';
  switch (lang) {
    case 'html':
      language = 'HTML';
      break;
    case 'css':
      language = 'CSS';
      break;
    default:
      language = 'JavaScript';
    // language;
  }
  return language;
}
