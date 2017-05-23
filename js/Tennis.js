 //declaring global variables
    var canvas;
    var canvasContext;
    var ballX = 50;
    var ballY = 50;
    var ballSpeedX = 10;
    var ballSpeedY = 4;

    var player1Score = 0;
    var player2Score = 0;
    const WINNING_SCORE = 3;

    var showingWinScreen = false;
    
    var paddle1Y = 250;
    var paddle1X = 400;
    var paddle2X = 400;
    const PADDLE_THICK = 100;

// finding the mouse posintion
    function calculateMousePos(event){
        var  rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        var mouseX = event.clientX - rect.left - root.scrollLeft; 
        var mouseY = event.clientY - rect.top - root.scrollTop;

        return{
            x:mouseX,
            y:mouseY
        };
    }

function handleMouseClick(event){
    if(showingWinScreen){
    player1Score=0;  //by clicking the scores will be reset to 0 
    player2Score=0;
    showingWinScreen=false;
    }
}
    //OnLoad Main
    window.onload = function(){

        console.log("hello");

        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        var framesPerSec = 30;
        setInterval(function(){
                    drawEverything();
                    moveEverything();
                    }
        , 1000/framesPerSec);
    
//event listeners

    canvas.addEventListener('mousedown',handleMouseClick)


    canvas.addEventListener('mousemove',function(event){
        var mousePos = calculateMousePos(event);
        paddle1Y = mousePos.y;
        paddle1X = mousePos.x-(PADDLE_THICK/2); //control the padle1x after half its thickness
                  //and paddle1x remain from the begining of the paddle 

    });

    }
// RESET The Ball
    function ballReset(){
        if(player1Score>=WINNING_SCORE||
            player2Score>=WINNING_SCORE){
                showingWinScreen=true; //
        }
        ballSpeedY = -ballSpeedY;
        ballX= canvas.width/2;
        ballY= canvas.height/2;
    }
    function computerMovment(){
        var paddle2XCenter = paddle2X +(PADDLE_THICK/2); 

        if(ballX>paddle2XCenter -35){
            paddle2X +=10;

        }
        else if(ballX<paddle2XCenter +35){
            paddle2X -=10;
        }
    }

    
// moving elements function

  
    function moveEverything(){
        if(showingWinScreen){  //if showingWinScreen is true skip this function
            return;
        }

        computerMovment();

        ballX = ballX + ballSpeedX ; 
        ballY = ballY + ballSpeedY;
        
       //if the ball reachs RIGHT side
        if (ballX>canvas.width){
            ballSpeedX = -ballSpeedX;

        }
        //if the ball reachs LEFT side
        if(ballX<0){
            ballSpeedX = -ballSpeedX;

        }
        //if the ball reachs BUTTOM
         if (ballY>canvas.height){
              if(ballX>paddle2X && ballX<paddle2X+PADDLE_THICK){
                ballSpeedY= - ballSpeedY;
                var deltaX = ballX
                        -(paddle2X+PADDLE_THICK/2);
                 ballSpeedX = deltaX  *0.35;
                
            }
            //
            else{
             player2Score ++; //MUST be BEFORE ballreset()
            ballReset();

            
            }
            

        }
        //if the ball reachs to TOP
        if(ballY<0){
            if(ballX>paddle1X && ballX<paddle1X+PADDLE_THICK){
                ballSpeedY= - ballSpeedY;
                /* the length between the midle of the paddle
                 and the ball that touched the paddle will be given as 
                a speed of ballSpeedX time 0.5 to reduce it*/
                var deltaX = ballX
                        -(paddle1X+PADDLE_THICK/2);
                 ballSpeedX = deltaX  *0.5;
                 

            }
            else{
            player1Score ++;//MUST be BEFORE ballreset()
            ballReset();


            }
        }

    }

    function drawBorderL(){
        for(var i = 0 ; i<canvas.height;i+=40){
            colorRect(0,i,5,25,'grey');
        }
    }
 function drawBorderR(){
        for(var i = 0 ; i<canvas.height;i+=40){
            colorRect(canvas.width-5,i,5,25,'grey');
        }
    }

    function drawEverything(){
        //Making the screen black
        colorRect(0,0,canvas.width,canvas.height,'black');

        //drawin borders each side
        drawBorderL();
        drawBorderR();

        //Drawing the Win Screen
        if (showingWinScreen){
                canvasContext.font = "20px sans-serif";
                canvasContext.fillStyle = "#C8EBFF";

               
            if(player1Score>=WINNING_SCORE){
                canvasContext.fillText("Top Player Won",canvas.width/2-100,canvas.height*0.25);

            }
            else if(player2Score>=WINNING_SCORE){

                canvasContext.fillText("Buttom Player Won",canvas.width/2-100,canvas.height*0.75);
                 
            }

                canvasContext.fillText("Click To Continue",canvas.width/2-100,canvas.height/2);

            return;
        }
        //this is top player paddle
        colorRect(paddle1X,0,PADDLE_THICK,5, 'white');

        //this is buttom computer paddle
        colorRect(paddle2X,canvas.height-5,PADDLE_THICK,5, 'white');

        //this is the Ball
        colorCircle(ballX,ballY,10,'white');
        //drawing a text (current score) in our canvas with ("what you want to write",x,y)
        canvasContext.font = "20px sans-serif"
        canvasContext.fillText(player1Score ,100,100);
        canvasContext.fillText(player2Score ,canvas.width-100,canvas.height-100)
    }

//function to create circle
    function colorCircle(centerX,centerY,raduis,drawColor){
        canvasContext.fillStyle = drawColor;
        canvasContext.beginPath();
        canvasContext.arc(centerX,centerY,raduis,0,Math.PI*2,true);
        canvasContext.fill();
    }
//function to creat rectangles
    function colorRect(leftX,topY,width,height,drawColor){
        canvasContext.fillStyle = drawColor ;
        canvasContext.fillRect(leftX,topY,width,height);
    }


    