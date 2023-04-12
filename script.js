let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');

let backGround = new Image();
backGround.src = 'image/background.png';

let foodImage = new Image();
foodImage.src = 'image/food.png';

let snakeHead = new Image();
snakeHead.src = 'image/snakeHead.png';



let box = 32;
let score = 0;
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
};
let snake = []
snake[0] = {
    x: 9 * box,
    y: 10  * box
}

let dir = null ;

window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && dir !== 'right') {
        dir = 'left';
    } else if (event.key === 'ArrowUp' && dir !== 'down') {
        dir = 'up';
    } else if (event.key === 'ArrowRight' && dir !== 'left') {
        dir = 'right';
    } else if (event.key === 'ArrowDown' && dir !== 'up') {
        dir = 'down';
    }
});

function eatTale (head, arr){
    for(let i =0; i<arr.length; i++){
        if(head.x === arr[i].x  && head.y === arr[i].y){
            clearInterval(interval)
            tryAgain ()
        }
    }
}

function drawGame() {
    ctx.drawImage(backGround, 0, 0);
    ctx.drawImage(foodImage, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        // Change the color of the head and body of the snake
        if (i === 0) {
            ctx.fillStyle = 'orange';
        } else {
            ctx.fillStyle = 'purple';
        }
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Check if the snake has hit the walls
    if (
        snakeX < box ||
        snakeX > box * 17 ||
        snakeY < 3 * box ||
        snakeY > box * 17
    ) {
        clearInterval(interval);
        tryAgain()
    }

    // Move the snake in the chosen direction
    if (dir === 'left') {
        snakeX -= box;
    } else if (dir === 'up') {
        snakeY -= box;
    } else if (dir === 'right') {
        snakeX += box;
    } else if (dir === 'down') {
        snakeY += box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    eatTale(newHead, snake)
    // Check if the snake has eaten the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        };
    } else {
        snake.pop();
    }
    snake.unshift(newHead);
}

function tryAgain (){
    clearInterval(interval);

    // Reset variables to initial values
    score = 0;
    dir = null;
    snake = [];
    snake[0] = {
      x: 9 * box,
      y: 10  * box
    };
  
    // Call setInterval to start the game loop again
    interval = setInterval(drawGame, 100);

}

let interval = setInterval(drawGame, 100);