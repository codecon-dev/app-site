import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const LogoutPage = () => {
    const router = useRouter();

    useEffect(() => {
        async function logout() {
            try {
                await axios.delete('/api/login/auth'); // Faz uma chamada DELETE para o endpoint /api/auth
                await router.push('/'); // Redireciona para a página de login após o logout
            } catch (error) {
                console.error('Erro ao fazer logout:', error);
            }
        }

        void logout();
    }, [router]);

    return null; // Página vazia, já que o redirecionamento é feito no useEffect
};

export default LogoutPage;
