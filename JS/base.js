



let isModalOpen = false;
// Modal 
function openModal(modalId) {
    const modalBg = document.querySelector(".modal");
    modalBg.style.backgroundColor = 'rgba(var(--darkOrLight), 0.5)'
    modalBg.style.backdropFilter = "blur(var(--blurAmount))";
    modalBg.style.webkitBackdropFilter = "blur(var(--blurAmount))";
    isModalOpen = true;
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector(".modalContent");
    modalContent.style.backgroundColor = "rgba(var(--darkOrLight), 1)";
    modal.style.display = "block";
}

// When you click anywhere outside of the modal, close it
const modals = document.getElementsByClassName("modal");
window.onclick = function(event) {
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            closeModal(i);
        }
    }
    let alertModal = document.querySelector("#alertModal");
    if (event.target !== alertModal) {
        alertModal.style.display = "none";
        isModalOpen = false;
    }
}

function closeModal(i) {
    modals[i].style.display = "none";
    isModalOpen = false;
}
function alertModal(text) {
    isModalOpen = true;
    let modal = document.querySelector("#alertModal");
    modal.style.display = "block";
    document.querySelector("#alertModalText").innerHTML = text;
}


// Hide Button\
/*
$(document).ready(function(){
    $("#hideButton").click(function(){
        $(".navbar").slideToggle("slow");
        if ($("#hideButton").text() == "↑↑") {
            $("#hideButton").text("↓↓");
        } else {
            $("#hideButton").text("↑↑");
        }
    });
});
*/

const hideButton = document.querySelector("#hideButton");
hideButton.addEventListener("click", function () {
    const upperNavbar = document.querySelector("#upperNavbar");
    const lowerNavbar = document.querySelector("#lowerNavbar");
    if (upperNavbar.style.display === "none") {
        upperNavbar.style.display = "flex";
        lowerNavbar.style.display = "flex";
        hideButton.textContent = "↑↑";
    } else {
        upperNavbar.style.display = "none";
        lowerNavbar.style.display = "none";
        hideButton.textContent = "↓↓";
    }
});
/*
let navbarOpen = true;

hideButton.addEventListener("click", function () {
    navbarOpen = !navbarOpen;
    if (parseInt(navbar.style.height)) {
        // if it's open
        navbar.style.height = "0";
        navbar.style.border = "0";

    } else {
        navbar.style.height = "30%";
        navbar.style.borderRight = "var(--borderSize) solid var(--outline)";
    }
});
*/

const notesTextarea = document.querySelector("#notesTextarea");
notesTextarea.addEventListener("input", () => {
    v.notesText = notesTextarea.value;
    v.notes[v.currentNoteIndex].text = notesTextarea.value;
});
generateTickMarks();
let wordCount = 0;
document.querySelector('#typeArea').value = v.text;
document.querySelector('#notesTextarea').value = v.notesText;
wordCount = countWords(v.text);

v.goalReached = true;
let firstLoad = true;
updateProgressBar();


v.text = typeArea.value;
console.log(v.text);
const clickSound = document.getElementById("clickSound");
const noSound = document.getElementById("noSound");
typeArea.addEventListener("input", () => { 
    if (typeArea.value.length < v.text.length && v.text.startsWith(typeArea.value)) {
        inTypeAreaInput();
        return;
    }
    function inTypeAreaInput() {
        v.text = typeArea.value;
        v.files[v.currentFileIndex].chapters[v.currentChapterIndex].text = v.text;
        wordCount = countWords(v.text);
        // save();
        if (v.exclude > wordCount) {
            v.exclude = wordCount;
            v.files[v.currentFileIndex].exclude = v.exclude;
        }
        updateProgressBar();
        typedCharacter = true;
        checkIfStreak();
    }
    inTypeAreaInput();
    playSound();
    updateCaretPos();
    typingConfetti();
    shakeScreen(v.screenShakeIntensity);
});

function checkIfStreak() {
    if (v.dailyWritingSessionTime > v.streakCompletionTime && v.doneTodaysStreak == false) {
        v.dailyStreak += 1;
        v.doneTodaysStreak = true;
        alertModal("Your streak increased!<br>🎉<br>Your streak is now: " + v.dailyStreak + "!");
    }
}
/*
let fastSound = new Audio(v.typingSoundPath.src);

function playSound() {
    if (v.fastSounds) {
        console.log("Fast sounds")
        playFastSound();
    } else {
        console.log("Slow sounds")
        playSlowSound();
    }
}
function playFastSound() {
    fastSound.currentTime = 0;
    fastSound.playbackRate = Math.random() * 2 + 0.4;
    fastSound.play();
}


function playSlowSound() {
    let sound = new Audio(v.typingSoundPath.src);
    sound.currentTime = 0;
    sound.playbackRate = Math.random() * 2 + 0.4;
    sound.play();
}
*/



// THIS IS THE ONE THAT IS THE OFFICIAL
let fastSound = new Audio(v.typingSoundPath);

function playSound() {
    let sound;
    if (v.fastSounds) {
        sound = fastSound; 
    } else {
        sound = new Audio(v.typingSoundPath); 
    }
    sound.currentTime = 0;
    sound.playbackRate = Math.random() * 2 + 0.4;
    sound.play();
}




/*
let xAccum = 0;
let yAccum = 0;
let lastDirX = -1;
let lastDirY = -1;
function shakeScreen(intensity) {
    // moving the entire body doesn't work well with bg images.
    // document.body
    // using .mainContainer instead fixes that.
    // using #typeArea works and looks better (bc the navbars don't flicker)
    // using #typeAreaDiv is like #typeArea, except it includes the progress bars
    // #typeAreaDiv is the best option!
    const body = document.querySelector("#typeAreaDiv");
    
    const directionX = Math.random() > 0.5 ? 1 : -1;
    const directionY = Math.random() > 0.5 ? 1 : -1;
    if (lastDirX == directionX && lastDirY == directionY) {
        const directionX = Math.random() > 0.5 ? 1 : -1;
        const directionY = Math.random() > 0.5 ? 1 : -1;
    }
    lastDirX = directionX;
    lastDirY = directionY;
    xAccum += directionX;
    yAccum += directionY;
    body.style.left = `${intensity * xAccum}px`;
    body.style.top = `${intensity * yAccum}px`;
    

    setTimeout(() => {
        clearInterval(interval);
        xAccum -= directionX;
        yAccum -= directionY;
        body.style.top = yAccum;
        body.style.left = xAccum;
    }, 10);
}
*/

