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
            
        }
        else if(state.current == state.over){

            context.font = "25px Teko";
            context.fillText(this.value, 225, 186);
            context.strokeText(this.value, 225, 186);
            context.fillText(this.best, 225, 228);
            context.strokeText(this.best, 225, 228);
        }
    },
    
    reset : function(){
        this.value = 0;
    }
}