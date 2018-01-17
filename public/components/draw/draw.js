const module_name = "draw";

let lastX, lastY = -1;

let touchX, touchY;

let mouseX, mouseY, mouseDown = 0;

let canvas, ctx;

let translatedWord;

let currentWord;

let initialPath;

let score;

const visited = [];

const scoreObj = new Score(module_name);
scoreObj.initScore();

function drawLine(ctx, x, y, size) {

    if (lastX === -1) {
        lastX = x;
        lastY = y;
    }

    let r = 0;
    let g = 0;
    let b = 0;
    let a = 255;

    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";

    ctx.lineCap = "round";

    ctx.beginPath();

    ctx.moveTo(lastX, lastY);

    ctx.lineTo(x, y);

    ctx.lineWidth = size;
    ctx.stroke();
    ctx.closePath();

    lastX = x;
    lastY = y;
}


function clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 150px Arial";
    ctx.globalAlpha = 0.2;
    ctx.fillText(translatedWord, canvas.width / 2 - ctx.measureText(translatedWord).width / 2, canvas.height / 2 + 50);
    ctx.globalAlpha = 1;
    score = 0;
    document.getElementById('canvas').classList.remove("wrong");
}


function sketchpad_mouseDown() {
    mouseDown = 1;
    drawLine(ctx, mouseX, mouseY, 7);
    compareUserInput(mouseX, mouseY);
}


function sketchpad_mouseMove(e) {
    getMousePos(e);
    if (mouseDown === 1) {
        drawLine(ctx, mouseX, mouseY, 7);
        compareUserInput(mouseX, mouseY);
    }
}


function sketchpad_mouseUp() {
    mouseDown = 0;
    lastX = -1;
    lastY = -1;
    document.getElementById('canvas').classList.remove("wrong");
}


function getMousePos(e) {
    if (!e)
        e = event;
    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
}


function sketchpad_touchStart() {
    getTouchPos();

    drawLine(ctx, touchX, touchY, 7);

    event.preventDefault();
    compareUserInput(touchX, touchY);
}

function sketchpad_touchEnd() {
    lastX = -1;
    lastY = -1;
    document.getElementById('canvas').classList.remove("wrong");
}


function sketchpad_touchMove(e) {
    getTouchPos(e);

    drawLine(ctx, touchX, touchY, 7);

    event.preventDefault();
    compareUserInput(touchX, touchY);
}


function getTouchPos(e) {
    if (!e)
        var e = event;

    if (e.touches) {
        if (e.touches.length === 1) {
            const touch = e.touches[0]; 
            touchX = touch.pageX - touch.target.offsetLeft;
            touchY = touch.pageY - touch.target.offsetTop;
        }
    }
}


function isVisited(X, Y) {
    let i;

    for (i = 0; i < visited.length; i++) {
        if (visited[i].X === X & visited[i].Y === Y) {
            return true;
        }
    }
    visited.push({X, Y});
    return false;
}


function compareUserInput(X, Y) {
    X = Math.round(X);
    Y = Math.round(Y);
    if (initialPath[((Y - 1) * canvas.width + X) * 4 + 3] > 0) {
        document.getElementById('canvas').classList.remove("wrong");
        if (!isVisited(X, Y)) {
            score += 1;
        }
    }
    else {
        document.getElementById('canvas').classList.add("wrong");
        if (!isVisited(X, Y)) {
            score -= 1;
        }
    }
}

function getViewportWidth() {
    let viewportWidth;

    if (typeof window.innerWidth !== 'undefined') {
        viewportWidth = window.getComputedStyle(document.getElementsByTagName('body')[0]).width;
    }

    return viewportWidth;
}


function init() {
    let viewportWidth = getViewportWidth();
    viewportWidth = Number(viewportWidth.substring(0, viewportWidth.indexOf('px')));

    canvas = document.getElementById('canvas');
    if (viewportWidth >= 496) {
        canvas.width = 490;
        canvas.height = 290;
    } else {
        canvas.width = 300;
        canvas.height = 178;
        document.getElementById('canvas').style.width = '300px';
        document.getElementById('canvas').style.height = '178px';

    }
    if (canvas.getContext)
        ctx = canvas.getContext('2d');
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
}

function generateWord() {
    let dService = new DataService();
    let randomWord = dService.getRandomWord();
    let pService = new PronunciationService();

    let japaneseEquivalent = dService.translateText(randomWord, word => {
        if (navigator.onLine) {
            pService.kanjnih(word).then(function (phoneticWord) {
                document.getElementById('translation').innerText = phoneticWord;
                currentWord = phoneticWord;
            });
        } else {
            document.getElementById('translation').innerText = "Not available (offline)";
            currentWord = "Offline";
        }
        translatedWord = word;
        let fontSize = 150;
        ctx.font = "bold " + fontSize + "px Arial";
        while (ctx.measureText(word).width > canvas.width) {
            fontSize -= 10;
            ctx.font = "bold " + fontSize + "px Arial";
        }
        ctx.font = "bold " + fontSize + "px Arial";
        ctx.globalAlpha = 0.2;
        ctx.fillText(word, canvas.width / 2 - ctx.measureText(word).width / 2, canvas.height / 2 + fontSize / 3);
        score = 0;
        initialPath = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        // console.log(initialPath.length, initialPath);
        ctx.globalAlpha = 1;
    });
}

function submitResult() {
    scoreObj.updateScore(parseInt(score));

    document.getElementById('result').style.visibility = 'visible';

    document.getElementById('result').innerHTML = "You just scored: " + score + "!";

    document.getElementById('translation').innerText = "fetching...";

    setTimeout(function () {
        document.getElementById('result').style.visibility = 'hidden';
    }, 4000);

    clearCanvas(canvas, ctx);
    canvas.width = canvas.width;

    generateWord();
}

function pronounce() {
    const msg = new SpeechSynthesisUtterance(currentWord);
    msg.lang = 'ja-JP';
    window.speechSynthesis.speak(msg);
}