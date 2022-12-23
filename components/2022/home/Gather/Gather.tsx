import Image from 'next/image';
import Link from 'next/link';

import { Grid, Column } from '@components/_ui/Grid';
import LinkButton from '@components/2022/_ui/LinkButton';

import styles from './Gather.module.scss';

export default function Gather() {
    return (
        <section className={styles.section}>
            <Grid align="center">
                <Column lg={4} sm={6}>
                    <h2>
                        Nem Zoom, <br />
                        nem Google Meet, <br />
                        conheça a <strong>Z-City</strong>
                    </h2>
                    <p>
                        Uma cidade virtual criada no Gather, inspirada na temática Matrix. Você
                        encontrará salas diversas, estandes, pessoas de todo o Brasil e até vários
                        easter eggs.
                    </p>
                    <LinkButton href="/2022/como-funciona">Como funciona</LinkButton>
                </Column>
                <Column lg={2} sm={0} />
                <Column lg={6} sm={6}>
                    <Link href="https://twitter.com/linii_s/status/1441835377463947282">
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            className={styles['image__wrapper']}
                        >
                            <Image
                                src="/images/2022/javaescripto.jpg"
                                width={594}
                                height={544}
                                alt="Captura de tela de uma pessoa dizendo que está morrendo de rir vendo um meme do elefante do PHP falando 'eu vou matar o javaescripto'"
                                quality={100}
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA/9JREFUWEeVV1l2GzEMk+Y0ydjZFyeOk27p/S8US31cQEKa9qPpc8eziSAIgnL9ffrovZQi//Xey7m1cvbj17mVr3bWa19yvfXSWiu96MOlFvmUspRSas2jXJOP/GFdidF613McZZ2aAOSmAOgDAAQ3AK203vS5AQCCO5Ba5J+GNwAKxNZvM4DP04clVOSmZJgANLiyYMHPvel9BaDZGwMbFjx7Y0CenbNPYPXz7UOf+CcApx4AugNQ+mYAwYCtqKlH9gDRS0Np5P1fb+8GACwMDAgbnr3UXxhwKvUFzZ504Od23ePL8xsQlrAsUX8GgBSIBAHdpgmjXkvk9U8hJggIT0BBgRwcQVUPTlL9cTzh+0Yo0g0W2DJH9mDLhGgrqRacFeJ+KAECDwC+H9+oBFCr1Ss/WT/LAvU1MSIdBeMCxTUGi+/5ei/12+uRGKCWUeUSILSU0kcApoACgO8DLOi3+ynO+v7yinO64UBCnClSuBaCQAvGBFrUXkS7MohsDkuing4vwQD8KxBGhZPpOTADgkElCygXRIfss0Xr8XDweNAwmsibOiTGre1GQh0Bp7PM0y1TYNvgGunl+VmfgXmqqcuZ4mFXT4BoLWSK4Hak4JNnsDnBLOvh6SkYQNAaIAQIQIwAUGMObm3KAJrHNH3kH5Xg6fExGagy1RZlQwLjY4yQzfhiOWCs1hrcfSMAujjDeWhSKscPDw/d2LYZloGXsjiIBEAs+GhFYM7eBpZkj5ZMZySFmZXf398bAwMAD76MbOSUpzkfY9ao1/3CVAo2qw2A27u7gQHNehEAYGAJcK7Mrb1iSDn9GzGKVVOzM4h6c3sjdhDUG+0A4MGhB++KaKjIvkftmYWxBD49WYvC/PWNAPAS1Op1nwGAhcTOkw31R+2ZAbihup4ProGBq+vr/wZgSaQZhQCHEqQLwqapD2PPWPdXVxMAy1Y0YKXw8sgr4Qm51bJ9HrdgekFYM+0PwoD8S93t950NyAJDB3ZEe3IX2ORF/2PDSX5Awyg8YBp7anECIGqCzFWULEABkbOBE8L+IMGgDXMabgFkMeq621kbohMmM9IZ4R7hKGIDgkEzM5GbFhrP2AOyECTquu5cAxhJbrtkTDaqoAFfwTex5rTmeKg5zs2OXbBWsym8AlhzGBETo/3ydGQAvvGIzYjtdsfNSHZM7BUJRl0vAcCVoJlDFZl1jGvEZ0EFG5Sxb9WCAXqeTXECQIEDxGAbA4X41cNej2ubI/9QMVJsq7NeMAPYYGe3uoFm4G0ZqbbJAIwqj+QdWE3ccb24DA3k2jX0gp2/vvO34IO4cuyyW8IzsATKotxuAMRmxX/f0HnQMBmKXeffCimU2L5NP9WA+w8/KfC/Kx1BqAAAAABJRU5ErkJggg=="
                            />
                        </a>
                    </Link>
                </Column>
            </Grid>
        </section>
    );
}
