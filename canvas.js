// canvas design
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

canvas.addEventListener("click", function(evt){
    switch(state.current){
        case state.getReady:
            state.current = state.game;
            // SWOOSHING.play();
            break;
        case state.game:
            if(bird.y - bird.radius <= 0) return;
            bird.flap();
            // FLAP.play();
            break;
        case state.over:
            let rect = canvas.getBoundingClientRect();
            let clickX = evt.clientX - rect.left;
            let clickY = evt.clientY - rect.top;
            
            // CHECK IF WE CLICK ON THE START BUTTON
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

const background = {
    sX : 292,
    sY : 0,
    w : 288,
    h : 512,
    x : 0,
    y: -20,

    dx:2,

    draw : function(){
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h); 
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w , this.y, this.w, this.h); 
    },
    update: function(){
        if(state.current == state.game){
            this.x = (this.x - this.dx)%(this.w/2);
        }
    }
}
const background2 = {
    sX : 0,
    sY : 0,
    w : 288,
    h : 512,
    x : 0,
    y: -20,
    dx:2,
    draw : function(){
         
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w , this.y, this.w, this.h); 
    },

    update: function(){
        if(state.current == state.game){
            this.x = (this.x - this.dx)%(this.w/2);
        }
    }
}

const foreground = {
    sX : 584,
    sY : 0,
    w : 334,
    h : 113,
    x : 0,
    y: 389,

    dx:2,

      draw : function(){
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    },
    
    update: function(){
        if(state.current == state.game){
            this.x = (this.x - this.dx)%(this.w/2);
        }
    }
}


const bird = {
    animation:[
        {sX : 0, sY : 976,},
        {sX : 52, sY : 976,},
        {sX : 111, sY : 976,},
        {sX : 52, sY : 976,},
    ],
    sX : 52,
    sY : 976,
    w : 45,
    h : 35,
    x : 50,
    y : 150,

    radius : 12,
    
    frame : 0,
    
    gravity : 0.25,
    jump : 4.6,
    speed : 0,
    rotation : 0,

    draw : function(){
        let bird = this.animation[this.frame];
        
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.drawImage(sprite, bird.sX, bird.sY, this.w, this.h,- this.w/2, - this.h/2, this.w, this.h);
        
        context.restore();
    },
    
    flap : function(){
        this.speed =- this.jump;
    },
    
    update : function(){
        // IF THE GAME STATE IS GET READY STATE, THE BIRD MUST FLAP SLOWLY
        this.period = state.current == state.getReady ? 10 : 5;
        // WE INCREMENT THE FRAME BY 1, EACH PERIOD
        this.frame += frames%this.period == 0 ? 1 : 0;
        // FRAME GOES FROM 0 To 4, THEN AGAIN TO 0
        this.frame = this.frame%this.animation.length;
        
        if(state.current == state.getReady){
            this.y = 150; // RESET POSITION OF THE BIRD AFTER GAME OVER
            this.rotation = 0 * DEGREE;
        }else{
            this.speed += this.gravity;
            this.y += this.speed;
            
            if(this.y + this.h/2 >= canvas.height - foreground.h){
                this.y = canvas.height - foreground.h - this.h/2 +15;
                if(state.current == state.game){
                    state.current = state.over;
                    
                }
            }
            
            // IF THE SPEED IS GREATER THAN THE JUMP MEANS THE BIRD IS FALLING DOWN
            if(this.speed >= this.jump){
                this.rotation = 90 * DEGREE;
                this.frame = 1;
            }else{
                this.rotation = -25 * DEGREE;
            }
        }
        
    },
    speedReset : function(){
        this.speed = 0;
    }
}

const getReadyTap ={
    sX : 584,
    sY : 181,
    w : 116,
    h : 101,
    x : canvas.width/2 - 116/2,
    y : 150,

   draw: function(){
        if(state.current == state.getReady){
            context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
} 

const getReady ={
    sX : 590,
    sY : 118,
    w : 186,
    h : 51,
    x : canvas.width/2 - 186/2,
    y : 270,

    draw: function(){
        if(state.current == state.getReady){
            context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
} 

const getReadyTitle ={
    sX : 701,
    sY : 182,
    w : 148,
    h : 50,
    x : canvas.width/2 - 148/2,
    y : 80,

    draw: function(){
        if(state.current == state.getReady){
            context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}

const gameOver ={
    sX : 790,
    sY : 118,
    w : 193,
    h : 44,
    x : canvas.width/2 - 186/2,
    y : 70,

    draw: function(){
        if(state.current == state.over){
            context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);   
        }
    }
}

const scoreBoard ={
    sX : 6,
    sY : 518,
    w : 227,
    h : 116,
    x : canvas.width/2 - 227/2,
    y : 140,

    draw: function(){
        if(state.current == state.over){
            context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);   
        }
    }
}

const playBtn ={
    sX : 703,
    sY : 237,
    w : 120,
    h : 59,
    x : canvas.width/2 - 120/2,
    y : 270,

    draw: function(){
        if(state.current == state.over){
            context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);   
        }
    }
}



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
            
            // top pipe
            context.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);  
            
            // bottom pipe
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
            // TOP PIPE
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
            
            // MOVE THE PIPES TO THE LEFT
            p.x -= this.dx;
            
            // if the pipes go beyond canvas, we delete them from the array
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

// SCORE
const score= {
    best : parseInt(localStorage.getItem("best")) || 0,
    value : 0,
    
    draw : function(){
        context.fillStyle = "#FFF";
        context.strokeStyle = "#000";
        
        if(state.current == state.game){
            context.lineWidth = 2;
            context.font = "35px Teko";
            context.fillText(this.value, canvas.width/2, 50);
            context.strokeText(this.value, canvas.width/2, 50);
            
        }else if(state.current == state.over){
            // SCORE VALUE
            context.font = "25px Teko";
            context.fillText(this.value, 225, 186);
            context.strokeText(this.value, 225, 186);
            // BEST SCORE
            context.fillText(this.best, 225, 228);
            context.strokeText(this.best, 225, 228);
        }
    },
    
    reset : function(){
        this.value = 0;
    }
}

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


