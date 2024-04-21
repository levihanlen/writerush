let v = {};

let hue = 0;
let preventSave = false;
const typeArea = document.querySelector("#typeArea");

function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 1)
  );
}
let dbAllowed = hasIndexedDBSupport();

if (isMobileDevice()) {
  console.log("MOBILE");
  dbAllowed = false;
}

function hasIndexedDBSupport() {
  return "indexedDB" in window;
}

console.log(dbAllowed);
if (dbAllowed) {
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
    const getRequest = store.get("saveV3.10");
    getRequest.onsuccess = (e) => {
      if (e.target.result) {
        console.log("DONE");
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

  let previousV = JSON.stringify(v); // Initially set it to the string representation of v

  function save() {
    if (JSON.stringify(v) !== previousV) {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.put({ id: "saveV3.10", data: v });
      previousV = JSON.stringify(v);
    }
  }

  function interval() {
    console.log("INTERVAL");
    if (preventSave) {
      console.log("NOSAVE");
      return;
    }
    save();
  }

  console.log("here");
  setInterval(interval, 5000);
  function clearAllData() {
    const tx = db.transaction(storeName, "readwrite");
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
} else {
  setV();
  loadOtherScripts();
}

function loadOtherScripts() {
  checks();
  if (v.currentFileIndex > v.files.length - 1) {
    v.currentFileIndex = 0;
  }
  v.text = v.files[v.currentFileIndex].chapters[0].text;
  v.notesText = v.files[v.currentFileIndex].notesText;

  loadScript("JS/settings.js");
  loadScript("JS/data.js");
  loadScript("JS/base.js");
}

function setV() {
  v = {
    text: `Loading file ...`,
    notesText: `Loading file ...`,
    autoHide: false,
    wordGoal: 50,
    screenShakeIntensity: 0,
    typingConfettiCount: 2,
    goalReached: false,
    fontSize: 16,
    fontFamily: "Times New Roman, serif",
    nightMode: true,

    typingSound: "clickSound1",
    typingSoundPath: {
      source: "assets/audio/click1.mp3",
    },

    timeGoal: 5,
    rainbowStreak: false,
    exclude: 0,
    excludeDefault: true,
    addToGoal: 100,
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
        name: "Welcome to WriteRush 2!",
        wordGoal: 50,
        exclude: 0,
        chapters: [
          {
            id: 1,
            name: "Chapter 1",
            text: `Thanks for downloading WriteRush! 😁
Type here ...`,
          },
          {
            id: 2,
            name: "Chapter 2",
            text: "This is chatper 2!",
          },
        ],
      },
      {
        id: 12,
        name: "File 2",
        wordGoal: 50,
        exclude: 0,
        chapters: [
          {
            id: 3,
            text: "Content of File 2",
            name: "Untitled",
          },
        ],
      },
    ],
    currentFileIndex: 0,
    streakCompletionTime: 30000,
    bgImage: null,
    bgImageName: null,
    rainbowProgressBar: false,
    progressBarColor: "var(--outline)",
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
    firstOpen: false,
    backgroundImage: null,
    lineHeight: 1.5,
    confettiType: 1,
  };
}

function checks() {
  if (v.autoHide === undefined) {
    v.autoHide = false;
  }
}
