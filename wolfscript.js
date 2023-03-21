





//making game board

    var c = document.getElementById("board");
    console.log('getboard');
    var ctx = c.getContext("2d");
    class tile {
        constructor(x, y) {
            this.x = x;
            this.y = y;

        }
    }

    var tiles = [];

    var rows = 10;
    var columns = 10;
    var length = 50;
    for (i = 0; i < rows; i++) {
        for (j = 0; j < columns; j++) {
            var x = length * j;
            var y = length * i;
            tiles.push(new tile(x, y));
        }
    }

    for (i = 0; i < columns * rows; i++) {


        ctx.fillStyle = '#008000';
        ctx.fillRect(tiles[i].x, tiles[i].y, length, length);
        ctx.strokeRect(tiles[i].x, tiles[i].y, length, length);
        ctx.strokeStyle = "#808000";
        ctx.lineWidth = 5;
    }



//human
human = document.getElementById("human");
//arr to store keys pressed to track movement
var steps = [];
var player = {
    moveNumber: 0,
    rightMove: 0,
    leftMove: 0,
    upMove: 0,
    downMove:0,
    checkClickCount: 1,
    i: 0,
    havent_Win: true

}
//time
timeButton = document.getElementById('TimeButton');
TimeDisplay = document.getElementById('t');
var timing = {
    
    clickCount: 0,
    time: 0,
    allowClick: true,
    

}
//getposition function prototype
function getPositionXY(element) {
    
    return element.getBoundingClientRect();
}
//link button to random generator for time (1 to 10)

function timeGenerator(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
 //The maximum is exclusive and the minimum is inclusive
}
var randNumber = timeGenerator(3, 6);
console.log('randomnumber ' + randNumber);

//display time
function Timedisplay(time) {
    if (timing.time == 12)
        TimeDisplay.innerHTML = 'IT IS LUNCHTIME NOW! RUN FOR YOUR LIFE!!';
    else
   TimeDisplay.innerHTML= 'IT IS '+ time +'PM NOW';
}
//generate and dsiplay time
function timeHandler(timing) {
    //asking the time for the 2nd time or beyond
    if (timing.allowClick && timing.clickCount >= 1) {
        console.log('clickcount bef' + timing.clickCount);
        if (timing.clickCount < randNumber-1) {
            timing.time = timeGenerator(1, 6);
            console.log(66666);
        }
        
        else if (timing.clickCount == randNumber-1) {
            timing.time = 12;
            console.log(9999999999999);
        }
            Timedisplay(timing.time);

            //acts as a check in the move function
            timing.clickCount++;
        
        
        //prevent them from asking the time again immediately after they just clicked
        timing.allowClick = false;

       
        
        
    }
    //asking the time for the first time
    if (timing.clickCount == 0) {
        timing.time = timeGenerator(1, 12);
        Timedisplay(timing.time);
        timing.clickCount++;
        timing.allowClick = false;
    }
    
    console.log('clickcount is ' + timing.clickCount);

    if (timing.time == 12) {
      setInterval(chase, 1000);
    }

}


//top:80px;
//left: 450px;

var humanPos;
function keyDownHandler(event) {

    //getposition
    humanPos = getPositionXY(human);
    console.log(humanPos.x);
    console.log(humanPos.y);
    
    //prevent player from moving out  of board
    if (humanPos.x >= 450 && humanPos.x <= 900 && humanPos.y <= 530 && humanPos.y >= 79) {

        //to prevent player from retracing his/her steps
        if (event.keyCode == steps[0] )
            return;

        //moves player acc to which key they press && checks that they dont move 3 consecutive times in the same direction
        if (event.keyCode == 39 && player.rightMove<=2) {

            //increase left  via style
            //shift arr , insert 37
            if (humanPos.x <= 850) {
                human.style.left = String(humanPos.x + 50) + 'px';
                steps.unshift(37);

                //tracks number of steps moved
                player.moveNumber++;

                //check to prevent 3 consecutive moves in same direction
                player.rightMove++;

                //to enable move after player has changed move after 3 of the same consecutive moves
                if (player.leftMove == 3)
                    player.leftMove = 0;
                if (player.upMove == 3)
                    player.upMove = 0;
                if (player.downMove == 3)
                    player.downMove = 0;

            }
        }
        else if (event.keyCode == 37 && player.leftMove<=2) {

            //decrease left via style
            //shift arr , insert 39
            if (humanPos.x >= 500) {
                human.style.left = String(humanPos.x - 50) + 'px';
                steps.unshift(39);
                player.moveNumber++;
                    
                player.leftMove++;

                
                if (player.rightMove == 3)
                    player.rightMove = 0;
                if (player.upMove == 3)
                    player.upMove = 0;
                if (player.downMove == 3)
                    player.downMove = 0;
            }
        }
        if (event.keyCode == 40 && player.downMove <= 2) {

            //increase top via style
            //shift arr , insert 38
            if (humanPos.y <= 480) {
                human.style.top = String(humanPos.y + 50) + 'px';
                steps.unshift(38);
                player.moveNumber++;

                player.downMove++;

                if (player.leftMove == 3)
                    player.leftMove = 0;
                if (player.upMove == 3)
                    player.upMove = 0;
                if (player.rightMove == 3)
                    player.rightMove = 0;
            }
        }
        else if (event.keyCode == 38 && player.upMove <= 2) {

            //decrease top via style
            //shift arr, insert 40
            if (humanPos.y >= 129) {
                human.style.top = String(humanPos.y - 50) + 'px';
                steps.unshift(40);
                player.moveNumber++;

                player.upMove++;

                if (player.leftMove == 3)
                    player.leftMove = 0;
                if (player.rightMove == 3)
                    player.rightMove = 0;
                if (player.downMove == 3)
                    player.downMove = 0;
            }
        }
    }
    
}


