const pipes = {
    position : [],
    
    top : {
        sX : 112,
        sY : 646
    },
    bottom:{
        sX : 168,
        sY : 646
    },
    
    w : 53,
    h : 322,
    gap : 120,
    maxYPos : -150,
    dx : 2,
    
    draw : function(){
        for(let i  = 0; i < this.position.length; i++){
            let p = this.position[i];
            
            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;
            context.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h); 
            context.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);  
        }
    },
    
    update: function(){
        if(state.current !== state.game) return;
        
        if(frames%100 == 0){
            this.position.push({
                x : canvas.width - 10,
                y : this.maxYPos * ( Math.random() + 1)
            });
            console.log('pipe')
        }
        for(let i = 0; i < this.position.length; i++){
            let p = this.position[i];
            
            let bottomPipeYPos = p.y + this.h + this.gap;
            
            // COLLISION DETECTION
            if(bird.x + bird.radius > p.x
                && bird.x - bird.radius < p.x + this.w
                && bird.y + bird.radius > p.y 
                && bird.y - bird.radius < p.y + this.h){
                state.current = state.over;
                
            }
            // BOTTOM PIPE
            if(bird.x + bird.radius > p.x 
                && bird.x - bird.radius < p.x + this.w 
                && bird.y + bird.radius > bottomPipeYPos 
                && bird.y - bird.radius < bottomPipeYPos + this.h){
                state.current = state.over;
                
            }
            

            p.x -= this.dx;
            if(p.x + this.w <= 0){
                this.position.shift();
                score.value += 1;
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    },
    
    reset : function(){
        this.position = [];
    }
    
}