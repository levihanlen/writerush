
function openData() {
    v.wordGoal = v.files[v.currentFileIndex].wordGoal;
    v.exclude = v.files[v.currentFileIndex].exclude;
    document.querySelector('#wordGoalInput').value = v.wordGoal;
    document.querySelector('#timeGoalInput').value = v.timeGoal;
    document.querySelector('#excludeInput').value = v.exclude;
    updateData();
}



function updateData() {
    wordCount = countWords(v.text);
    const charCount = v.text.length;
    document.querySelector("#wordGoalInput").value = v.wordGoal;
    document.querySelector("#remainingWordGoalInput").value = v.wordGoal - wordCount;
    const pageCount = Math.round(v.text.length / 15) /100;
    const wph = (Math.round(((v.wordGoal - v.exclude) / (v.timeGoal / 60)) * 100) / 100)
    document.querySelector('#wphDisplay').textContent = `WPH: ${wph}`;
    document.querySelector('#belowWph').textContent = `(${v.wordGoal - v.exclude} words in ${v.timeGoal} minutes)`
    document.querySelector('#wordCountDisplay').textContent = `Word Count: ${wordCount}`;
    document.querySelector('#charCountDisplay').textContent = `Character Count (including spaces): ${charCount}`;
    document.querySelector('#charCountNoSpacesDisplay').textContent = `Character Count: ${countCharactersNoSpaces(v.text)}`;
    document.querySelector('#pageCountDisplay').textContent = `Page Count: ${pageCount}`;
    document.querySelector('#readablityDisplay').textContent = `Readability: Grade ${Math.round(readability(v.text))}`;
    document.querySelector('#readingTimeDisplay').textContent = `Reading Time: ${Math.floor(wordCount / 200)} minutes, ${Math.floor((wordCount % 200) / (200 / 60))} seconds`;
    document.querySelector('#sentenceCountDisplay').textContent = `Sentence Count: ${countSentences(v.text)}`;
    

    document.querySelector('#dailyStreakDataDisplay').textContent = `Daily Streak: ${v.dailyStreak}`;
    document.querySelector('#longestStreakDisplay').textContent = `Longest Writing Session Streak: ${Math.floor(v.longestWritingStreak / 1000 / 60)} minutes, ${Math.floor((v.longestWritingStreak / 1000) % 60)} seconds`;
    document.querySelector('#sessionWritingTimeDisplay').textContent = `Session Writing Time: ${Math.floor(v.currentWritingSessionTime / 1000 / 60)} minutes, ${Math.floor((v.currentWritingSessionTime / 1000) % 60)} seconds`;
    document.querySelector('#dailyWritingTimeDisplay').textContent = `Today's Writing Time: ${Math.floor(v.dailyWritingSessionTime / 1000 / 60)} minutes, ${Math.floor((v.dailyWritingSessionTime / 1000) % 60)} seconds`;
    
    function setColor(selector, condition) {
        document.querySelector(selector).style.color = condition ? 'red' : 'rgba(var(--fontColor), 1)';
    }
    
    const isWphNegative = wph < 0;
    const isExcludeGreater = v.exclude > wordCount;
    
    setColor('#wordGoalInput', isWphNegative);
    setColor('#wphDisplay', isWphNegative);
    setColor('#belowWph', isWphNegative);
    setColor('#excludeInput', isWphNegative || isExcludeGreater);
    setColor('#wordCountDisplay', isExcludeGreater);
    
}



document.querySelector('#autoExcludeButton').addEventListener('click', () => {
    v.exclude = wordCount;
    v.files[v.currentFileIndex].exclude = v.exclude;
    openData();
});



const remainingWordGoalInput = document.querySelector("#remainingWordGoalInput")
remainingWordGoalInput.addEventListener('input', function () {
    const remainingWordGoal = parseInt(remainingWordGoalInput.value);
    wordCount = countWords(v.text);
    v.wordGoal = remainingWordGoal + wordCount;
    v.files[v.currentFileIndex].wordGoal = v.wordGoal;
    firstLoad = true;
    v.goalReached = true;
    updateProgressBar();
    updateData();
});


const wordGoalInput = document.querySelector("#wordGoalInput")
wordGoalInput.addEventListener('input', function () {
    v.wordGoal = parseInt(wordGoalInput.value);
    v.files[v.currentFileIndex].wordGoal = v.wordGoal;
    firstLoad = true;
    v.goalReached = true;
    updateProgressBar();
    updateData();
});


const timeGoalInput = document.querySelector("#timeGoalInput")
timeGoalInput.addEventListener('input', function () {
    v.timeGoal = parseInt(timeGoalInput.value);
    updateData();
});


const excludeInput = document.querySelector("#excludeInput")
excludeInput.addEventListener('input', function () {
    v.exclude = parseInt(excludeInput.value);
    v.files[v.currentFileIndex].exclude = v.exclude;
    firstLoad = true;
    v.goalReached = true;
    updateProgressBar();
    updateData();
});