import Image from 'next/image';
import cn from 'classnames';

import { Column, Grid } from '../Grid';
import styles from './Header.module.scss';

type Props = {
    title: React.ReactNode;
    image?: string;
    description?: React.ReactNode;
    smaller?: boolean;
};

export default function Header({ title, description, image, smaller }: Props) {
    return (
        <header
            className={cn(styles.header, {
                [styles.smaller]: smaller
            })}
        >
            <Grid align="center">
                <Column lg={9}>
                    <h1
                        className={cn(styles.hero, {
                            [styles.smaller]: smaller
                        })}
                    >
                        {title}
                    </h1>
                    {!!description && <p className={styles.description}>{description}</p>}
                </Column>
                {image && (
                    <Column lg={3} sm={0} xsm={0}>
                        <Image
                            src={image}
                            width={320}
                            height={320}
                            alt="Ícone de ilustração do topo da página"
                        />
                    </Column>
                )}
            </Grid>
        </header>
    );
}
