document.addEventListener('DOMContentLoaded', () => {
    // Mock data for referral stats
    const mockReferralData = {
        code: 'RUPE123',
        count: 5,
        rewards: '100'
    };

    // Update referral stats on the page
    function updateReferralStats(data) {
        document.getElementById('referralCode').textContent = data.code;
        document.getElementById('referralCount').textContent = data.count;
        document.getElementById('referralRewards').textContent = `${data.rewards} $RUPE`;
        
        // Update referral link with the code
        document.getElementById('referralLink').value = `${window.location.origin}/?ref=${data.code}`;
    }

    // Function to copy text to clipboard
    function copyToClipboard(text) {
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = text;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Copied to clipboard!');
    }

    // Event listener for copying referral code
    document.getElementById('copyReferralCode').addEventListener('click', () => {
        copyToClipboard(mockReferralData.code);
    });

    // Event listener for copying referral link
    document.getElementById('copyLinkToClipboard').addEventListener('click', (e) => {
        e.preventDefault();
        copyToClipboard(document.getElementById('referralLink').value);
    });

    // Mock leaderboard data
    const mockLeaderboard = [
        { rank: 1, user: 'UserA', referrals: 10 },
        { rank: 2, user: 'UserB', referrals: 8 },
        { rank: 3, user: 'UserC', referrals: 5 },
        // Add more entries as needed
    ];

    // Function to populate the leaderboard
    function populateLeaderboard(data) {
        const leaderboardBody = document.querySelector('#leaderboard tbody');
        leaderboardBody.innerHTML = ''; // Clear existing rows
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.rank}</td>
                <td>${item.user}</td>
                <td>${item.referrals}</td>
            `;
            leaderboardBody.appendChild(row);
        });
    }

    // Mock function to fetch referral data (replace with real API call in production)
    function fetchReferralData() {
        return new Promise(resolve => {
            setTimeout(() => resolve(mockReferralData), 1000); // Simulate API delay
        });
    }

    // Mock function to fetch leaderboard data (replace with real API call in production)
    function fetchLeaderboardData() {
        return new Promise(resolve => {
            setTimeout(() => resolve(mockLeaderboard), 1000); // Simulate API delay
        });
    }

    // Initialize page with data
    async function init() {
        const referralData = await fetchReferralData();
        updateReferralStats(referralData);

        const leaderboardData = await fetchLeaderboardData();
        populateLeaderboard(leaderboardData);
    }

    init();
});