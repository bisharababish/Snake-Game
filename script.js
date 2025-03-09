
function initializeLeaderboardSystem() {
    checkUserRegistration();

    const leaderboardBtn = document.getElementById('leaderboardBtn');
    const profileBtn = document.getElementById('profileBtn');

    if (leaderboardBtn) {
        leaderboardBtn.addEventListener('click', toggleLeaderboard);
    } else {
        console.error("Leaderboard button not found in the DOM");
    }

    if (profileBtn) {
        profileBtn.addEventListener('click', toggleProfile);
    } else {
        console.error("Profile button not found in the DOM");
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.dataset.tab + 'Tab';
            const tabElement = document.getElementById(tabId);

            if (tabElement) {
                tabElement.classList.add('active');
                loadLeaderboardData(btn.dataset.tab);
            } else {
                console.error(`Tab content element with ID ${tabId} not found`);
            }
        });
    });

    const registrationForm = document.getElementById('registrationForm');
    const guestPlayBtn = document.getElementById('guestPlayBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    } else {
        console.error("Registration form not found in the DOM");
    }

    if (guestPlayBtn) {
        guestPlayBtn.addEventListener('click', playAsGuest);
    } else {
        console.error("Guest play button not found in the DOM");
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    } else {
        console.error("Logout button not found in the DOM");
    }

    const defaultTab = document.querySelector('.tab-btn');
    if (defaultTab) {
        defaultTab.click();
    }
}

function checkUserRegistration() {
    const userId = localStorage.getItem('snakeUserId');
    const username = localStorage.getItem('snakeUsername');
    const profileUsername = document.getElementById('profileUsername');
    const startBtn = document.getElementById('startBtn');
    const registrationModal = document.getElementById('registrationModal');

    if (!profileUsername) {
        console.error("Profile username element not found in the DOM");
        return;
    }

    if (userId && username) {
        profileUsername.textContent = username;
        loadUserProfile(userId);
    } else if (startBtn && registrationModal) {
        startBtn.addEventListener('click', function () {
            registrationModal.classList.add('active');
        }, { once: true });
    } else {
        console.error("Start button or registration modal not found in the DOM");
    }
}

function toggleLeaderboard() {
    const leaderboardPanel = document.getElementById('leaderboardPanel');
    const settingsPanel = document.getElementById('settingsPanel');
    const profilePanel = document.getElementById('profilePanel');

    if (!leaderboardPanel) {
        console.error("Leaderboard panel not found in the DOM");
        return;
    }

    if (settingsPanel) {
        settingsPanel.classList.remove('settings-open');
    }

    if (profilePanel) {
        profilePanel.classList.remove('profile-open');
    }

    leaderboardPanel.classList.toggle('leaderboard-open');

    if (leaderboardPanel.classList.contains('leaderboard-open')) {
        const activeTab = document.querySelector('.tab-btn.active');
        const tabType = activeTab ? activeTab.dataset.tab : 'global';
        loadLeaderboardData(tabType);
    }
}

function toggleProfile() {
    const profilePanel = document.getElementById('profilePanel');
    const settingsPanel = document.getElementById('settingsPanel');
    const leaderboardPanel = document.getElementById('leaderboardPanel');

    if (!profilePanel) {
        console.error("Profile panel not found in the DOM");
        return;
    }

    if (settingsPanel) {
        settingsPanel.classList.remove('settings-open');
    }

    if (leaderboardPanel) {
        leaderboardPanel.classList.remove('leaderboard-open');
    }

    profilePanel.classList.toggle('profile-open');

    if (profilePanel.classList.contains('profile-open')) {
        const userId = localStorage.getItem('snakeUserId');
        if (userId) {
            loadUserProfile(userId);
        }
    }
}

function loadLeaderboardData(type) {
    const leaderboardElement = document.getElementById(`${type}Leaderboard`);

    if (!leaderboardElement) {
        console.error(`Leaderboard element with ID ${type}Leaderboard not found`);
        return;
    }

    leaderboardElement.innerHTML = '<tr class="loading-row"><td colspan="4">Loading scores...</td></tr>';

    setTimeout(() => {
        const sampleData = generateSampleLeaderboardData(type);

        renderLeaderboardData(leaderboardElement, sampleData, type);

        updatePlayerRankInfo(sampleData);
    }, 1000);
}

function generateSampleLeaderboardData(type) {

    const username = localStorage.getItem('snakeUsername');
    const bestScore = parseInt(localStorage.getItem('snakeBestScore') || '0');

    if (username && username !== 'Guest') {
        sampleData.push({ rank: 12, username: username, score: bestScore, date: "2025-03-10", isCurrentUser: true });
    }

    return sampleData;
}

