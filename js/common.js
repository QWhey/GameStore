// Общие переменные
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let currentCarouselIndex = 0;

// Функции для работы с корзиной
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        if (el) el.textContent = totalItems;
    });
}

function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    // Если игра бесплатная, добавляем в библиотеку
    if (game.price === 0) {
        if (currentUser) {
            if (!currentUser.purchasedGames.includes(gameId)) {
                currentUser.purchasedGames.push(gameId);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Обновляем список пользователей
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex(u => u.id === currentUser.id);
                if (userIndex !== -1) {
                    users[userIndex] = currentUser;
                    localStorage.setItem('users', JSON.stringify(users));
                }
                
                showNotification(`"${game.title}" добавлена в вашу библиотеку!`);
            } else {
                showNotification(`"${game.title}" уже есть в вашей библиотеке`, 'warning');
            }
        } else {
            showNotification('Для добавления бесплатной игры необходимо войти в аккаунт', 'warning');
            window.location.href = '../html/auth.html';
        }
        return;
    }

    // Добавление платной игры в корзину
    const existingItem = cart.find(item => item.id === gameId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: game.id,
            title: game.title,
            price: game.price,
            image: game.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    showNotification(`"${game.title}" добавлена в корзину!`);
}

function removeFromCart(gameId) {
    cart = cart.filter(item => item.id !== gameId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    
    const game = games.find(g => g.id === gameId);
    if (game) {
        showNotification(`"${game.title}" удалена из корзины`);
    }
    
    // Если мы на странице корзины, обновляем отображение
    if (window.location.pathname.includes('../html/cart.html')) {
        window.location.reload();
    }
}

// Уведомления
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Обработка поиска
function handleSearch(event) {
    if (event.key === 'Enter') {
        const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
        if (searchTerm) {
            localStorage.setItem('searchTerm', searchTerm);
            window.location.href = `../html/catalog.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }
}

// Перенаправление на страницу авторизации/аккаунта
function redirectToAuthOrAccount() {
    if (currentUser) {
        window.location.href = '../html/account.html';
    } else {
        window.location.href = '../html/auth.html';
    }
}

// Подписка на рассылку
function handleNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input').value;
    if (email) {
        showNotification('Вы успешно подписались на рассылку!');
        event.target.reset();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter();
    updateUserDisplay();
});

// Обновление отображения пользователя
function updateUserDisplay() {
    const userIcon = document.getElementById('user-icon');
    const accountNavLink = document.getElementById('account-nav-link');
    
    if (currentUser && userIcon) {
        userIcon.innerHTML = '<i class="fas fa-user-check"></i>';
        if (accountNavLink) accountNavLink.style.display = 'block';
    }
}