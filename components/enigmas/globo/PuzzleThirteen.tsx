import { useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';
import Switch from '@components/_ui/Switch/Switch';

export default function Puzzle() {
    const [switchOne, setSwitchOne] = useState(0);

    const handleSwitchOne = (isChecked: boolean) => {
        if (isChecked === false) {
            setSwitchOne(switchOne + 1);
        }
    };

    return (
        <PuzzleLayout>
            <Switch onToggle={handleSwitchOne} size="3" />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    alignItems: 'center'
                }}
            >
                {switchOne > 2 && <img src="/images/enigmas/globo/13.png" />}
                {switchOne > 1 && (
                    <div style={{ width: '60%' }}>
                        O zero em oposição ao um. A completa ausência de anima, de movimento. O que
                        se passa quando o botão é acionado e a energia cessa.
                    </div>
                )}
            </div>
        </PuzzleLayout>
    );
}
