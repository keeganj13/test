function Hero() {
    this.x = Math.round(canvas.width/2/gs) * gs;
    this.y = canvas.height - canvas.height/gs;
    
    this.canShoot = function() {
        for(var i = 0; i < lasers.length; i++) {
            if(lasers[i].y+lasers[i].height > canvas.height * 3/4) {
                return false;
            }
        }
        return true;
    }
    
    this.show = function() {
        if(this.x<0) {
            this.x = 0;
        }
        if(this.x + canvas.width/gs > canvas.width) {
            this.x = canvas.width - canvas.width/gs;
        }
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 0, 100)";
        ctx.rect(this.x, this.y, canvas.width/gs, canvas.height/gs);
        ctx.fill();
    }
    this.shoot = function() {
        if(this.canShoot() === null) {
            this.canShoot() = true;
        }
        if(this.canShoot() === false) {
            return;
        } else {
            l = new Laser(this.x);
            lasers.push(l);
            l.show();
        }
    }
}
