const padNames = {
    Q: 'Heater 1',
    W: 'Heater 2',
    E: 'Heater 3',
    A: 'Heater 4',
    S: 'Clap',
    D: 'Open-HH',
    Z: "Kick-n'-Hat",
    X: 'Kick',
    C: 'Closed-HH'
};

function triggerPad(key) {
    const audio = document.getElementById(key);
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();

    document.getElementById('display').textContent = padNames[key];

    const pad = audio.parentElement;
    pad.classList.add('drum-pad-active');
    setTimeout(() => pad.classList.remove('drum-pad-active'), 150);
}

document.getElementById('pad-bank').addEventListener('click', (e) => {
    const pad = e.target.closest('.drum-pad');
    if (!pad) return;
    const key = pad.querySelector('.clip').id;
    triggerPad(key);
});

document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    if (padNames[key]) triggerPad(key);
});
