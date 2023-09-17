
document.querySelector('#typeArea').style.fontSize = v.fontSize;

function openSettings() {
    dailyStreakInput.value = v.dailyStreak;
}

const fontSizeInput = document.getElementById('fontSize');
const textArea = document.querySelector('#typeArea');
fontSizeInput.value = v.fontSize;
textArea.style.fontSize = v.fontSize + 'px';

const fontFamilyInput = document.getElementById('fontFamily');
fontFamilyInput.value = v.fontFamily;

textArea.style.fontFamily = v.fontFamily;


fontFamilyInput.addEventListener('change', () => {
    textRedacted = false;
    v.fontFamily = fontFamilyInput.value;
    textArea.style.fontFamily = v.fontFamily;
});

fontSizeInput.addEventListener('input', function () {
    v.fontSize = fontSizeInput.value;
    if (v.fontSize > 200) {
        v.fontSize = 200;
    }
    textArea.style.fontSize = v.fontSize + 'px';
});

addToGoalInput.value = v.addToGoal;
addToGoalInput.addEventListener('change', function () {
    v.addToGoal = addToGoalInput.value;
});

excludeDefaultCheckbox.checked = v.excludeDefault;
checkIfExcludeDefault();
excludeDefaultCheckbox.addEventListener('change', function () {
    checkIfExcludeDefault();
});

function checkIfExcludeDefault() {
    v.excludeDefault = excludeDefaultCheckbox.checked;
}

const dailyStreakInput = document.querySelector('#dailyStreakInput');
dailyStreakInput.value = v.dailyStreak;
dailyStreakInput.addEventListener('change', function () {
    v.dailyStreak = parseInt(dailyStreakInput.value);
    if (!dailyStreakInput.value && dailyStreakInput.value !== 0) {
        v.dailyStreak = 0;
    }
});

const progressBarColorInputLabel = document.querySelector('#progressBarColorInputLabel');
progressBarColorInputLabel.textContent = v.progressBarColor;
if (progressBarColorInputLabel.textContent == "var(--outline)") {
    progressBarColorInputLabel.textContent = "Default";
}
const progressBarColorInput = document.querySelector('#progressBarColorInput');
progressBarColorInput.value = v.progressBarColor;
progressBarColorInput.addEventListener('click',() => {
    closeModal("settingsModal");
});
progressBarColorInput.addEventListener('change', () => {
    v.progressBarColor = progressBarColorInput.value;
    
    
    console.log(v.progressBarColor);
    progressBarColorInput.textContent = v.progressBarColor;
    progressBarColorInputLabel.textContent = v.progressBarColor;
    openModal("settingsModal");
});

function adjustColor(hex, amount=90) {
    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // Calculate brightness
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Decide whether to lighten or darken
    let factor = brightness > 127 ? -1 : 1;

    // Adjust and clamp each RGB value
    r = Math.max(Math.min(r + (amount * factor), 255), 0);
    g = Math.max(Math.min(g + (amount * factor), 255), 0);
    b = Math.max(Math.min(b + (amount * factor), 255), 0);

    // Convert RGB back to hex
    let adjustedHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    
    return adjustedHex;
}






/*
const hideBlurButton = document.querySelector('#hideBlurButton');
hideBlurButton.addEventListener('click', function () {
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modalContent');
    modal.style.backgroundColor = "rgba(var(--darkOrLight), 0)";
    modalContent.style.backgroundColor = "rgba(var(--darkOrLight), 0)";

    console.log(modal.style.backgroundColor);
    setTimeout(() => {
        modal.style.backgroundColor = 'rgba(var(--darkOrLight), 0.5)';
        modal.style.backdropFilter = "blur(var(--blurAmount))";
        modal.style.webkitBackdropFilter = "blur(var(--blurAmount))";
        modalContent.style.backgroundColor = "rgba(var(--darkOrLight), 0.9)";

    }, 10000);
})
*/

const fastSoundsCheckbox = document.querySelector('#fastSoundsCheckbox');
fastSoundsCheckbox.checked = v.fastSounds;
checkIfFastSounds();
fastSoundsCheckbox.addEventListener('change', function () {
    checkIfFastSounds();
});

function checkIfFastSounds() {
    v.fastSounds = fastSoundsCheckbox.checked;
}


const streakCompletionTimeInput = document.querySelector('#streakCompletionTimeInput');
streakCompletionTimeInput.value = v.streakCompletionTime / 1000;
streakCompletionTimeInput.addEventListener('change', function () {
    v.streakCompletionTime = parseInt(streakCompletionTimeInput.value * 1000);
})



const rainbowProgressBarCheckbox = document.querySelector('#rainbowProgressBarCheckbox');
rainbowProgressBarCheckbox.checked = v.rainbowProgressBar;
checkIfRainbowProgressBar();
rainbowProgressBarCheckbox.addEventListener('change', function () {
    checkIfRainbowProgressBar();
});

