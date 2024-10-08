const player = document.getElementById('player');
const board = document.getElementById('game-board');
const message = document.getElementById('message');

// 毒霧區域
const toxicZones = [
    { x: 100, y: 100 },
    { x: 200, y: 200 },
    { x: 50, y: 300 }
];

// 初始化毒霧區域
toxicZones.forEach(zone => {
    const toxicDiv = document.createElement('div');
    toxicDiv.classList.add('toxic-zone');
    toxicDiv.style.top = `${zone.y}px`;
    toxicDiv.style.left = `${zone.x}px`;
    board.appendChild(toxicDiv);
});

// 追蹤玩家的位置
let playerPos = { x: 0, y: 0 };

// 玩家移動
document.addEventListener('keydown', (e) => {
    const step = 20;
    switch (e.key) {
        case 'ArrowUp':
            if (playerPos.y > 0) playerPos.y -= step;
            break;
        case 'ArrowDown':
            if (playerPos.y < board.clientHeight - player.clientHeight) playerPos.y += step;
            break;
        case 'ArrowLeft':
            if (playerPos.x > 0) playerPos.x -= step;
            break;
        case 'ArrowRight':
            if (playerPos.x < board.clientWidth - player.clientWidth) playerPos.x += step;
            break;
    }
    updatePlayerPosition();
    checkCollision();
});

// 更新玩家位置
function updatePlayerPosition() {
    player.style.top = `${playerPos.y}px`;
    player.style.left = `${playerPos.x}px`;
}

// 檢查是否碰到毒霧區域
function checkCollision() {
    toxicZones.forEach(zone => {
        if (
            playerPos.x < zone.x + 100 &&
            playerPos.x + 20 > zone.x &&
            playerPos.y < zone.y + 100 &&
            playerPos.y + 20 > zone.y
        ) {
            message.textContent = '你進入了毒霧區域！請重新嘗試。';
            resetGame();
        }
    });

    // 假設出口在右下角
    if (playerPos.x >= 380 && playerPos.y >= 380) {
        message.textContent = '恭喜！你成功逃離毒霧迷城！';
        resetGame();
    }
}

// 重置遊戲
function resetGame() {
    playerPos = { x: 0, y: 0 };
    updatePlayerPosition();
}
