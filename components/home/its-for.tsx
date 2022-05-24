import styles from './its-for.module.css';

export default function ItsFor() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.card}>
          <img src="/m-comunidades.png" alt="Para comunidades" />
          <h3 className={styles.title}>Para comunidades</h3>
          <p className={styles.description}>
            Comunidades de tecnologia podem usar o metaverso gratuitamente. Assim que aprovado, você
            terá acesso a uma agenda para realizar as reservas e organizar seus meetups ou workshops
            para até 100 pessoas.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScagxNdDdovV1okFIOcgzrSD5yMyKRuti1ciG7nYVMdFYZBng/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Saiba como utilizar
            <span>inscreva sua comunidade</span>
          </a>
        </div>
        <div className={styles.card}>
          <img src="/m-eventos.png" alt="Eventos Codecon" />
          <h3 className={styles.title}>Eventos Codecon</h3>
          <p className={styles.description}>
            A Codedon criará uma agenda mensal para movimentar a comunidade, trazendo meetups e
            workshops gratuitos. É também um bom local para você compartilhar seu conhecimento em um
            mini evento.
          </p>
          <a
            href="https://tally.so/r/mOyDRw"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Envie uma sugestão
            <span>de palestra ou workshop</span>
          </a>
        </div>
        <div className={styles.card}>
          <img src="/m-marcas.png" alt="Para marcas" />
          <h3 className={styles.title}>Para marcas</h3>
          <p className={styles.description}>
            Teremos espaços para marcas que desejam se aproximar de comunidades ou realizarem seus
            eventos no metaverso. Temos planos mensais de outdoors, naming rights e várias outras
            formas de fazer sua marca ter destaque.
          </p>
          <a href="/contato" className={styles.button}>
            Entre em contato
            <span>anuncie no metaverso</span>
          </a>
        </div>
      </div>
    </div>
  );
}
