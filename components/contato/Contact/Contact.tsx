import Header from '@components/_ui/Page/Header';
import IconTwitter from '@components/_ui/Icons/icon-twitter';
import InstagramIcon from '@components/_ui/Icons/icon-instagram';
import IconGithub from '@components/_ui/Icons/icon-github';
import IconDiscord from '@components/_ui/Icons/icon-discord';
import LinkButton from '@components/_ui/LinkButton/LinkButton';

import styles from './Contact.module.scss';

export default function Contact() {
  return (
    <>
      <Header hero="Entre em contato" description="Tá com dúvida? Vem com a gente." />
      <div className={styles.container}>
        <div className={styles.contact}>
          <p>Dúvidas gerais</p>
          <a href="mailto:sac@codecon.dev">sac@codecon.dev</a>
        </div>
        <div className={styles.contact}>
          <p>Quer ser um patrocinador?</p>
          <a href="mailto:patrocinadores@codecon.dev">patrocinadores@codecon.dev</a>
        </div>
        <div className={styles.contact}>
          <p>Para outros assuntos</p>
          <a href="mailto:contato@codecon.dev">contato@codecon.dev</a>
        </div>
      </div>
      <div className={styles.social}>
        <span>Também estamos nas redes sociais</span>

        <LinkButton newPage href="https://twitter.com/codecondev">
          <IconTwitter size={16} color="#fff" /> Twitter
        </LinkButton>

        <LinkButton newPage href="https://instagram.com/codecon.dev">
          <InstagramIcon size={16} color="#fff" /> Instagram
        </LinkButton>

        <LinkButton newPage href="https://github.com/codecon-dev">
          <IconGithub size={16} color="#fff" /> GitHub
        </LinkButton>

        <LinkButton newPage href="https://codecon.dev/discord">
          <IconDiscord size={16} color="#fff" /> Discord
        </LinkButton>
      </div>
    </>
  );
}
