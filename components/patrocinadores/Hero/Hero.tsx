import { useContext } from 'react';

import Image from 'next/image';
import cn from 'classnames';

import ThemeContext from 'context/ThemeContext';

import { Sponsor } from '@lib/types/all';
import { Grid, Column } from '@components/_ui/Grid';
import LinkButton from '@components/_ui/LinkButton/LinkButton';
import { getEventData } from '@lib/constants';

import styles from './Hero.module.scss';

type Props = {
    sponsor: Sponsor;
};

export default function Hero({ sponsor }: Props) {
    const theme = useContext(ThemeContext);
    const eventData = getEventData(theme);

    return (
        <header className={styles.header}>
            <Grid align="center">
                <Column lg={6} sm={7} smOrder={1}>
                    <div className={styles.logo} style={{ backgroundColor: sponsor.color.hex }}>
                        <Image src={sponsor.whiteLogo.url} layout="fill" alt={sponsor.name} />
                    </div>

                    <h1 className={styles.title}>
                        {sponsor.name} está patrocinando<br></br> a Codecon
                    </h1>
                    <span className="headline headline__darker">
                        Online <span className="bullet">•</span> 22, 23 e 24 de Setembro
                    </span>

                    <span className={styles['button__wrapper']}>
                        <LinkButton type="secondary" href={eventData.registerUrl} newPage>
                            Inscrições encerradas
                        </LinkButton>
                    </span>
                </Column>
                <Column lg={6} sm={5}>
                    <span className={cn(styles['image__wrapper'])}>
                        <Image
                            src="/images/patrocinadores/illustration.svg"
                            width={590}
                            height={590}
                            alt="O personagem Neo em meio a várias referências de programação"
                        />
                    </span>
                </Column>
            </Grid>
        </header>
    );
}
