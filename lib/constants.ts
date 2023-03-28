import { MenuItem } from './types/all';

type EventData = {
    homeUrl: string;
    siteName: string;
    shareImage: string;
    metaDescription: string;
    registerUrl: string;
    menuNav: MenuItem[];
    attendeeNav: MenuItem[];
    eventPrice: number;
    colors: {
        primary: string;
        primaryDark: string;
        background: string;
    };
    heading: {
        fontFace: string;
        textTransform: 'uppercase' | 'none';
    };
};

export const SITE_URL = 'https://www.codecon.dev';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'codecondev';
export const SITE_NAME = 'Codecon • Festival de código e tecnologia';
export const META_DESCRIPTION =
    'A Codecon reúne código, diversão e atividades em um ambiente virtual onde você consegue de verdade interagir com outras pessoas.';
export const RANKING_ENABLED = true;
export const WHATSAPP_LINK = 'https://wa.me/+5547991367060';

export const getEventData = (event: 'digital' | 'summit' | 'feature' | 'ia' | undefined) => {
    let eventData: EventData;

    switch (event) {
        case 'digital':
            eventData = {
                homeUrl: '/digital',
                siteName: 'Codecon Digital • Festival de código e tecnologia',
                shareImage: 'https://codecon.dev/digital-share.png',
                metaDescription:
                    'A Codecon reúne código, diversão e atividades em um ambiente virtual onde você consegue de verdade interagir com outras pessoas.',
                registerUrl: 'https://www.sympla.com.br/evento-online/codecon-digital-2023/1829527',
                menuNav: [
                    {
                        name: 'Home',
                        route: '/digital'
                    },
                    {
                        name: 'Como será',
                        route: '/digital/como-sera'
                    },
                    {
                        name: 'Outros eventos',
                        route: '/'
                    },
                    {
                        name: 'Contato',
                        route: '/digital/contato'
                    }
                ],
                attendeeNav: [
                    {
                        name: 'inscreva-se',
                        route: 'https://www.sympla.com.br/evento-online/codecon-digital-2023/1829527',
                        type: 'button',
                        target: '_blank'
                    }
                ],
                eventPrice: 39,
                colors: {
                    primary: '#45E27F',
                    primaryDark: '#006C68',
                    background: '#0E1116'
                },
                heading: {
                    fontFace: 'Neue Machina',
                    textTransform: 'none'
                }
            };
            break;
        case 'summit':
            eventData = {
                homeUrl: '/summit',
                siteName: 'Codecon Summit • Inovação, tecnologia, experiências e muito código',
                shareImage: 'https://codecon.dev/summit-share.png',
                metaDescription:
                    'O maior evento para pessoas programadoras de Santa Catarina, com grandes nomes nacionais.',
                registerUrl: 'https://www.sympla.com.br/evento/codecon-summit-2023/1829544',
                menuNav: [
                    {
                        name: 'Home',
                        route: '/summit'
                    },
                    {
                        name: 'Como será',
                        route: '/summit/como-sera'
                    },
                    {
                        name: 'Outros eventos',
                        route: '/'
                    },
                    {
                        name: 'Contato',
                        route: '/summit/contato'
                    }
                ],
                attendeeNav: [
                    {
                        name: 'inscreva-se',
                        route: 'https://www.sympla.com.br/evento/codecon-summit-2023/1829544',
                        type: 'button',
                        target: '_blank'
                    }
                ],
                eventPrice: 99,
                colors: {
                    primary: '#8800FF',
                    primaryDark: '#280075',
                    background: '#120E16'
                },
                heading: {
                    fontFace: 'Jost',
                    textTransform: 'uppercase'
                }
            };
            break;
        case 'feature':
            eventData = {
                homeUrl: '/feature',
                siteName:
                    'Codecon Feature • Um evento de tecnologia para profissionais em cargos sênior+',
                shareImage: 'https://codecon.dev/feature-share.png',
                metaDescription:
                    'O evento será repleto de sessões e workshops onde todos podem trazer problemas que enfrentam e todos tem locais de fala.',
                registerUrl: 'https://www.sympla.com.br/evento/codecon-feature-2023/1829552',
                menuNav: [
                    {
                        name: 'Home',
                        route: '/feature'
                    },
                    {
                        name: 'Como será',
                        route: '/feature/como-sera'
                    },
                    {
                        name: 'Outros eventos',
                        route: '/'
                    },
                    {
                        name: 'Contato',
                        route: '/feature/contato'
                    }
                ],
                attendeeNav: [
                    {
                        name: 'inscreva-se',
                        route: 'https://www.sympla.com.br/evento/codecon-feature-2023/1829552',
                        type: 'button',
                        target: '_blank'
                    }
                ],
                eventPrice: 890,
                colors: {
                    primary: '#0055FF',
                    primaryDark: '#001EA6',
                    background: '#0E1116'
                },
                heading: {
                    fontFace: 'Neue Metana',
                    textTransform: 'none'
                }
            };
            break;
        default:
            eventData = {
                homeUrl: 'https://codecon.dev/',
                siteName: 'Codecon • Eventos de tecnologia que fogem do comum',
                shareImage: 'https://codecon.dev/share-image.png',
                metaDescription:
                    'A Codecon organiza eventos de tecnologia que juntam código, networking e diversão.',
                registerUrl: '#',
                menuNav: [
                    {
                        name: 'Codecon Digital',
                        route: '/digital'
                    },
                    {
                        name: 'Codecon Summit',
                        route: '/summit'
                    },
                    {
                        name: 'Codecon Feature',
                        route: '/feature'
                    }
                ],
                attendeeNav: [
                    {
                        name: 'Fale com a gente',
                        route: '/#contato',
                        type: 'button'
                    }
                ],
                eventPrice: 0,
                colors: {
                    primary: '#8b949e',
                    primaryDark: '#caced2',
                    background: '#0E1116'
                },
                heading: {
                    fontFace: 'Space Grotesk',
                    textTransform: 'none'
                }
            };
            break;
    }

    return eventData;
};
