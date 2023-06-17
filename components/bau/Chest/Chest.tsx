import cn from 'classnames';
import styles from './Chest.module.scss';

export type ChestState = 'closed' | 'unlocked' | 'opened';

type Props = {
    onClick: () => void;
    state: ChestState;
};

export default function Chest({ onClick, state }: Props) {
    return (
        <div className={styles.container}>
            <svg
                width={300}
                xmlns="http://www.w3.org/2000/svg"
                onClick={onClick}
                viewBox="0 -50 500 400"
                className={cn(styles.chest, {
                    [styles.shake]: state == 'closed',
                    [styles.unlocked]: state != 'closed',
                    [styles.opened]: state == 'opened'
                })}
            >
                <defs>
                    <clipPath id="clip-path">
                        <rect
                            className={styles.cls1}
                            x="115.28"
                            y="168.67"
                            width="275.85"
                            height="130.18"
                        />
                    </clipPath>
                    <clipPath id="clip-path-2">
                        <rect
                            className={styles.cls2}
                            x="45.02"
                            y="167.49"
                            width="410.31"
                            height="44.75"
                            rx="19.76"
                        />
                    </clipPath>
                    <clipPath id="clip-path-3">
                        <rect
                            className={styles.cls3}
                            x="61.56"
                            y="184.2"
                            width="13.99"
                            height="73.92"
                            rx="7"
                        />
                    </clipPath>
                    <clipPath id="clip-path-4">
                        <rect
                            className={styles.cls3}
                            x="425.19"
                            y="184.2"
                            width="13.99"
                            height="73.92"
                            rx="7"
                        />
                    </clipPath>
                    <clipPath id="clip-path-5">
                        <polygon
                            className={styles.cls3}
                            points="398.15 303.73 99.7 303.73 99.7 167.25 122.3 167.25 122.3 281.13 375.55 281.13 375.55 167.25 398.15 167.25 398.15 303.73"
                        />
                    </clipPath>
                    <clipPath id="clip-path-6">
                        <circle className={styles.cls4} cx="153.22" cy="249.46" r="12" />
                    </clipPath>
                    <clipPath id="clip-path-7">
                        <polygon
                            className={styles.cls3}
                            points="409.93 192.24 87.04 192.24 87.04 30.79 110.56 30.79 110.56 168.72 386.41 168.72 386.41 30.79 409.93 30.79 409.93 192.24"
                        />
                    </clipPath>
                    <clipPath id="clip-path-8">
                        <rect
                            className={styles.cls3}
                            x="237.79"
                            y="30.79"
                            width="23.52"
                            height="153.96"
                        />
                    </clipPath>
                    <clipPath id="clip-path-9">
                        <circle className={styles.cls4} cx="368.5" cy="167.49" r="12" />
                    </clipPath>
                    <clipPath id="clip-path-10">
                        <rect
                            className={styles.cls3}
                            x="201.18"
                            y="145.5"
                            width="95.67"
                            height="83.43"
                        />
                    </clipPath>
                </defs>
                <g>
                    <g>
                        <g>
                            <g className={styles.bottom}>
                                <polygon
                                    className={styles.cls5}
                                    points="378.28 170.42 366.31 123.87 130.2 123.87 117.42 172.75 378.28 170.42"
                                />
                                <polygon
                                    className={styles.cls1}
                                    points="133.42 126.08 133.42 167.49 122.3 167.49 133.42 126.08"
                                />
                                <polygon
                                    className={styles.cls1}
                                    points="375.55 167.25 363.54 167.25 363.54 125.86 375.55 167.25"
                                />
                                <ellipse
                                    className={styles.cls6}
                                    cx="248.68"
                                    cy="178.45"
                                    rx="126.38"
                                    ry="36.8"
                                />
                                <rect
                                    className={styles.cls1}
                                    x="115.28"
                                    y="168.67"
                                    width="275.85"
                                    height="130.18"
                                />
                                <g className={styles.cls7}>
                                    <rect
                                        className={styles.cls4}
                                        x="78.51"
                                        y="246.01"
                                        width="393.48"
                                        height="6.72"
                                    />
                                </g>
                                <rect
                                    className={styles.cls2}
                                    x="45.02"
                                    y="167.49"
                                    width="410.31"
                                    height="44.75"
                                    rx="19.76"
                                />
                                <g className={styles.cls8}>
                                    <rect
                                        className={styles.cls4}
                                        y="156.9"
                                        width="496.25"
                                        height="33.24"
                                    />
                                </g>
                                <rect
                                    className={styles.cls3}
                                    x="61.56"
                                    y="184.2"
                                    width="13.99"
                                    height="73.92"
                                    rx="7"
                                />
                                <g className={styles.cls9}>
                                    <rect
                                        className={styles.cls10}
                                        x="38.82"
                                        y="117.12"
                                        width="29.73"
                                        height="208.08"
                                    />
                                </g>
                                <rect
                                    className={styles.cls3}
                                    x="425.19"
                                    y="184.2"
                                    width="13.99"
                                    height="73.92"
                                    rx="7"
                                />
                                <g className={styles.cls11}>
                                    <rect
                                        className={styles.cls10}
                                        x="402.45"
                                        y="117.12"
                                        width="29.73"
                                        height="208.08"
                                    />
                                </g>
                                <polyline
                                    className={styles.cls12}
                                    points="117.42 167.67 117.42 298.84 393.27 298.84 393.27 167.67"
                                />
                                <polygon
                                    className={styles.cls3}
                                    points="398.15 303.73 99.7 303.73 99.7 167.25 122.3 167.25 122.3 281.13 375.55 281.13 375.55 167.25 398.15 167.25 398.15 303.73"
                                />
                                <g className={styles.cls13}>
                                    <rect
                                        className={styles.cls10}
                                        x="76.88"
                                        y="164"
                                        width="29.73"
                                        height="146.08"
                                    />
                                    <rect
                                        className={styles.cls10}
                                        x="122.48"
                                        y="164.22"
                                        width="264.1"
                                        height="125.08"
                                    />
                                </g>
                                <polygon
                                    className={styles.cls3}
                                    points="122.3 167.25 133.42 126.08 363.54 126.08 375.55 167.25 398.15 167.25 381.71 121.65 117.42 121.65 99.7 167.25 122.3 167.25"
                                />
                                <polygon
                                    className={styles.cls10}
                                    points="106.61 167.67 124.11 121.65 117.42 121.65 99.7 167.25 106.61 167.67"
                                />
                                <polygon
                                    className={styles.cls14}
                                    points="386.58 167.49 371.79 125.86 363.54 125.86 375.55 167.25 386.58 167.49"
                                />
                                <circle className={styles.cls4} cx="153.22" cy="249.46" r="12" />
                                <g className={styles.cls15}>
                                    <circle
                                        className={styles.cls2}
                                        cx="153.22"
                                        cy="243.24"
                                        r="12"
                                    />
                                </g>
                            </g>
                            <g className={styles.top}>
                                <rect
                                    className={styles.cls16}
                                    x="102.45"
                                    y="35.07"
                                    width="299.37"
                                    height="149.69"
                                />
                                <rect
                                    className={styles.cls2}
                                    x="153.22"
                                    y="39.8"
                                    width="56.15"
                                    height="93.85"
                                />
                                <rect
                                    className={styles.cls4}
                                    x="144.67"
                                    y="35.07"
                                    width="56.15"
                                    height="90.43"
                                />
                                <rect
                                    className={styles.cls2}
                                    x="305.04"
                                    y="39.8"
                                    width="56.15"
                                    height="93.85"
                                />
                                <rect
                                    className={styles.cls4}
                                    x="296.85"
                                    y="39.8"
                                    width="56.15"
                                    height="85.7"
                                />
                                <polyline
                                    className={styles.cls17}
                                    points="104.59 35.07 104.59 184.75 403.96 184.75 403.96 35.07"
                                />
                                <polygon
                                    className={styles.cls3}
                                    points="409.93 192.24 87.04 192.24 87.04 30.79 110.56 30.79 110.56 168.72 386.41 168.72 386.41 30.79 409.93 30.79 409.93 192.24"
                                />
                                <g className={styles.cls18}>
                                    <polygon
                                        className={styles.cls10}
                                        points="96.36 213.21 66.63 213.21 66.63 5.13 96.36 5.13 125.06 30.94 125.06 39.19 96.36 39.33 96.36 213.21"
                                    />
                                    <rect
                                        className={styles.cls10}
                                        x="222.84"
                                        y="5.13"
                                        width="29.73"
                                        height="208.08"
                                    />
                                    <polygon
                                        className={styles.cls10}
                                        points="393.27 173.33 110.56 173.33 110.56 28.47 421.74 28.47 421.3 37.51 393.27 37.08 393.27 173.33"
                                    />
                                </g>
                                <rect
                                    className={styles.cls19}
                                    x="110.56"
                                    y="35.07"
                                    width="275.85"
                                    height="9.47"
                                />
                                <rect
                                    className={styles.cls3}
                                    x="237.79"
                                    y="30.79"
                                    width="23.52"
                                    height="153.96"
                                />
                                <g className={styles.cls20}>
                                    <polygon
                                        className={styles.cls10}
                                        points="246.15 214.03 216.42 214.03 216.42 0 246.15 0 269.66 37.41 246.15 37.41 246.15 214.03"
                                    />
                                </g>
                                <circle className={styles.cls4} cx="368.5" cy="167.49" r="12" />
                                <g className={styles.cls21}>
                                    <circle className={styles.cls2} cx="368.5" cy="161.27" r="12" />
                                </g>
                            </g>
                            <g className={styles.lock}>
                                <rect
                                    className={styles.cls2}
                                    x="207.23"
                                    y="153.94"
                                    width="95.67"
                                    height="83.43"
                                />
                                <rect
                                    className={styles.cls3}
                                    x="201.18"
                                    y="145.5"
                                    width="95.67"
                                    height="83.43"
                                />
                                <g className={styles.cls22}>
                                    <polygon
                                        className={styles.cls23}
                                        points="168.47 107.57 329.12 268.9 305.6 106.39 168.47 107.57"
                                    />
                                </g>
                                <path
                                    className={styles.cls2}
                                    d="M250.79,208h0a6.86,6.86,0,0,1-6.82-7.61l2.36-21.72h8.93l2.36,21.72A6.87,6.87,0,0,1,250.79,208Z"
                                />
                                <circle className={styles.cls2} cx="250.79" cy="178.67" r="12.47" />
                                <rect
                                    className={styles.cls24}
                                    x="201.18"
                                    y="144.18"
                                    width="95.67"
                                    height="11.01"
                                />
                                <rect
                                    className={styles.cls25}
                                    x="201.11"
                                    y="144.13"
                                    width="95.74"
                                    height="3.72"
                                />
                            </g>
                            <g className={styles.sparkles}>
                                <path
                                    className={cn(styles.mid, styles.cls26)}
                                    d="M207.1,115.46S187.64,110,183.29,91.65c-4.65,19.17-23.82,23.81-23.82,23.81s18.39,4.39,23.82,23.82C187.42,119.6,207.1,115.46,207.1,115.46Z"
                                />
                                <path
                                    className={cn(styles.left, styles.cls26)}
                                    d="M177,159s-13.23-3.7-16.19-16.18c-3.16,13-16.18,16.18-16.18,16.18s12.5,3,16.18,16.19C163.66,161.78,177,159,177,159Z"
                                />
                                <path
                                    className={cn(styles.right, styles.cls26)}
                                    d="M349.3,122.91s-13.22-3.7-16.18-16.18c-3.16,13-16.19,16.18-16.19,16.18s12.5,3,16.19,16.19C335.93,125.72,349.3,122.91,349.3,122.91Z"
                                />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
}
