document.addEventListener('DOMContentLoaded', function() {
    loadGames();
    setupSearch();
});

function loadGames() {
    const container = document.getElementById('catalog-games');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Получаем параметры поиска
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const savedSearch = localStorage.getItem('searchTerm');
    const searchTerm = searchParam || savedSearch || '';
    
    // Применяем фильтр жанра
    const genreFilter = document.getElementById('genre-filter');
    const selectedGenre = genreFilter ? genreFilter.value : '';
    
    let filteredGames = games;
    
    // Фильтр по жанру
    if (selectedGenre) {
        filteredGames = filteredGames.filter(game => game.genre === selectedGenre);
    }
    
    // Фильтр по поиску
    if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filteredGames = filteredGames.filter(game => 
            game.title.toLowerCase().includes(searchLower) ||
            game.description.toLowerCase().includes(searchLower) ||
            (game.detailedInfo.genre && game.detailedInfo.genre.toLowerCase().includes(searchLower))
        );
    }
    
    if (filteredGames.length === 0) {
        container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #aaa;">Игры не найдены</p>';
        return;
    }
    
    filteredGames.forEach(game => {
        const gameCard = createGameCard(game);
        container.appendChild(gameCard);
    });
}

function filterGames() {
    loadGames();
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    // Восстанавливаем поисковый запрос
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
        searchInput.value = decodeURIComponent(searchParam);
    }
    
    searchInput.addEventListener('input', function() {
        localStorage.setItem('searchTerm', this.value);
        loadGames();
    });
}

function createGameCard(game) {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    
    let isOwned = false;
    if (currentUser && currentUser.purchasedGames) {
        isOwned = currentUser.purchasedGames.includes(game.id);
    }
    
    let priceHtml = '';
    if (game.isFree) {
        priceHtml = `<span class="game-card-free">Бесплатно</span>`;
    } else if (game.discount > 0) {
        priceHtml = `
            <div>
                <span class="game-card-old-price">${game.oldPrice} ₽</span>
                <div class="game-card-price">${game.price} ₽</div>
            </div>
            <div>
                <span class="game-card-discount">-${game.discount}%</span>
            </div>
        `;
    } else {
        priceHtml = `<div class="game-card-price">${game.price} ₽</div>`;
    }
    
    gameCard.innerHTML = `
        ${game.image ? 
            `<img src="${game.image}" alt="${game.title}">` : 
            `<div class="image-placeholder">${game.title}</div>`
        }
        <div class="game-card-content">
            <h3 class="game-card-title">${game.title}</h3>
            <div class="game-card-meta">
                ${priceHtml}
            </div>
            <button class="btn add-to-cart" ${isOwned ? 'disabled' : ''}>
                ${isOwned ? 'В библиотеке' : (game.price === 0 ? 'Добавить в библиотеку' : 'Добавить в корзину')}
            </button>
        </div>
    `;
    
    const button = gameCard.querySelector('.add-to-cart');
    if (!isOwned) {
        button.onclick = function(e) {
            e.stopPropagation();
            addToCart(game.id);
        };
    }
    
    gameCard.onclick = function() {
        window.location.href = `../html/game-details.html?id=${game.id}`;
    };
    
    return gameCard;
}