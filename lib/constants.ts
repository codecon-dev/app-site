import { useEffect, useState } from 'react';
import { EVENTS, MenuItem } from './types/all';

export type EventPrice = {
    name: string;
    price: number;
    endDate: Date;
};

export type EventData = {
    type?: EVENTS;
    title?: string;
    subtitle?: string;
    local?: string;
    city?: string;
    initialDate: Date;
    finalDate?: Date;
    homeUrl: string;
    siteName: string;
    shareImage: string;
    metaDescription: string;
    registerUrl: string;
    whatsapp: string;
    menuNav: MenuItem[];
    attendeeNav: MenuItem[];
    eventPrice?: EventPrice[] | EventPrice;
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

export const SITE_URL = 'https://app.codecon.dev';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'codecondev';
export const SITE_NAME = 'Codecon • Festival de código e tecnologia';
export const META_DESCRIPTION =
    'A Codecon reúne código, diversão e atividades em um ambiente virtual onde você consegue de verdade interagir com outras pessoas.';
export const RANKING_ENABLED = true;
export const WHATSAPP_LINK = 'https://wa.me/+5547935052153';

export const useEventData = (event: 'digital' | 'summit' | 'feature' | 'ia' | undefined) => {
    let eventData: EventData;
    const [discountCode, setDiscountCode] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let discountCode = urlParams.get('d');

        if (!discountCode) {
            discountCode = window.localStorage.getItem(`${event?.toUpperCase()}_discount`);
        }

        setDiscountCode(discountCode || '');
    }, [event]);

    switch (event) {
        case 'digital':
            eventData = {
                type: EVENTS.DIGITAL,
                title: 'Codecon Digital',
                subtitle:
                    'Um festival que reúne código, diversão e atividades em um ambiente virtual onde você consegue de verdade interagir com outras pessoas.',
                local: 'Online',
                city: 'Gather Town',
                initialDate: new Date('2023-06-22 00:00:00'),
                finalDate: new Date('2023-06-23 00:00:00'),
                homeUrl: '/digital',
                siteName: 'Codecon Digital • Festival de código e tecnologia',
                shareImage: 'https://app.codecon.dev/digital-share.png',
                metaDescription:
                    'A Codecon reúne código, diversão e atividades em um ambiente virtual onde você consegue de verdade interagir com outras pessoas.',
                registerUrl: 'https://www.sympla.com.br/evento-online/codecon-digital-2023/1829527',
                whatsapp: 'https://chat.whatsapp.com/D0zzxblnzloFulzLvzXi1e',
                menuNav: [
                    {
                        name: 'Patrocinadores',
                        route: '/digital/patrocinadores'
                    }
                ],
                attendeeNav: [],
                eventPrice: [
                    {
                        name: 'Early bird',
                        price: 19,
                        endDate: new Date('2023-03-01 18:00:00')
                    },
                    {
                        name: '1º lote',
                        price: 39,
                        endDate: new Date('2023-04-27 18:00:00')
                    },
                    {
                        name: '2º lote',
                        price: 49,
                        endDate: new Date('2023-06-05 18:00:00')
                    },
                    {
                        name: '3º lote',
                        price: 59,
                        endDate: new Date('2023-06-22 11:00:00')
                    },
                    {
                        name: 'ingresso no dia',
                        price: 89,
                        endDate: new Date('2023-06-23 13:00:00')
                    }
                ],
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
                type: EVENTS.SUMMIT,
                title: 'Codecon Summit',
                subtitle:
                    'O maior evento para pessoas programadoras de Santa Catarina, com grandes nomes nacionais.',
                local: 'Campus Park',
                city: 'Joinville, SC',
                initialDate: new Date('2023-08-26 00:00:00'),
                homeUrl: '/',
                siteName: 'Codecon Summit • Inovação, tecnologia, experiências e muito código',
                shareImage: 'https://app.codecon.dev/summit-share.png',
                metaDescription:
                    'O maior evento para pessoas programadoras de Santa Catarina, com grandes nomes nacionais.',
                registerUrl: `https://www.sympla.com.br/evento/codecon-summit-2023/1829544?d=${discountCode}`,
                whatsapp: 'https://chat.whatsapp.com/D0zzxblnzloFulzLvzXi1e',
                menuNav: [],
                attendeeNav: [
                    {
                        name: 'Dashboard',
                        route: '/'
                    },
                    {
                        name: 'Code-codes',
                        route: '/game/code-codes/resgate'
                    },
                    {
                        name: 'Gerar ticket',
                        route: '/tickets',
                        type: 'button'
                    }
                ],
                eventPrice: [
                    {
                        name: 'Early bird',
                        price: 99,
                        endDate: new Date('2023-04-05 18:00:00')
                    },
                    {
                        name: '1º lote',
                        price: 129,
                        endDate: new Date('2023-06-26 18:00:00')
                    },
                    {
                        name: '2º lote',
                        price: 159,
                        endDate: new Date('2023-08-10 18:00:00')
                    },
                    {
                        name: '3º lote',
                        price: 199,
                        endDate: new Date('2023-08-17 18:00:00')
                    }
                ],
                colors: {
                    primary: '#8800FF',
                    primaryDark: '#280075',
                    background: '#120E16'
                },
                heading: {
                    fontFace: 'Big Shoulders Text',
                    textTransform: 'uppercase'
                }
            };
            break;
        case 'feature':
            eventData = {
                type: EVENTS.FEATURE,
                title: 'Codecon Feature',
                subtitle:
                    'Um evento de tecnologia para profissionais em cargos sênior ou superior.',
                local: 'Hotel Faial Prime',
                city: 'Florianópolis, SC',
                initialDate: new Date('2023-10-28 00:00:00'),
                homeUrl: '/feature',
                siteName:
                    'Codecon Feature • Um evento de tecnologia para profissionais em cargos sênior+',
                shareImage: 'https://app.codecon.dev/feature-share.png',
                metaDescription:
                    'O evento será repleto de sessões e workshops onde todos podem trazer problemas que enfrentam e todos tem locais de fala.',
                registerUrl: `https://www.sympla.com.br/evento/codecon-feature-2023/1829552?d=${discountCode}`,
                whatsapp: WHATSAPP_LINK,
                menuNav: [
                    {
                        name: 'Quem vai',
                        route: '/feature/quem-vai'
                    },
                    {
                        name: 'Programação',
                        route: '/feature/programacao'
                    },
                    {
                        name: 'Como será',
                        route: '/feature/como-sera'
                    },

                    {
                        name: 'Patrocinadores',
                        route: '/feature/patrocinadores'
                    }
                ],
                attendeeNav: [
                    {
                        name: 'Área do inscrito',
                        route: '/feature/inscrito'
                    },
                    {
                        name: 'inscreva-se',
                        route: `https://www.sympla.com.br/evento/codecon-feature-2023/1829552?d=${discountCode}`,
                        type: 'button',
                        target: '_blank'
                    }
                ],
                eventPrice: [
                    {
                        name: '1º lote',
                        price: 890,
                        endDate: new Date('2023-07-19 18:00:00')
                    },
                    {
                        name: '2º lote',
                        price: 1190,
                        endDate: new Date('2023-10-25 18:00:00')
                    }
                ],
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
                homeUrl: 'https://app.codecon.dev/',
                siteName: 'Codecon • Eventos de tecnologia que fogem do comum',
                shareImage: 'https://app.codecon.dev/share-image.png',
                initialDate: new Date(),
                metaDescription:
                    'A Codecon organiza eventos de tecnologia que juntam código, networking e diversão.',
                registerUrl: '#',
                whatsapp: WHATSAPP_LINK,
                menuNav: [],
                attendeeNav: [
                    {
                        name: 'Fale com a gente',
                        route: '/#contato',
                        type: 'button'
                    }
                ],
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
