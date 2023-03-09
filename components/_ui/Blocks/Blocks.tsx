import { ReactNode } from 'react';
import cn from 'classnames';

import Column, { Props as ColumnProps } from '@components/_ui/Grid/Column';

import styles from './Blocks.module.scss';

type PropsCountdown = {
    message: string;
    local: string;
    city: string;
    date: Date;
};

const Countdown = ({ message, local, city, date }: PropsCountdown) => {
    return (
        <div className={styles.countdown}>
            <h5>{message}</h5>
        </div>
    );
};

type PropsBlock = {
    title?: string;
    description?: string;
    backgroundImage: string;
};

const Block = ({ title, description, backgroundImage, lg, sm, xsm }: PropsBlock & ColumnProps) => {
    return (
        <Column lg={lg} sm={sm} xsm={xsm}>
            <div
                className={cn(styles.block)}
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            >
                {title && <h3>{title}</h3>}
                {description && <p>{description}</p>}
            </div>
        </Column>
    );
};

type PropsVideo = {
    code: string;
};

const Video = ({ code }: PropsVideo) => {
    return <div>{code}</div>;
};

type PropsBlocks = {
    children: ReactNode;
};

const Blocks = ({ children, ...rest }: PropsBlocks) => {
    return (
        <div className={cn('container', styles.blocks)} {...rest}>
            {children}
        </div>
    );
};

Blocks.Countdown = Countdown;
Blocks.Block = Block;
Blocks.Video = Video;

export default Blocks;
