import IconTwitter from '@components/_ui/Icons/icon-twitter';
import InstagramIcon from '@components/_ui/Icons/icon-instagram';
import IconGithub from '@components/_ui/Icons/icon-github';
import IconDiscord from '@components/_ui/Icons/icon-discord';

import styles from './Contact.module.scss';
import { Grid, Column } from '@components/_ui/Grid';
import { WHATSAPP_LINK } from '@lib/constants';

export default function Contact() {
    return (
        <section>
            <Grid>
                <Column lg={3} sm={6}>
                    <h3>Quer ser nosso patrocinador?</h3>
                    <a href="mailto:patrocinadores@codecon.dev">patrocinadores@codecon.dev</a>
                </Column>
                <Column lg={3} sm={6}>
                    <h3>Está com alguma dúvida geral?</h3>
                    <a href="mailto:contato@codecon.dev">contato@codecon.dev</a>
                </Column>
                <Column lg={3} sm={6}>
                    <h3>Prefere falar por Whatsapp?</h3>
                    Mande{' '}
                    <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer noopener">
                        uma mensagem
                    </a>
                </Column>
                <Column lg={3} sm={6}>
                    <h3>Ou entre em contato pelas redes sociais</h3>
                    <div className={styles.social}>
                        <a
                            href="https://twitter.com/codecondev"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <IconTwitter size={24} color="var(--color-primary)" />
                        </a>
                        <a
                            href="https://instagram.com/codecon.dev"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <InstagramIcon size={24} color="var(--color-primary)" />
                        </a>
                        <a
                            href="https://github.com/codecon-dev"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <IconGithub size={24} color="var(--color-primary)" />
                        </a>
                        <a
                            href="https://codecon.dev/discord"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <IconDiscord size={24} color="var(--color-primary)" />
                        </a>
                    </div>
                </Column>
            </Grid>
        </section>
    );
}
