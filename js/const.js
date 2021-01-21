canvas = document.getElementById('flappy');
context = canvas.getContext('2d');

canvas.style.border = "1px solid #000000"
canvas.style.display = 'block'
canvas.style.margin = 'auto'

let frames = 0;
const DEGREE = Math.PI/180;

const sprite = new Image();
sprite.src = './images/flapman.png'

const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2
}

const startBtn = {
    x : 100,
    y : 280,
    w : 120,
    h : 59
}