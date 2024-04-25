// Global Vars
// Global Vars
// Global Vars
// Global Vars

let incrementsReached = [];
let isModalOpen = false;
let xC;
let yC;
let textRedacted = false;
let previousWordCount = Infinity;

let updateWordCountMax = 5;
let updateWordCountNum = 0;

const upperNavbar = document.querySelector("#upperNavbar");
const lowerNavbar = document.querySelector("#lowerNavbar");

const upperNavbarDiv = document.querySelector("#upperNavbarDiv");
const lowerNavbarDiv = document.querySelector("#lowerNavbarDiv");

const chapterSidebar = document.querySelector("#chapterSidebar");
const chapterSection = document.querySelector("#chapterSection");

const quickAccessSidebar = document.querySelector("#quickAccessSidebar");
const quickAccessDiv = document.querySelector("#quickAccessDiv");

const typeAreaDiv = document.querySelector("#typeAreaDiv");
const typeAreaVisuals = document.querySelector("#typeAreaVisuals");

const notesTextarea = document.querySelector("#notesTextarea");

const progressBarText = document.querySelector("#progressBarText");
const progressBar = document.querySelector("#progressBar");
const timeBar = document.querySelector("#timeBar");

const progressBarContainer = document.querySelector("#progressBarContainer");

const redactButton = document.querySelector("#redactButton");
const fullscreenButton = document.querySelector("#fullscreenButton");

const hideAllBtn = document.querySelector("#hideAllBtn");

const celebrateSound = document.querySelector("#celebrate");

const imageNote = document.querySelector("#imageNote");
const imageNoteInput = document.querySelector("#imageNoteInput");
const imageNoteButton = document.querySelector("#imageNoteButton");

let timerRunning = false;
let timeElapsed = 0;
let timeLeft = v.timeGoal * 1000 * 60;
const msRefresh = 1000;

const pauseButton = document.querySelector("#pauseButton");

v.currentWritingSessionTime = 0;
let typedCharacter = false;
let timeSinceLast = 10000;
let continuousTypingTime = 0;
let rainbow = false;

let notesOpen = false;
const imageNoteDisplay = document.querySelector("#imageNoteDisplay");
const notesSidebar = document.querySelector("#notesSidebar");

let isDragging = false;
let lastX, lastY; // Last position of the cursor

const noteImage = document.querySelector(".imageNoteDisplay img");
const textNoteButton = document.querySelector("#textNoteButton");
const notesSectionDiv = document.querySelector("#notesSectionDiv");

let editingChapterName = false;
const newChapterButton = document.querySelector("#newChapterButton");
const chapterSectionDiv = document.querySelector("#chapterSectionDiv");

const newFileButton = document.createElement("button");
const fileDiv = document.querySelector("#fileDiv");

const fileNameInput = document.querySelector("#fileNameInput");
const saveFileNameButton = document.querySelector("#saveFileNameButton");

let editingNoteName = false;

typeArea.value = v.text;
notesTextarea.value = v.notesText;
let wordCount = countWords(v.text);
v.goalReached = true;
let firstLoad = true;
updateProgressBar();

// Event Listeners
// Event Listeners
// Event Listeners
// Event Listeners
// Event Listeners
// Event Listeners
// Event Listeners
// Event Listeners
// Event Listeners

hideAllBtn.addEventListener("click", (e) => {
  v.autoHide = !v.autoHide;
  updateHideUI(e);
});

notesTextarea.addEventListener("input", () => {
  v.notesText = notesTextarea.value;
  v.notes[v.currentNoteIndex].text = notesTextarea.value;
});

typeArea.addEventListener("input", () => {
  if (
    typeArea.value.length < v.text.length &&
    v.text.startsWith(typeArea.value)
  ) {
    inTypeAreaInput();
    return;
  }
  function inTypeAreaInput() {
    updateWordCountNum--;
    v.text = typeArea.value;
    v.files[v.currentFileIndex].chapters[v.currentChapterIndex].text = v.text;
    if (updateWordCountNum <= 0) {
      updateWordCountNum = updateWordCountMax;

      wordCount = countWords(v.text);
    }
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
  // updateCaretPos();
  typingConfetti();
  shakeScreen(v.screenShakeIntensity);
});

redactButton.addEventListener("click", () => {
  textRedacted = !textRedacted;
  typeArea.style.fontFamily = textRedacted ? "Redacted" : v.fontFamily;
});

quickAccessSidebar.addEventListener("click", () => {
  const caretLoc = typeArea.selectionStart;
  typeArea.focus();
  typeArea.selectionStart = caretLoc;
  typeArea.selectionEnd = caretLoc;
});

pauseButton.addEventListener("click", () => {
  timerRunning = !timerRunning;
  pauseButton.innerHTML = timerRunning
    ? `<span class="material-icons quickAccess">pause_circle</span>`
    : `<span class="material-icons quickAccess">play_circle</span>`;
});
document.querySelector("#stopButton").addEventListener("click", () => {
  timerRunning = false;
  timeElapsed = 0;
  timeLeft = v.timeGoal;
  pauseButton.innerHTML = `<span class="material-icons quickAccess">play_circle</span>`;
  timeBar.style.width = "0%";
});

imageNoteDisplay.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const dx = e.clientX - lastX; // change in X
  const dy = e.clientY - lastY; // change in Y

  noteImage.style.left = noteImage.offsetLeft + dx + "px";
  noteImage.style.top = noteImage.offsetTop + dy + "px";

  lastX = e.clientX;
  lastY = e.clientY;
});

