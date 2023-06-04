import Image from 'next/image';
import cn from 'classnames';

import { Column, Grid } from '../../_ui/Grid';
import styles from './Header.module.scss';

type Props = {
    title: React.ReactNode;
    image?: string;
    description?: React.ReactNode;
    smaller?: boolean;
    layoutText?: boolean;
};

export default function Header({ title, description, image, smaller, layoutText }: Props) {
    return (
        <header
            className={cn(styles.header, {
                [styles.smaller]: smaller,
                [styles['header-text']]: layoutText
            })}
        >
            <Grid align="center">
                <Column lg={image ? 9 : 10}>
                    <h1
                        className={cn(styles.hero, {
                            [styles.smaller]: smaller || layoutText
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
