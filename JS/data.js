function openData() {
  v.wordGoal = v.files[v.currentFileIndex].wordGoal;
  v.exclude = v.files[v.currentFileIndex].exclude;
  document.querySelector("#wordGoalInput").value = v.wordGoal;
  document.querySelector("#timeGoalInput").value = v.timeGoal;
  document.querySelector("#excludeInput").value = v.exclude;
  updateData();
}

function updateData() {
  wordCount = countWords(v.text);
  const charCount = v.text.length;
  document.querySelector("#wordGoalInput").value = v.wordGoal;
  document.querySelector("#remainingWordGoalInput").value =
    v.wordGoal - wordCount;
  const pageCount = Math.round(v.text.length / 15) / 100;
  const wph =
    Math.round(((v.wordGoal - v.exclude) / (v.timeGoal / 60)) * 100) / 100;
  document.querySelector("#wphDisplay").textContent = `WPH: ${wph}`;
  document.querySelector("#belowWph").textContent = `(${
    v.wordGoal - v.exclude
  } words in ${v.timeGoal} minutes)`;
  document.querySelector(
    "#wordCountDisplay"
  ).textContent = `Words: ${wordCount}`;
  document.querySelector(
    "#charCountDisplay"
  ).textContent = `Characters (including spaces): ${charCount}`;
  document.querySelector(
    "#charCountNoSpacesDisplay"
  ).textContent = `Characters: ${countCharactersNoSpaces(v.text)}`;
  document.querySelector(
    "#pageCountDisplay"
  ).textContent = `Pages: ${pageCount}`;
  document.querySelector(
    "#readablityDisplay"
  ).textContent = `Readability: Grade ${Math.round(readability(v.text))}`;
  document.querySelector(
    "#readingTimeDisplay"
  ).textContent = `Reading Time: ${formatAsTime(
    (wordCount / 200) * 60 * 1000
  )}`;
  document.querySelector(
    "#sentenceCountDisplay"
  ).textContent = `Sentences: ${countSentences(v.text)}`;

  document.querySelector(
    "#dailyStreakDataDisplay"
  ).textContent = `Daily Streak: ${v.dailyStreak}`;
  document.querySelector(
    "#longestStreakDisplay"
  ).textContent = `Longest Writing Session Streak: ${formatAsTime(
    v.longestWritingStreak
  )}`;
  document.querySelector(
    "#sessionWritingTimeDisplay"
  ).textContent = `Session Writing Time: ${formatAsTime(
    v.currentWritingSessionTime
  )}`;
  document.querySelector(
    "#dailyWritingTimeDisplay"
  ).textContent = `Today's Writing Time: ${formatAsTime(
    v.dailyWritingSessionTime
  )}`;

  function setColor(selector, condition) {
    document.querySelector(selector).style.color = condition
      ? "red"
      : "rgba(var(--fontColor), 1)";
  }

  const isWphNegative = wph < 0;
  const isExcludeGreater = v.exclude > wordCount;

  setColor("#wordGoalInput", isWphNegative);
  setColor("#wphDisplay", isWphNegative);
  setColor("#belowWph", isWphNegative);
  setColor("#excludeInput", isWphNegative || isExcludeGreater);
  setColor("#wordCountDisplay", isExcludeGreater);
}
function formatAsTime(time) {
  const totalSeconds = Math.floor(time / 1000); // Convert milliseconds to seconds
  const minutes = Math.floor(totalSeconds / 60); // Find the full minutes
  const seconds = totalSeconds % 60; // Find the remaining seconds

  // Format minutes and seconds to have two digits
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();

  // Return the formatted time string
  return formattedMinutes + ":" + formattedSeconds;
}

document.querySelector("#autoExcludeButton").addEventListener("click", () => {
  v.exclude = wordCount;
  v.files[v.currentFileIndex].exclude = v.exclude;
  openData();
});

const remainingWordGoalInput = document.querySelector(
  "#remainingWordGoalInput"
);
remainingWordGoalInput.addEventListener("input", function () {
  const remainingWordGoal = parseInt(remainingWordGoalInput.value);
  wordCount = countWords(v.text);
  v.wordGoal = remainingWordGoal + wordCount;
  v.files[v.currentFileIndex].wordGoal = v.wordGoal;
  firstLoad = true;
  v.goalReached = true;
  updateProgressBar();
  updateData();
});

const wordGoalInput = document.querySelector("#wordGoalInput");
wordGoalInput.addEventListener("input", function () {
  v.wordGoal = parseInt(wordGoalInput.value);
  v.files[v.currentFileIndex].wordGoal = v.wordGoal;
  firstLoad = true;
  v.goalReached = true;
  updateProgressBar();
  updateData();
});

const timeGoalInput = document.querySelector("#timeGoalInput");
timeGoalInput.addEventListener("input", function () {
  v.timeGoal = parseInt(timeGoalInput.value);
  updateData();
});

const excludeInput = document.querySelector("#excludeInput");
excludeInput.addEventListener("input", function () {
  v.exclude = parseInt(excludeInput.value);
  v.files[v.currentFileIndex].exclude = v.exclude;
  firstLoad = true;
  v.goalReached = true;
  updateProgressBar();
  updateData();
});