imageNoteDisplay.addEventListener("wheel", (e) => {
  e.preventDefault();
  const MIN_SCALE = 0.1;
  const MAX_SCALE = 30;
  const ZOOM_SPEED = 0.01;

  const transform = getComputedStyle(noteImage).transform;
  const currentScaleMatch = transform.match(/matrix\((.*)\)/);
  let currentScale = currentScaleMatch
    ? parseFloat(currentScaleMatch[1].split(", ")[3])
    : 1;
  let newScale = currentScale + ZOOM_SPEED * -e.deltaY;
  newScale = Math.max(MIN_SCALE, newScale);
  newScale = Math.min(MAX_SCALE, newScale);

  noteImage.style.transform = `scale(${newScale})`;
});

window.addEventListener(
  "wheel",
  (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  },
  { passive: false }
);

imageNoteButton.addEventListener("click", () => {
  imageNoteInput.click();
});
imageNoteInput.addEventListener("change", (e) => {
  if (imageNoteInput.files.length === 0) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const newNoteTemp = {
      id: Date.now().toString(),
      name: "Image Note",
      text: "You should not be able to see this text",
      type: "image",
      image: e.target.result,
    };
    v.notes.push(newNoteTemp);
    v.currentNoteIndex = v.notes.length - 1;
    updateNotesList();
    openNote(v.currentNoteIndex);
    imageNote.src = e.target.result;
  };
  reader.readAsDataURL(imageNoteInput.files[0]);
});

textNoteButton.addEventListener("click", () => {
  newNote();
});

newChapterButton.addEventListener("click", () => {
  newChapter();
});

saveFileNameButton.addEventListener("click", () => {
  if (fileNameInput.value.length > 0) {
    v.files[v.currentFileIndex].name = fileNameInput.value;
    refreshFileButtons();
  } else {
    alert("Please enter a file name.");
  }
});

// Helper Functions
// Helper Functions
// Helper Functions
// Helper Functions
// Helper Functions

function countWords(str) {
  if (str.length !== 0) {
    // Remove all special characters but keep whitespaces, alphanumeric characters, and digits
    // \p{L} matches any kind of letter from any language
    // \d matches any digit from 0 to 9
    const cleanedStr = str.replace(/[^\p{L}\d\s]/gu, "").replace(/\s+/g, " ");
    return cleanedStr.trim().split(" ").filter(Boolean).length;
  } else {
    return 0;
  }
}

// UI Functions
// UI Functions
// UI Functions
// UI Functions
// UI Functions

function openModal(modalId) {
  isModalOpen = true;
  const modal = document.getElementById(modalId);
  modal.style.display = "block";
}

const modals = document.getElementsByClassName("modal");
window.onclick = (e) => {
  for (let i = 0; i < modals.length; i++) {
    if (e.target == modals[i]) {
      closeModal(i);
    }
  }
  let alertModal = document.querySelector("#alertModal");
  if (e.target !== alertModal) {
    alertModal.style.display = "none";
  }
};

function closeModal(i) {
  modals[i].style.display = "none";
  isModalOpen = false;
}

const alertModalElement = document.querySelector("#alertModal");
function alertModal(text) {
  alertModalElement.style.display = "block";
  document.querySelector("#alertModalText").innerHTML = text;
  setTimeout(() => {
    alertModalElement.style.display = "none";
  }, 3000);
}

const upperNavbarStyle = getComputedStyle(upperNavbar);
const upperHeight = parseInt(upperNavbarStyle.height);
const lowerNavbarStyle = getComputedStyle(lowerNavbar);
const lowerHeight = parseInt(lowerNavbarStyle.height);
const chapterSidebarStyle = getComputedStyle(chapterSidebar);
const chapterSidebarWidth = parseInt(chapterSidebarStyle.width);
const quickAccessStyle = getComputedStyle(quickAccessSidebar);
const quickAccessWidth = parseInt(quickAccessStyle.width);

const typeAreaDivStyle = getComputedStyle(typeAreaDiv);
const typeAreaDivPadding = parseInt(typeAreaDivStyle.padding);

let upperNavbarOpen = false;
let lowerNavbarOpen = false;
let quickAccessOpen = false;
let chapterSidebarOpen = false;

document.addEventListener("mousemove", (e) => {
  updateHideUI(e);
});

function updateHideUI(e) {
  if (isModalOpen) {
    return;
  }

  const chapterSidebarWidth = parseInt(0.2 * window.innerWidth);
  if (e.clientY <= typeAreaDivPadding / 2) {
    if (!quickAccessOpen && !chapterSidebarOpen) {
      upperNavbarOpen = true;
    }
  } else if (e.clientY >= upperHeight + typeAreaDivPadding * 2) {
    upperNavbarOpen = false;
  }
  if (e.clientY >= window.innerHeight - typeAreaDivPadding / 2) {
    if (!chapterSidebarOpen) {
      lowerNavbarOpen = true;
    }
  } else if (
    e.clientY <=
    window.innerHeight - (lowerHeight + typeAreaDivPadding * 2)
  ) {
    lowerNavbarOpen = false;
  }
  if (e.clientX >= window.innerWidth - typeAreaDivPadding / 2) {
    if (!upperNavbarOpen) {
      quickAccessOpen = true;
    }
  } else if (
    e.clientX <=
    window.innerWidth - (quickAccessWidth + typeAreaDivPadding * 2)
  ) {
    quickAccessOpen = false;
  }

  if (e.clientX <= typeAreaDivPadding / 2) {
    if (!upperNavbarOpen && !lowerNavbarOpen && e.clientY > upperHeight * 1.5) {
      chapterSidebarOpen = true;
    }
  } else if (e.clientX >= chapterSidebarWidth + typeAreaDivPadding * 2) {
    chapterSidebarOpen = false;
  }
  if (!v.autoHide) {
    upperNavbarOpen = true;
    lowerNavbarOpen = true;
    quickAccessOpen = true;
    chapterSidebarOpen = true;
  }

  if (upperNavbarOpen) {
    upperNavbar.style.height = `${upperHeight}px`;
    upperNavbarDiv.style.display = "flex";
  } else {
    upperNavbar.style.height = "0";
    upperNavbarDiv.style.display = "none";
  }

  if (lowerNavbarOpen) {
    lowerNavbar.style.height = `${upperHeight}px`;
    lowerNavbarDiv.style.display = "flex";
  } else {
    lowerNavbar.style.height = "0";
    lowerNavbarDiv.style.display = "none";
  }

  if (quickAccessOpen) {
    quickAccessSidebar.style.width = `${upperHeight}px`;
    quickAccessDiv.style.display = "flex";
  } else {
    quickAccessSidebar.style.width = "0";
    quickAccessDiv.style.display = "none";
  }

  if (chapterSidebarOpen) {
    chapterSidebar.style.width = "20%";
    chapterSection.style.display = "flex";
  } else {
    chapterSidebar.style.width = "0";
    chapterSection.style.display = "none";
  }
}

