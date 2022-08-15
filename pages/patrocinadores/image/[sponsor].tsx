import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllSponsors } from '@lib/cms-api';
import { ImageKind, Sponsor } from '@lib/types/all';
import { useRouter } from 'next/router';
import SponsorImage from '@components/patrocinadores/SponsorImage';

type Props = {
  sponsor: Sponsor;
};

type Query = {
  kind?: ImageKind;
};

export default function SponsorImagePage({ sponsor }: Props) {
  const { query } = useRouter();
  const { kind = 'default' }: Query = query;

  return <SponsorImage sponsor={sponsor} kind={kind} />;
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
  const onlySponsors = sponsors.filter(sponsor => sponsor.tier !== 'comunidade');
  const slugs = onlySponsors.map((s: Sponsor) => ({ params: { sponsor: s.slug } }));

  return {
    paths: slugs,
    fallback: 'blocking'
  };
};
