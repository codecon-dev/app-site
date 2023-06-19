import PuzzleLayout from '../PuzzleLayout';

export default function Puzzle() {
    return (
        <PuzzleLayout>
            <img src="/images/enigmas/globo/10.jpg" />
            <div
                className="text-center"
                style={{ margin: '2rem 12rem 1rem', fontSize: '20px', lineHeight: '200%' }}
            >
                Porção de chão onde se repousa a maior parte da vida (ou se deveria). Com o passar
                da história da espécie, foi relegada a alguns poucos sortudos por disputa de metais
                (posteriormente tornados plásticos) preciosos.
            </div>
        </PuzzleLayout>
    );
}
