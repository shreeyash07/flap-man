// canvas design





function draw() {
    
    background.draw();
    pipes.draw();
    foreground.draw();
    bird.draw();
    getReady.draw();
    getReadyTap.draw();
    getReadyTitle.draw();
    gameOver.draw();
    scoreBoard.draw();
    playBtn.draw();
    score.draw();
    
}
function update(){

    bird.update();
    background2.update();
    background.update();
    foreground.update();
    pipes.update();
}
function loop(){
    update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}

loop();


