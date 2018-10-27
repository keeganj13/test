function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = 1;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];
  
  this.update = function() {
    if(this.total === this.tail.length) {
      for(var i = 0; i < this.tail.length-1; i++) {
        this.tail[i] = this.tail[i+1];
      }
    }
    this.tail[this.total-1] = {
      x: this.x,
      y: this.y
    };
    
    this.x += this.xSpeed*box;
    this.y += this.ySpeed*box;
    
    if(this.x <= 0) {
      this.x = 0;
    } 
    if(this.x+box>=canvas.width) {
      this.x = canvas.width-box;
    } 
    if(this.y <= 0 ) {
      this.y = 0;
    } 
    if(this.y+box>=canvas.height) {
      this.y = canvas.height-box;
    }
  }
  
  this.dir = function(x, y) {
    this.xSpeed = x;
    this.ySpeed = y;
  }
  
  this.show = function() {
    for(var i = 0; i < this.tail.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.rect(this.tail[i].x, this.tail[i].y, box, box);
      ctx.fill();
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(this.x, this.y, box, box);
    ctx.fill();
    ctx.stroke();
  }
  
  this.eat = function(food) {
    var a = diff(this.x, food.x);
    var b = diff(this.y, food.y);
    var d = Math.sqrt(a*a + b*b);
    return (d < 1);
  }
  
  this.death = function() {
    for(var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var a = diff(this.x, pos.x);
      var b = diff(this.y, pos.y);
      var dist = Math.sqrt(a*a+b*b);
      if(dist < 1) {
        this.total = 0;
        this.tail = [];
      }
    }
  }
}

function diff(a, b) {
  if(a > b) {
    return a - b;
  } else {
    return b - a;
  }
}