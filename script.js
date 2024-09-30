const gameBoard = document.getElementById('gameboard');
const context = gameBoard.getContext('2d');
const gifImage = new Image();

const WIDTH = 1000;
const HEIGHT = 500;
const UNIT = 100;

scoreInc=10;

let corner = [0, 50, 100, 150, 200, 250, 300, 350];

let birds = Array.from({ length: 3 }, () => ({
    x: 0,
    y: Math.random() * (HEIGHT - UNIT),
    speed: Math.random() *1 + 1 
}));

let start = false;

const bgMusic = document.getElementById('audio2'); 


const btn =document.getElementById('button')
btn.addEventListener('click',function(){
    const bgMusic = document.getElementById('audio2');
    bgMusic.currentTime = 0; 
        bgMusic.play(); 
     button.style.display = 'none';
    start=true;
    game();

});

function game(){
    gifImage.src = 'bird1.png';
    gifImage.onload = function () {
        if(start){
            animate();
            setInterval(addBird, 1000);
        }
    };
}

function animate() {
    context.clearRect(0, 0, gameBoard.width, gameBoard.height); 

    let gameOver = false;

    birds.forEach(bird => {
        context.drawImage(gifImage, bird.x, bird.y, UNIT, UNIT); 

        
        bird.x += bird.speed; 

        
        if (bird.x > WIDTH-80) {
            gameOver = true; 
        }
    });



    if (gameOver) {
        start = false;
        const result = document.getElementById('scoreVal');
        const sc = document.getElementById('score');

        context.clearRect(0, 0, gameBoard.width, gameBoard.height);

        document.body.classList.add('blur');
        context.font = "bold 50px serif";
        context.fillStyle = "green";
        context.fillStyle=""
        context.textAlign = "center";
        context.fillText(`Game Over!! Your Score: ${result.innerHTML}`, WIDTH / 2, HEIGHT / 2);
       
        const sounds = document.querySelectorAll('audio');
        sounds.forEach(sd => {
            sd.pause();
            sd.currentTime = 0; 
        });

        const aud = document.getElementById('audio3');
        aud.currentTime = 0; 
        aud.play();

        // gameBoard.removeEventListener('click', handleBoardClick);

    } else {
        requestAnimationFrame(animate); 
    }
}

function addBird() {
    const newBird = {
        x: 0,
        y: Math.random() * (HEIGHT - UNIT),
        speed: Math.random() * 2 + 1 
    };
    birds.push(newBird);
}

function isTouchingBird(touchX, touchY) {
    return birds.find(bird => {
        return (
            touchX >= bird.x &&
            touchX <= bird.x + UNIT &&
            touchY >= bird.y &&
            touchY <= bird.y + UNIT
        );
    });
}


function removeBird(touchX, touchY) {
    const birdToRemove = isTouchingBird(touchX, touchY);
    if (birdToRemove) {
        const audio = document.getElementById('audio');
        audio.currentTime = 0; 
        audio.play();
        birds = birds.filter(bird => bird !== birdToRemove);
        let val = document.getElementById('scoreVal');
        let curVal = parseInt(val.innerHTML, 10);
        curVal+=scoreInc;
        val.innerHTML = curVal;
    }
    else
    {
    const audio1 = document.getElementById('audio1');
    audio1.currentTime = 0;
    audio1.play();
    }
}


gameBoard.addEventListener('click', function(event) {
    if (!start) {
    return;
    }
    const clickX = event.clientX - gameBoard.getBoundingClientRect().left;
    const clickY = event.clientY - gameBoard.getBoundingClientRect().top;
   
    removeBird(clickX, clickY);
});

