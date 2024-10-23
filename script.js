
// Elements from the timer itself
var hoursEl = document.getElementById('hours');
var minutesEl = document.getElementById('minutes');
var secondsEl = document.getElementById('seconds');

// Elements for the timer control and session save
var resetEl = document.getElementById('reset');
var playStopEl = document.getElementById('play-stop');
var playIcon = document.getElementById('play-icon');
var checkEl = document.getElementById("check");

// Elements from the edit session form
var editBtn;
var closeEditBtn = document.getElementById("close");
var submitEditEl = document.getElementById("submit");
var editSessionPopUp = document.getElementById("edit");

var counting = false;
var intervalId;

let currentTime = 0;
// Session data storage
let sessions = [];
let skills = {};

function saveSkill() {
    skills;
}

function getTotalHours() {
    const totalEl = document.getElementById('total');
    totalEl.innerHTML = '';
    let totalHours = 0;
    sessions.forEach((session, index) => {
        const durationParts = session.duration.split('h');
        const hours = parseInt(durationParts[0]);
        const minutesSeconds = durationParts[1].split('m');
        const minutes = parseInt(minutesSeconds[0]);
        const seconds = parseInt(minutesSeconds[1].replace('s', ''));
        totalHours += hours + (minutes / 60) + (seconds / 3600);
    });
    totalEl.innerHTML = `${totalHours.toFixed(2)} / 100`;
}

// Function to save session data to localStorage
function saveSessionData() {
    localStorage.setItem('sessions', JSON.stringify(sessions));
}

// Function to load session data from localStorage
function loadSessionData() {
    const storedSessions = localStorage.getItem('sessions');
    if (storedSessions !== null) {
        sessions = JSON.parse(storedSessions);
        renderSessionList();
        addHistoryHeading();
    } else {
        removeHistoryHeading();
    }
}

// Function to render session list
function renderSessionList() {
    const sessionList = document.getElementById('session-list');
    sessionList.innerHTML = '';
    sessions.forEach((session, index) => {
        const sessionHTML = `
            <li class="session-entry">
                <div class="session-info">
                    <p>Date: ${session.date}</p>
                    <p>Day: ${session.day}</p>
                    <p>Time Finished: ${session.time}</p>
                    <p>Duration: ${session.duration}</p>
                </div>
                <div class="session-actions">
                    <button class="edit-btn" onclick="editSession(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteSession(${index})">Delete</button>
                </div>
            </li>
        `;
        sessionList.insertAdjacentHTML('beforeend', sessionHTML);
    });
}

// Edit the data of the current session
function editSession(index) {
    session = sessions[index];
    editSessionPopUp.classList.add('show-edit');
    
    // Populate the edit form with current session data
    document.getElementById("input-date").value = session.date;
    document.getElementById("input-time").value = session.time;
    document.getElementById("input-duration").value = session.duration;
}

// Function to delete session
function deleteSession(index) {
    sessions.splice(index, 1);
    saveSessionData();
    renderSessionList();
    if (sessions.length === 0) {
        removeHistoryHeading();
        localStorage.removeItem('sessions'); // Remove sessions from localStorage
    }
}

// Retrieve the editBtn element from the document
function getEditButton() {
    var editBtn = document.getElementById("edit-btn");
}

// Function to add new session
function addSession(date, day, time, duration) {
    const newSession = {
        date,
        day,
        time,
        duration,
    };
    sessions.unshift(newSession); // Add to beginning of array
    saveSessionData();
    renderSessionList();
    getEditButton();
    addHistoryHeading();
}

function addHistoryHeading() {
    var heading = document.getElementById("history-title");
    heading.classList.add("show");
}

function removeHistoryHeading() {
    var heading = document.getElementById("history-title");
    heading.classList.remove("show");
}

// Submit Edited Session Data
submitEditEl.addEventListener('click', (e) => {
    try {
        e.preventDefault();
        // Update session data with user input
        session.date = document.getElementById("input-date").value;
        
        // Extract the day from the date
        const date = new Date(session.date);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        session.day = day;

        session.time = document.getElementById("input-time").value;
        session.duration = document.getElementById("input-duration").value;
        
        // Save updated session data
        saveSessionData();
        
        // Update session list
        renderSessionList();
        
        // Hide edit popup
        editSessionPopUp.classList.remove('show-edit');
    } catch (error) {
        console.error('Error in submitEditEl event listener:', error);
    }
});