function updateProgressBar() {
  let progress = ((wordCount - v.exclude) / (v.wordGoal - v.exclude)) * 100;
  v.exclude = Math.min(v.exclude, wordCount);
  progressBarText.innerHTML = `${Math.round(progress)}%
    <div class="vLine"></div>
    ${wordCount}/${v.wordGoal}
    <div class="vLine"></div>
    ${wordCount - v.wordGoal}`;

  progressBar.style.width = progress + "%";

  const progressBarColor = v.rainbowProgressBar
    ? `hsl(${hue}, ${progress}%, 50%)`
    : v.progressBarColor;
  progressBar.style.backgroundColor = progressBarColor;
  timeBar.style.backgroundColor = progressBarColor;
  progressBarConfetti(progress);
}

/*
function progressBarConfetti(progress) {
  let currentIncrement = Math.floor(progress / 10) * 10;

  let previousProgress =
    ((previousWordCount - v.exclude) / (v.wordGoal - v.exclude)) * 100;
  let previousIncrement = Math.floor(previousProgress / 10) * 10;

  let difference = currentIncrement - previousIncrement;

  const progressBarRect = progressBarContainer.getBoundingClientRect();
  if (difference === 0) {
    return;
  } else {
    if (currentIncrement > 100) {
      return;
    }
    for (let i = 0; i < difference / 10; i++) {
      if (i > 10) {
        i = 9;
      }
      incrementConfetti(currentIncrement);
    }
  }

  // Goal reached condition
  if (progress >= 100 && v.goalReached !== true) {
    fireworks();
    fireworksSound();
    v.goalReached = true;
  } else if (progress < 100) {
    v.goalReached = false;
  }

  function incrementConfetti(i) {
    confetti({
      particleCount: 100,
      startVelocity: 40,
      spread: 60,
      origin: {
        x:
          (progressBarRect.left +
            progressBarRect.width * (i / 100) +
            window.scrollX) /
          window.innerWidth,
        y: (progressBarRect.top + window.scrollY) / window.innerHeight,
      },
    });

    incrementsReached.push(currentIncrement); // Mark this increment as reached
  }

  previousWordCount = wordCount;
}
*/
function progressBarConfetti(progress) {
  // Optimize by calculating these once, outside of any loops

  let currentIncrement = Math.floor(progress / 10) * 10;

  let previousProgress =
    ((previousWordCount - v.exclude) / (v.wordGoal - v.exclude)) * 100;
  let previousIncrement = Math.floor(previousProgress / 10) * 10;

  let difference = currentIncrement - previousIncrement;

  if (difference === 0 || currentIncrement > 100) {
    console.log("RETURN");
    return;
  }
  const progressBarRect = progressBarContainer.getBoundingClientRect();
  const rectLeft = progressBarRect.left;
  const rectWidth = progressBarRect.width;
  const rectTop = progressBarRect.top;
  const windowInnerWidth = window.innerWidth;
  const windowScrollY = window.scrollY;
  const windowScrollX = window.scrollX;

  // Limit the loop to a maximum of 10 increments
  const maxIterations = Math.min(10, difference / 10);
  for (let i = 0; i < maxIterations; i++) {
    incrementConfetti(currentIncrement);
  }

  // Goal reached condition
  if (progress >= 100 && v.goalReached !== true) {
    fireworks();
    fireworksSound();
    v.goalReached = true;
  } else if (progress < 100) {
    v.goalReached = false;
  }

  function incrementConfetti(i) {
    confetti({
      particleCount: 50,
      startVelocity: 40,
      spread: 60,
      origin: {
        x:
          (rectLeft + rectWidth * (i / 100) + windowScrollX) / windowInnerWidth,
        y: (rectTop + windowScrollY) / window.innerHeight,
      },
    });
  }

  previousWordCount = wordCount;
}

function fireworks() {
  const duration = 8 * 1000;
  const animationEnd = Date.now() + duration;

  const interval = setInterval(() => {
    if (animationEnd - Date.now() <= 0) {
      return clearInterval(interval);
    }
    confetti({
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      particleCount: 150,
      origin: {
        x: Math.random(),
        y: Math.random(),
      },
    });
  }, 250);
}

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
    const saturation = rainbow ? "100%" : `${continuousTypingTime / 10}%`;
    const lightness = v.nightMode ? "75%" : "35%";
    typeArea.style.color = `hsl(${hue}, ${saturation}, ${lightness})`;
  } else {
    typeArea.style.color = `rgba(var(--fontColor), 1)`;
  }
}

// Main App Logic
// Main App Logic
// Main App Logic
// Main App Logic
// Main App Logic
// Main App Logic
// Main App Logic
// Main App Logic
// Main App Logic
// Main App Logic

