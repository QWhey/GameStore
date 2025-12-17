document.addEventListener('DOMContentLoaded', function() {
    populateCarousel();
    populateFreeGames();
    populateDiscountGames();
    startCarousel();
});

function populateCarousel() {
    const carousel = document.getElementById('carousel');
    const indicators = document.getElementById('carousel-indicators');
    
    if (!carousel || !indicators) return;
    
    carousel.innerHTML = '';
    indicators.innerHTML = '';
    
    const popularGames = games.filter(game => game.isPopular).slice(0, 5);
    if (popularGames.length === 0) {
        popularGames.push(...games.slice(0, 5));
    }
    
    popularGames.forEach((game, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-item';
        slide.innerHTML = `
            ${game.image ? 
                `<img src="${game.image}" alt="${game.title}">` : 
                `<div class="image-placeholder" style="height: 400px; font-size: 1.2rem;">${game.title}</div>`
            }
            <div class="carousel-content">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <div class="carousel-price">
                    ${game.discount > 0 ? `<span class="carousel-old-price">${game.oldPrice} ₽</span>` : ''}
                    ${game.price === 0 ? 'Бесплатно' : `${game.price} ₽`}
                    ${game.discount > 0 && game.price > 0 ? `<span class="game-card-discount" style="margin-left: 10px; display: inline-block;">-${game.discount}%</span>` : ''}
                </div>
                <button class="btn" onclick="addToCart(${game.id}); event.stopPropagation();">Добавить в корзину</button>
            </div>
        `;
        slide.onclick = function() {
            window.location.href = `../html/game-details.html?id=${game.id}`;
        };
        carousel.appendChild(slide);
        
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.onclick = function() {
            currentCarouselIndex = index;
            updateCarousel();
        };
        indicators.appendChild(indicator);
    });
}

function updateCarousel() {
    const carousel = document.getElementById('carousel');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carousel) return;
    
    carousel.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    
    indicators.forEach((indicator, index) => {
        if (index === currentCarouselIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function prevSlide() {
    const popularGames = games.filter(game => game.isPopular).slice(0, 5);
    currentCarouselIndex = currentCarouselIndex > 0 ? currentCarouselIndex - 1 : popularGames.length - 1;
    updateCarousel();
}

function nextSlide() {
    const popularGames = games.filter(game => game.isPopular).slice(0, 5);
    currentCarouselIndex = currentCarouselIndex < popularGames.length - 1 ? currentCarouselIndex + 1 : 0;
    updateCarousel();
}

function startCarousel() {
    setInterval(nextSlide, 5000);
}

function populateFreeGames() {
    const container = document.getElementById('free-games');
    if (!container) return;
    
    container.innerHTML = '';
    const freeGames = games.filter(game => game.isFree).slice(0, 8);
    
    freeGames.forEach(game => {
        const gameCard = createGameCard(game);
        container.appendChild(gameCard);
    });
}

function populateDiscountGames() {
    const container = document.getElementById('discount-games');
    if (!container) return;
    
    container.innerHTML = '';
    const discountGames = games.filter(game => game.discount > 0 && !game.isFree).slice(0, 8);
    
    discountGames.forEach(game => {
        const gameCard = createGameCard(game);
        container.appendChild(gameCard);
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