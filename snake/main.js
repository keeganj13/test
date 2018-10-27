var up = document.getElementById("up");
var down = document.getElementById("down");
var left = document.getElementById("left");
var right = document.getElementById("right");

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var hammertime = new Hammer(canvas);
hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
hammertime.on('swipeleft', function() {
  if(s.xSpeed === 1 && s.total > 0) return;
  s.dir(-1, 0);
});
hammertime.on('swiperight', function() {
  if(s.xSpeed === -1 && s.total > 0) return;
  s.dir(1, 0);
});
hammertime.on('swipeup', function() {
  if(s.ySpeed === 1 && s.total > 0) return;
  s.dir(0, -1);
});
hammertime.on('swipedown', function() {
  if(s.ySpeed === -1 && s.total > 0) return;
  s.dir(0, 1);
});

var s = new Snake();
var box = 20;
var food = {
  x: Math.floor(Math.random()*canvas.width/box)*box, 
  y: Math.floor(Math.random()*canvas.width/box)*box
};

pickLocation();


var fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  
  then = Date.now();
  startTime = then;
  draw();
}

startAnimating(10);

up.addEventListener("click", function() {
  if(s.ySpeed === 1 && s.total > 0) return;
  s.dir(0, -1);
});
down.addEventListener("click", function() {
  if(s.ySpeed === -1 && s.total > 0) return;
  s.dir(0, 1);
});
left.addEventListener("click", function() {
  if(s.xSpeed === 1 && s.total > 0) return;
  s.dir(-1, 0);
});
right.addEventListener("click", function() {
  if(s.xSpeed === -1 && s.total > 0) return;
  s.dir(1, 0);
});

function draw() {
  requestAnimationFrame(draw);
  now = Date.now();
  elapsed = now - then;
  if(elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    s.death();
    s.update();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    s.show();
    s.eat(food);
    if(s.eat(food) === true) {
      pickLocation();
      s.total++;
    }
    ctx.beginPath();
    ctx.fillStyle = "#ff006e";
    ctx.strokeStyle = "#333";
    ctx.rect(food.x, food.y, box, box);
    ctx.fill();
    ctx.stroke();
  }
}

function pickLocation() {
  food.x = Math.floor(Math.random()*canvas.width/box)*box;
  food.y = Math.floor(Math.random()*canvas.height/box)*box;
  if(food.x < 0) {
    food.x = 0;
  }
  if(food.x+box>canvas.width) {
    food.x = canvas.width-box;
  }
  if(food.y < 0) {
    food.y = 0;
  }
  if(food.y+box>canvas.height) {
    food.y = canvas.height-box;
  }
  for(var i = 0; i < s.tail.length; i++) {
    var pos = s.tail[i];
    var a = diff(food.x, pos.x);
    var b = diff(food.y, pos.y);
    var dist = Math.sqrt(a*a+b*b);
    while(dist < 0) {
      food.x = Math.floor(Math.random()*canvas.width/box)*box;
  food.y = Math.floor(Math.random()*canvas.height/box)*box;
    }
  }
  
}