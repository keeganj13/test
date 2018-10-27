function Laser(x) {
    this.height = 2*canvas.height/gs;
    this.x = x + canvas.width/gs/2 - 1;
    this.y = canvas.height-this.height-canvas.height/gs;
    this.hidden = false;
    
    this.show = function() {
        if(this.hidden === false) {
            ctx.beginPath();
            ctx.fillStyle = "lime";
            ctx.rect(this.x, this.y, 2, this.height);
            ctx.fill();
        } 
    }
    this.update = function() {
        this.y -= 2;
    }
}
