import Image from 'next/image';
import { Sponsor, ImageKind } from '@lib/types/all';
import styles from './SponsorImage.module.scss';
import Logo from '@components/_ui/Icons/icon-logo';
import Share from './Share';

type Props = {
    sponsor: Sponsor;
    kind: ImageKind;
};

type KindComponentProps = {
    sponsor: Sponsor;
};

const Stories = ({ sponsor }: KindComponentProps) => {
    return (
        <div className={styles.sponsor_image_stories}>
            <div style={{ backgroundColor: sponsor.color.hex }} className={styles.sponsor_logo}>
                <p className={styles.sponsor}>Patrocínio</p>
                <Image
                    src={sponsor.whiteLogo.url}
                    width={391}
                    height={213}
                    alt={`Logo do patrocinador ${sponsor.name}`}
                />
            </div>
            <div className={styles.stories_bg}>
                <div className={styles.content}>
                    <Share kind="stories" />

                    <div className={styles.info}>
                        <Logo width="484" height="83" />
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
const Square = ({ sponsor }: KindComponentProps) => {
    return (
        <div className={styles.sponsor_image_square}>
            <div className={styles.square_bg}>
                <div className={styles.content}>
                    <Share kind="square" />
                    <Logo width="494" height="84" style={{ marginTop: '50px' }} />
                    <p className={styles.sponsor}>Patrocínio</p>
                    <div
                        style={{ backgroundColor: sponsor.color.hex }}
                        className={styles.sponsor_logo}
                    >
                        <Image
                            src={sponsor.whiteLogo.url}
                            width={391}
                            height={213}
                            alt={`Logo do patrocinador ${sponsor.name}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Default = ({ sponsor }: KindComponentProps) => {
    return (
        <div className={styles.default_bg}>
            <div className={styles.sponsor_image_default}>
                <Share kind="default" />
                <div>
                    <Logo width="347" height="59" />

                    <div className={styles.info}>
                        <p className={styles.local}>
                            Online <span className="bullet">•</span> Gather Town
                        </p>
                        <p className={styles.date}>22, 23 e 24 de setembro</p>
                    </div>

                    <p className={styles.sponsor}>Patrocínio</p>
                    <div
                        style={{ backgroundColor: sponsor.color.hex }}
                        className={styles.sponsor_logo}
                    >
                        <Image
                            src={sponsor.whiteLogo.url}
                            width={391}
                            height={213}
                            alt={`Logo do patrocinador ${sponsor.name}`}
                        />
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

export default function SponsorImage({ kind, sponsor }: Props) {
    const Component = KINDS_COMPONENTS[kind];

    return <Component sponsor={sponsor} />;
}
