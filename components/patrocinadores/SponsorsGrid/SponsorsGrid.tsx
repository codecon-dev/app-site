import Image from 'next/image';
import Link from 'next/link';
import { Sponsor } from '@lib/types/all';

import { Column, Grid } from '@components/_ui/Grid';

import styles from './SponsorsGrid.module.scss';
import { useRouter } from 'next/router';

type Props = {
    sponsors: Sponsor[];
};

export default function SponsorsGrid({ sponsors }: Props) {
    const router = useRouter();
    const event = router?.asPath?.split('/')[1] || '';
    const eventPath = event ? `/${event}` : '';
    return (
        <section>
            <Grid>
                {sponsors.map(sponsor => (
                    <Column lg={4} sm={4} key={sponsor.slug}>
                        <Link href={`${eventPath}/patrocinadores/${sponsor.slug}`}>
                            <a
                                className={styles.sponsor}
                                style={{ backgroundColor: sponsor.color.hex }}
                            >
                                <Image
                                    src={sponsor.whiteLogo.url}
                                    width={250}
                                    height={250}
                                    alt={sponsor.name}
                                />
                            </a>
                        </Link>
                    </Column>
                ))}
            </Grid>
        </section>
    );
}