function checkIfRainbowProgressBar() {
    v.rainbowProgressBar = rainbowProgressBarCheckbox.checked;
}



const rainbowStreakCheckbox = document.querySelector('#rainbowStreakCheckbox');
rainbowStreakCheckbox.checked = v.rainbowStreak;
checkIfRainbowStreak();
rainbowStreakCheckbox.addEventListener('change', function () {
    checkIfRainbowStreak();
});

function checkIfRainbowStreak() {
    v.rainbowStreak = rainbowStreakCheckbox.checked;
}

const checkbox = document.getElementById('nightModeCheckbox');

const root = document.documentElement;
checkbox.checked = v.nightMode;
checkIfNightMode();
nightModeChange();

checkbox.addEventListener('change', function () {
    checkIfNightMode();
    nightModeChange();
});
function checkIfNightMode() {

    v.nightMode = checkbox.checked;
    /*
    if (checkbox.checked) {
        v.nightMode = true;
    } else {
        v.nightMode = false;
    }
    */
}
function nightModeChange() {
    if (v.nightMode == true) {
        root.style.setProperty('--bgColor', '#010101');
        root.style.setProperty('--secondary', '27, 32, 34');
        root.style.setProperty('--outline', '#2f3539');
        root.style.setProperty('--fontColor', '255, 255, 255');
        root.style.setProperty('--modalShadowColor', '#ffffff75');
        root.style.setProperty('--secondaryHover', '#313639');
        root.style.setProperty('--outlineHover', '#454d53');
        root.style.setProperty('--darkOrLight', '1, 1, 1');
        /*
        document.querySelector('#fullscreenButton').innerHTML = `
        <svg height="1em" width="1em" version="1.1" viewBox="6 4 23 23">
            <path fill="white" d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"></path>
            <path fill="white" d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"></path>
            <path fill="white" d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"></path>
            <path fill="white" d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"></path>
        </svg>
    `
    */
    } else {
        root.style.setProperty('--bgColor', '#FAFAFA');
        root.style.setProperty('--secondary', '229, 229, 229');
        root.style.setProperty('--outline', '#B0B0B0');
        root.style.setProperty('--fontColor', '1, 1, 1');
        root.style.setProperty('--modalShadowColor', '#00000033');
        root.style.setProperty('--secondaryHover', '#D0D0D0');
        root.style.setProperty('--outlineHover', '#A0A0A0');
        root.style.setProperty('--darkOrLight', '256, 256, 256');
        /*
        document.querySelector('#fullscreenButton').innerHTML = `
    <svg height="1em" width="1em" version="1.1" viewBox="6 4 23 23">
        <path fill="black" d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"></path>
        <path fill="black" d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"></path>
        <path fill="black" d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"></path>
        <path fill="black" d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"></path>
    </svg>
    `
    */
    }

}

const resetProgressBarColorButton = document.querySelector('#resetProgressBarColorButton');
resetProgressBarColorButton.addEventListener('click', function () {
    v.progressBarColor = 'var(--outline)';
    progressBarColorInputLabel.textContent = "Default";
})


const typingConfettiCountInput = document.querySelector('#typingConfettiCountInput');
typingConfettiCountInput.value = v.typingConfettiCount;

typingConfettiCountInput.addEventListener('input', () => {
    v.typingConfettiCount = typingConfettiCountInput.value;
});

const screenShakeIntensityInput = document.querySelector('#screenShakeIntensityInput');
screenShakeIntensityInput.value = v.screenShakeIntensity;
screenShakeIntensityInput.addEventListener('input', function () {
    v.screenShakeIntensity = screenShakeIntensityInput.value;
});

const typingSounds = document.querySelector('#typingSounds');
typingSounds.value = v.typingSound;
typingSounds.addEventListener('change', () => {
    v.typingSound = typingSounds.value;
    v.typingSoundPath = document.getElementById(v.typingSound).src;
    fastSound = new Audio(v.typingSoundPath);
});


v.typingSound = typingSounds.value;
v.typingSoundPath = document.getElementById(v.typingSound).src;


let isBgImage = false;

const imageInput = document.querySelector('#imageInput');






if (window.indexedDB) {
    document.querySelector('#sizeError').textContent = '';
} else {
    document.querySelector('#sizeError').textContent = 'Your browser does not support indexedDB. Background images will not persist between sessions.';
}

const imageInputLabel = document.querySelector("#imageInputLabel");

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


/*
document.querySelector("#progressBarData").style.display = "block";
*//*
const resetAllButton = document.querySelector("#resetAllButton");
resetAllButton.addEventListener("click", () => {

    if(confirm("Are you sure you want to reset all data?")) {
        if(confirm("This will delete all data. Are you sure you want to do this?")) {
            preventSave = true;
            v = null;
            localStorage.clear();

            location.reload();
            location.reload();
        }
    }
});

*/