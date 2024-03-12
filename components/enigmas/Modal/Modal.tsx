/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';
import styles from './PuzzleModal.module.scss';

type Props = {
    message?: string;
    isOpen: boolean;
    bgColor?: string;
    img?: string;
    setIsOpen: (v: boolean) => void;
};

export default function Modal({ message, isOpen, bgColor, img, setIsOpen }: Props) {
    return (
        <div className={cn(styles.modal, { [styles.show]: isOpen })}>
            <div
                className={styles['modal-content']}
                style={{ backgroundColor: `${bgColor ? bgColor : '#fff'}` }}
            >
                <button className={styles.close} onClick={() => setIsOpen(false)}>
                    &times;
                </button>
                <div>
                    {message && <p className="text-center">{message}</p>}
                    {img && <img src={img} />}
                </div>
            </div>
        </div>
    );
}
