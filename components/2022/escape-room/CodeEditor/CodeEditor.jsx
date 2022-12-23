/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState } from 'react';
import Image from 'next/image';

import toast from 'react-hot-toast';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css';

import styles from './CodeEditor.module.scss';

export default function CodeEditor({ wrongCode, rightCode, answer }) {
    const [code, setCode] = useState(wrongCode);
    const [isRight, setIsRight] = useState(false);

    const checkCode = (code, rightCode) => {
        const codeStr = code.replace(/\s/g, '');
        const rightCodeStr = rightCode.replace(/\s/g, '');

        if (codeStr === rightCodeStr) {
            setIsRight(true);
        } else {
            toast.error('Erro de compilação, tente novamente.');
        }
    };

    if (isRight) {
        return (
            <section>
                <div className="container">
                    <Image src="/animations/2022/matrix-neo.gif" width={220} height={165} />
                    <br />
                    <br />
                    <h2>Boa! Você conseguiu remover todos as informações do vírus deste código.</h2>
                    <p>Essa é a parte da senha da porta que posso te entregar: {answer}</p>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="container">
                <p>
                    Lembre-se de remover todo o código que cita o vírus. Não precisa adicionar
                    nenhuma linha de código, apenas remover linhas.
                </p>
                <br />
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages.javascript)}
                    className={styles.editor}
                    padding={16}
                />

                <button className={styles.button} onClick={() => checkCode(code, rightCode)}>
                    Compilar
                </button>
                <button className={styles.button} onClick={() => setCode(wrongCode)}>
                    Começar de novo
                </button>
            </div>
        </section>
    );
}
