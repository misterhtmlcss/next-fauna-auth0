import Head from 'next/head';
import { getSnippetsByLanguage } from '../../utils/Fauna';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';

import Snippet from '../components/Snippet';
import Header from '../components/Header';

export default function Lang() {
  const userID = getSession(req, res).user.sub

  if (req.method !== 'GET') {
    return res.status(405);
  }
  try {
    const snippets = await getSnippetsByLanguage(userID);
    return res.status(200).json(snippets);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Something went wrong.' });
  }
}

export const getServerSideProps = withPageAuthRequired();