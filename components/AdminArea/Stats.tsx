import { use, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

import { Grid, Column } from '@components/_ui/Grid';
import { GeneralStats } from '@lib/types/codecodes';

import styles from './AdminArea.module.scss';
import ApiResponse from 'src/api/ApiResponse';

export default function Stats() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<GeneralStats | null>(null);

    useEffect(() => {
        async function getStats() {
            const response = await fetch('/api/codecodes/stats', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();
            const { data, success }: ApiResponse = json;

            if (success) {
                setStats(data as GeneralStats);
            }

            setLoading(false);
        }

        void getStats();
    }, []);

    useEffect(() => {
        if (stats) {
            new Chart('claimsPerDate', {
                type: 'line',
                data: {
                    labels: stats.claimsPerDate.map(item => {
                        const splitted = item.date.split('-');
                        return `${splitted[2]}/${splitted[1]}/${splitted[0]} ${splitted[3]}:00`;
                    }),
                    datasets: [
                        {
                            label: 'Resgates por hora',
                            data: stats.claimsPerDate.map(item => item.count),
                            fill: true,
                            borderColor: '#8800FF',
                            tension: 0.1
                        }
                    ]
                }
            });
        }
    }, [stats]);

    if (loading) {
        return <div className={styles.loading} />;
    }

    return (
        <Grid align="start">
            <Column lg={4}>
                <div className={styles.card}>
                    <span>🎫 Qtde de tokens</span>
                    {stats?.tokensQuantity.toLocaleString('pt-BR')}
                </div>
            </Column>
            <Column lg={4}>
                <div className={styles.card}>
                    <span>🪝 Qtde de resgates</span>
                    {stats?.totalClaims.toLocaleString('pt-BR')}
                </div>
            </Column>
            <Column lg={4}>
                <div className={styles.card}>
                    <span>👤 Usuários ativos</span>
                    {stats?.usersQuantity.toLocaleString('pt-BR')}
                </div>
            </Column>
            <Column lg={4}>
                <div className={styles.card}>
                    <span>⭐ Tokens já resgatados</span>
                    {stats?.tokensWithClaims.toLocaleString('pt-BR')}
                </div>
            </Column>
            <Column lg={4}>
                <div className={styles.card}>
                    <span>📊 Resgate/token</span>
                    {stats?.tokensWithClaims
                        ? (stats.totalClaims / stats.tokensWithClaims).toFixed(2)
                        : 0}
                </div>
            </Column>
            <Column lg={4}>
                <div className={styles.card}>
                    <span>🌚 Tokens sem resgate</span>
                    {stats?.tokensWithNoClaims.toLocaleString('pt-BR')}
                </div>
            </Column>
            <Column lg={12}>
                <div className={styles.card}>
                    <span>Resgates por hora</span>
                    <canvas id="claimsPerDate" />
                </div>
            </Column>
            <Column lg={6}>
                <div className={styles.card}>
                    <span>
                        <strong>👀 10 resgates mais recentes</strong>
                    </span>

                    <ol>
                        {stats?.latestClaimedTokens.slice(0, 10).map((token, index) => (
                            <li key={index}>
                                📌 {token.code}
                                <span>
                                    Resgatado por {token.claimedBy.tag} -{' '}
                                    {new Date(token.claimedBy.claimedAt as string).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
            </Column>
            <Column lg={6}>
                <div className={styles.card}>
                    <span>
                        <strong>🔥 Top 20 token mais resgatados</strong>
                    </span>

                    <ol>
                        {stats?.tokensByClaimQuantity.slice(0, 20).map((token, index) => (
                            <li key={index}>{token}</li>
                        ))}
                    </ol>
                </div>
            </Column>
        </Grid>
    );
}
