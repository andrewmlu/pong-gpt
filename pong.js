// GPT-3.5 V4

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 4;
var brickColumnCount = 6;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 5;
var brickOffsetTop = 30;
var brickOffsetLeft = (canvas.width-(brickWidth+brickPadding)*brickColumnCount+brickPadding)/2;
var bricks = [];

var score = 0;

var paused = false;

for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", spacebarHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function spacebarHandler(e) {
    if(e.keyCode == 32) {
        paused = !paused;
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("You win! Congratulations!");
                        document.location.reload();
                    }
                }
            }
        }
    }

    if(x > paddleX && x < paddleX + paddleWidth) {
        if(y + dy > canvas.height - paddleHeight - ballRadius) {
            var collisionPoint = x - (paddleX + paddleWidth / 2);
            collisionPoint = collisionPoint / (paddleWidth / 2);
            var angle = collisionPoint * Math.PI / 3;
            dy = -dy;
            dx = dx + 0.3 * Math.sin(angle);
        }
    }
}


function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#fff";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function draw() {
    if (!paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        collisionDetection();

        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                // Game over modal
                document.getElementById("gameOverModal").style.display = "block";
                document.getElementById("gameOverScore").textContent = score;
                clearInterval(interval);
            }
        }

        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;
    }
}

var interval = setInterval(draw, 10);

// Event listeners for game over modal buttons
document.getElementById("restartGame").addEventListener("click", function(){
    document.location.reload();
});

document.getElementById("quitGame").addEventListener("click", function(){
    document.getElementById("gameOverModal").style.display = "none";
});


// setInterval(draw, 15);



// GPT-3.5 V3

// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");

// var ballRadius = 10;
// var x = canvas.width/2;
// var y = canvas.height-30;
// var dx = 2;
// var dy = -2;

// var paddleHeight = 10;
// var paddleWidth = 75;
// var paddleX = (canvas.width-paddleWidth)/2;

// var rightPressed = false;
// var leftPressed = false;

// var brickRowCount = 3;
// var brickColumnCount = 5;
// var brickWidth = 75;
// var brickHeight = 20;
// var brickPadding = 10;
// var brickOffsetTop = 30;
// var brickOffsetLeft = 30;
// var bricks = [];

// var score = 0;

// var paused = false;

// for(var c=0; c<brickColumnCount; c++) {
//     bricks[c] = [];
//     for(var r=0; r<brickRowCount; r++) {
//         bricks[c][r] = { x: 0, y: 0, status: 1 };
//     }
// }

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
// document.getElementById("restartButton").addEventListener("click", function(){
//     document.location.reload();
// });

// function keyDownHandler(e) {
//     if(e.keyCode == 39) {
//         rightPressed = true;
//     }
//     else if(e.keyCode == 37) {
//         leftPressed = true;
//     }
// }

// function keyUpHandler(e) {
//     if(e.keyCode == 39) {
//         rightPressed = false;
//     }
//     else if(e.keyCode == 37) {
//         leftPressed = false;
//     }
// }

// function collisionDetection() {
//     for(var c=0; c<brickColumnCount; c++) {
//         for(var r=0; r<brickRowCount; r++) {
//             var b = bricks[c][r];
//             if(b.status == 1) {
//                 if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
//                     dy = -dy;
//                     b.status = 0;
//                     score++;
//                     if(score == brickRowCount*brickColumnCount) {
//                         alert("YOU WIN, CONGRATULATIONS!");
//                         document.location.reload();
//                     }
//                 }
//             }
//         }
//     }
// }

// function drawScore() {
//     ctx.font = "16px Arial";
//     ctx.fillStyle = "#0095DD";
//     ctx.fillText("Score: "+score, 8, 20);
// }

// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }

// function drawPaddle() {
//     ctx.beginPath();
//     ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }

// function drawBricks() {
//     for(var c=0; c<brickColumnCount; c++) {
//         for(var r=0; r<brickRowCount; r++) {
//             if(bricks[c][r].status== 1) {
//                 var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
//                 var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
//                 bricks[c][r].x = brickX;
//                 bricks[c][r].y = brickY;
//                 ctx.beginPath();
//                 ctx.rect(brickX, brickY, brickWidth, brickHeight);
//                 ctx.fillStyle = "#0095DD";
//                 ctx.fill();
//                 ctx.closePath();
//             }
//         }
//     }
// }

// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBricks();
//     drawBall();
//     drawPaddle();
//     drawScore();
//     collisionDetection();
//     if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//     }
//     if(y + dy < ballRadius) {
//         dy = -dy;
//     }
//     else if(y + dy > canvas.height-ballRadius) {
//         if(x > paddleX && x < paddleX + paddleWidth) {
//             dy = -dy;
//         }
//         else {
//             alert("GAME OVER");
//             document.location.reload();
//         }
//     }

//     if(rightPressed && paddleX < canvas.width-paddleWidth) {
//         paddleX += 7;
//     }
//     else if(leftPressed && paddleX > 0) {
//         paddleX -= 7;
//     }

//     x += dx;
//     y += dy;
// }

// setInterval(draw, 10);


// GPT-3.5 VERSION 1

// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");

// var ballRadius = 10;
// var x = canvas.width/2;
// var y = canvas.height-30;
// var dx = 2;
// var dy = -2;

// var paddleHeight = 10;
// var paddleWidth = 75;
// var paddleX = (canvas.width-paddleWidth)/2;

// var rightPressed = false;
// var leftPressed = false;

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

// function keyDownHandler(e) {
//     if(e.keyCode == 39) {
//         rightPressed = true;
//     }
//     else if(e.keyCode == 37) {
//         leftPressed = true;
//     }
// }

// function keyUpHandler(e) {
//     if(e.keyCode == 39) {
//         rightPressed = false;
//     }
//     else if(e.keyCode == 37) {
//         leftPressed = false;
//     }
// }

// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }

// function drawPaddle() {
//     ctx.beginPath();
//     ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }

// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//     drawPaddle();

//     if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//     }
//     if(y + dy < ballRadius) {
//         dy = -dy;
//     }
//     else if(y + dy > canvas.height-ballRadius) {
//         if(x > paddleX && x < paddleX + paddleWidth) {
//             dy = -dy;
//         }
//         else {
//             alert("GAME OVER");
//             document.location.reload();
//         }
//     }

//     if(rightPressed && paddleX < canvas.width-paddleWidth) {
//         paddleX += 7;
//     }
//     else if(leftPressed && paddleX > 0) {
//         paddleX -= 7;
//     }

//     x += dx;
//     y += dy;
// }

// setInterval(draw, 10);
