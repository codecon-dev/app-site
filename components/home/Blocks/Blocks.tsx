import { ReactNode } from 'react';
import cn from 'classnames';

import { useMediaQuery } from '@material-ui/core';
import Grid from '@components/_ui/Grid/Grid';
import Column, { Props as ColumnProps } from '@components/_ui/Grid/Column';

import styles from './Blocks.module.scss';

type PropsBlock = {
    title?: string;
    description?: string;
    backgroundImageMobile?: string;
    backgroundImage: string;
};

const Block = ({
    title,
    description,
    backgroundImageMobile,
    backgroundImage,
    lg,
    sm,
    xsm
}: PropsBlock & ColumnProps) => {
    const isMobile = useMediaQuery('only screen and (max-width: 1200px)');

    return (
        <Column lg={lg} sm={sm} xsm={xsm}>
            <div
                className={cn(styles.block, styles[`block-lg-${lg}`])}
                style={{
                    backgroundImage: `url('${
                        isMobile && backgroundImageMobile ? backgroundImageMobile : backgroundImage
                    }')`
                }}
            >
                {isMobile}
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
    return (
        <Column lg={12}>
            <div className={cn(styles.block, styles.video)}>
                <div className={styles['video-wrapper']}>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube-nocookie.com/embed/${code}?rel=0&hd=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </Column>
    );
};

type PropsTitle = {
    children: ReactNode;
};

const Title = ({ children }: PropsTitle) => {
    return (
        <Column lg={12}>
            <h2 className={cn(styles.title)}>{children}</h2>
        </Column>
    );
};

type PropsBlocks = {
    children: ReactNode;
};

const Blocks = ({ children, ...rest }: PropsBlocks) => {
    return (
        <div className={cn(styles.blocks)} {...rest}>
            <Grid>{children}</Grid>
        </div>
    );
};

Blocks.Block = Block;
Blocks.Video = Video;
Blocks.Title = Title;

export default Blocks;
