import styles from './Newsletter.module.scss';

export default function Newsletter() {
  return (
    <div className={styles.container}>
      <form
        action="https://teken.us20.list-manage.com/subscribe/post?u=7664abb6f684ad9262333c71d&amp;id=43e3009ed7"
        method="post"
        name="mc-embedded-subscribe-form"
        target="_blank"
        className={styles.form}
      >
        <input
          className={styles.input}
          type="email"
          name="EMAIL"
          required
          placeholder="Seu melhor e-mail"
        />
        <input type="hidden" name="tags" value="2447885" />
        <input type="hidden" name="b_7664abb6f684ad9262333c71d_43e3009ed7" tabIndex={-1} value="" />

        <input
          className={styles.button}
          type="submit"
          value="Cadastrar"
          name="subscribe"
          id="mc-embedded-subscribe"
        />
      </form>
    </div>
  );
}