function checkIfStreak() {
  if (
    v.dailyWritingSessionTime > v.streakCompletionTime &&
    v.doneTodaysStreak == false
  ) {
    v.dailyStreak += 1;
    v.doneTodaysStreak = true;
    alertModal(
      "Your streak increased!<br>🎉🎉🎉<br>Your streak is now: " +
        v.dailyStreak +
        "!"
    );
  }
}

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

function shakeScreen(intensity) {
  const directionX = Math.random() > 0.5 ? 1 : -1;
  const directionY = Math.random() > 0.5 ? 1 : -1;
  typeAreaDiv.style.left = `${intensity * directionX}px`;
  typeAreaDiv.style.top = `${intensity * directionY}px`;
  setTimeout(() => {
    typeAreaDiv.style.top = 0;
    typeAreaDiv.style.left = 0;
  }, 100);
}

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
  let textToSaveAsBlob = new Blob([textToSave], { type: "text/plain" });
  let textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
  let fileNameToSaveAs =
    v.files[v.currentFileIndex].chapters[v.currentChapterIndex].name;

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
    fullPageCount =
      Math.round(v.files[v.currentFileIndex].chapters[i].text.length / 15) /
      100;
  }
  let textToSave = `==============================================
${v.files[v.currentFileIndex].name}
==============================================

----------------------------------------------
${fullWordCount} words, ${fullPageCount} pages.
----------------------------------------------`;

  for (let i = 0; i < v.files[v.currentFileIndex].chapters.length; i++) {
    textToSave += `\n\n==============================================
${v.files[v.currentFileIndex].chapters[i].name}
==============================================`;
    textToSave += `\n\n${v.files[v.currentFileIndex].chapters[i].text}`;
  }
  textToSave += `\n\n
----------------------------------------------
Thanks for using WriteRush!

`;
  let textToSaveAsBlob = new Blob([textToSave], { type: "text/plain" });
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
/*
let rect = document.createElement('div');
document.body.appendChild(rect);
rect.style.position = 'absolute';
rect.style.backgroundColor = 'red';
rect.style.height = getComputedStyle(typeArea).getPropertyValue('font-size');
rect.style.width = '1px';
*/
function updateCaretPos() {
  const navbarHeight = document.querySelector("#upperNavbar").offsetHeight;
  const coordinates = getCaretCoordinates(typeArea, typeArea.selectionEnd, {
    debug: false,
  });
  const notesOffset =
    (parseInt(notesSidebar.style.width) / 100) * window.innerWidth;
  const chapterOffset = parseFloat(getComputedStyle(chapterSidebar).width);
  yC =
    typeArea.offsetTop -
    typeArea.scrollTop +
    coordinates.top +
    typeAreaVisuals.offsetTop +
    navbarHeight;
  xC =
    typeArea.offsetTop -
    typeArea.scrollLeft +
    coordinates.left +
    notesOffset +
    typeAreaVisuals.offsetLeft +
    chapterOffset;

  /*
    rect.style.top = yC + 'px';
    rect.style.left = xC + 'px';
    */
}

function typingConfetti() {
  switch (parseInt(v.confettiType)) {
    case 0:
      const number = v.typingConfettiCount * 2;
      for (let i = 0; i < number; i++) {
        const particle = getParticle();
        activateParticle(particle, xC, yC);
      }
      if (!isAnimationRunning) {
        isAnimationRunning = true;
        requestAnimationFrame(moveParticles);
      }
      break;
    case 1:
      confetti({
        particleCount: v.typingConfettiCount,
        startVelocity: 20,
        spread: 360,
        origin: {
          x: xC / window.innerWidth,
          y: yC / window.innerHeight,
        },
      });
      break;
    case 2:
      let defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 15,
        colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
        origin: {
          x: xC / window.innerWidth,
          y: yC / window.innerHeight,
        },
      };

      function shoot() {
        confetti({
          ...defaults,
          particleCount: v.typingConfettiCount,
          scalar: 1,
          shapes: ["star"],
        });

        confetti({
          ...defaults,
          particleCount: v.typingConfettiCount * 2,
          scalar: 0.7,
          shapes: ["square"],
        });
      }
      shoot();
      break;

    case 3:
      let scalar = 2;
      const emoji = [];
      emoji.push(confetti.shapeFromText({ text: "💥", scalar }));
      emoji.push(confetti.shapeFromText({ text: "😁", scalar }));
      emoji.push(confetti.shapeFromText({ text: "🤯", scalar }));
      emoji.push(confetti.shapeFromText({ text: "🏆", scalar }));

      function floating() {
        confetti({
          spread: 360,
          ticks: 300,
          gravity: -1,
          decay: 0.96,
          startVelocity: 2,
          shapes: emoji,
          particleCount: v.typingConfettiCount,
          flat: true,
          scalar: 2,
          origin: {
            x: xC / window.innerWidth,
            y: yC / window.innerHeight,
          },
        });
      }

      floating();
      break;
    default:
      confetti({
        particleCount: v.typingConfettiCount,
        startVelocity: 20,
        spread: 360,
        origin: {
          x: xC / window.innerWidth,
          y: yC / window.innerHeight,
        },
      });
      break;
  }
}

function fireworksSound() {
  const sound = new Audio(celebrateSound.src);
  sound.play();
}

function add500toGoal() {
  wordCount = countWords(v.text);
  if (v.wordGoal - wordCount < v.addToGoal) {
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

window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    exportFile();
  }
});

const requestFullscreen =
  document.documentElement.requestFullscreen ||
  document.documentElement.mozRequestFullScreen ||
  document.documentElement.webkitRequestFullscreen ||
  document.documentElement.msRequestFullscreen;
const exitFullscreen =
  document.exitFullscreen ||
  document.mozCancelFullScreen ||
  document.webkitExitFullscreen ||
  document.msExitFullscreen;

