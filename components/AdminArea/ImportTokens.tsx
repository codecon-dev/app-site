import { useState } from 'react';
import styles from './AdminArea.module.scss';

export default function ImportTokens() {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) setFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);

            if (!file) {
                throw new Error('Selecione um arquivo');
            }

            const formData = new FormData();
            formData.append('csv', file);

            const response = await fetch('/api/codecodes/import', {
                method: 'POST',
                body: formData
            }).then(res => res.json());

            setLoading(false);

            if (!response.success) {
                throw new Error(response.message as string);
            }

            alert(response.message);

            setFile(null);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <h2>Importar tokens</h2>
            <form className={styles.form} onSubmit={e => void handleSubmit(e)}>
                <label htmlFor="file">Selecione um arquivo CSV:</label>
                <p>
                    Colunas obrigatórias: 'Token', 'Descrição', 'Pontos', 'Quanto pontos diminui por
                    resgate', 'Pontos mínimos de resgate', 'Número máximo de resgates', 'Data de
                    expiração'
                </p>
                <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    required
                />
                <button disabled={loading} type="submit">
                    {loading ? 'Importing...' : 'Import'}
                </button>
            </form>
        </div>
    );
}
