import confetti from 'canvas-confetti';

const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30
};

export default async function shoot(x: number, y: number) {
    await confetti({
        ...defaults,
        particleCount: 50,
        scalar: 1.2,
        shapes: ['circle', 'square'],
        colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
        origin: { x: x / window.innerWidth, y: y / window.innerHeight }
    });

    const scalar = 2;
    const unicorn = confetti.shapeFromText({ text: '🦄', scalar });
    const rainbow = confetti.shapeFromText({ text: '🌈', scalar });

    await confetti({
        ...defaults,
        particleCount: 30,
        scalar: 2,
        shapes: [unicorn, rainbow],
        origin: { x: x / window.innerWidth, y: y / window.innerHeight }
    });
}
