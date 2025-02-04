# Rule of 100 Timer

A web-based timer to help track and manage time spent learning and practicing various skills. The "Rule of 100" refers to the idea that you need to practice something 100 times to truly master it. This application allows you to record your sessions, track total hours spent on each skill, and save your progress.

---

## Features

- **Timer Functionality:** A timer that tracks hours, minutes, and seconds spent on any activity.
- **Session History:** Save and view all previous sessions with session details, including the date, day of the week, time finished, and duration.
- **Editable Skill Title:** You can click on the title to edit the name of the skill you're tracking.
- **Dark Mode:** A toggle between light and dark mode to enhance user experience.
- **Session Management:**
  - Add new sessions automatically when the timer is stopped.
  - Edit existing sessions to update details.
  - Delete sessions from the history.
- **Persistent Storage:** All data, including timer state and session history, is stored in `localStorage`, so it persists between browser sessions.

---

## Getting Started

To get started with this project, follow the steps below to clone and set it up locally on your machine.

### Prerequisites

- A web browser (Chrome, Firefox, Safari, etc.).
- Text editor (e.g., VS Code, Sublime Text) to view and modify the code.

### Installation

1. Clone the repository to your local machine:
```bash
git clone https://github.com/yourusername/rule-of-100-timer.git
cd rule-of-100-timer
```

2. Open the index.html file in your browser:
```bash
open index.html
```

3. You’re ready to use the timer!

## Usage

### Timer Controls
	•	Start/Pause Timer: Click the play button to start the timer and the pause button to stop it.
	•	Reset Timer: Click the reset button to reset the timer back to 00:00:00.

### Save Sessions
	•	Once the timer is stopped, click the check button to save the current session.
	•	The session will record the current date, time, and duration.

### Edit/Delete Sessions
	•	Edit Session: Click the edit button next to any saved session to modify its details.
	•	Delete Session: Click the delete button next to a session to remove it from the history.

### Dark Mode
	•	Toggle between light and dark mode by clicking the moon/sun icon in the top right corner.

### Customizable Skill Title
	•	The title at the top of the page is editable. Click on it to change the name of the skill you are tracking. The title will be saved in local storage.

## File Structure

Here’s a basic overview of the file structure for the project:

rule-of-100-timer/
├── index.html           # Main HTML file for the app
├── style.css            # Styles for the app (including dark mode support)
├── script.js            # JavaScript file with all app logic
├── README.md            # This README file
└── assets/              # Folder for icons and other assets
    └── icons/           # Icon files for play/pause, dark mode toggle, etc.
