import { useState } from 'react';
import styles from './Switch.module.scss';
import cn from 'classnames';

type Props = {
    size?: string;
    onToggle: (isChecked: boolean) => void;
};

export default function Switch({ onToggle, size = '1' }: Props) {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        onToggle(!isChecked);
    };

    const switchStyles = {
        '--switch-size': size
    } as React.CSSProperties;

    return (
        <div
            className={cn(styles.switch, {
                [styles['switch-on']]: isChecked
            })}
            style={switchStyles}
            onClick={handleToggle}
        >
            <div
                className={cn(styles['switch-thumb'], {
                    [styles['thumb-on']]: isChecked
                })}
            />
        </div>
    );
}
