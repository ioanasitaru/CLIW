// Keep track of the old/last position when drawing a line
// We set it to -1 at the start to indicate that we don't have a good value for it yet
var lastX, lastY = -1;

// Variables for referencing the canvas and 2dcanvas context
var canvas, ctx;
// Variables to keep track of the mouse position and left-button status
var mouseX, mouseY, mouseDown = 0;
// Draws a dot at a specific position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position, the size of the dot
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
}

// Keep track of the mouse button being pressed and draw a dot at current location
function sketchpad_mouseDown() {
    mouseDown = 1;
    drawLine(ctx, mouseX, mouseY, 7);
}

// Keep track of the mouse button being released
function sketchpad_mouseUp() {
    mouseDown = 0;
    lastX = -1;
    lastY = -1;
}

// Keep track of the mouse position and draw a dot if mouse button is currently pressed
function sketchpad_mouseMove(e) {
    // Update the mouse co-ordinates when moved
    getMousePos(e);
    // Draw a dot if the mouse button is currently being pressed
    if (mouseDown == 1) {
        drawLine(ctx, mouseX, mouseY, 7);
    }
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
    }

    let dService = new DataService();
    let randomWord = dService.getRandomWord();
    let japaneseEquivalent = dService.translateText(randomWord, word => {
        ctx.fillText(word, canvas.width / 2, canvas.height / 2);
    });
}