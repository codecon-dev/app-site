/* eslint-disable @next/next/no-img-element */
import { animateScroll as scroll } from 'react-scroll';
import { useState, useEffect, useRef, FormEvent } from 'react';
import cn from 'classnames';
import Link from 'next/link';

import Button from '@components/_ui/Button';

import styles from './Chat.module.scss';

const possibleAnswers = [
    'Você já leu a documentação?',
    'Hm... estranho na minha máquina tá funcionando.',
    'Parece estranho... e não somos todos?',
    'Já tentou parar e rodar de novo o server?',
    'Isso dai é pau de máquina.',
    'Talvez seja cache.',
    'Limpa os cookies e tenta de novo.',
    'Pergunta lá pro ChatGPT não sei essa.',
    'Putz, eu só manjo de Javascript.',
    'Vai abrindo o PR que depois eu faço o code review.',
    'Depende...',
    'Abre um ticket que logo eu respondo.',
    'Parece ser um problema de BIOS (Bicho Ignorante Operando o Sistema)',
    'Parece ser um problema no USB (Usuário Super Burro).',
    'Já tentou desligar e ligar novamente?',
    'Tenta tirar o roteador da tomada, esperar uns 15 segundos e botar de novo.',
    'Não sei a resposta, mas pode mandar pra QA mesmo assim.',
    'Não posso responder no momento, tente novamente amanhã.',
    'Para mais opções tecle HELP.',
    'No momento não posso responder, saí para o almoço.',
    'O problema é com a peçinha na frente do computador.',
    'Para resolver pressione Ctrl + W',
    'Já está no JIRA?'
];

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
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        if (isModalOpen) {
            setIsModalOpen(false);
            document.body.classList.remove('modal-open');
        } else {
            setIsModalOpen(true);
            document.body.classList.add('modal-open');
        }
    };

    const handleSubmit = async (e: FormEvent<Element>) => {
        e.preventDefault();

        if (!userType) return;

        setMessages([...messages, { by: 'anonymous', text: userType }]);
        setIsLoading(true);

        void (await fetch(`/api/ia/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: `**Nova pergunta recebida**:\n${userType}\n--`
            })
        }));
    };

    useEffect(() => {
        const makeMagic = () => {
            let i = 0;
            const txt = ' ' + possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
            const speed = 70;
            let newMessagesArray = [...messages, { by: 'codesnr', text: '' }];

            const typeWriter = setInterval(() => {
                i++;

                newMessagesArray = [...newMessagesArray];
                newMessagesArray[newMessagesArray.length - 1].text += txt.charAt(i);

                setMessages(newMessagesArray);
                scroll.scrollToBottom({
                    containerId: 'modal',
                    duration: 100,
                    delay: 0,
                    smooth: true
                });

                if (i == txt.length) {
                    setIsLoading(false);

                    clearInterval(typeWriter);
                }
            }, speed);
        };

        if (messages[messages.length - 1].text === userType) {
            setUserType('');

            setTimeout(makeMagic, 500);
        }
    }, [messages, userType]);

    return (
        <>
            <div onClick={toggleModal} className={cn(styles.modal, { [styles.open]: isModalOpen })}>
                <div onClick={e => e.stopPropagation()} id="modal" className={styles.chat}>
                    {messages.map((message, index) => (
                        <Message key={`${index}+${message.text}`} by={message.by}>
                            {message.text}
                        </Message>
                    ))}
                </div>

                <form
                    onClick={e => e.stopPropagation()}
                    className={styles.form}
                    onSubmit={e => void handleSubmit(e)}
                >
                    <input
                        type="text"
                        disabled={isLoading}
                        value={userType}
                        onChange={e => setUserType(e.currentTarget.value)}
                        placeholder="Faça uma pergunta"
                        enterKeyHint="send"
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
            </div>
            <section>
                <div className="container">
                    <div className={styles.chat}>
                        <Message by="pessoa">Hey, Senior-GPT, qual o sentido da vida?</Message>
                        <Message by="codesnr">
                            Ser feliz e viver experiências incríveis, como participar da Codecon.
                        </Message>
                        <div className={styles.form}>
                            <input type="text" disabled placeholder="Faça uma pergunta" />
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
                    <Button onClick={toggleModal}>Experimente grátis</Button>
                    <Link href="/">Conheça a Codecon</Link>
                </div>
            </section>
        </>
    );
}
