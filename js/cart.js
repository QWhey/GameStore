document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    setupCheckout();
});

function updateCartDisplay() {
    const container = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <h3>Ваша корзина пуста</h3>
                <p>Добавьте игры из каталога, чтобы они появились здесь</p>
            </div>
        `;
        updateSummary(0, 0, 0, 0);
        return;
    }
    
    let cartHTML = '';
    let totalOriginalPrice = 0; // Сумма по старым ценам
    let totalDiscountedPrice = 0; // Сумма по ценам со скидкой
    let totalItems = 0;
    
    cart.forEach(item => {
        // Ищем оригинальную игру для получения информации
        const game = games.find(g => g.id === item.id);
        
        // Используем старую цену для расчета оригинальной стоимости
        const originalPrice = game && game.oldPrice ? game.oldPrice : item.price;
        const currentPrice = item.price; // Цена уже со скидкой
        
        const itemOriginalTotal = originalPrice * item.quantity;
        const itemDiscountedTotal = currentPrice * item.quantity;
        
        totalOriginalPrice += itemOriginalTotal;
        totalDiscountedPrice += itemDiscountedTotal;
        totalItems += item.quantity;
        
        cartHTML += `
            <div class="cart-item">
                ${item.image ? 
                    `<img src="${item.image}" class="cart-item-img" alt="${item.title}">` : 
                    `<div class="cart-item-img image-placeholder">${item.title}</div>`
                }
                <div>
                    <div class="cart-item-title">${item.title}</div>
                    <div>Количество: ${item.quantity}</div>
                    ${game && game.discount > 0 ? 
                        `<div style="color: var(--danger); font-size: 0.9rem;">
                            <span style="text-decoration: line-through; color: #aaa;">${originalPrice} ₽</span>
                            <span style="margin-left: 10px;">Скидка: ${game.discount}%</span>
                        </div>` : 
                        ''
                    }
                </div>
                <div class="cart-item-price">${currentPrice === 0 ? 'Бесплатно' : `${itemDiscountedTotal} ₽`}</div>
                <div class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = cartHTML;
    
    // Расчет скидки (разница между оригинальной ценой и ценой со скидкой)
    const totalDiscount = totalOriginalPrice - totalDiscountedPrice;
    const finalPrice = totalDiscountedPrice;
    
    updateSummary(totalItems, totalOriginalPrice, Math.round(totalDiscount), Math.round(finalPrice));
}

function updateSummary(items = 0, originalPrice = 0, discount = 0, final = 0) {
    const totalItemsEl = document.getElementById('total-items');
    const totalPriceEl = document.getElementById('total-price');
    const totalDiscountEl = document.getElementById('total-discount');
    const finalPriceEl = document.getElementById('final-price');
    
    // Проверяем элементы на существование
    if (totalItemsEl) totalItemsEl.textContent = items;
    if (totalPriceEl) totalPriceEl.textContent = `${originalPrice} ₽`;
    if (totalDiscountEl) totalDiscountEl.textContent = `-${discount} ₽`;
    if (finalPriceEl) finalPriceEl.textContent = `${final} ₽`;
}

// Обновляем функцию addToCart в common.js для сохранения старой цены
function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    // Если игра бесплатная
    if (game.price === 0) {
        if (currentUser) {
            if (!currentUser.purchasedGames) currentUser.purchasedGames = [];
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
            setTimeout(() => {
                window.location.href = '../html/auth.html';
            }, 1500);
        }
        return;
    }

    // Добавление платной игры в корзину
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === gameId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: game.id,
            title: game.title,
            price: game.price, // Цена со скидкой
            originalPrice: game.oldPrice || game.price, // Сохраняем оригинальную цену (старую или текущую)
            discount: game.discount, // Сохраняем процент скидки
            image: game.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    showNotification(`"${game.title}" добавлена в корзину!`);
}

// Добавляем эту функцию в common.js
function removeFromCart(gameId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== gameId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновляем счетчик
    updateCartCounter();
    
    // Если мы на странице корзины, обновляем отображение
    if (window.location.pathname.includes('../html/cart.html')) {
        updateCartDisplay();
    }
    
    // Показываем уведомление
    const game = games.find(g => g.id === gameId);
    if (game) {
        showNotification(`"${game.title}" удалена из корзины`);
    }
}

function setupCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (!checkoutBtn) return;
    
    checkoutBtn.onclick = function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        
        if (cart.length === 0) {
            showNotification('Корзина пуста. Добавьте игры для оформления заказа.', 'error');
            return;
        }
        
        if (!currentUser) {
            showNotification('Для оформления заказа необходимо войти в аккаунт', 'warning');
            window.location.href = '../html/auth.html';
            return;
        }
        
        // Расчет общей суммы по ценам со скидкой
        let totalAmount = 0;
        cart.forEach(item => {
            totalAmount += item.price * item.quantity;
        });
        
        // Добавление игр в библиотеку пользователя
        cart.forEach(item => {
            if (!currentUser.purchasedGames) currentUser.purchasedGames = [];
            if (!currentUser.purchasedGames.includes(item.id)) {
                currentUser.purchasedGames.push(item.id);
            }
        });
        
        // Обновление общей суммы покупок
        currentUser.totalSpent = (currentUser.totalSpent || 0) + totalAmount;
        
        // Сохранение обновленного пользователя
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Обновление списка пользователей
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        showNotification('Заказ оформлен успешно! Игры добавлены в вашу библиотеку!');
        
        // Очистка корзины
        localStorage.removeItem('cart');
        updateCartDisplay();
        updateCartCounter();
    };
}