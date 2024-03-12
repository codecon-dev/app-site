/* eslint-disable @next/next/no-img-element */
import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    return (
        <PuzzleLayout>
            <div style={{ position: 'relative' }}>
                <div
                    onClick={() =>
                        console.log(
                            'bate outra vez\no desespero da escalação\npois já vai chegando o rodadão\nem um minuto\n\nVolto ao dashboard\ncom a certeza que devo chorar\npois bem sei que vou desvalorizar\nassim\n\nQueixo-me às telas\nmas que bobagemas telas não falam\nsimplesmente as telas te mostram\no time recomendado por ti, ai...'
                        )
                    }
                    style={{
                        position: 'absolute',
                        top: '112px',
                        right: '80px',
                        height: '105px',
                        width: '92px'
                    }}
                ></div>
                <img src="/images/enigmas/globo/2.png" />
            </div>
        </PuzzleLayout>
    );
}
