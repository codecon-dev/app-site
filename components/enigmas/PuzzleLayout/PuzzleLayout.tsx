import { ReactNode } from 'react';
import cn from 'classnames';

import Form from '../Form';
import styles from './PuzzleLayout.module.scss';
import { getLastPath, removeLeadingNumbers } from '@lib/utils';
import { useRouter } from 'next/router';

type Props = {
    puzzlePublicId?: string;
    bgStyle?: string;
    children: ReactNode;
};

export default function PuzzleLayout({ puzzlePublicId, bgStyle, children }: Props) {
    const router = useRouter()
    if (!puzzlePublicId) {
        puzzlePublicId = removeLeadingNumbers(getLastPath(router.pathname))
    }

    return (
        <section className={cn(styles.layout, bgStyle)}>
            <div className={cn(styles.content, 'container')}>{children}</div>
            <div className={cn(styles.form, 'container')}>
                <Form puzzlePublicId={puzzlePublicId} />
            </div>
        </section>
    );
}