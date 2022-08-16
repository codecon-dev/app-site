import styles from './Claim.module.scss';

export default function Claim({ data }: { data?: any }) {
  // aqui eu recebo os dados do UserData
  console.log(data);

  return <section className={styles.section}>tetete</section>;
}
