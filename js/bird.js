
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
        
        this.period = state.current == state.getReady ? 10 : 5;
        this.frame += frames%this.period == 0 ? 1 : 0;
        this.frame = this.frame%this.animation.length;
        
        if(state.current == state.getReady){
            this.y = 150;
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