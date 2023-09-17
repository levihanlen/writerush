
let v = {};


let hue = 0;
const typeArea = document.querySelector("#typeArea");

const progressBarText = document.querySelector("#progressBarText");
const progressBar = document.querySelector("#progressBar");
const timeBar = document.querySelector("#timeBar");


let preventSave = false;

let db;
const dbName = "WriteRushDB";
const storeName = "settings";
const openRequest = indexedDB.open(dbName, 2);

openRequest.onupgradeneeded = (e) => {
    db = e.target.result;
    if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
    }
};

openRequest.onsuccess = (e) => {
    db = e.target.result;
    load();
};

openRequest.onerror = (e) => {
    console.error("Error opening IndexedDB:", e);
};


function load() {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const getRequest = store.get("saveV3.8");

    getRequest.onsuccess = (e) => {
        if (e.target.result) {
            v = e.target.result.data; 
        } else {
            setV();
        }
        loadOtherScripts();

    };

    getRequest.onerror = (e) => {
        console.error("Error fetching data:", e);
    };
}

let previousV = JSON.stringify(v);  // Initially set it to the string representation of v

function save() {
    if (JSON.stringify(v) !== previousV) {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        store.put({ id: "saveV3.8", data: v });
        previousV = JSON.stringify(v);
    }
}

function interval() {
    if (!preventSave) {
        save();
    }
}
setInterval(interval, 5000);
function clearAllData() {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const clearRequest = store.clear();

    indexedDB.deleteDatabase(dbName);

    clearRequest.onsuccess = (e) => {
        console.log("Success");
    };

    clearRequest.onerror = (e) => {
        console.error("Failure: ", e);
    };
}




function loadOtherScripts() {
    console.log(v);
    // localStorage.clear();
    
    console.log("first open?:" + v.firstOpen);
    
    v.text = v.files[v.currentFileIndex].chapters[0].text;
    v.notesText = v.files[v.currentFileIndex].notesText;

    loadScript('JS/settings.js');
    loadScript('JS/getCaretCoordinates.js');
    loadScript('JS/confetti.browser.js');
    loadScript('JS/base.js');
    loadScript('JS/data.js');
}




function setV() {
    v = {
        text: `Loading file ...`,
        notesText: `Loading file ...`,
        wordGoal: 50,
        screenShakeIntensity: 0,
        typingConfettiCount: 2,
        goalReached: false,
        fontSize: 16,
        fontFamily: 'Times New Roman, serif',
        nightMode: false,
        
        typingSound: 'clickSound1',
        typingSoundPath: {
            source: 'assets/audio/click1.mp3',
        },

        timeGoal: 5,
        rainbowStreak: false,
        exclude: 0,
        excludeDefault: true,
        addToGoal: 100, // the amount added to the word goal
        fastSounds: false,
        currentWritingSessionTime: 0,
        dailyWritingSessionTime: 0,
        lastRecordedTime: Date.now(),
        firstOpen: true,
        longestWritingStreak: 0,
        dailyStreak: 0,
        doneTodaysStreak: false,
        currentChapterIndex: 0,
        currentNoteIndex: 0,
        files: [
            { 
            id: 11,
            name: 'Welcome to WriteRush 2!', 
            wordGoal: 50,
            exclude: 0,
            chapters: [
                {
                    id: 1,
                    name: "Chapter 1",
                    text: `Thanks for downloading WriteRush! 😁

If you are updating WriteRush, please go into Settings > Other > Reset Settings. This will ensure the new update functions correctly!

Type here ...`
    
                },
                {
                    id: 2,
                    name: "Chapter 2",
                    text: "This is chatper 2!",
                },
            ],
    },
            { 
                id: 12, name: 'File 2', wordGoal: 50, exclude: 0,
                chapters: [{
                    id: 3,
                    text: 'Content of File 2',
                    name: "Untitled",
                }],
            },
            // ... more files
        ],
        currentFileIndex: 0,
        streakCompletionTime: 30000,
        bgImage: null,
        bgImageName: null,
        rainbowProgressBar: false,
        progressBarColor: 'var(--outline)',
        backgroundImageFromFolder: true,
        folderImage: 1,
        notes: [
            {   
                id: 21,
                type: "text",
                name: "Notes Section",
                text: `Wooo! You found the notes section! 🙌

This is where you write notes and other things you need to remember!

Type here ...`,
                image: null,
            },
            {
                id: 22,
                type: "text",
                name: "Notes 2",
                text: "You can have multiple notes files. These are available in all files!",
                image: null,
            },
        ],
        firstOpen: false, // for now
        backgroundImage: null,
    };
}
