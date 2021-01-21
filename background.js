
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