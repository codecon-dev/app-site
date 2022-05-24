import styles from './contact.module.css';
import IconTwitter from './icons/icon-twitter';
import InstagramIcon from './icons/icon-instagram';
import IconGithub from '@components/icons/icon-github';
import Header from './header';
import IconDiscord from './icons/icon-discord';
import Button from './_ui/Button/Button';

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

        <Button newPage href="https://twitter.com/codecondev">
          <IconTwitter size={16} color="#fff" /> Twitter
        </Button>

        <Button newPage href="https://instagram.com/codecon.dev">
          <InstagramIcon size={16} color="#fff" /> Instagram
        </Button>

        <Button newPage href="https://github.com/codecon-dev">
          <IconGithub size={16} color="#fff" /> GitHub
        </Button>

        <Button newPage href="https://codecon.dev/discord">
          <IconDiscord size={16} color="#fff" /> Discord
        </Button>
      </div>
    </>
  );
}
