import { useState } from 'react';
import PuzzleLayout from '../PuzzleLayout';
import Switch from '@components/_ui/Switch/Switch';

export default function Puzzle() {
    const [switchOne, setSwitchOne] = useState(false);
    const [switchTwo, setSwitchTwo] = useState(false);

    const handleSwitchOne = (isChecked: boolean) => {
        setSwitchOne(isChecked);
    };

    const handleSwitchTwo = (isChecked: boolean) => {
        setSwitchTwo(isChecked);
    };

    console.log(switchOne, switchTwo);

    return (
        <PuzzleLayout>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'space-around'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5rem',
                        margin: '2rem 0'
                    }}
                >
                    <Switch onToggle={handleSwitchOne} size="3" />
                    <Switch onToggle={handleSwitchTwo} size="3" />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        alignItems: 'center'
                    }}
                >
                    <img src="/images/enigmas/globo/13.png" />
                    <div style={{ width: '60%' }}>
                        O zero em oposição ao um. A completa ausência de anima, de movimento. O que
                        se passa quando o botão é acionado e a energia cessa.
                    </div>
                </div>
            </div>
        </PuzzleLayout>
    );
}
