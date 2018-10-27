var canvas = document.getElementById("game");
var score = 0;
var sc = document.getElementById("sC");
sc.innerHTML = "Score: "+score;
var ctx = canvas.getContext("2d");

var gs = 20;
var chanceToSpawn;

var hero = new Hero();
var lasers = [];
var asteroids = [];

var gameOver = false;

function draw() {
    for(var i in asteroids) {
        if(asteroids[i].y + asteroids[i].r > canvas.height) {
            gameOver = true;
        }
    }
    if(gameOver === true) {
        $("#popup, #popup h1, #overlay").css("opacity", "1");
        return;
    }
    chanceToSpawn = Math.random()*200;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(chanceToSpawn > 199) {
        var a = new Asteroid();
        asteroids.push(a);
        chanceToSpawn = Math.random()*200;
    }
    for(var i = 0; i < asteroids.length; i++) {
        asteroids[i].update();
    }
    for(var i = 0; i < lasers.length; i++) {
        lasers[i].update();
        for(var j = 0; j < asteroids.length; j++) {
            if(intersects(lasers[i], asteroids[j]) === true) {
                asteroids[j].hidden = true;
                lasers[i].hidden = true;
                score++;
                sc.innerHTML = "Score: "+score;
            }
        }
    }
    
    for(var i in asteroids) {
        if(asteroids[i].hidden === true) {
            asteroids.splice(i, 1);
        } else {
            asteroids[i].show();
        }
    }
    
    for(var i in lasers) {
        if(lasers[i]+lasers[i].height < 0 || lasers[i].hidden === true) {
            lasers.splice(i, 1);
        } else {
            lasers[i].show();
        }
    }
    hero.show();
    requestAnimationFrame(draw);
}

draw();

document.addEventListener('keydown', (e) => {
    const keyName = e.key;
    switch(keyName) {
        case " ":
            hero.shoot();
            break;
        case "d":
            hero.x += canvas.width/gs;
            break;
        case "a":
            hero.x -= canvas.width/gs;
            break;
    }
});

function intersects(a, b) {
    var dX = b.x - a.x;
    var dY = b.y - a.y;
    var d = Math.sqrt(dX*dX + dY*dY);
    return (d < b.r);
}