/*
function shakeScreen(intensity) {
    // moving the entire body doesn't work well with bg images.
    // document.body
    // using .mainContainer instead fixes that.
    // using #typeArea works and looks better (bc the navbars don't flicker)
    // using #typeAreaDiv is like #typeArea, except it includes the progress bars
    // #typeAreaDiv is the best option!
    const body = document.querySelector("#typeAreaDiv");
    const interval = setInterval(() => {
        // gets a random direction (-1 or 1)
        /*
        const directionX = Math.random() > 0.5 ? 1 : -1;
        const directionY = Math.random() > 0.5 ? 1 : -1;
        
        const directionX = Math.random() * 2 - 1;
        const directionY = Math.random() * 2 - 1;
        body.style.left = `${intensity * directionX}px`;
        body.style.top = `${intensity * directionY}px`;
    }, 20);

    setTimeout(() => {
        clearInterval(interval);
        body.style.top = 0;
        body.style.left = 0;
    }, 50);
}
*/


const body = document.querySelector("#typeAreaDiv");
function shakeScreen(intensity) {

    const directionX = Math.random() > 0.5 ? 1 : -1;
    const directionY = Math.random() > 0.5 ? 1 : -1;

    body.style.left = `${intensity * directionX}px`;
    body.style.top = `${intensity * directionY}px`;

    setTimeout(() => {
        // clearInterval(interval);
        body.style.top = 0;
        body.style.left = 0;
    }, 100);
}

/*
function countWords(str) {
    if (str.length !== 0) {
        // Remove all special characters but keep whitespaces and alphanumeric characters
        const cleanedStr = str.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ');
        return cleanedStr.trim().split(' ').filter(Boolean).length;
    } else {
        return 0;
    }
}
*/
function countWords(str) {
    if (str.length !== 0) {
        // Remove all special characters but keep whitespaces, alphanumeric characters, and digits
        // \p{L} matches any kind of letter from any language
        // \d matches any digit from 0 to 9
        const cleanedStr = str.replace(/[^\p{L}\d\s]/gu, '').replace(/\s+/g, ' ');
        return cleanedStr.trim().split(' ').filter(Boolean).length;
    } else {
        return 0;
    }
}



/*
function countWords(str) {
    if (str.length !== 0) {
        const cleanedStr = str.replace(/[^\w\s]|_/g, ' ').replace(/\s+/g, ' ');
        return cleanedStr.trim().split(' ').filter(Boolean).length;
    } else {
        return 0;
    }
}
/*
function countWords(str) {
    if (str.length !== 0) {
        return str.trim().split(/\s+/).length;
    } else {
        return 0;
    }
}
*/

function exportChapter() {
    let pageCount = Math.round(v.text.length / 15) / 100;
    let textToSave = `==============================================
    ${v.files[v.currentFileIndex].chapters[v.currentChapterIndex].name}
==============================================

----------------------------------------------
${countWords(v.text)} words, ${pageCount} pages.
----------------------------------------------

${v.text}

----------------------------------------------
Thanks for using WriteRush!`;
    let textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    let textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    let fileNameToSaveAs = v.files[v.currentFileIndex].chapters[v.currentChapterIndex].name;

    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = textToSaveAsURL;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}