function Escape(event,steps,player) {
    humanPos = getPositionXY(human);
    
    console.log('keycode' + event.keyCode + 'step' + steps[player.i]);
    if (humanPos.x >= 450 && humanPos.x <= 900 && humanPos.y <= 530 && humanPos.y >= 79) {
        if (event.keyCode != steps[player.i] ) {
            TimeDisplay.innerHTML = 'YOU GOT LOST IN THE WOODS AND DIED. REFRESH TO PLAY AGAIN';
            player.havent_Win = false;
        }

        if (event.keyCode == steps[player.i]) {
            player.i++;
            if (event.keyCode == 39)
                human.style.left = String(humanPos.x + 50) + 'px';
            else if (event.keyCode == 37)
                human.style.left = String(humanPos.x - 50) + 'px';
            else if (event.keyCode == 40)
                human.style.top = String(humanPos.y + 50) + 'px';
            else if (event.keyCode == 38)
                human.style.top = String(humanPos.y - 50) + 'px';

        }
        //get position again to check if reached home
        humanPos = getPositionXY(human);
        if (humanPos.x == 450 && humanPos.y <= 80) {
            TimeDisplay.innerHTML = 'YOU GOT HOME SAFELY AND WON! REFRESH THE PAGE TO PLAY AGAIN';
            player.havent_Win = false;
        }
    }
}


function move(event,human, steps, player) {

    if (timing.time == 12 && player.havent_Win)
    {
        Escape(event,steps,player);


    }
    
    //check if player asks for time before moving(checkclickCount is initialized to 1)
    else if (timing.clickCount == player.checkClickCount) {
        //before 12: enable player to move as long as the steps he takes is less than time
        if (player.moveNumber < timing.time && timing.time != 12) {
            keyDownHandler(event);
            TimeDisplay.innerHTML = 'STEPS LEFT: ' + (timing.time - player.moveNumber);
            console.log(player.moveNumber);
            console.log(steps[0]);
            humanPos = getPositionXY(human);
            if (humanPos.x == 900 && humanPos.y >= 529) {
                TimeDisplay.innerHTML = 'YOU CAUGHT THE WOLF BEFORE 12 AND WON! REFRESH THE PAGE TO PLAY AGAIN';
                player.moveNumber = 1000;
                
            }
            

        }
        
        //prevents player from moving when finished all steps
        if (player.moveNumber == timing.time) {
            player.checkClickCount++;

            //reset number of moves
            player.moveNumber = 0;
          
            //allows player to generate a new time
            timing.allowClick = true;
        }
    }
    
}
var wolf = document.getElementById('wolf')
function chase() {
    var wolfPos = getPositionXY(wolf);
    var humanPos = getPositionXY(human);
    console.log('wolfPosX ' + wolfPos.x);
    console.log('wolfPosY ' + wolfPos.y);
    console.log('humanPosX' + humanPos.x);
    console.log('humanPosY' + humanPos.y);
    
    
    if (player.havent_Win) {
       
        var moveX = (humanPos.x - wolfPos.x) / 3;
        var moveY = (humanPos.y - wolfPos.y) / 3;
        wolf.style.left = String(wolfPos.x + moveX) + 'px';
        wolf.style.top = String(wolfPos.y + moveY) + 'px';
    }
    if ((wolfPos.x - 50<=humanPos.x && humanPos.x<= wolfPos.x + 50) && (wolfPos.y - 50 <=humanPos.y && humanPos.y<= wolfPos.y + 50)) {
        TimeDisplay.innerHTML = 'YOU GOT EATEN BY THE WOLF! REFRESH TO PLAY AGAIN';
        
        player.havent_Win = false;
    }
    
}







//check if human reaches original position

//wolf, while not gameover or haven't reached original position
//check key number in array and move (callback function)
//check for gameover


//actual game script



    
    //request for time

   




//make sure ask for time at least once before 12

//human, when time is not 12
// repeat move every second while moveNumber is less than time


    //human,while time is 12, repeat move every second until gameover/reached original position
