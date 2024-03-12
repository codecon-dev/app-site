import Image from 'next/image';
import cn from 'classnames';

import styles from './OfferedBy.module.scss';

type Props = {
    logo: string;
    name: string;
    isBlackBg?: boolean;
    type?: 'white' | 'black';
    offerType?: 'Conteúdo' | 'Experiência' | 'Workshop';
};

export default function OfferedBy({ logo, name, isBlackBg }: Props) {
    return (
        <div className={cn(styles.sponsor, { [styles[`sponsor-black`]]: isBlackBg })}>
            <span>Oferecimento</span>
            <div className={styles.image}>
                <Image
                    src={logo}
                    width={100}
                    height={54.47}
                    alt={`Logo da empresa ${name} que está patrocinando esse conteúdo`}
                />
            </div>
        </div>
    );
}
