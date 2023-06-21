import { ReactNode } from 'react';
import cn from 'classnames';

import Form from '../Form';
import styles from './PuzzleLayout.module.scss';
import { getLastPath } from '@lib/utils';
import { useRouter } from 'next/router';

type Props = {
    bg?: string;
    bgContent?: string;
    flexDirection?: 'column' | 'row';
    children?: ReactNode;
};

export default function PuzzleLayout({ bg, bgContent, flexDirection = 'column', children }: Props) {
    const router = useRouter();
    const puzzlePublicId = getLastPath(router.pathname);

    return (
        <section
            className={cn(styles.layout)}
            style={{ backgroundImage: bg ? `url(${bg})` : undefined }}
        >
            <div
                className={styles['content-bg']}
                style={{
                    backgroundImage: bgContent ? `url(${bgContent})` : undefined
                }}
            >
                <div
                    className={cn(styles.content, 'container')}
                    style={{ position: 'relative', flexDirection: flexDirection }}
                >
                    {children}
                </div>
            </div>
            <div className={cn(styles.form, 'container')}>
                <Form puzzlePublicId={puzzlePublicId} />
            </div>
        </section>
    );
}
