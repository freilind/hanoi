document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const diskCountSelect = document.getElementById('disk-count');
    const resetBtn = document.getElementById('reset-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    const movesDisplay = document.getElementById('moves');
    const finalMovesDisplay = document.getElementById('final-moves');
    const winMessage = document.getElementById('win-message');

    // Ensure win message is hidden at start
    winMessage.style.display = 'none';
    winMessage.classList.add('hidden');

    // Tower elements
    const towers = [
        document.getElementById('tower-1'),
        document.getElementById('tower-2'),
        document.getElementById('tower-3')
    ];

    // Disk colors (from largest to smallest)
    const diskColors = [
        '#3498db', // blue
        '#2ecc71', // green
        '#f1c40f', // yellow
        '#e67e22', // orange
        '#e74c3c',  // red
        '#A33CE7',  // purple
        '#3CE7D3'  // cyan
    ];

    // Game state
    let diskCount = 0;
    let moves = 0;
    let selectedTower = null;
    let gameStarted = false;

    // Initialize the game
    function initGame() {
        // Hide win message with both CSS class and inline style
        winMessage.classList.add('hidden');
        winMessage.style.display = 'none';

        // Clear all towers
        towers.forEach(tower => {
            const disks = tower.querySelectorAll('.disk');
            disks.forEach(disk => disk.remove());
        });

        // Reset game state
        moves = 0;
        movesDisplay.textContent = '0';
        selectedTower = null;

        // Add disks to the first tower
        diskCount = parseInt(diskCountSelect.value);
        for (let i = diskCount; i >= 1; i--) {
            const disk = document.createElement('div');
            disk.className = 'disk';
            disk.style.width = `${i * 20 + 30}px`;

            // Apply consistent color based on disk size (reverse order for proper indexing)
            const colorIndex = diskCount - i;
            disk.style.backgroundColor = diskColors[colorIndex];

            disk.textContent = i;
            towers[0].insertBefore(disk, towers[0].querySelector('.rod').nextSibling);
        }

        // Only set gameStarted to true after setup is complete
        gameStarted = true;
    }

    // Check if the game is won
    function checkWin() {
        // Only check for win if moves have been made
        if (moves > 0 && towers[2].querySelectorAll('.disk').length === diskCount) {
            gameStarted = false;
            finalMovesDisplay.textContent = moves;

            // Show win message with a slight delay for better UX
            setTimeout(() => {
                winMessage.classList.remove('hidden');
                winMessage.style.display = 'flex';
            }, 500);

            return true;
        }
        return false;
    }

    // Handle tower click
    function handleTowerClick(towerIndex) {
        if (!gameStarted) return;

        const tower = towers[towerIndex];

        // If no tower is selected
        if (selectedTower === null) {
            // Check if the tower has disks
            if (tower.querySelectorAll('.disk').length > 0) {
                selectedTower = towerIndex;
                tower.classList.add('selected');

                // Visual feedback - lift the top disk
                const topDisk = tower.querySelector('.disk');
                if (topDisk) {
                    topDisk.classList.add('lifting');
                }
            }
        }
        // If a tower is already selected
        else {
            const sourceTower = towers[selectedTower];
            const targetTower = tower;

            // Get top disks
            const sourceTopDisk = sourceTower.querySelector('.disk');
            const targetTopDisk = targetTower.querySelector('.disk');

            // Remove lifting effect
            if (sourceTopDisk) {
                sourceTopDisk.classList.remove('lifting');
            }

            // Check if move is valid
            if (selectedTower !== towerIndex &&
                (!targetTopDisk || parseInt(sourceTopDisk.style.width) < parseInt(targetTopDisk.style.width))) {

                // Move the disk
                targetTower.insertBefore(sourceTopDisk, targetTower.querySelector('.rod').nextSibling);

                // Update moves counter
                moves++;
                movesDisplay.textContent = moves;

                // Check if game is won
                checkWin();
            }

            // Deselect the tower
            sourceTower.classList.remove('selected');
            selectedTower = null;
        }
    }

    // Event listeners for towers
    towers.forEach((tower, index) => {
        tower.addEventListener('click', () => handleTowerClick(index));
    });

    // Reset button event listener
    resetBtn.addEventListener('click', initGame);

    // Disk count selection event listener
    diskCountSelect.addEventListener('change', initGame);

    // Play Again button event listener with explicit event prevention
    playAgainBtn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        initGame();
    });

    // Initialize the game on load
    initGame();
});