function renderLeaderboardData(element, data, type) {
    if (data.length === 0) {
        element.innerHTML = '<tr class="empty-row"><td colspan="4">No scores yet</td></tr>';
        return;
    }

    data.sort((a, b) => a.rank - b.rank);

    element.innerHTML = '';

    data.forEach(entry => {
        const row = document.createElement('tr');
        if (entry.isCurrentUser) {
            row.classList.add('current-user');
        }

        row.innerHTML = `
            <td>${entry.rank}</td>
            <td>${entry.username}</td>
            <td>${entry.score}</td>
            <td>${formatDate(entry.date)}</td>
        `;

        element.appendChild(row);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function updatePlayerRankInfo(data) {
    const playerRankElement = document.getElementById('playerRank');
    const playerBestElement = document.getElementById('playerBest');

    if (!playerRankElement || !playerBestElement) {
        console.error("Player rank or best score elements not found");
        return;
    }

    const currentUser = data.find(entry => entry.isCurrentUser);

    if (currentUser) {
        playerRankElement.textContent = `#${currentUser.rank}`;
        playerBestElement.textContent = currentUser.score;
    } else {
        playerRankElement.textContent = '--';
        playerBestElement.textContent = localStorage.getItem('snakeBestScore') || '0';
    }
}

function handleRegistration(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const registrationModal = document.getElementById('registrationModal');
    const profileUsername = document.getElementById('profileUsername');

    if (!usernameInput || !emailInput || !passwordInput) {
        console.error("Registration form inputs not found");
        return;
    }

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!username || !email || !password) {
        alert("Please fill in all fields");
        return;
    }
    const userId = 'user_' + Math.random().toString(36).substr(2, 9);

    localStorage.setItem('snakeUserId', userId);
    localStorage.setItem('snakeUsername', username);
    localStorage.setItem('snakeBestScore', '0');
    localStorage.setItem('snakeGamesPlayed', '0');
    localStorage.setItem('snakeAvgScore', '0');
    localStorage.setItem('snakeTotalScore', '0');

    if (profileUsername) {
        profileUsername.textContent = username;
    }

    if (registrationModal) {
        registrationModal.classList.remove('active');
    }

    alert(`Welcome, ${username}! Your scores will now be saved to the leaderboard.`);

    if (typeof startGame === 'function') {
        startGame();
    } else {
        console.warn("startGame function not found. Make sure it's defined elsewhere in your code.");
    }
}

function playAsGuest() {
    const registrationModal = document.getElementById('registrationModal');
    const profileUsername = document.getElementById('profileUsername');

    localStorage.setItem('snakeUserId', 'guest');
    localStorage.setItem('snakeUsername', 'Guest');

    if (profileUsername) {
        profileUsername.textContent = 'Guest';
    }

    if (registrationModal) {
        registrationModal.classList.remove('active');
    }

    if (typeof startGame === 'function') {
        startGame();
    } else {
        console.warn("startGame function not found. Make sure it's defined elsewhere in your code.");
    }
}

function loadUserProfile(userId) {

    const bestScore = localStorage.getItem('snakeBestScore') || '0';
    const gamesPlayed = localStorage.getItem('snakeGamesPlayed') || '0';
    const avgScore = localStorage.getItem('snakeAvgScore') || '0';

    const profileBestScore = document.getElementById('profileBestScore');
    const profileGamesPlayed = document.getElementById('profileGamesPlayed');
    const profileAvgScore = document.getElementById('profileAvgScore');

    if (profileBestScore) profileBestScore.textContent = bestScore;
    if (profileGamesPlayed) profileGamesPlayed.textContent = gamesPlayed;
    if (profileAvgScore) profileAvgScore.textContent = avgScore;
}

function submitScore(score) {
    const userId = localStorage.getItem('snakeUserId');
    const username = localStorage.getItem('snakeUsername');

    if (!userId || username === 'Guest') {
        return;
    }

    const currentBest = parseInt(localStorage.getItem('snakeBestScore') || '0');

    if (score > currentBest) {
        localStorage.setItem('snakeBestScore', score.toString());
    }

    const gamesPlayed = parseInt(localStorage.getItem('snakeGamesPlayed') || '0') + 1;
    localStorage.setItem('snakeGamesPlayed', gamesPlayed.toString());

    const totalScore = parseInt(localStorage.getItem('snakeTotalScore') || '0') + score;
    localStorage.setItem('snakeTotalScore', totalScore.toString());
    localStorage.setItem('snakeAvgScore', Math.floor(totalScore / gamesPlayed).toString());

    console.log(`Submitting score for ${username}: ${score}`);

    const leaderboardPanel = document.getElementById('leaderboardPanel');
    if (leaderboardPanel && leaderboardPanel.classList.contains('leaderboard-open')) {
        const activeTab = document.querySelector('.tab-btn.active');
        const tabType = activeTab ? activeTab.dataset.tab : 'global';
        loadLeaderboardData(tabType);
    }
}

function logoutUser() {
    localStorage.removeItem('snakeUserId');
    localStorage.removeItem('snakeUsername');
    localStorage.removeItem('snakeBestScore');
    localStorage.removeItem('snakeGamesPlayed');
    localStorage.removeItem('snakeAvgScore');
    localStorage.removeItem('snakeTotalScore');

    const profileUsername = document.getElementById('profileUsername');
    const profileBestScore = document.getElementById('profileBestScore');
    const profileGamesPlayed = document.getElementById('profileGamesPlayed');
    const profileAvgScore = document.getElementById('profileAvgScore');
    const profilePanel = document.getElementById('profilePanel');
    const startBtn = document.getElementById('startBtn');
    const registrationModal = document.getElementById('registrationModal');

    if (profileUsername) profileUsername.textContent = 'Guest';
    if (profileBestScore) profileBestScore.textContent = '0';
    if (profileGamesPlayed) profileGamesPlayed.textContent = '0';
    if (profileAvgScore) profileAvgScore.textContent = '0';

    if (profilePanel) {
        profilePanel.classList.remove('profile-open');
    }

    if (startBtn && registrationModal) {
        startBtn.addEventListener('click', function () {
            registrationModal.classList.add('active');
        }, { once: true });
    }
}

document.addEventListener('DOMContentLoaded', initializeLeaderboardSystem);

function onGameOver(finalScore) {
    submitScore(finalScore);
}