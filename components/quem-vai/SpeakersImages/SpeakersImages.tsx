import { Speaker } from '@lib/types/speakers';

type Props = {
  speakers: Speaker[];
};

export default function SpeakersImages({ speakers }: Props) {
  return (
    <section>
      {speakers.map(speaker => (
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          {speaker.name} -{' '}
          <a
            href={`/api/get-image/${speaker.slug}?type=speaker`}
            download={`${speaker.name} - Banner`}
          >
            Banner
          </a>{' '}
          |{' '}
          <a
            href={`/api/get-image/${speaker.slug}?type=speaker&kind=stories`}
            download={`${speaker.name} - Stories`}
          >
            Stories
          </a>{' '}
          |{' '}
          <a
            href={`/api/get-image/${speaker.slug}?type=speaker&kind=square`}
            download={`${speaker.name} - Square`}
          >
            Square
          </a>
        </div>
      ))}
    </section>
  );
}
