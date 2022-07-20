import { ImageKind } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';
import styles from './SpeakerImage.module.scss';
import Logo from '@components/_ui/Icons/icon-logo';
import SpeakerCard from '@components/_ui/SpeakerCard';

type Props = {
  speaker: Speaker;
  kind: ImageKind;
};

type KindComponentProps = {
  speaker: Speaker;
};

const Stories = ({ speaker }: KindComponentProps) => {
  return <div className={styles.speaker_image_stories}>stories {speaker.name}</div>;
};
const Square = ({ speaker }: KindComponentProps) => {
  return <div className={styles.speaker_image_square}>square {speaker.name}</div>;
};

const Default = ({ speaker }: KindComponentProps) => {
  return (
    <div className={styles.default_bg}>
      <div className={styles.kind_default}>
        <SpeakerCard>
          <SpeakerCard.Image src={speaker.image.url} alt={speaker.name} width={390} height={390} />
          <SpeakerCard.Character
            src={speaker.character.url}
            alt={`Avatar de ${speaker.name} criado no Gather`}
          />
        </SpeakerCard>

        <div>
          <h1 className={styles.name}>{speaker.name}</h1>
          <h2>Estará na </h2>
          <Logo width={292} height={50} style={{ marginBottom: '2.5rem' }} />

          <div className={styles.info}>
            <p className={styles.local}>
              Online <span className="bullet">•</span> Gather Town
            </p>
            <p className={styles.date}>22, 23 e 24 de setembro</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const KINDS_COMPONENTS = {
  stories: Stories,
  square: Square,
  default: Default
};

export default function SpeakerImage({ kind, speaker }: Props) {
  const Component = KINDS_COMPONENTS[kind];

  return <Component speaker={speaker} />;
}