function enterFullscreen() {
  if (requestFullscreen) requestFullscreen.call(document.documentElement);
}
function exitFullscreenFunction() {
  if (exitFullscreen) exitFullscreen.call(document);
}
fullscreenButton.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    enterFullscreen();
  } else {
    exitFullscreenFunction();
  }
});

setInterval(alwaysRun, msRefresh);
function alwaysRun() {
  if (preventSave) {
    return;
  }
  wordCount = countWords(v.text);
  hue += 3;
  updateProgressBar();
  updateTimeBar();
  rainbowStreak();
  checkIfNewDay();
  if (!isModalOpen) {
    v.exclude = Math.min(v.exclude, wordCount);
  }
}

function updateTimeBar() {
  if (!timerRunning) return;

  timeElapsed += msRefresh;
  timeLeft -= msRefresh;
  const timeProgress = (timeElapsed / (v.timeGoal * 60 * 1000)) * 100;
  timeBar.style.width = timeProgress + "%";
}

function checkIfNewDay() {
  const lastUsedDate = new Date(parseInt(v.lastRecordedTime));
  const currentDate = new Date();

  // Set to midnight
  lastUsedDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  const differenceInDays =
    (currentDate.getTime() - lastUsedDate.getTime()) / (1000 * 3600 * 24);
  if (differenceInDays === 1) {
    resetDailyThings();
    if (v.doneTodaysStreak == false) {
      v.dailyStreak = 0;
    }
    v.doneTodaysStreak = false;
  } else if (differenceInDays > 1) {
    resetDailyThings();
    v.dailyStreak = 0;
    alertModal("You lost your streak! 😭 Your streak is now " + v.dailyStreak);
    v.doneTodaysStreak = false;
  }
  // another else for same day
  function resetDailyThings() {
    v.dailyWritingSessionTime = 0;
    v.longestWritingStreak = 0;
  }
  v.lastRecordedTime = Date.now();
}

function openNoteSidebar() {
  if (!notesOpen) {
    notesSidebar.style.width = "0";
    notesSidebar.style.border = "0";
    notesTextarea.style.display = "none";
    imageNoteDisplay.style.display = "none";
  } else {
    notesSidebar.style.width = "30%";

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

function syllableCount(input) {
  function countSyllables(word) {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
    word = word.replace(/^y/, "");
    let match = word.match(/[aeiouy]{1,2}/g);
    return match ? match.length : 0;
  }

  return input
    .split(/\s+/)
    .reduce((count, word) => count + countSyllables(word), 0);
}

function syllablesPerWord(input) {
  return syllableCount(input) / countWords(input);
}

function wordsPerSentence(text) {
  return countWords(text) / countSentences(text);
}
function countSentences(text) {
  const lines = text.split(/\n+/);
  let sentenceCount = 0;
  lines.forEach((line) => {
    line = line.replace(/\s+/g, " ").replace(/[.!?]{2,}/g, ".");
    let sentences = line.split(/[.!?]/);
    sentences = sentences.filter((sentence) => sentence.trim() !== "");
    sentenceCount += sentences.length;
  });

  return sentenceCount;
}

function countCharactersNoSpaces(input) {
  return input.replace(/\s+/g, "").length;
}

function fkra(input) {
  return (
    0.39 * wordsPerSentence(input) + 11.8 * syllablesPerWord(input) - 15.59
  );
}
function cli(input) {
  // L is the average number of letters per 100 words.
  // S is the average number of sentences per 100 words.
  let l = countCharactersNoSpaces(input) / (countWords(input) / 100) / 1;
  let s = countSentences(input) / (countWords(input) / 100) / 1;
  return 0.0588 * l - 0.296 * s - 15.8;
}

function ari(input) {
  return (
    4.71 * (countCharactersNoSpaces(input) / countWords(input)) +
    0.5 * (countWords(input) / countSentences(input)) -
    21.43
  );
}

function readability(input) {
  return Math.max((fkra(input) + cli(input) + ari(input)) / 3, 0);
}

function updateNotesList() {
  notesSectionDiv.innerHTML = "";

  for (let i = 0; i < v.notes.length; i++) {
    const chapter = document.createElement("div");
    chapter.classList.add("chapter");

    chapter.setAttribute("data-id", v.notes[i].id.toString());

    const leftChapterDiv = document.createElement("div");
    const chapterHashtag = document.createElement("p");
    let symbol;
    switch (v.notes[i].type) {
      case "text":
        symbol = `<span class="material-icons small">text_snippet</span>`;
        break;
      case "image":
        symbol = `<span class="material-icons small">image</span>`;
        break;
      default:
        symbol = "?";
        break;
    }

    leftChapterDiv.classList.add("leftChapterDiv");
    chapterHashtag.innerHTML = symbol;
    chapterHashtag.classList.add("small");
    leftChapterDiv.appendChild(chapterHashtag);
    const chapterP = document.createElement("p");
    chapterP.classList.add("chapterP");
    chapterP.innerHTML = v.notes[i].name;
    //chapterP.contentEditable = "true";
    chapterP.spellcheck = false;
    leftChapterDiv.appendChild(chapterP);
    chapter.appendChild(leftChapterDiv);
    const chapterDeleteButton = document.createElement("button");
    chapterDeleteButton.classList.add("chapterDeleteButton", "small");
    chapterDeleteButton.innerHTML = `<span class="material-icons small">delete</span>`;
    const chapterRenameButton = document.createElement("button");
    chapterRenameButton.classList.add("chapterDeleteButton", "small");
    chapterRenameButton.innerHTML = `<span class="material-icons small">edit</span>`;
    chapter.appendChild(chapterRenameButton);
    chapter.appendChild(chapterDeleteButton);

    if (i == v.currentNoteIndex) {
      chapter.style.backgroundColor = "rgba(var(--fontColor), 0.1)";
    } else {
      chapterP.style.textDecoration = "none";
      chapter.style.backgroundColor = "none";
    }
    chapter.addEventListener("click", () => {
      if (v.currentNoteIndex == i) {
        closeNote();
        return;
      }
      notesOpen = true;
      v.currentNoteIndex = i;
      openNote(v.currentNoteIndex);
    });

    chapterP.addEventListener("input", () => {
      let chapterTitle = chapterP.innerText.replace(/[\r\n]+/g, " ");
      v.notes[i].name = chapterTitle;
    });

    chapterRenameButton.addEventListener("click", (e) => {
      e.stopPropagation();
      chapterP.contentEditable = "true"; // Enable editing on double-click
      chapterP.focus(); // Focus on the element for instant editing
    });

    chapterP.addEventListener("focus", () => {
      editingNoteName = true;
      selectTextContent(chapterP);
      chapterP.classList.remove("noSelect");
      chapterP.classList.add("editable");
      leftChapterDiv.classList.add("editable");
    });

    chapterP.addEventListener("blur", () => {
      editingNoteName = false;
      window.getSelection().removeAllRanges();
      chapterP.contentEditable = "false";

      chapterP.classList.add("noSelect");
      if (chapterP.textContent == 0) {
        v.notes[i].name = "None";
      }
      chapterP.classList.remove("editable");
      leftChapterDiv.classList.remove("editable");
      chapterP.scrollLeft = 0;
      leftChapterDiv.scrollLeft = 0;
      updateNotesList();
    });

    chapterP.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevents the default action of creating a new line
        let chapterTitle = chapterP.innerText.replace(/[\r\n]+/g, " "); // Clean up any accidental newlines
        v.notes[i].name = chapterTitle;
        chapterP.blur(); // This will trigger your 'blur' event listener to finalize the changes
      }
    });

    chapterDeleteButton.addEventListener("click", (e) => {
      e.stopPropagation(); // This stops the event from bubbling up
      deleteNote(i);
    });

    notesSectionDiv.appendChild(chapter);
  }
}

