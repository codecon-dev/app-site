import styles from './discord.module.css';
import IconDiscord from './icons/icon-discord';

 export default function Discord() {
   return (
       <div className={styles.section}>
        <div className={styles.container}>
            <div className={styles.content}>
                <p>Acesse nossa comunidade do Discord para participar do evento</p>
                <a href="https://discord.gg/Cz4zgUr" target="_blank" rel="noopener noreferrer" className={styles.button}>
                    <IconDiscord size={22} color="#141414" /> Acessar nosso Discord
                </a>
            </div>
            <iframe src="https://discordapp.com/widget?id=713502613458649152&theme=dark" width="350" height="500" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </div>
       
     </div>
   );
 }
 