function exportFile() {
    let fullWordCount = 0;
    let fullPageCount;
    for (let i = 0; i < v.files[v.currentFileIndex].chapters.length; i++) {
        fullWordCount += countWords(v.files[v.currentFileIndex].chapters[i].text);
        fullPageCount = Math.round(v.files[v.currentFileIndex].chapters[i].text.length / 15) / 100;
    }
    let textToSave = `==============================================
${v.files[v.currentFileIndex].name}
==============================================

----------------------------------------------
${fullWordCount} words, ${fullPageCount} pages.
----------------------------------------------`

    for (let i = 0; i < v.files[v.currentFileIndex].chapters.length; i++) {
        textToSave += `\n\n==============================================
${v.files[v.currentFileIndex].chapters[i].name}
==============================================`
        textToSave += `\n\n${v.files[v.currentFileIndex].chapters[i].text}` 
    }
    textToSave +=`\n\n
----------------------------------------------
Thanks for using WriteRush!

`;
    let textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    let textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    let fileNameToSaveAs = v.files[v.currentFileIndex].name;

    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = textToSaveAsURL;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

let element = document.querySelector("#typeArea");
let fontSize = getComputedStyle(element).getPropertyValue('font-size');

/* For debug
let rect = document.createElement('div');
document.body.appendChild(rect);
rect.style.position = 'absolute';
rect.style.backgroundColor = 'red';
rect.style.height = fontSize;
rect.style.width = '3px';


let rect2 = document.createElement('div');
document.body.appendChild(rect2);
rect2.style.position = 'absolute';
rect2.style.backgroundColor = 'red';
rect2.style.height = fontSize;
rect2.style.width = '3px';


document.querySelector('#typeArea').addEventListener('input', function () {  
    var coordinates = getCaretCoordinates(this, this.selectionEnd);
    let navbarHeight = document.querySelector('#navbar').offsetHeight;
    console.log(coordinates.top);
    console.log(coordinates.left);
    rect2.style.top = element.offsetTop - element.scrollTop + coordinates.top + navbarHeight + 'px';
    rect2.style.left = element.offsetLeft - element.scrollLeft + coordinates.left + 'px';

})
*/

let xC;
let yC;
const chapterSidebar = document.querySelector("#chapterSidebar");
document.querySelector('#notesSidebar').style.width = '0px';
function updateCaretPos() {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const coordinates = getCaretCoordinates(element, element.selectionEnd, { debug: false });
    let notesOffset = ((parseInt(notesSidebar.style.width) / 100) * window.innerWidth);
    chapterOffset = parseFloat(getComputedStyle(chapterSidebar).width);
    yC = element.offsetTop - element.scrollTop + coordinates.top + navbarHeight;
    xC = element.offsetLeft - element.scrollLeft + coordinates.left + notesOffset + chapterOffset;

    /*
    rect.style.top = yC + 'px';
    rect.style.left = xC + 'px';
    */

}

function typingConfetti() {
    confetti({
        particleCount: v.typingConfettiCount, // Adjust particle count to your preference
        startVelocity: 20,
        spread: 360,
        origin: { 
            x: xC / window.innerWidth, 
            y: yC / window.innerHeight 
        }
    });
}


function updateProgressBar() {
    if (preventSave) {return};
    const progressBarText = document.querySelector("#progressBarText");
    const progressBar = document.querySelector("#progressBar");
    const timeBar = document.querySelector("#timeBar");

    let progress = ((wordCount - v.exclude) / (v.wordGoal - v.exclude)) * 100;
    if (v.exclude > wordCount) { v.exclude = wordCount; }
    progressBarText.innerHTML = `${Math.round(progress)}% <div class="vLine"></div> ${wordCount}/${v.wordGoal} <div class="vLine"></div> ${wordCount - v.wordGoal}`;

    progressBar.style.width = progress + "%";
    let progressBarColor;
    if (v.rainbowProgressBar) {
        progressBarColor = `hsl(${hue}, ${progress}%, 50%)`;
    } else {
        progressBarColor = v.progressBarColor;
    }
    
    progressBar.style.backgroundColor = progressBarColor;
    timeBar.style.backgroundColor = progressBarColor;
    document.querySelectorAll('.progressBarContainer').forEach( (element) => {
        element.style.borderColor = progressBarColor;
    });
    document.querySelectorAll('.tickMark').forEach( (element) => {
        element.style.backgroundColor = progressBarColor;
    });
    progressBarConfetti(progress);
}
function progressBarConfetti(progress) {
    if (progress >= 100 && v.goalReached !== true) {
        fireworks();
        fireworksSound();
        v.goalReached = true;
    } else if (progress < 100) {
        v.goalReached = false;
    }
    
    let tickMarks = Array.from(document.querySelectorAll('.tickMark')); // converts the nodeList into an array
    tickMarks.forEach(function(tickMark, i) {
        let tickMarkProgress = ((i + 1) / tickMarks.length) * 100;
        if (firstLoad == true) {
            tickMark.dataset.reached = 'true';
        }
        if (progress >= tickMarkProgress && tickMark.dataset.reached !== 'true') {
            tickMark.dataset.reached = 'true';
            let rect = tickMark.getBoundingClientRect();
            confetti({
                particleCount: 200,
                startVelocity: 20,
                spread: 360,
                origin: { x: (rect.left + 61+ window.scrollX) / window.innerWidth, y: (rect.top + window.scrollY) / window.innerHeight }
            });
        } else if (progress < tickMarkProgress) {
            tickMark.dataset.reached = 'false';
        }
    });
    
    firstLoad = false;
}
function fireworksSound() {
    let celebrateSound = new Audio(document.querySelector('#celebrate').src);
    celebrateSound.play();
    
}
function fireworks() {
    const duration = 8 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti(Object.assign({}, defaults, {
            particleCount: 150,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        }));

        confetti(Object.assign({}, defaults, {
            particleCount: 150,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        }));
    }, 250);
}
function generateTickMarks() {
    var container = document.querySelector('.progressBarContainer');
    container.innerHTML = '<div id="progressBar" class="progressBar"></div>';
    for (let i = 0; i < 10; i++) {
        var tickMark = document.createElement('div');
        tickMark.className = 'tickMark';
        tickMark.style.left = `${i * 10}%`;
        container.appendChild(tickMark);
    }
}
function add500toGoal() {
    v.wordGoal = parseInt(v.wordGoal)
    v.exclude = parseInt(v.exclude);
    v.addToGoal = parseInt(v.addToGoal);
    wordCount = countWords(v.text);
    if (v.wordGoal - wordCount <= 0) {
        v.wordGoal = wordCount + v.addToGoal;
    } else {
        v.wordGoal += v.addToGoal;
    }
    if (v.excludeDefault) {
        v.exclude = wordCount;
    }
    
    v.files[v.currentFileIndex].wordGoal = v.wordGoal;
    v.files[v.currentFileIndex].exclude = v.exclude;
    firstLoad = true;
    v.goalReached = true;
    
    updateProgressBar();
}


window.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        exportFile();
    }
});


let chapterSidebarOpen = false;
chapterSidebar.style.border = "0px";
chapterSidebar.style.display = "none";
const chapterSidebarButton = document.querySelector("#chapterSidebarButton");
chapterSidebarButton.addEventListener("click", () => {
    chapterSidebarOpen = !chapterSidebarOpen;
    if (parseInt(chapterSidebar.style.width)) {
        chapterSidebar.style.width = "0";
        chapterSidebar.style.display = "none";
    } else {
        chapterSidebar.style.width = "20%";
        chapterSidebar.style.display = "flex";
    }
})





let textRedacted = false;
const redactButton = document.querySelector("#redactButton");
redactButton.addEventListener("click", () => {
    textRedacted = !textRedacted;
    if (textRedacted) {
        typeArea.style.fontFamily = "Redacted";
    } else {
        typeArea.style.fontFamily = v.fontFamily;
    }
})

quickAccessSidebar.addEventListener("click", () => {
    
    const caretLoc = typeArea.selectionStart;
    typeArea.focus();
    typeArea.selectionStart = caretLoc;
    typeArea.selectionEnd = caretLoc;
})


const fullscreenButton = document.querySelector('#fullscreenButton');
const requestFullscreen = document.documentElement.requestFullscreen 
    || document.documentElement.mozRequestFullScreen
    || document.documentElement.webkitRequestFullscreen
    || document.documentElement.msRequestFullscreen;

const exitFullscreen = document.exitFullscreen 
    || document.mozCancelFullScreen
    || document.webkitExitFullscreen
    || document.msExitFullscreen;

