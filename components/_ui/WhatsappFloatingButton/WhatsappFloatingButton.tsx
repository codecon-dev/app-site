import React from 'react';
import Link from 'next/link';

import styles from './WhatsappFloatingButton.module.scss';
import { WHATSAPP_NUMBER } from '@lib/constants';
import Whatsapp from '@components/_ui/Icons/icon-whatsapp';

const getWhatsappLink = (phone: string) => `https://api.whatsapp.com/send?phone=${phone}`;

export default function WhatsappFloatingButton({ phone = WHATSAPP_NUMBER }) {
  const whatsappLink = getWhatsappLink(phone);

  return (
    <Link href={whatsappLink}>
      <a target="_blank" rel="noopener noreferrer" className={styles.whatsapp_button}>
        <Whatsapp />
      </a>
    </Link>
  );
}