function closeNote() {
  notesOpen = false;
  v.currentNoteIndex = null;
  openNoteSidebar();
  updateNotesList();
}

function openNote(noteIndex) {
  if (v.currentNoteIndex == null) {
    notesOpen = false;
    updateNotesList();
    openNoteSidebar();
    return;
  }
  notesOpen = true;
  openNoteSidebar();
  lastSelectedNote = noteIndex;
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
  if (
    confirm("Are you sure you want to delete this note?: " + v.notes[i].name)
  ) {
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
  };
  v.notes.push(newNoteTemp);
  v.currentNoteIndex = v.notes.length - 1;
  updateNotesList();
  openNote(v.currentNoteIndex);
}

const noteDragula = dragula([document.querySelector("#notesSectionDiv")], {
  moves: function (el, container, handle) {
    return !editingNoteName;
  },
});

noteDragula.on("drop", () => {
  reorderNotes();
});

function reorderNotes() {
  const newOrderNotes = [];
  let currentNoteID;

  if (v.currentNoteIndex !== null) {
    currentNoteID = v.notes[v.currentNoteIndex].id.toString();
  }

  const children = notesSectionDiv.children;
  for (let i = 0; i < children.length; i++) {
    const noteID = children[i].getAttribute("data-id");

    const matchedNote = v.notes.find((note) => note.id.toString() === noteID);
    if (matchedNote) {
      newOrderNotes.push(matchedNote);
    }
  }
  v.notes = newOrderNotes;

  if (v.currentNoteIndex !== null) {
    v.currentNoteIndex = newOrderNotes.findIndex(
      (note) => note.id.toString() == currentNoteID
    );
  }
  updateNotesList();
  openNote(v.currentNoteIndex);
}

