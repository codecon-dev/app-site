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

const Stories = () => {
  return <div>stories!</div>;
};
const Square = () => {
  return <div>sponsor!</div>;
};

const Default = ({ sponsor }: KindComponentProps) => {
  return (
    <div className={styles.background}>
      <div className={styles.sponsor_image_default}>
        <Share />
        <div>
          <Logo width="347" height="59" />

          <div className={styles.info}>
            <p className={styles.local}>
              Online <span className="bullet">•</span> Gather Town
            </p>
            <p className={styles.date}>22, 23 e 24 de setembro</p>
          </div>

          <p className={styles.sponsor}>Patrocínio</p>
          <div style={{ backgroundColor: sponsor.color.hex }} className={styles.sponsor_logo}>
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