function enterFullscreen() {
    if (requestFullscreen) requestFullscreen.call(document.documentElement);
}
function exitFullscreenFunction() {
    if (exitFullscreen) exitFullscreen.call(document);
}
fullscreenButton.addEventListener('click', function() {
    if (!document.fullscreenElement) {
        enterFullscreen();
    } else {
        exitFullscreenFunction();
    }
});

let timerRunning = false;
let timeElapsed = 0; 
let timeLeft = v.timeGoal * 1000 * 60;

let pauseButton = document.querySelector('#pauseButton');

pauseButton.addEventListener('click', togglePause);
document.querySelector('#stopButton').addEventListener('click', stopTimer);

let msRefresh = 200;
setInterval(alwaysRun, msRefresh);

// ALWAYS RUN (IMPORTANT)
function alwaysRun() {
        /*
        save();
        */
        hue += 3;
        updateProgressBar();
        updateTimeBar();
        rainbowStreak();
        checkIfNewDay();
        if (!isModalOpen) {
            v.exclude = Math.min(v.exclude, wordCount);
        }
    

}
function togglePause() {
    timerRunning = !timerRunning; // switches the value every time
    pauseButton.innerHTML = timerRunning ? "❚❚" : "▶";
}

function stopTimer() {
    timerRunning = false;
    timeElapsed = 0;
    timeLeft = v.timeGoal;
    pauseButton.innerHTML = "▶";
}

function updateTimeBar() {
    if (timerRunning) {
        // run the timer
        timeElapsed += msRefresh;
        timeLeft -= msRefresh;
    }

    let timeProgress = (timeElapsed / (v.timeGoal * 60 * 1000)) * 100;
    timeBar.style.width = timeProgress + "%";
}


v.currentWritingSessionTime = 0; // reset for the new session
let typedCharacter = false;
let timeSinceLast = 10000;
let continuousTypingTime = 0;
let rainbow = false;

function rainbowStreak() {
    timeSinceLast += msRefresh;
    continuousTypingTime += msRefresh;

    if (typedCharacter) {
        timeSinceLast = 0;
        typedCharacter = false;
    }

    rainbow = continuousTypingTime > 1000;

    if (timeSinceLast > 5000) {
        rainbow = false;
        continuousTypingTime = 0;
    } else {
        v.currentWritingSessionTime += msRefresh;
        v.dailyWritingSessionTime += msRefresh;
    }
    if (continuousTypingTime > v.longestWritingStreak) {
        v.longestWritingStreak = continuousTypingTime;
    }

    if (v.rainbowStreak) {
        let saturation = rainbow ? '100%' : `${continuousTypingTime / 10}%`;
        let lightness = v.nightMode ? '75%' : '35%';
        document.querySelector("#typeArea").style.color = `hsl(${hue}, ${saturation}, ${lightness})`;
    } else {
        document.querySelector("#typeArea").style.color = `rgba(var(--fontColor), 1)`;
    }
}

function checkIfNewDay() {
    let lastUsedDate = new Date(parseInt(v.lastRecordedTime));
    let currentDate = new Date();

    // Set both dates to midnight, keeping only the date portion
    lastUsedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Calculate the difference in days
    let differenceInDays = (currentDate.getTime() - lastUsedDate.getTime()) / (1000 * 3600 * 24);
    if (differenceInDays === 1) {
        console.log("Next day.");
        resetDailyThings();
        if (v.doneTodaysStreak == false) {
            v.dailyStreak = 0;
        }
        v.doneTodaysStreak = false;
    } else if (differenceInDays > 1) {

        console.log("Different day.");
        resetDailyThings();
        v.dailyStreak = 0;
        alertModal("You lost your streak! 😭 Your streak is now " + v.dailyStreak);
        v.doneTodaysStreak = false;
    } else {
        // Same day
    }
    function resetDailyThings() {
        v.dailyWritingSessionTime = 0;
        v.longestWritingStreak = 0;
    }
    v.lastRecordedTime = Date.now(); // put this here so that some errors don't occur!
}


if (navigator.onLine) {
    console.log('You are online!');
} else {
    console.log('You are offline!');
}


if (!v.firstOpen) {
    console.log("This is the first time the user has opened WriteRush!")
}

checkIfNewDay();
document.querySelector("#writeForSeconds").textContent = `Write for ${Math.round(v.streakCompletionTime / 1000)} seconds to increase your streak!`
document.querySelector('#dailyStreakDisplay').textContent = `Streak: ${v.dailyStreak}`;
openModal('startModal');
const motivationalMessages = [
    "You're here! Time to conquer that blank page.",
    "Welcome back! Ready to write something amazing today?",
    "The words are waiting. Let's get them down!",
    "Fuel up on creativity. It's time to write!",
    "Your words are waiting. Dive in now!",
    "Hey there, wordsmith! Ready to craft something incredible?",
    "The page is your playground. Have fun with it!",
    "You've got ideas. WriteRush is the platform. Let's make magic happen!",
    "Time to write! Unleash your creativity today.",
    "Hey, superstar! Ready to shine on the page today?",
    "Grab your favorite drink, get comfortable, and let's write something awesome!",
    "Every word is progress. Let's make a ton of progress today!",
    "You're back! Your writing adventure continues now.",
    "Ready, set, write! The world needs your words.",
    "Buckle up! It's going to be a great writing day.",
    "Your words can change the world. Start writing now!",
    "Writing's a journey, and you're the hero. Onward!",
    "Welcome to WriteRush! Where your writing dreams come alive.",
    "Who's ready to write? You are! Let's go!",
    "Today's writing goals are no match for you. Let's crush them!",
    "Unlock your creativity. It's time to write something spectacular!",
    "Put on your creative cap! It's time to write!",
    "Welcome back, champion! Let's knock out some amazing writing today.",
    "Your words have power. Use them to create something beautiful now.",
    "Ready to create? Your writing adventure starts here!",
    "Your thoughts, your words, your time. Make the most of it today!",
    "Ready to write? The page is calling your name!",
    "Let's make today's writing session the best one yet!",
    "You + Words = Magic. Let's make it happen now!",
    "Let's turn today's ideas into tomorrow's masterpieces!",
    "The blank page is a canvas. Paint it with your words!",
    "You've got the power to write something extraordinary. Let's do it!",
    "Write like no one's watching. Express yourself!",
    "Your writing journey begins with a single word. Start now!",
    "Time to write and shine! You've got this!",
    "Embrace the joy of writing. Create something beautiful today!",
    "Your creativity knows no bounds. Show the world what you've got!",
    "One word at a time. You'll get there. Start now!",
    "No dream is too big. Write yours into existence today!",
    "The words are your tools. Build something amazing!",
    "Get comfy, grab a snack, and let's write!",
    "Every word you write is a step towards greatness. Keep going!",
    "Unleash your imagination. The world is ready for your story!",
    "Welcome back! Let's turn thoughts into text.",
    "Today's a great day to write something incredible. Let's get started!",
    "Feeling creative? The page is waiting. Dive in!",
    "Write your way to awesomeness! You've got everything you need.",
    "Today's words will become tomorrow's legacy. Write on!",
    "Let's turn ideas into ink. Your writing journey starts now!",
    "Be bold, be brave, be you! Your words matter.",
    "Ready to explore your creativity? Your writing adventure awaits!",
    "The world is ready for your words. Let's make history!",
    "You're the author of your destiny. Write a fantastic chapter today!",
    "Think it, write it, love it! Your creativity is unstoppable!",
    "No limits, no boundaries. Just pure creativity. Write on!",
    "You've got a universe in your mind. Share it with the world!",
    "Welcome to your writing haven. Let's create something memorable!",
    "Dream big. Write bigger. You've got this!",
    "Your words, your world. Make it extraordinary!"
];

