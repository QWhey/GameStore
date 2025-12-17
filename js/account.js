document.addEventListener('DOMContentLoaded', function() {
    if (!currentUser) {
        window.location.href = '../html/auth.html';
        return;
    }
    
    loadAccountInfo();
    loadPurchasedGames();
});

function loadAccountInfo() {
    document.getElementById('account-username').textContent = currentUser.username;
    document.getElementById('account-email').textContent = currentUser.email;
    document.getElementById('account-joindate').textContent = currentUser.joinDate;
    document.getElementById('account-games-count').textContent = currentUser.purchasedGames.length;
    document.getElementById('account-total-spent').textContent = currentUser.totalSpent ? `${currentUser.totalSpent} ₽` : '0 ₽';
}

function loadPurchasedGames() {
    const container = document.getElementById('purchased-games');
    if (!container) return;
    
    if (currentUser.purchasedGames.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 50px; color: #aaa;">
                <i class="fas fa-times" style="font-size: 4rem; margin-bottom: 20px;"></i>
                <h3>У вас нет приобретенных игр</h3>
                <p>Приобретите игры в каталоге, чтобы они появились здесь</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    currentUser.purchasedGames.forEach(gameId => {
        const game = games.find(g => g.id === gameId);
        if (!game) return;
        
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card game-card-owned';
        gameCard.innerHTML = `
            <div class="owned-badge">Приобретено</div>
            ${game.image ? 
                `<img src="${game.image}" alt="${game.title}">` : 
                `<div class="image-placeholder">${game.title}</div>`
            }
            <div class="game-card-content">
                <h3 class="game-card-title">${game.title}</h3>
                <div class="game-card-meta">
                    <div class="game-card-price">Библиотека</div>
                </div>
                <button class="btn" style="width: 100%;">Играть</button>
            </div>
        `;
        container.appendChild(gameCard);
    });
}

function logout() {
    if (confirm('Вы уверены, что хотите выйти из аккаунта?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        showNotification('Вы успешно вышли из аккаунта', 'success');
        setTimeout(() => {
            window.location.href = '../html/index.html';
        }, 1000);
    }
}