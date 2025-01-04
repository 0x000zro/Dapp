document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Save the user's preference using localStorage
        localStorage.setItem('dark-mode', body.classList.contains('dark-mode') ? 'true' : 'false');
    });

    // Check if dark mode preference was set and apply it
    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
    }

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Staking Form Submission
    const stakingForm = document.getElementById('stakingForm');
    const stakeMessage = document.getElementById('stakeMessage');

    stakingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const stakeAmount = document.getElementById('stakeAmount').value;
        
        if (stakeAmount && stakeAmount > 0) {
            // Here you would typically interact with the blockchain or server to stake tokens
            // This is just a placeholder for demonstration
            stakeMessage.textContent = `Successfully staked ${stakeAmount} $RUPE!`;
            stakeMessage.style.color = 'green';
        } else {
            stakeMessage.textContent = 'Please enter a valid amount to stake.';
            stakeMessage.style.color = 'red';
        }
        // Clear the message after a few seconds
        setTimeout(() => stakeMessage.textContent = '', 5000);
    });

    // Wallet Connection (Mock)
    const connectButton = document.getElementById('connectButton');
    const accountStatus = document.getElementById('account');
    const balanceDisplay = document.getElementById('balance');

    connectButton.addEventListener('click', async () => {
        // This is a mock for wallet connection. In real scenarios, you'd use Web3.js or similar
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                accountStatus.textContent = `Connected: ${accounts[0].slice(0,6)}...${accounts[0].slice(-4)}`;
                // Mock balance, replace with actual blockchain interaction
                balanceDisplay.textContent = `Balance: 100 $RUPE`;
            } catch (error) {
                console.error("User denied account access", error);
                accountStatus.textContent = 'Connection Failed';
            }
        } else {
            accountStatus.textContent = 'Please install MetaMask!';
        }
    });

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Accessibility - Focus management for mobile menu
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
        });
    });
});