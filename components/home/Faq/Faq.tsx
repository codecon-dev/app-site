import cn from 'classnames';
import { useContext } from 'react';
import {
    faqQuestionListDigital,
    faqQuestionListSummit,
    faqQuestionListFeature
} from './FaqQuestionList.jsx';
import FaqQuestion from './question/FaqQuestion';
import ThemeContext from 'context/ThemeContext';

import styles from './Faq.module.scss';

export default function Faq() {
    const theme = useContext(ThemeContext);
    let faqQuestionList;

    switch (theme) {
        case 'digital':
            faqQuestionList = faqQuestionListDigital;
            break;
        case 'summit':
            faqQuestionList = faqQuestionListSummit;
            break;
        case 'feature':
            faqQuestionList = faqQuestionListFeature;
            break;
    }

    return (
        <section className={cn(styles.faq, 'container')}>
            <h2 className={styles.title}>Perguntas frequentes</h2>

            {faqQuestionList?.map((item, index) => (
                <FaqQuestion question={item.question} answer={item.answer} key={index} />
            ))}
        </section>
    );
}
