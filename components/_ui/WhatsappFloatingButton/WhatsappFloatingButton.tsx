import { useContext } from 'react';

import Link from 'next/link';

import ThemeContext from 'context/ThemeContext';

import styles from './WhatsappFloatingButton.module.scss';
import { getEventData } from '@lib/constants';
import WhatsappIcon from '@components/_ui/Icons/icon-whatsapp';

export default function WhatsappFloatingButton() {
    const theme = useContext(ThemeContext);
    const eventData = getEventData(theme);

    return (
        <Link href={eventData.whatsapp} target="_blank" rel="noopener noreferrer">
            <span className={styles.whatsapp_button}>
                <WhatsappIcon size={24} />
            </span>
        </Link>
    );
}
