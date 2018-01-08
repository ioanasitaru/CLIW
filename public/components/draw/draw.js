
const module_name = "draw";

// Keep track of the old/last position when drawing a line
// We set it to -1 at the start to indicate that we don't have a good value for it yet
var lastX, lastY = -1;

// Variables to keep track of the touch position
var touchX,touchY;

// Variables for referencing the canvas and 2dcanvas context
var canvas, ctx;
// Variables to keep track of the mouse position and left-button status
var mouseX, mouseY, mouseDown = 0;
// Draws a dot at a specific position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position, the size of the dot

var translatedWord;

var initialPath;

var score;

var visited = [];

var scoreObj = new Score(module_name);
scoreObj.initScore();

function drawLine(ctx, x, y, size) {
    // If lastX is not set, set lastX and lastY to the current position
    if (lastX == -1) {
        lastX = x;
        lastY = y;
    }
    // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    r = 0;
    g = 0;
    b = 0;
    a = 255;
    // Select a fill style
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";
    // Set the line "cap" style to round, so lines at different angles can join into each other
    ctx.lineCap = "round";
    //ctx.lineJoin = "round";
    // Draw a filled line
    ctx.beginPath();
    // First, move to the old (previous) position
    ctx.moveTo(lastX, lastY);
    // Now draw a line to the current touch/pointer position
    ctx.lineTo(x, y);
    // Set the line thickness and draw the line
    ctx.lineWidth = size;
    ctx.stroke();
    ctx.closePath();
    // Update the last position to reference the current position
    lastX = x;
    lastY = y;
}

// Clear the canvas context using the canvas width and height
function clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 150px Arial";         
    ctx.globalAlpha = 0.2;
    ctx.fillText(translatedWord, canvas.width/2 - ctx.measureText(translatedWord).width/2, canvas.height/2 + 50);
    ctx.globalAlpha = 1;
    score = 0;
    document.getElementById('canvas').classList.remove("wrong");
}

// Keep track of the mouse button being pressed and draw a dot at current location
function sketchpad_mouseDown() {
    mouseDown = 1;
    drawLine(ctx, mouseX, mouseY, 7);
    compareUserInput(mouseX, mouseY);
}

// Keep track of the mouse position and draw a dot if mouse button is currently pressed
function sketchpad_mouseMove(e) {
    // Update the mouse co-ordinates when moved
    getMousePos(e);
    // Draw a dot if the mouse button is currently being pressed
    if (mouseDown == 1) {
        drawLine(ctx, mouseX, mouseY, 7);
        compareUserInput(mouseX, mouseY);
    }
}

// Keep track of the mouse button being released
function sketchpad_mouseUp() {
    mouseDown = 0;
    lastX = -1;
    lastY = -1;
}

// Get the current mouse position relative to the top-left of the canvas
function getMousePos(e) {
    if (!e)
        var e = event;
    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
}

 // Draw something when a touch start is detected
function sketchpad_touchStart() {
    // Update the touch co-ordinates
    getTouchPos();

    drawLine(ctx,touchX,touchY,7);

    // Prevents an additional mousedown event being triggered
    event.preventDefault();
    compareUserInput(touchX, touchY);
}

function sketchpad_touchEnd() {
    // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
    lastX=-1;
    lastY=-1;
}

// Draw something and prevent the default scrolling when touch movement is detected
function sketchpad_touchMove(e) { 
    // Update the touch co-ordinates
    getTouchPos(e);
    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    drawLine(ctx,touchX,touchY,7); 

    // Prevent a scrolling action as a result of this touchmove triggering.
    event.preventDefault();
    compareUserInput(touchX, touchY);
}

// Get the touch position relative to the top-left of the canvas
// When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
// but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
// "target.offsetTop" to get the correct values in relation to the top left of the canvas.
function getTouchPos(e) {
    if (!e)
        var e = event;

    if(e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            touchX=touch.pageX-touch.target.offsetLeft;
            touchY=touch.pageY-touch.target.offsetTop;
        }
    }
}


function isVisited(X, Y) {
    console.log({X, Y});
    var i;

    for (i = 0; i < visited.length; i++) {
        if (visited[i].X === X & visited[i].Y === Y ) {
            return true;
        }
     }
    visited.push({X, Y});
    console.log(visited);
    return false;
}


function compareUserInput(X,Y) {
    X = Math.round(X);
    Y = Math.round(Y);
    if (initialPath[((Y - 1)* canvas.width + X) * 4 + 3] > 0) {
        document.getElementById('canvas').classList.remove("wrong");
        if(!isVisited(X, Y)) {
            score += 1;
        }  
    }
    else {
        document.getElementById('canvas').classList.add("wrong");
        if(!isVisited(X, Y)) {
         score -= 1;
        }
    }
}

// Set-up the canvas and add our event handlers after the page has loaded
function init() {

    // Get the specific canvas element from the HTML document
    canvas = document.getElementById('canvas');
    canvas.width = 490;
    canvas.height = 290;
    // If the browser supports the canvas tag, get the 2d drawing context for this canvas
    if (canvas.getContext)
        ctx = canvas.getContext('2d');
    // Check that we have a valid context to draw on/with before adding event handlers
    if (ctx) {
        canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
        canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
        window.addEventListener('mouseup', sketchpad_mouseUp, false);

      // React to touch events on the canvas
        canvas.addEventListener('touchstart', sketchpad_touchStart, false);
        canvas.addEventListener('touchend', sketchpad_touchEnd, false);
        canvas.addEventListener('touchmove', sketchpad_touchMove, false);

    }
    generateWord();


    // let score = new Score("draw");
    // score.initScore();
    // score.upScore();
}

function generateWord(){
    let dService = new DataService();
    let randomWord = dService.getRandomWord();

    document.getElementById("translation").innerHTML = randomWord;

    let japaneseEquivalent = dService.translateText(randomWord, word => {
        translatedWord = word;
        ctx.font = "bold 150px Arial";         
        ctx.globalAlpha = 0.2;
        ctx.fillText(word, canvas.width/2 - ctx.measureText(word).width/2, canvas.height/2 + 50);
        score = 0;
        initialPath = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        console.log(initialPath.length, initialPath);
        ctx.globalAlpha = 1;
    });
}

function submitResult(){
    scoreObj.updateScore(parseInt(score));

    document.getElementById('result').style.visibility='visible';

    document.getElementById('result').innerHTML="You just scored: " + score + "!";

    setTimeout(function () {
        document.getElementById('result').style.visibility='hidden';
    }, 2000);

    clearCanvas(canvas, ctx);
    canvas.width = canvas.width;

    generateWord();
}