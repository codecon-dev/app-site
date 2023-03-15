import { WHATSAPP_LINK } from '@lib/constants';
import styles from './Contact.module.scss';
import { Grid, Column } from '@components/_ui/Grid';

export default function Contact() {
    return (
        <section id="contato" className={styles.section}>
            <h2>Fale com a gente</h2>
            <Grid>
                <Column lg={4} sm={4}>
                    <h3>Quer ser nosso patrocinador?</h3>
                    <a href="mailto:patrocinadores@codecon.dev">patrocinadores@codecon.dev</a>
                </Column>
                <Column lg={4} sm={4}>
                    <h3>Alguma dúvida geral?</h3>
                    <a href="mailto:contato@codecon.dev">contato@codecon.dev</a>
                </Column>
                <Column lg={4} sm={4}>
                    <h3>Prefere chamar no Whatsapp?</h3>
                    Manda no{' '}
                    <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer noopener">
                        nosso WhatsApp
                    </a>
                </Column>
            </Grid>
        </section>
    );
}
