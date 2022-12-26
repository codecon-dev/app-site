import { ImageKind } from '@lib/types/all';
import { SITE_URL } from '@lib/constants';
import { Speaker } from '@lib/types/speakers';
import styles from './SpeakerImage.module.scss';
import Logo from '@components/_ui/Icons/icon-logo';
import SpeakerCard from '@components/2022/_ui/SpeakerCard';

type Props = {
    speaker: Speaker;
    kind: ImageKind;
};

type KindComponentProps = {
    speaker: Speaker;
};

const url = new URL(SITE_URL).host;

const Stories = ({ speaker }: KindComponentProps) => {
    return (
        <div className={styles.stories_bg}>
            <div className={styles.kind_stories}>
                <h3>{url}</h3>
                <div className={styles.image_wrapper}>
                    <SpeakerCard>
                        <SpeakerCard.Image
                            src={speaker.image.url}
                            alt={speaker.name}
                            width={605}
                            height={605}
                            style={{ padding: '1rem' }}
                        />
                        <SpeakerCard.Character
                            src={speaker.character.url}
                            alt={`Avatar de ${speaker.name} criado no Gather`}
                        />
                    </SpeakerCard>
                </div>
                <h1 className={styles.name}>{speaker.name}</h1>
                <h2>Estará na</h2>
                <Logo width={484} height={83} />
            </div>
        </div>
    );
};

const Square = ({ speaker }: KindComponentProps) => {
    return (
        <div className={styles.square_bg}>
            <div className={styles.kind_square}>
                <div className={styles.header}>
                    <h2>
                        Presença <br /> confirmada
                    </h2>
                    <div>
                        <Logo isSymbol />
                        <h3>{url}</h3>
                    </div>
                </div>

                <div className={styles.image_wrapper}>
                    <SpeakerCard>
                        <SpeakerCard.Image
                            src={speaker.image.url}
                            alt={speaker.name}
                            width={494}
                            height={494}
                            style={{ padding: '1rem' }}
                        />
                        <SpeakerCard.Character
                            src={speaker.character.url}
                            alt={`Avatar de ${speaker.name} criado no Gather`}
                        />
                    </SpeakerCard>
                </div>
                <h1>{speaker.name}</h1>
            </div>
        </div>
    );
};

const Default = ({ speaker }: KindComponentProps) => {
    return (
        <div className={styles.default_bg}>
            <div className={styles.kind_default}>
                <SpeakerCard>
                    <SpeakerCard.Image
                        src={speaker.image.url}
                        alt={speaker.name}
                        width={390}
                        height={390}
                        style={{ padding: '1rem' }}
                    />
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
