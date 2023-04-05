import cn from 'classnames';

import styles from './Button.module.scss';

export type Props = {
    children: React.ReactNode;
    onClick: () => void;
    type?: 'primary' | 'secondary';
};

export default function Button({ children, type, onClick }: Props) {
    return (
        <button onClick={onClick} className={cn(styles.button, styles[`button--${type}`])}>
            <span>{children}</span>
        </button>
    );
}
