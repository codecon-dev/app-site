import { ReactNode } from 'react';
import cn from 'classnames';

import Form from '../Form';
import styles from './PuzzleLayout.module.scss';
import { getLastPath } from '@lib/utils';
import { useRouter } from 'next/router';

type Props = {
    bg?: string;
    bgContent?: string;
    bgColor?: string;
    children?: ReactNode;
};

export default function PuzzleLayout({ bg, bgContent, children, bgColor }: Props) {
    const router = useRouter();
    const puzzlePublicId = getLastPath(router.pathname);

    return (
        <section className={cn(styles.layout)} style={{ backgroundImage: `url(${bg})` }}>
            <div
                className={styles['content-bg']}
                style={{
                    backgroundImage: `url(${bgContent})`,
                    backgroundColor: `${bgColor}`
                }}
            >
                <div className={cn(styles.content, 'container')} style={{ position: 'relative' }}>
                    {children}
                </div>
            </div>
            <div className={cn(styles.form, 'container')}>
                <Form puzzlePublicId={puzzlePublicId} />
            </div>
        </section>
    );
}
