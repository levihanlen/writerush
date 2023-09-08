
console.log("Hello!")
// localStorage.clear();
let v = store.get('saveV3.5') || {
    firstValueThatWillNeverBeRead: 0,
    text: `Loading file ...
`,

    notesText: `Loading file ...
`,
// this needs to be like this so it can span multiple lines lol
    wordGoal: 50,
    screenShakeIntensity: 0,
    typingConfettiCount: 2,
    goalReached: false,
    fontSize: 16,
    fontFamily: 'Times New Roman, serif',
    nightMode: false,
    typingSound: 'clickSound1',
    typingSoundPath: {
        src: 'assets/audio/click1.mp3',
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
    files: [
        { name: 'Welcome to WriteRush!', 
        wordGoal: 50,
        exclude: 0,
        text: `Thanks for downloading WriteRush! 😁

If you are updating WriteRush, please go into Settings > Other > Reset Settings. This will ensure the new update functions correctly!

Type here ...`, 
        notesText: `Wooo! You found the notes section! 🙌

This is where you write notes and other things you need to remember!

Type here ...
`},
        { name: 'File 2', wordGoal: 50, exclude: 0, text: 'Content of File 2', notesText: 'Content of File 2' },
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
};

if (store.get('saveV3.5')) {
    v.firstOpen = false;
}
console.log("first open?:" + v.firstOpen);
function save() {
    store.set('saveV3.5', v);
}

function interval() {
    updateProgressBar();
    save();

}
v.text = v.files[v.currentFileIndex].text;
v.notesText = v.files[v.currentFileIndex].notesText;


let hue = 0;
const typeArea = document.querySelector("#typeArea");

