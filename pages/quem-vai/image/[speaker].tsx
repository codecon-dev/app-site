import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllSpeakers } from '@lib/cms-api';
import { Speaker } from '@lib/types/speakers';
import { useRouter } from 'next/router';

type Props = {
  speaker: Speaker;
};

export default function SpeakerImagePage({ speaker }: Props) {
  const router = useRouter();

  return (
    <>
      <h1>{speaker.name}</h1>
      <p>{JSON.stringify(router.query)}</p>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async args => {
  console.log(args);
  const slug = args.params?.speaker;
  const speakers = await getAllSpeakers();
  const currentSpeaker = speakers.find((s: Speaker) => s.slug === slug) || null;

  if (!currentSpeaker) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      speaker: currentSpeaker
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const speakers = await getAllSpeakers();
  const slugs = speakers.map((s: Speaker) => ({ params: { speaker: s.slug } }));

  return {
    paths: slugs,
    fallback: false
  };
};