// Example usage: Add new session when timer is stopped
function finishSession() {
    if (currentTime === 0) {
        return
    }
    const date = new Date().toLocaleDateString();
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const time = new Date().toLocaleTimeString();
    const duration = `${hoursEl.innerText}h ${minutesEl.innerText}m ${secondsEl.innerText}s`;
    addSession(date, day, time, duration);
    getTotalHours();
    resetCounter();
    if (counting) {
        toggleCounter();
    }
}

function countUpTimer() {
    intervalId = setInterval(() => {
        currentTime++;
        hoursEl.innerText = formatNumber(Math.floor(currentTime / 3600));
        minutesEl.innerText = formatNumber(Math.floor((currentTime % 3600) / 60));
        secondsEl.innerText = formatNumber(currentTime % 60);
        saveTimerState(currentTime);
    }, 1000)
}

function formatNumber(number) {
    if(number < 10) {
        return '0' + number;
    }
    return number;
}

function resetCounter() {
    currentTime = 0;
    hoursEl.innerText = '00';
    minutesEl.innerText = '00';
    secondsEl.innerText = '00';
    localStorage.removeItem('currentTime');
}

function toggleCounter() {
    counting = !counting;
    if (counting) {
        countUpTimer();
        playIcon.className = 'fas fa-pause';
    } else {
        clearInterval(intervalId);
        playIcon.className = 'fas fa-play';
    }
}

// Save selected movie index and price
function saveTimerState(currentTime) {
    localStorage.setItem('currentTime', currentTime);
}

// Load saved time
function loadTimerState() {
    const savedTime = localStorage.getItem('currentTime');
    if (savedTime !== null) {
        currentTime = parseInt(savedTime);
        hoursEl.innerText = formatNumber(Math.floor(currentTime / 3600));
        minutesEl.innerText = formatNumber(Math.floor((currentTime % 3600) / 60));
        secondsEl.innerText = formatNumber(currentTime % 60);
    }
}

// Document actions on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTimerState();
    loadSessionData();
    loadDarkModePreference();
    if (sessions.length === 0) {
        removeHistoryHeading();
    }
    loadTitleBar();
});

// Dark and Light Mode Switching
var lightDarkModeBtn = document.getElementById('light-dark');
var icon = lightDarkModeBtn.querySelector('i');
lightDarkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle("dark-theme");
    saveDarkModePreference();
    // Toggle icon class
    if (document.body.classList.contains("dark-theme")) {
        icon.className = "fas fa-sun";
    } else {
        icon.className = "fas fa-moon";
    }
});

// Save the dark / light mode preference
function saveDarkModePreference() {
    localStorage.setItem('darkMode', JSON.stringify(document.body.classList.contains("dark-theme")));
}

// Retrieve the users dark / light mode preference from local storage
function loadDarkModePreference() {
    const isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (isDarkMode) {
        document.body.classList.add("dark-theme");
        icon.className = "fas fa-sun";
    }
}

// NAVIGATION BAR ACTIONS
const openSkillsDrawer = document.getElementById("skills-drawer");
openSkillsDrawer.addEventListener('click', () => {
    document.body.classList.toggle('show-nav');
});

// SAVE EDITED TITLE BAR
document.getElementById('editable-title').addEventListener('input', () => {
    localStorage.setItem('savedTitle', document.getElementById('editable-title').innerHTML);
});

// LOAD TITLE BAR
function loadTitleBar() {
    const savedTitle = localStorage.getItem('savedTitle');
    if (savedTitle) {
        document.getElementById('editable-title').innerHTML = savedTitle;
    }
}

playStopEl.addEventListener('click', toggleCounter);
resetEl.addEventListener('click', resetCounter);
checkEl.addEventListener('click', finishSession);
closeEditBtn.addEventListener('click', () => {
    editSessionPopUp.classList.remove('show-edit');
});