function updateChapterList() {
  chapterSectionDiv.innerHTML = "";
  if (v.currentFileIndex > v.files.length - 1) {
    v.currentFileIndex = 0;
  }
  for (let i = 0; i < v.files[v.currentFileIndex].chapters.length; i++) {
    const chapter = document.createElement("div");
    chapter.classList.add("chapter");
    chapter.setAttribute(
      "data-id",
      v.files[v.currentFileIndex].chapters[i].id.toString()
    );

    const leftChapterDiv = document.createElement("div");
    leftChapterDiv.classList.add("leftChapterDiv");
    const chapterHashtag = document.createElement("p");
    chapterHashtag.innerHTML = `<span class="material-icons small">menu_book</span>`;
    leftChapterDiv.appendChild(chapterHashtag);
    const chapterP = document.createElement("p");
    chapterP.classList.add("chapterP");
    chapterP.innerHTML = v.files[v.currentFileIndex].chapters[i].name;
    //chapterP.contentEditable = "true";
    chapterP.spellcheck = false;
    leftChapterDiv.appendChild(chapterP);
    chapter.appendChild(leftChapterDiv);
    const chapterDeleteButton = document.createElement("button");
    chapterDeleteButton.classList.add("chapterDeleteButton");
    chapterDeleteButton.innerHTML = `<span class="material-icons small">delete</span>`;
    const chapterRenameButton = document.createElement("button");
    chapterRenameButton.classList.add("chapterDeleteButton");
    chapterRenameButton.innerHTML = `<span class="material-icons small">edit</span>`;
    chapter.appendChild(chapterRenameButton);
    chapter.appendChild(chapterDeleteButton);

    chapter.addEventListener("click", () => {
      if (v.currentChapterIndex == i) {
        return;
      }
      v.currentChapterIndex = i;
      openChapter(v.currentChapterIndex);
    });

    chapterP.addEventListener("input", () => {
      let chapterTitle = chapterP.innerText.replace(/[\r\n]+/g, " ");
      v.files[v.currentFileIndex].chapters[i].name = chapterTitle;
    });

    chapterRenameButton.addEventListener("click", (e) => {
      e.stopPropagation();
      chapterP.contentEditable = "true"; // Enable editing on double-click
      chapterP.focus(); // Focus on the element for instant editing
    });
    chapterP.addEventListener("focus", () => {
      selectTextContent(chapterP);
      editingChapterName = true;
      chapterP.classList.remove("noSelect");
      chapterP.classList.add("editable");
      leftChapterDiv.classList.add("editable");
    });

    chapterP.addEventListener("blur", () => {
      window.getSelection().removeAllRanges();
      chapterP.contentEditable = "false";
      editingChapterName = false;

      chapterP.classList.add("noSelect");
      if (chapterP.textContent == 0) {
        v.files[v.currentFileIndex].chapters[i].name = "None";
      }
      chapterP.classList.remove("editable");
      leftChapterDiv.classList.remove("editable");
      chapterP.scrollLeft = 0;
      leftChapterDiv.scrollLeft = 0;
      updateChapterList();
    });

    chapterP.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevents the default action of creating a new line
        let chapterTitle = chapterP.innerText.replace(/[\r\n]+/g, " "); // Clean up any accidental newlines
        v.files[v.currentFileIndex].chapters[i].name = chapterTitle;
        chapterP.blur(); // This will trigger your 'blur' event listener to finalize the changes
      }
    });

    chapterDeleteButton.addEventListener("click", (e) => {
      e.stopPropagation(); // This stops the event from bubbling up
      deleteChapter(i);
    });

    if (i == v.currentChapterIndex) {
      chapter.style.backgroundColor = "rgba(var(--fontColor), 0.1)";
    } else {
      chapterP.style.textDecoration = "none";
      chapter.style.backgroundColor = "none";
    }

    chapterSectionDiv.appendChild(chapter);
  }
}