document.querySelector("#startModalText").innerHTML = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
document.querySelector("#doneStreakDisplay").textContent = v.doneTodaysStreak ? "(Today's streak done! 😄)" : "(Finish today's streak! ⌨️)"

let notesOpen = false;
const imageNoteDisplay = document.querySelector("#imageNoteDisplay");
const notesSidebar = document.querySelector("#notesSidebar")
notesSidebar.style.border = "0px";
notesTextarea.style.display = "none";
imageNoteDisplay.style.display = "none";
function notesClick() {
    notesOpen = !notesOpen;
    if (parseInt(notesSidebar.style.width)) {
        // if it's open
        notesSidebar.style.width = "0";
        notesSidebar.style.border = "0";
        notesTextarea.style.display = "none";
        imageNoteDisplay.style.display = "none";
    } else {
        notesSidebar.style.width = "30%";
        notesSidebar.style.borderRight = "var(--borderSize) solid var(--outline)";
        
        switch (v.notes[v.currentNoteIndex].type) {
            case "text":
                notesTextarea.style.display = "flex";
                imageNoteDisplay.style.display = "none";
                break;
            case "image":
                notesTextarea.style.display = "none";
                imageNoteDisplay.style.display = "flex";
                imageNote.src = v.notes[v.currentNoteIndex].image;
                break;
            default:
                notesTextarea.style.display = "flex";
                imageNoteDisplay.style.display = "none";
                break;
        }
    }
}

/*
switch (v.notes[v.currentnoteIndex].type) {
    case "text":
        notesTextarea.style.display = "flex";
        imageNoteDisplay.style.display = "none";
        break;
    case "image":
        notesTextarea.style.display = "none";
        imageNoteDisplay.style.display = "flex";
        imageNote.src = v.notes[v.currentNoteIndex].image;
        break;
    default:
        notesTextarea.style.display = "flex";
        imageNoteDisplay.style.display = "none";
        break;
}
*/



function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.querySelector("#container").style.marginLeft= "0";
}


/*
let isResizing = false;

document.querySelector('.resizable-handle').addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.userSelect = 'none'; // Disable text selection
    document.addEventListener('mousemove', handleMouseMove);
    
    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.body.style.userSelect = ''; // Re-enable text selection
        document.removeEventListener('mousemove', handleMouseMove);
    });
    
});

function handleMouseMove(e) {
    if (isResizing) {
        // Calculate the new width as a percentage of the window's width
        let newWidth = e.clientX / window.innerWidth * 100;

        // Clamp the width between 0 and 40 percent
        newWidth = Math.min(Math.max(newWidth, 0), 40);

        notesSidebar.style.width = newWidth + '%';
        document.querySelector("#container").style.marginLeft = newWidth + '%';
    }
}
*/
function syllableCount(input) {
    function countSyllables(word) {
        word = word.toLowerCase();
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        let match = word.match(/[aeiouy]{1,2}/g);
        return match ? match.length : 0;
    }

    return input.split(/\s+/).reduce((count, word) => count + countSyllables(word), 0);
}

function syllablesPerWord(input) {
    return syllableCount(input) / countWords(input);
}



function wordsPerSentence(text) {
    return countWords(text) / countSentences(text);
}
function countSentences(text) {
    // Split the text into lines
    let lines = text.split(/\n+/);
    
    // Initialize a counter for sentences
    let sentenceCount = 0;
    
    // Iterate through the lines, split by punctuation, and count non-empty sentences
    lines.forEach(line => {
        line = line.replace(/\s+/g, ' ').replace(/[.!?]{2,}/g, '.');
        let sentences = line.split(/[.!?]/);
        sentences = sentences.filter(sentence => sentence.trim() !== '');
        sentenceCount += sentences.length;
    });
    
    return sentenceCount;
}




function countCharactersNoSpaces(input) {
    return input.replace(/\s+/g, '').length;
}

function fkra(input) {
    return (0.39 * wordsPerSentence(input)) + (11.8 * syllablesPerWord(input)) - 15.59;
}
function cli(input) {
    // L is the average number of letters per 100 words. 
    // S is the average number of sentences per 100 words.
    let l = ((countCharactersNoSpaces(input) / (countWords(input) / 100)) / 1)
    let s = ((countSentences(input) / (countWords(input) / 100)) / 1)
    return (0.0588 * l) - (0.296 * s) - 15.8;
}

function ari(input) {
    return (4.71 * (countCharactersNoSpaces(input) / countWords(input)) + (0.5 * (countWords(input) / countSentences(input))) - 21.43);
}

