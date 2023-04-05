import React from 'react';
import Link from 'next/link';

import styles from './WhatsappFloatingButton.module.scss';
import { WHATSAPP_LINK } from '@lib/constants';
import WhatsappIcon from '@components/_ui/Icons/icon-whatsapp';

export default function WhatsappFloatingButton() {
    return (
        <Link href={WHATSAPP_LINK}>
            <a target="_blank" rel="noopener noreferrer" className={styles.whatsapp_button}>
                <WhatsappIcon size={24} />
            </a>
        </Link>
    );
}
