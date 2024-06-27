/* eslint-disable @typescript-eslint/no-misused-promises */
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import ApiResponse from 'src/api/ApiResponse';
import { ConfAttendee } from '@lib/types/all';
import styles from './TermsModal.module.scss';

export default function TermsModal({
    attendeeUuid,
    onAccept
}: {
    attendeeUuid: string;
    onAccept: (data: ConfAttendee) => void;
}) {
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        const response = await fetch(`/api/login/accept-terms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ attendeeUuid })
        });

        const json = await response.json();
        const { data, success, message }: ApiResponse = json;

        if (!success) {
            toast.error(message.join('\n'));
            return;
        }

        toast.success('Obrigado e bom evento!');
        onAccept(data as ConfAttendee);
        setIsLoading(false);
    }

    return (
        <div className={styles.modal}>
            <form className={styles.form} onSubmit={e => handleSubmit(e)}>
                <main>
                    <h3>Aceite os termos para participar</h3>
                    <p>
                        Ao fazer login aqui, você estará automaticamente participando do{' '}
                        <strong>Code-codes</strong>, nosso jogo de caça aos tokens secretos. Durante
                        o evento você vai poder resgatar códigos que valerão pontos no ranking geral
                        e os 10 primeiros ganham prêmios.
                    </p>
                    <p>
                        Esse jogo foi criado para que você participe o máximo possível do evento,
                        por isso os tokens podem ser regatados de várias formas: participando de
                        atividades, encontrando códigos espalhados pelo mapa, pegar códigos que os
                        hosts podem divulgar durante as apresentações e vários outros escondidos.
                    </p>
                    <p>
                        O resgate é feito pelo QR Code da sua credencial, nele você poderá digitar
                        um código para resgatá-lo. Algumas atividades também contarão com resgate
                        automático, mas você sempre será avisado.
                    </p>
                    <p>
                        Ao aceitar estes termos você entende que este jogo não aceita trapaças ou
                        formas de tentar resgatar códigos tentando burlar o sistema. A organização
                        tem o direito de remover os pontos que foram identificados como fraudulentos
                        ou até te excluir da competição.
                    </p>
                    <p>Jogue de boa, tente encontrar os tokens escondidos e boa sorte!</p>
                </main>
                <button className={styles.button} type="submit">
                    {isLoading ? 'Enviando...' : 'Aceitar os termos e continuar'}
                </button>
            </form>
        </div>
    );
}