function readability(input) {
    return Math.max(((fkra(input) + cli(input) + ari(input)) / 3), 0);
}


/*
START OF NOTES
*/
/*
imageInput.addEventListener('change', function() {
    if (this.files.length === 0) {
        return;  // Exit the function if no file is selected
    }
    
    const selectedFile = this.files[0];
    let fileName = selectedFile.name; 
    fileName = fileName.substring(0, 10) + "...";

    const reader = new FileReader();
    reader.onload = e => {
        document.body.style.backgroundImage = `url(${e.target.result})`;
        
        imageInputLabel.textContent = fileName;
        
        isBgImage = true;
        v.backgroundImage = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
});


const loadImage = () => {
    const result = v.backgroundImage;
    if (result) {
        document.body.style.backgroundImage = `url(${result})`;
        imageInputLabel.textContent = "Selected";  
        isBgImage = true;  
    }
};
loadImage();



function clearImages() {
    if (isBgImage) {
        document.querySelector("#imageInputLabel").textContent = "None Selected";
        document.body.style.backgroundImage = 'none';
        document.querySelector('#imageInput').value = null;
        isBgImage = false;
        document.querySelector('#sizeError').textContent = '';
        v.bgImage = null;
        v.bgImageName = null;
        v.backgroundImage = null;
    }
    
}
*/

let isDragging = false;
let lastX, lastY;  // Last position of the cursor

const noteImage = document.querySelector('.imageNoteDisplay img');

imageNoteDisplay.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const dx = e.clientX - lastX;  // change in X
    const dy = e.clientY - lastY;  // change in Y
    
    // Adjust image position based on how much mouse has moved
    noteImage.style.left = (noteImage.offsetLeft + dx) + "px";
    noteImage.style.top = (noteImage.offsetTop + dy) + "px";

    lastX = e.clientX;
    lastY = e.clientY;
});

// Zoom on wheel
imageNoteDisplay.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    // Determine zoom level based on wheel direction
    let scale = 1;
    if (e.deltaY > 0) {
        scale -= 0.1;
    } else {
        scale += 0.1;
    }
    
    const currentScale = getComputedStyle(noteImage).transform.match(/matrix\((.*)\)/); 
    const newScale = currentScale ? parseFloat(currentScale[1].split(', ')[3]) * scale : scale;
    noteImage.style.transform = `scale(${newScale})`;
});





