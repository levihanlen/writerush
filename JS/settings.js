
document.querySelector('#typeArea').style.fontSize = v.fontSize;

function openSettings() {
    dailyStreakInput.value = v.dailyStreak;
}

const fontSizeInput = document.getElementById('fontSize');
const textArea = document.getElementById('typeArea');
fontSizeInput.value = v.fontSize;
textArea.style.fontSize = v.fontSize + 'px';

const fontFamilyInput = document.getElementById('fontFamily');
fontFamilyInput.value = v.fontFamily;

textArea.style.fontFamily = v.fontFamily;


fontFamilyInput.addEventListener('change', function () {
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
    /*
    root.style.setProperty('--outline', progressBarColorInput.value);
    */
    console.log(v.progressBarColor);
    progressBarColorInput.textContent = v.progressBarColor;
    progressBarColorInputLabel.textContent = v.progressBarColor;
    openModal("settingsModal");
});

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
    v.typingSoundPath = document.getElementById(v.typingSound);
    fastSound = new Audio(v.typingSoundPath.src);
});


v.typingSound = typingSounds.value;
v.typingSoundPath = document.getElementById(v.typingSound);




/*
function bgDarkButton(a) {
    let root = document.documentElement;
    let currentSize = parseFloat(getComputedStyle(root).getPropertyValue('--bgDarkness'),10);
    console.log(currentSize);
    root.style.setProperty('--bgDarkness', (currentSize + a));
    root.style.setProperty('--secondaryOpacity', '0.5');
    if ((currentSize + a) <= 0) {
        root.style.setProperty('--bgDarkness', '0');
    } else if ((currentSize + a) >= 1) {
        root.style.setProperty('--bgDarkness', '1');
        root.style.setProperty('--secondaryOpacity', '1');
    }
}
*/

let isBgImage = false;
let isBgImageFolder = false;
const maxFileSize = 2 * 1024 * 1024; // 2 MB
const backgroundImageFromFolderCheckbox = document.querySelector('#backgroundImageFromFolderCheckbox');
backgroundImageFromFolderCheckbox.checked = v.backgroundImageFromFolder;
checkIfBackgroundImageFromFolder();
backgroundImageFromFolderCheckbox.addEventListener('change', () => {
    checkIfBackgroundImageFromFolder();
});
function checkIfBackgroundImageFromFolder() {
    v.backgroundImageFromFolder = backgroundImageFromFolderCheckbox.checked;
    if (v.backgroundImageFromFolder) {
        document.querySelector('#bgFromFile').innerHTML = `
            <p id="bgFromFile">
                Background Image (File Folder): 
                <input id="imageFolderInput" type="text" class="numberInput">
                <button class="outlineButton" onclick="clearImages1()">Clear</button>
            </p>`;
        
        const imageFolderInput = document.querySelector('#imageFolderInput');
        function setBgFromFolder() {
            const extensions = ['jpg', 'png', 'gif', 'jpeg', 'bmp', 'webp']; // Add or remove extensions as needed
            let imageLoaded = false; // Flag to know if an image was successfully loaded
            v.folderImage = imageFolderInput.value;
            extensions.forEach((ext) => {
                if (imageLoaded) return; // Skip if an image has already been loaded
                
                let imagePath = `assets/images/${imageFolderInput.value}.${ext}`;
                const image = new Image();
                image.src = imagePath;

                image.onload = () => {
                    if (!imageLoaded) { // Double check the flag
                        isBgImageFolder = true;
                        document.body.style.backgroundImage = `url("${imagePath}")`;
                        console.log(`Image loaded successfully with extension .${ext}! 😎`);
                        imageLoaded = true; // Set flag to true
                    }
                };
                /*
                image.onerror = () => {
                };
                */
            });
        }
        imageFolderInput.value = v.folderImage;
        imageFolderInput.addEventListener('change', () => {
            setBgFromFolder();
        });
        setBgFromFolder();
    } else {
        document.querySelector('#bgFromFile').innerHTML = `
            <p id="bgFromFile">
                Background Image (2MB Limit): 
                <label id="imageInputLabel" for="imageInput" class="numberInput">
                None Selected</label>
                <input type="file" class="numberInput" id="imageInput" accept="image/*"><button class="outlineButton" onclick="clearImages()">Clear</button>
                <br>
                <span id="sizeError" style="color: red;"></span>
            </p>`;
        

        const imageInput = document.querySelector('#imageInput');
        
        if (v.bgImage) {
            document.body.style.backgroundImage = 'url(' + v.bgImage + ')';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundPosition = 'center';
            document.querySelector("#imageInputLabel").textContent = v.bgImageName;
            isBgImage = true;
        }
        imageInput.addEventListener('change', function() {
            
            const file = this.files[0];

            if (file && file.size > maxFileSize) {
                document.querySelector('#sizeError').textContent = 'File size exceeds 2MB. Please choose a smaller file or switch to folder mode.';
                // Clear the file input
                this.value = '';
            } else {
                document.querySelector('#sizeError').textContent = '';
            }
            
        });


        imageInput.addEventListener('change', function() {
            const file = this.files[0];
            // Make sure a file was selected
            
            if (file) {
                // Create a FileReader to read the file
                const reader = new FileReader();
        
                // Set the onload function to update the background when the file is read
                reader.onload = function(e) {
                    const imageUrl = e.target.result;
                    document.body.style.backgroundImage = 'url(' + imageUrl + ')';
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundRepeat = 'no-repeat';
                    document.body.style.backgroundPosition = 'center';
                    v.bgImage = imageUrl;
                    
                };
                isBgImage = true;
                // Read the file as a data URL so it can be used as an image source
                reader.readAsDataURL(file);
                v.bgImageName = file.name;
                document.querySelector("#imageInputLabel").textContent = file.name;
            }
        });
    }
}




function clearImages() {
    if (isBgImage) {
        document.querySelector("#imageInputLabel").textContent = "None Selected";
        document.body.style.backgroundImage = 'none';
        document.querySelector('#imageInput').value = null;
        isBgImage = false;
        document.querySelector('#sizeError').textContent = '';
        v.bgImage = null;
        v.bgImageName = null;
    }
    
}


function clearImages1() {
    if (isBgImageFolder) {
        document.querySelector("#imageFolderInput").value = "";
        document.body.style.backgroundImage = 'none';
        isBgImageFolder = false;
        v.folderImage = null;
        v.bgImage = null;
        v.bgImageName = null;
    }
}
/*
if (v.bgImage && !v.backgroundImageFromFolder) {
    document.body.style.backgroundImage = 'url(' + v.bgImage + ')';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.querySelector("#imageInputLabel").textContent = v.bgImageName;
    isBgImage = true;
}
*/
















/*
function checkForProgressBarColor() {
    
    if (v.bgImage) {
        console.log("YES");
        document.querySelectorAll('.progressBarContainer').forEach( (element) => {
            element.style.borderColor = 'var(--bgColor)'
        });
        document.querySelectorAll('.progressBar').forEach( (element) => {
            element.style.backgroundColor = 'white';
        });
        console.log(document.querySelectorAll('.progressBar'));
        document.querySelector('#progressBar').style.backgroundColor = 'white';
        

    } else {
        console.log("NONE");
        document.querySelector('.progressBarContainer').style.borderColor = 'var(--outline)';
        /*
        document.querySelector('.progressBar').style.backgroundColor = 'var(--outline)';
        
    }
    
}
*/

/*
background-color: rgba(var(--darkOrLight), 0.5);
-webkit-backdrop-filter: blur(var(--blurAmount)); 
backdrop-filter: blur(var(--blurAmount));

*/