document.addEventListener('DOMContentLoaded', function() {
    loadGameDetails();
});

function loadGameDetails() {
    // Получаем ID игры из URL
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = parseInt(urlParams.get('id'));
    
    if (!gameId) {
        window.location.href = '../html/catalog.html';
        return;
    }
    
    const game = games.find(g => g.id === gameId);
    if (!game) {
        showNotification('Игра не найдена', 'error');
        setTimeout(() => {
            window.location.href = '../html/catalog.html';
        }, 2000);
        return;
    }
    
    // Заполняем информацию об игре
    document.getElementById('game-title').textContent = game.title;
    document.getElementById('game-genre').textContent = game.detailedInfo.genre || "Жанр не указан";
    document.getElementById('game-genre-full').textContent = game.detailedInfo.genre || "Не указан";
    document.getElementById('game-description').textContent = game.description;
    document.getElementById('game-developer').textContent = game.detailedInfo.developer || "Не указан";
    document.getElementById('game-publisher').textContent = game.detailedInfo.publisher || "Не указан";
    document.getElementById('game-release-date').textContent = game.detailedInfo.releaseDate || "Не указана";
    
    // Цена
    const priceElement = document.getElementById('game-price');
    const oldPriceElement = document.getElementById('game-old-price');
    const discountElement = document.getElementById('game-discount');
    
    if (game.price === 0) {
        priceElement.textContent = 'Бесплатно';
    } else {
        priceElement.textContent = `${game.price} ₽`;
        
        if (game.discount > 0) {
            oldPriceElement.textContent = `${game.oldPrice} ₽`;
            oldPriceElement.style.display = 'block';
            discountElement.textContent = `-${game.discount}%`;
            discountElement.style.display = 'block';
        }
    }
    
    // Скриншоты
    const screenshotsContainer = document.getElementById('game-screenshots');
    screenshotsContainer.innerHTML = '';
    
    if (game.detailedInfo.screenshots && game.detailedInfo.screenshots.length > 0) {
        game.detailedInfo.screenshots.forEach((screenshot, index) => {
            const img = document.createElement('img');
            img.className = 'screenshot';
            img.src = screenshot;
            img.alt = `Скриншот ${index + 1} из игры ${game.title}`;
            img.onerror = function() {
                this.src = '';
                this.className = 'screenshot image-placeholder';
                this.textContent = `Скриншот ${index + 1}`;
            };
            screenshotsContainer.appendChild(img);
        });
    } else {
        for (let i = 1; i <= 3; i++) {
            const img = document.createElement('div');
            img.className = 'screenshot image-placeholder';
            img.textContent = `Скриншот ${i}`;
            screenshotsContainer.appendChild(img);
        }
    }
    
    // Видео
    const videoContainer = document.getElementById('game-video');
    if (game.detailedInfo.video) {
        videoContainer.innerHTML = `<iframe src="${game.detailedInfo.video}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    
    // Системные требования
    const requirementsContainer = document.getElementById('game-requirements');
    requirementsContainer.innerHTML = '';
    
    const requirements = [
        { key: 'os', name: 'Операционная система' },
        { key: 'processor', name: 'Процессор' },
        { key: 'memory', name: 'Оперативная память' },
        { key: 'graphics', name: 'Видеокарта' },
        { key: 'storage', name: 'Место на диске' },
        { key: 'directX', name: 'DirectX' }
    ];
    
    requirements.forEach(req => {
        const li = document.createElement('li');
        const value = game.detailedInfo.requirements[req.key] || "Не указано";
        li.innerHTML = `<span class="req-name">${req.name}:</span> ${value}`;
        requirementsContainer.appendChild(li);
    });
    
    // Кнопка покупки
    const purchaseBtn = document.getElementById('purchase-btn');
    let isOwned = false;
    if (currentUser && currentUser.purchasedGames) {
        isOwned = currentUser.purchasedGames.includes(game.id);
    }
    
    if (isOwned) {
        purchaseBtn.textContent = 'В библиотеке';
        purchaseBtn.disabled = true;
    } else {
        purchaseBtn.textContent = game.price === 0 ? 'Добавить в библиотеку' : 'Добавить в корзину';
        purchaseBtn.disabled = false;
    }
}

function addToCartFromDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = parseInt(urlParams.get('id'));
    
    if (gameId) {
        addToCart(gameId);
    }
}