window.addEventListener('wheel', (e) => {
    // If the ctrlKey is pressed, we're likely trying to zoom.
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

const imageNote = document.querySelector("#imageNote");
const imageNoteInput = document.querySelector("#imageNoteInput");
imageNoteInput.addEventListener("change", (e) => {
    if (imageNoteInput.files.length === 0) {
        console.log("NONNONONONONONON");
        return;
    }
    
    const selectedFile = imageNoteInput.files[0];

    const reader = new FileReader();
    reader.onload = e => {
        const newNoteTemp = {
            id: Date.now().toString(),
            name: "Image Note",
            text: "You should not be able to see this text",
            type: "image",
            image: e.target.result,
        }
        v.notes.push(newNoteTemp);
        v.currentNoteIndex = v.notes.length - 1;
        updateNotesList();
        openNote(v.currentNoteIndex);
        // imageNote.src = newNoteTemp.image;
        imageNote.src = e.target.result;
        
    };
    reader.readAsDataURL(imageNoteInput.files[0]);
    closeModal("newNoteModal");
})


const textNoteButton = document.querySelector("#textNoteButton");
textNoteButton.addEventListener("click", () => {
    closeModal("newNoteModal");
    newNote();
})



const newNoteButton = document.querySelector("#newNoteButton");
newNoteButton.addEventListener("click", () => {
    openModal("newNoteModal");
});



const notesSectionDiv = document.querySelector('#notesSectionDiv');
function updateNotesList() {
    notesSectionDiv.innerHTML = "";

    for (let i = 0; i < v.notes.length; i++) {
        const chapter = document.createElement("div");
        chapter.classList.add("chapter");
        
        chapter.setAttribute('data-id', v.notes[i].id.toString());

        const leftChapterDiv = document.createElement("div");
        const chapterHashtag = document.createElement("p");
        let symbol;
        switch (v.notes[i].type) {
            case "text": 
                symbol = "T";
                break;
            case "image":
                symbol = "I";
                break;
            default:
                symbol = "?";
                break;
        }
        chapterHashtag.innerHTML = `<p><strong>${symbol}</strong> `;
        leftChapterDiv.appendChild(chapterHashtag);
        const chapterP = document.createElement("p");
        chapterP.innerHTML = v.notes[i].name;
        leftChapterDiv.appendChild(chapterP);
        chapter.appendChild(leftChapterDiv);
        const chapterDeleteButton = document.createElement("button");
        chapterDeleteButton.classList.add("chapterDeleteButton");
        chapterDeleteButton.innerHTML = "<strong>🗑</strong>";
        chapter.appendChild(chapterDeleteButton);


        chapter.addEventListener("click", () => {
            if (v.currentNoteIndex == i) {
                return;
            }
            v.currentNoteIndex = i;
            openNote(v.currentNoteIndex)
            
        })

        chapterDeleteButton.addEventListener("click", (e) => {
            e.stopPropagation();  // This stops the event from bubbling up
            deleteNote(i);
            
        })
        
        if (i == v.currentNoteIndex) {
            chapterP.style.textDecoration = "underline";
            chapter.style.backgroundColor = "rgb(var(--secondary))"
        } else {
            chapterP.style.textDecoration = "none";
            chapter.style.backgroundColor = "none"
        }
        
        notesSectionDiv.appendChild(chapter);
    }
}

openNote(v.currentNoteIndex);

function openNote(noteIndex) {
    v.notesText = v.notes[noteIndex].text;
    if (notesOpen) {

        switch (v.notes[noteIndex].type) {
            case "text":
                notesTextarea.style.display = "flex";
                imageNoteDisplay.style.display = "none";
                break;
            case "image":
                notesTextarea.style.display = "none";
                imageNoteDisplay.style.display = "flex";
                imageNote.src = v.notes[v.currentNoteIndex].image;
                break;
            default:
                notesTextarea.style.display = "flex";
                imageNoteDisplay.style.display = "none";
                break;
        }
    }
    notesTextarea.value = v.notesText;
    updateNotesList();
}

function deleteNote(i) {
    if (confirm("Are you sure you want to delete this note?: " + v.notes[i].name)) {
        v.notes.splice(i, 1);
        v.currentNoteIndex = 0;
        if (v.notes.length == 0) {
            newNote();
        }
        openNote(0);
        updateNotesList();
    }
}

function newNote() {
    const newNoteTemp = {
        id: Date.now().toString(),
        name: "Text Note",
        text: "This is a text note! Type here ...",
        type: "text",
    }
    v.notes.push(newNoteTemp);
    v.currentNoteIndex = v.notes.length - 1;
    updateNotesList();
    openNote(v.currentNoteIndex);
}


const noteDragula = dragula([document.querySelector("#notesSectionDiv")]);

noteDragula.on('drop', () => {
    reorderNotes();
});

function reorderNotes() {
    const newOrderNotes = [];

    const currentNoteID = v.notes[v.currentNoteIndex].id.toString();


    const children = notesSectionDiv.children;
    for (let i = 0; i < children.length; i++) {
        const noteID = children[i].getAttribute('data-id');

        const matchedNote = v.notes.find(note => note.id.toString() === noteID);
        if (matchedNote) {
            newOrderNotes.push(matchedNote);
        }
    }
    v.notes = newOrderNotes;
    v.currentNoteIndex = newOrderNotes.findIndex(note => note.id.toString() === currentNoteID);

    updateNotesList();
}





/*
END OF NOTES
*/









const newChapterButton = document.querySelector("#newChapterButton");
newChapterButton.addEventListener("click", () => {
    newChapter();
});



const chapterSectionDiv = document.querySelector('#chapterSectionDiv');
function updateChapterList() {
    chapterSectionDiv.innerHTML = "";

    for (let i = 0; i < v.files[v.currentFileIndex].chapters.length; i++) {
        const chapter = document.createElement("div");
        chapter.classList.add("chapter");
        chapter.setAttribute('data-id', v.files[v.currentFileIndex].chapters[i].id.toString());

        const leftChapterDiv = document.createElement("div");
        const chapterHashtag = document.createElement("p");
        chapterHashtag.innerHTML = "<p><strong>#</strong> ";
        leftChapterDiv.appendChild(chapterHashtag);
        const chapterP = document.createElement("p");
        chapterP.innerHTML = v.files[v.currentFileIndex].chapters[i].name;
        leftChapterDiv.appendChild(chapterP);
        chapter.appendChild(leftChapterDiv);
        const chapterDeleteButton = document.createElement("button");
        chapterDeleteButton.classList.add("chapterDeleteButton");
        chapterDeleteButton.innerHTML = "<strong>🗑</strong>";
        chapter.appendChild(chapterDeleteButton);


        chapter.addEventListener("click", () => {
            if (v.currentChapterIndex == i) {
                return;
            }
            v.currentChapterIndex = i;
            openChapter(v.currentChapterIndex)
            
        })

        chapterDeleteButton.addEventListener("click", (e) => {
            e.stopPropagation();  // This stops the event from bubbling up
            deleteChapter(i);
            
        })
        
        if (i == v.currentChapterIndex) {
            chapterP.style.textDecoration = "underline";
            chapter.style.backgroundColor = "rgb(var(--secondary))"
        } else {
            chapterP.style.textDecoration = "none";
            chapter.style.backgroundColor = "none"
        }
        
        chapterSectionDiv.appendChild(chapter);
    }
}

openChapter(v.currentChapterIndex);

function openChapter(chpIndex) {
    v.text = v.files[v.currentFileIndex].chapters[chpIndex].text;
    const textArea = document.querySelector("#typeArea");
    textArea.value = v.text;
    updateChapterList();
}

function deleteChapter(i) {
    if (confirm("Are you sure you want to delete this chapter?: " + v.files[v.currentFileIndex].chapters[i].name)) {
        v.files[v.currentFileIndex].chapters.splice(i, 1);
        v.currentChapterIndex = 0;
        if (v.files[v.currentFileIndex].chapters.length == 0) {
            newChapter();
        }
        openChapter(0);
        updateChapterList();
    }
}

function newChapter() {
    const newChapTemp = {
        id: Date.now().toString(),
        name: "New Chapter",
        text: "This is a new chapter! Type here ..."
    }
    v.files[v.currentFileIndex].chapters.push(newChapTemp);
    v.currentChapterIndex = v.files[v.currentFileIndex].chapters.length - 1;
    updateChapterList();
    openChapter(v.currentChapterIndex);
}


const chapterDragula = dragula([document.querySelector("#chapterSectionDiv")]);

chapterDragula.on('drop', () => {
    reorderChapters();
});

function reorderChapters() {
    const newOrderChapters = [];

    const currentChapterID = v.files[v.currentFileIndex].chapters[v.currentChapterIndex].id.toString();


    const children = chapterSectionDiv.children;
    for (let i = 0; i < children.length; i++) {
        const chapterID = children[i].getAttribute('data-id');

        const matchedChapter = v.files[v.currentFileIndex].chapters.find(chap => chap.id.toString() === chapterID);
        if (matchedChapter) {
            newOrderChapters.push(matchedChapter);
        }
    }
    v.files[v.currentFileIndex].chapters = newOrderChapters;
    v.currentChapterIndex = newOrderChapters.findIndex(chap => chap.id.toString() === currentChapterID);

    updateChapterList();
}


const fileDragula = dragula([document.querySelector("#fileDiv")], {
    direction: 'horizontal'
});
  
fileDragula.on("drop", () => {
    reorderFiles();
})

/*


<div class="chapter">
    <p><strong>#</strong> Chapter 1: The Beginning</p>
    <button class="chapterDeleteButton"><strong>🗑</strong></button>
</div>

*/

const lowerNavbarDiv = document.querySelector("#lowerNavbarDiv");
const fileDiv = document.querySelector("#fileDiv");
function reorderFiles() {
    
    const newOrderFiles = [];

    const currentFileID = v.files[v.currentFileIndex].id.toString();


    const children = fileDiv.children;
    for (let i = 0; i < children.length; i++) {
        const fileID = children[i].getAttribute('data-id');

        const matchedFile = v.files.find(file => file.id.toString() === fileID);
        if (matchedFile) {
            newOrderFiles.push(matchedFile);
        }
    }
    v.files = newOrderFiles;
    v.currentFileIndex = newOrderFiles.findIndex(file => file.id.toString() === currentFileID);
    updateFileButtons();

}




const newFileButton = document.createElement("button");
function updateFileButtons() {
    updateChapterList();
    lowerNavbarDiv.innerHTML = "";
    fileDiv.innerHTML = "";

    newFileButton.classList.add("outlineButton");
    newFileButton.id = "newFileButton";
    newFileButton.textContent = "New File";
    newFileButton.addEventListener("click", newFile);
    lowerNavbarDiv.appendChild(newFileButton);


    for (let i = 0; i < v.files.length; i++) {
        const button = document.createElement("button");
        button.classList.add("navbarButton");
        button.classList.add("file");
        button.setAttribute('data-id', v.files[i].id.toString());
        button.textContent = v.files[i].name;
        fileDiv.appendChild(button);
        lowerNavbarDiv.appendChild(fileDiv);
        button.addEventListener("click", () => {
            v.currentFileIndex = i;
            openFile(i);
        });
        
        if (i == v.currentFileIndex) {
            button.style.textDecoration = "underline";
            button.style.backgroundColor = "rgb(var(--secondary))"
            //button.style.color = "var(--fontColor)";
        } else {
            button.style.textDecoration = "none";
            button.style.backgroundColor = "none";
            //button.style.color = "gray";
        }
    }

    /*
    // Create new file buttons
    v.files.forEach((file, i) => {
        const button = document.createElement("button");
        button.classList.add("navbarButton");
        button.textContent = file.name;
        lowerNavbarDiv.appendChild(button);
        button.addEventListener("click", () => {
            v.currentFileIndex = i;
            openFile(i);
        });

        // Append a space if needed
        if (i < v.files.length - 1) {
            addSpace();
        }
    });

    */
}


/*


function updateFileButtons() {
    updateChapterList();
    lowerNavbarDiv.innerHTML = "";

    newFileButton.classList.add("outlineButton");
    newFileButton.id = "newFileButton";
    newFileButton.textContent = "New File";
    newFileButton.addEventListener("click", newFile);
    lowerNavbarDiv.appendChild(newFileButton);
    addSpace();


    for (let i = 0; i < v.files.length; i++) {
        const button = document.createElement("button");
        button.classList.add("navbarButton");
        button.textContent = v.files[i].name;
        lowerNavbarDiv.appendChild(button);
        button.addEventListener("click", () => {
            v.currentFileIndex = i;
            openFile(i);
        });
        addSpace();
        
        if (i == v.currentFileIndex) {
            button.style.textDecoration = "underline";
            //button.style.color = "var(--fontColor)";
        } else {
            button.style.textDecoration = "none";
            //button.style.color = "gray";
        }
    }

}
*/



function refreshFileButtons() {
    updateFileButtons();
}
refreshFileButtons();




function newFile() {
    const newFile = {
        id: Date.now().toString(),
        name: 'Untitled',
        exclude: 0,
        wordGoal: 50,
        chapters: [{
            id: Date.now().toString(),
            name: "Untitled",
            text: 'New file!\n\n(Note: If you are updating WriteRush, please go into Settings > Other > Reset Settings. This will ensure the new update functions correctly!) \n\nType here ...',
        }],
        
        notesText: 'New file!\n\nType here ...',
    };
    v.files.push(newFile);
    openFile(v.files.length - 1);
    refreshFileButtons();
}

function openFile(i) {
    if (v.files.length == 0) {
        newFile();
    }
    v.currentChapterIndex = 0;
    v.text = v.files[i].chapters[v.currentChapterIndex].text;
    // v.notesText = v.files[i].notesText;
    v.exclude = v.files[i].exclude;
    v.wordGoal = v.files[i].wordGoal;
    const textArea = document.querySelector("#typeArea");
    textArea.value = v.text;
    notesTextarea.value = v.notesText;
    v.currentFileIndex = i;
    refreshFileButtons();
    firstLoad = true;
    v.goalReached = true;
    wordCount = countWords(v.text);
    updateProgressBar();
}


const noteNameInput = document.querySelector('#noteNameInput');
const saveNoteNameButton = document.querySelector('#saveNoteNameButton');

saveNoteNameButton.addEventListener('click', () => {
    if (noteNameInput.value.length > 0) {
        v.notes[v.currentNoteIndex].name = noteNameInput.value;
        updateNotesList();
    } else {
        alert("Please enter a note name.");
    }
});


const chapterNameInput = document.querySelector('#chapterNameInput');
const saveChapterNameButton = document.querySelector('#saveChapterNameButton');

saveChapterNameButton.addEventListener('click', () => {
    if (chapterNameInput.value.length > 0) {
        v.files[v.currentFileIndex].chapters[v.currentChapterIndex].name = chapterNameInput.value;
        updateChapterList();
    } else {
        alert("Please enter a chapter name.");
    }
});


const fileNameInput = document.querySelector('#fileNameInput');
const saveFileNameButton = document.querySelector('#saveFileNameButton');
function openFileModal() {
    fileNameInput.value = v.files[v.currentFileIndex].name;
    chapterNameInput.value = v.files[v.currentFileIndex].chapters[v.currentChapterIndex].name;
    noteNameInput.value = v.notes[v.currentNoteIndex].name;

}

saveFileNameButton.addEventListener('click', () => {
    if (fileNameInput.value.length > 0) {
        v.files[v.currentFileIndex].name = fileNameInput.value;
        refreshFileButtons();
    } else {
        alert("Please enter a file name.");
    }
});

function deleteFile(i) {
    if (confirm("Are you sure you want to delete this file?: " + v.files[i].name)) {
        v.files.splice(i, 1);
        refreshFileButtons();
        openFile(0);
    }
    openFileModal();
}


openFile(v.currentFileIndex);