import { useState, useEffect, useRef, FormEvent } from 'react';
import cn from 'classnames';
import Link from 'next/link';

import LinkButton from '@components/_ui/LinkButton';

import styles from './Chat.module.scss';

type MessageProps = {
    children: React.ReactNode;
    by: string;
};

function Message({ children, by }: MessageProps) {
    return (
        <div className={styles.message}>
            <img src={`/images/ia/${by}.png`} />
            {children}
        </div>
    );
}

export default function Chat() {
    const [messages, setMessages] = useState([{ by: 'codesnr', text: 'Qual sua dúvida?' }]);
    const [userType, setUserType] = useState('');
    const [iseLoading, setIsLoading] = useState(false);
    const bottomRef = useRef();

    const handleSubmit = (e: FormEvent<Element>) => {
        e.preventDefault();

        if (!userType) return;

        setMessages([...messages, { by: 'annonymous', text: userType }]);
        //setIsLoading(true);
    };

    useEffect(() => {
        const makeMagic = () => {
            let i = 0;
            const txt = ' Lorem ipsum typing effect!';
            const speed = 100;
            let newMessagesArray = [...messages, { by: 'codesnr', text: '' }];

            const typeWriter = setInterval(() => {
                i++;

                newMessagesArray = [...newMessagesArray];
                newMessagesArray[newMessagesArray.length - 1].text += txt.charAt(i);

                setMessages(newMessagesArray);
                bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

                if (i == txt.length) clearInterval(typeWriter);
            }, speed);
        };

        if (messages[messages.length - 1].text === userType) {
            setUserType('');

            setTimeout(makeMagic, 500);
        }
    }, [messages, userType]);

    return (
        <>
            <div className={cn(styles.modal)}>
                <div className={styles.chat}>
                    {messages.map(message => (
                        <Message by={message.by}>{message.text}</Message>
                    ))}

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input
                            disabled={iseLoading}
                            value={userType}
                            onChange={e => setUserType(e.currentTarget.value)}
                            placeholder="Faça uma pergunta"
                        />

                        <button type="submit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="var(--color-gray)"
                                    d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"
                                />
                            </svg>
                        </button>
                    </form>

                    <div ref={bottomRef} />
                </div>
            </div>
            <section>
                <div className="container">
                    <div className={styles.chat}>
                        <Message by="pessoa">Hey, CodeSNR, qual o sentido da vida?</Message>
                        <Message by="codesnr">
                            Ser feliz e viver experiências incríveis, como participar da Codecon.
                        </Message>
                        <div className={styles.form}>
                            <input disabled placeholder="Faça uma pergunta" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="var(--color-gray)"
                                    d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <LinkButton href="#">Experimente grátis</LinkButton>
                    <Link href="/">Conheça a Codecon</Link>
                </div>
            </section>
        </>
    );
}