function selectTextContent(targetNode) {
  let range = document.createRange(); // Create a range object
  range.selectNodeContents(targetNode);
  let selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

function openChapter(chpIndex) {
  v.text = v.files[v.currentFileIndex].chapters[chpIndex].text;
  const textArea = document.querySelector("#typeArea");
  textArea.value = v.text;
  updateChapterList();
}

function deleteChapter(i) {
  if (
    confirm(
      "Are you sure you want to delete this chapter?: " +
        v.files[v.currentFileIndex].chapters[i].name
    )
  ) {
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
    text: "This is a new chapter! Type here ...",
  };
  v.files[v.currentFileIndex].chapters.push(newChapTemp);
  v.currentChapterIndex = v.files[v.currentFileIndex].chapters.length - 1;
  updateChapterList();
  openChapter(v.currentChapterIndex);
}

const chapterDragula = dragula([document.querySelector("#chapterSectionDiv")], {
  moves: function (el, container, handle) {
    return !editingChapterName;
  },
});

chapterDragula.on("drop", () => {
  reorderChapters();
});

function reorderChapters() {
  const newOrderChapters = [];
  const currentChapterID =
    v.files[v.currentFileIndex].chapters[v.currentChapterIndex].id.toString();

  const children = chapterSectionDiv.children;
  for (let i = 0; i < children.length; i++) {
    const chapterID = children[i].getAttribute("data-id");

    const matchedChapter = v.files[v.currentFileIndex].chapters.find(
      (chap) => chap.id.toString() === chapterID
    );
    if (matchedChapter) {
      newOrderChapters.push(matchedChapter);
    }
  }
  v.files[v.currentFileIndex].chapters = newOrderChapters;
  v.currentChapterIndex = newOrderChapters.findIndex(
    (chap) => chap.id.toString() === currentChapterID
  );

  updateChapterList();
}

const fileDragula = dragula([document.querySelector("#fileDiv")], {
  direction: "horizontal",
});

fileDragula.on("drop", () => {
  reorderFiles();
});

function reorderFiles() {
  const newOrderFiles = [];
  const currentFileID = v.files[v.currentFileIndex].id.toString();

  const children = fileDiv.children;
  for (let i = 0; i < children.length; i++) {
    const fileID = children[i].getAttribute("data-id");

    const matchedFile = v.files.find((file) => file.id.toString() === fileID);
    if (matchedFile) {
      newOrderFiles.push(matchedFile);
    }
  }
  v.files = newOrderFiles;
  v.currentFileIndex = newOrderFiles.findIndex(
    (file) => file.id.toString() === currentFileID
  );
  updateFileButtons();
}

function updateFileButtons() {
  updateChapterList();
  lowerNavbarDiv.innerHTML = "";
  fileDiv.innerHTML = "";

  newFileButton.classList.add("outlineButton");
  newFileButton.id = "newFileButton";
  newFileButton.innerHTML = `<span class="material-icons small">add</span>`;
  newFileButton.addEventListener("click", newFile);
  lowerNavbarDiv.appendChild(newFileButton);

  for (let i = 0; i < v.files.length; i++) {
    const button = document.createElement("button");
    button.classList.add("navbarButton");
    button.classList.add("file");
    button.setAttribute("data-id", v.files[i].id.toString());
    button.textContent = v.files[i].name;
    fileDiv.appendChild(button);
    lowerNavbarDiv.appendChild(fileDiv);
    button.addEventListener("click", () => {
      v.currentFileIndex = i;
      openFile(i);
    });

    if (i == v.currentFileIndex) {
      button.style.backgroundColor = "rgba(var(--fontColor), 0.1)";
      //button.style.color = "var(--fontColor)";
    } else {
      button.style.textDecoration = "none";
      button.style.backgroundColor = "none";
      //button.style.color = "gray";
    }
  }
}

function refreshFileButtons() {
  updateFileButtons();
}

function newFile() {
  const newFile = {
    id: Date.now().toString(),
    name: "Untitled",
    exclude: 0,
    wordGoal: 50,
    chapters: [
      {
        id: Date.now().toString(),
        name: "Untitled",
        text: "New file!\n\nType here ...",
      },
    ],

    notesText: "New file!\n\nType here ...",
  };
  v.files.push(newFile);
  openFile(v.files.length - 1);
  refreshFileButtons();
}

function openFile(i) {
  if (v.files.length == 0) {
    newFile();
    return;
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

function openFileModal() {
  fileNameInput.value = v.files[v.currentFileIndex].name;
}

function deleteFile(i) {
  if (
    confirm("Are you sure you want to delete this file?: " + v.files[i].name)
  ) {
    if (v.files.length === 1) {
      newFile();
    }
    v.files.splice(i, 1);

    refreshFileButtons();
    openFile(0);
  }
  openFileModal();
}

// Run on Startup
// Run on Startup
// Run on Startup
// Run on Startup
// Run on Startup
// Run on Startup
// Run on Startup
// Run on Startup

checkIfNewDay();
// openModal('startModal');

openNote(v.currentNoteIndex);
closeNote();
openChapter(v.currentChapterIndex);
refreshFileButtons();
openFile(v.currentFileIndex);

// WIP CODE   WIP CODE
// WIP CODE   WIP CODE
// WIP CODE   WIP CODE
// WIP CODE   WIP CODE
// WIP CODE   WIP CODE
// WIP CODE   WIP CODE
// WIP CODE   WIP CODE
// WIP CODE   WIP CODE
/*
const particleVel = 2;
let isAnimationRunning = false;


let particles = [];
let activeParticles = [];

window.addEventListener("keydown", () => {
    const number = 50;
    for (let i = 0; i < number; i++) {
        const particle = getParticle();
        activateParticle(particle);
    }
    if (!isAnimationRunning) {
        isAnimationRunning = true;
        requestAnimationFrame(moveParticles);
    }
});

function getParticle() {
    return particles.pop() || createParticle();
}

function activateParticle(particle) {
    particle.timeLeft = Math.random() * 6000 + 2000;
    particle.element.style.left = xC + "px";
    particle.element.style.top = yC + "px";
    const randRadians = Math.random() * 2 * Math.PI;
    particle.dirX = Math.cos(randRadians) * particle.vel;
    particle.dirY = Math.sin(randRadians) * particle.vel;
    activeParticles.push(particle);
}
function moveParticles() {
    let i = activeParticles.length;
    while (i--) {
        const particle = activeParticles[i];
        particle.timeLeft -= 50;
        const left = parseFloat(particle.element.style.left, 10);
        const top = parseFloat(particle.element.style.top, 10);
        particle.element.style.left = (left + particle.dirX) + "px";
        particle.element.style.top = (top + particle.dirY) + "px";
        particle.element.style.display = "block";
        particle.dirY += 0.1;
        if (particle.timeLeft <= 0) {
            particle.element.style.display = "none";
            particles.push(particle);
            activeParticles.splice(i, 1);
            continue;
        }
    }
    if (activeParticles.length > 0) {
        requestAnimationFrame(moveParticles);
    } else {
        isAnimationRunning = false;  // Reset the flag
    }
}


function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = xC + "px";
    particle.style.top = yC + "px";
    document.body.append(particle);
    return { element: particle, timeLeft: 10, dirX: 0, dirY: 0, vel: Math.random() * 5 };
}




const canvas = document.querySelector("#particleCanvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

*/

const particleVel = 4;
let isAnimationRunning = false;
let particles = [];
let activeParticles = [];

const canvas = document.querySelector("#particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getParticle() {
  return particles.pop() || createParticle();
}

function activateParticle(particle, x, y) {
  particle.timeLeft = Math.random() * 6000 + 2000;

  particle.x = x;
  particle.y = y;
  particle.color = `hsla(${Math.floor(Math.random() * 6) * 60}, 95%, 50%, 1)`;
  const randRadians = Math.random() * 2 * Math.PI;

  particle.dirX =
    particleVel *
      Math.cos(randRadians) *
      (Math.random() * 5 - 2.5) /* * Math.round(Math.random() * 5 + 5) */ +
    Math.random() * 2 -
    1;
  particle.dirY =
    particleVel *
      Math.sin(randRadians) *
      (Math.random() * 5 - 2.5) /* * Math.round(Math.random() * 5 + 5) */ +
    Math.random() * 2 -
    1;
  activeParticles.push(particle);
}

function moveParticles() {
  if (!confettiType === 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for every frame
  let i = activeParticles.length;
  while (i--) {
    const particle = activeParticles[i];
    particle.timeLeft -= 50;

    // Draw the particle
    ctx.beginPath();
    ctx.fillStyle = particle.color;

    ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2);
    ctx.fill();

    particle.x += particle.dirX;
    particle.y += particle.dirY;
    particle.dirY += 0.2; // Gravity or similar effect
    if (particle.x >= window.innerWidth) {
      particles.push(particle);
      activeParticles.splice(i, 1);
      continue;
    }
    if (particle.y > window.innerHeight) {
      particles.push(particle);
      activeParticles.splice(i, 1);
      continue;
    }
  }
  if (activeParticles.length >= 0) {
    requestAnimationFrame(moveParticles);
  } else {
    isAnimationRunning = false;
  }
}

function createParticle() {
  return {
    x: xC / canvas.width,
    y: yC / canvas.height,
    timeLeft: 10,
    dirX: 0,
    dirY: 0,
    /*
        vel: Math.random() * 5 ,
        */
    color: `black`,
  };
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
