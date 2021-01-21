
canvas.addEventListener("click", function(evt){
    switch(state.current){
        case state.getReady:
            state.current = state.game;
            
            break;
        case state.game:
            if(bird.y - bird.radius <= 0) return;
            bird.flap();
            
            break;
        case state.over:
            let rect = canvas.getBoundingClientRect();
            let clickX = evt.clientX - rect.left;
            let clickY = evt.clientY - rect.top;
            
            if(clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h){
                pipes.reset();
                bird.speedReset();
                score.reset();
                state.current = state.getReady;
                console.log(clickX, clickY)
            }
            break;
    }
});