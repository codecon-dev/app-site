import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';
import { useRouter } from 'next/router';

type Props = {
  sponsor: Sponsor;
};

export default function SponsorImagePage({ sponsor }: Props) {
  const router = useRouter();

  return (
    <>
      <h1>{sponsor.name}</h1>
      <p>{JSON.stringify(router.query)}</p>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.sponsor;
  const sponsors = await getAllSponsors();
  const sponsor = sponsors.find((s: Sponsor) => s.slug === slug) || null;

  if (!sponsor) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      sponsor
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const sponsors = await getAllSponsors();
  const slugs = sponsors.map((s: Sponsor) => ({ params: { sponsor: s.slug } }));

  return {
    paths: slugs,
    fallback: 'blocking'
  };
};
