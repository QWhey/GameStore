// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCarouselIndex = 0;
let currentGameDetail = null;
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;


// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация навигации
    initNavigation();
    
    // Заполнение главной страницы
    populateCarousel();
    populateFreeGames();
    populateDiscountGames();
    
    // Заполнение каталога
    populateCatalog();
    
    // Обновление корзины
    updateCart();
    
    // Настройка поиска
    setupSearch();
    
    // Настройка фильтров
    setupFilters();
    
    // Настройка обработчиков событий
    setupEventHandlers();
    
    // Настройка авторизации
    setupAuth();
    
    // Обновление отображения пользователя
    updateUserDisplay();
    
    // Начальное отображение страницы
    showPage('home');
});

// Инициализация навигации
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .logo, .cart-icon');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // Обновление активной ссылки в навигации
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            if (this.classList.contains('nav-link')) {
                this.classList.add('active');
            }
        });
    });
    
    // Обработка клика на иконку пользователя
    document.getElementById('user-icon').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentUser) {
            showPage('account');
            loadAccountPage();
        } else {
            showPage('auth');
        }
    });
}

// Показать страницу
function showPage(page) {
    // Скрыть все страницы
    document.querySelectorAll('.page').forEach(pageEl => {
        pageEl.classList.remove('active');
    });
    
    // Показать выбранную страницу
    document.getElementById(page).classList.add('active');
    
    // Если открывается корзина, обновить ее содержимое
    if (page === 'cart') {
        updateCartDisplay();
    }
}

// Обновление отображения пользователя
function updateUserDisplay() {
    const userIcon = document.querySelector('#user-icon i');
    const accountNavLink = document.getElementById('account-nav-link');
    
    if (currentUser) {
        userIcon.className = 'fas fa-user-check';
        userIcon.style.color = 'var(--success)';
        accountNavLink.style.display = 'block';
        
        // Заполняем данные пользователя из изображения
        document.getElementById('account-username').textContent = currentUser.username || 'ОМБУ';
        document.getElementById('account-email').textContent = currentUser.email || 'Dohseidhi@mail.ru';
        document.getElementById('account-joindate').textContent = currentUser.joinDate || '14.12.2025';
        document.getElementById('account-games-count').textContent = currentUser.purchasedGames ? currentUser.purchasedGames.length : 3;
    } else {
        userIcon.className = 'fas fa-user';
        userIcon.style.color = '';
        accountNavLink.style.display = 'none';
    }
}

// Настройка авторизации
function setupAuth() {
    // Переключение между вкладками входа и регистрации
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab');
            
            // Убираем активный класс со всех вкладок
            document.querySelectorAll('.auth-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // Добавляем активный класс текущей вкладке
            this.classList.add('active');
            
            // Скрываем все формы
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            
            // Показываем нужную форму
            document.getElementById(`${tabType}-form`).classList.add('active');
        });
    });
    
    // Кнопка входа
    document.getElementById('login-btn').addEventListener('click', function() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            showNotification('Пожалуйста, заполните все поля', 'error');
            return;
        }
        
        // Проверяем существующего пользователя
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            showNotification(`Добро пожаловать, ${user.username}!`, 'success');
            showPage('home');
            updateUserDisplay();
        } else {
            showNotification('Неверный email или пароль', 'error');
        }
    });
    
    // Кнопка регистрации
    document.getElementById('register-btn').addEventListener('click', function() {
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        if (!username || !email || !password || !confirmPassword) {
            showNotification('Пожалуйста, заполните все поля', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('Пароли не совпадают', 'error');
            return;
        }
        
        if (!document.getElementById('terms').checked) {
            showNotification('Необходимо согласиться с условиями', 'error');
            return;
        }
        
        // Проверяем, нет ли уже пользователя с таким email
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
            showNotification('Пользователь с таким email уже существует', 'error');
            return;
        }
        
        // Создаем нового пользователя
        const newUser = {
            id: Date.now(),
            username: username,
            email: email,
            password: password,
            joinDate: new Date().toLocaleDateString('ru-RU'),
            purchasedGames: [],
            totalSpent: 0
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        showNotification(`Аккаунт успешно создан! Добро пожаловать, ${username}!`, 'success');
        showPage('home');
        updateUserDisplay();
    });
    
    // Кнопка "Забыли пароль"
    document.getElementById('forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Функция восстановления пароля временно недоступна', 'warning');
    });
    
    // Кнопка выхода из аккаунта
    document.getElementById('logout-btn').addEventListener('click', function() {
        if (confirm('Вы уверены, что хотите выйти из аккаунта?')) {
            currentUser = null;
            localStorage.removeItem('currentUser');
            showNotification('Вы успешно вышли из аккаунта', 'success');
            showPage('home');
            updateUserDisplay();
        }
    });
}

// Загрузка страницы аккаунта
function loadAccountPage() {
    if (!currentUser) return;
    
    // Заполняем информацию об аккаунте
    document.getElementById('account-username').textContent = currentUser.username || 'ОМБУ';
    document.getElementById('account-email').textContent = currentUser.email || 'Dohseidhi@mail.ru';
    document.getElementById('account-joindate').textContent = currentUser.joinDate || '14.12.2025';
    document.getElementById('account-games-count').textContent = currentUser.purchasedGames ? currentUser.purchasedGames.length : 3;
    document.getElementById('account-total-spent').textContent = currentUser.totalSpent ? `${currentUser.totalSpent} ₽` : '0 ₽';
    
    // Заполняем список приобретенных игр
    const purchasedGamesContainer = document.getElementById('purchased-games');
    
    if (currentUser.purchasedGames && currentUser.purchasedGames.length > 0) {
        purchasedGamesContainer.innerHTML = '';
        
        currentUser.purchasedGames.forEach(gameId => {
            const game = games.find(g => g.id === gameId);
            if (game) {
                const gameCard = document.createElement('div');
                gameCard.className = 'game-card game-card-owned';
                gameCard.innerHTML = `
                    <div class="owned-badge">Приобретено</div>
                    ${game.image ? 
                        `<img src="${game.image}" alt="${game.title}" loading="lazy">` : 
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
                purchasedGamesContainer.appendChild(gameCard);
            }
        });
    }
}

// Заполнение карусели
function populateCarousel() {
    const carousel = document.querySelector('.carousel');
    const indicators = document.querySelector('.carousel-indicators');
    
    // Очистка
    carousel.innerHTML = '';
    indicators.innerHTML = '';
    
    // Получение популярных игр
    const popularGames = games.filter(game => game.isPopular).slice(0, 5);
    
    // Если нет популярных игр, используем первые 5
    if (popularGames.length === 0) {
        popularGames.push(...games.slice(0, 5));
    }
    
    // Добавление слайдов
    popularGames.forEach((game, index) => {
        // Создание слайда
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
                <button class="btn add-to-cart-carousel" data-id="${game.id}" style="margin-top: 15px;">Добавить в корзину</button>
            </div>
        `;
        carousel.appendChild(slide);
        
        // Создание индикатора
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.setAttribute('data-index', index);
        indicator.addEventListener('click', function() {
            currentCarouselIndex = parseInt(this.getAttribute('data-index'));
            updateCarousel();
        });
        indicators.appendChild(indicator);
    });
    
    // Настройка кнопок навигации карусели
    document.querySelector('.carousel-prev').addEventListener('click', function() {
        currentCarouselIndex = currentCarouselIndex > 0 ? currentCarouselIndex - 1 : popularGames.length - 1;
        updateCarousel();
    });
    
    document.querySelector('.carousel-next').addEventListener('click', function() {
        currentCarouselIndex = currentCarouselIndex < popularGames.length - 1 ? currentCarouselIndex + 1 : 0;
        updateCarousel();
    });
    
    // Добавление обработчиков для кнопок в карусели
    setTimeout(() => {
        document.querySelectorAll('.add-to-cart-carousel').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const gameId = parseInt(this.getAttribute('data-id'));
                addToCart(gameId);
            });
        });
        
        // Добавление обработчиков для открытия модального окна при клике на слайд
        document.querySelectorAll('.carousel-item').forEach((slide, index) => {
            slide.addEventListener('click', function(e) {
                if (!e.target.classList.contains('btn')) {
                    const game = popularGames[index];
                    showGameModal(game);
                }
            });
        });
    }, 100);
    
    // Автоматическое переключение слайдов
    setInterval(() => {
        currentCarouselIndex = currentCarouselIndex < popularGames.length - 1 ? currentCarouselIndex + 1 : 0;
        updateCarousel();
    }, 5000);
}

// Обновление карусели
function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    const indicators = document.querySelectorAll('.indicator');
    const slideWidth = 100; // 100% на слайд
    
    // Перемещение карусели
    carousel.style.transform = `translateX(-${currentCarouselIndex * slideWidth}%)`;
    
    // Обновление индикаторов
    indicators.forEach((indicator, index) => {
        if (index === currentCarouselIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Заполнение бесплатных игр
function populateFreeGames() {
    const freeGamesContainer = document.getElementById('free-games');
    freeGamesContainer.innerHTML = '';
    
    const freeGames = games.filter(game => game.isFree).slice(0, 8);
    
    // Если нет бесплатных игр, используем первые 8 с ценой 0
    if (freeGames.length === 0) {
        freeGames.push(...games.filter(game => game.price === 0).slice(0, 8));
    }
    
    freeGames.forEach(game => {
        const gameCard = createGameCard(game);
        freeGamesContainer.appendChild(gameCard);
    });
}

// Заполнение игр со скидками
function populateDiscountGames() {
    const discountGamesContainer = document.getElementById('discount-games');
    discountGamesContainer.innerHTML = '';
    
    const discountGames = games.filter(game => game.discount > 0 && !game.isFree).slice(0, 8);
    
    discountGames.forEach(game => {
        const gameCard = createGameCard(game);
        discountGamesContainer.appendChild(gameCard);
    });
}

// Заполнение каталога
function populateCatalog(filteredGames = null) {
    const catalogContainer = document.getElementById('catalog-games');
    catalogContainer.innerHTML = '';
    
    const gamesToShow = filteredGames || games;
    
    if (gamesToShow.length === 0) {
        catalogContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #aaa;">Игры не найдены</p>';
        return;
    }
    
    gamesToShow.forEach(game => {
        const gameCard = createGameCard(game);
        catalogContainer.appendChild(gameCard);
    });
}

// Создание карточки игры
function createGameCard(game) {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    gameCard.setAttribute('data-id', game.id);
    
    // Проверяем, есть ли игра в библиотеке пользователя
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
            `<img src="${game.image}" alt="${game.title}" loading="lazy">` : 
            `<div class="image-placeholder">${game.title}</div>`
        }
        <div class="game-card-content">
            <h3 class="game-card-title">${game.title}</h3>
            
            <div class="game-card-meta">
                ${priceHtml}
            </div>
            
            <button class="btn add-to-cart" data-id="${game.id}" style="width: 100%;" ${isOwned ? 'disabled' : ''}>
                ${isOwned ? 'В библиотеке' : (game.price === 0 ? 'Добавить в библиотеку' : 'Добавить в корзину')}
            </button>
        </div>
    `;
    
    // Добавление обработчика для кнопки "Добавить в корзину"
    if (!isOwned) {
        gameCard.querySelector('.add-to-cart').addEventListener('click', function(e) {
            e.stopPropagation();
            addToCart(game.id);
        });
    }
    
    // Добавление обработчика для открытия модального окна при клике на карточку
    gameCard.addEventListener('click', function(e) {
        if (!e.target.classList.contains('btn')) {
            showGameModal(game);
        }
    });
    
    return gameCard;
}

// Показать модальное окно с детальной информацией об игре
function showGameModal(game) {
    currentGameDetail = game;
    const modal = document.getElementById('game-modal');
    
    // Заполнение данных
    document.getElementById('modal-title').textContent = game.title;
    document.getElementById('modal-genre').textContent = game.detailedInfo.genre || "Жанр не указан";
    document.getElementById('modal-description').textContent = game.description;
    
    // Скриншоты
    const screenshotsContainer = document.getElementById('modal-screenshots');
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
        // Добавляем 3 заглушки для скриншотов
        for (let i = 1; i <= 3; i++) {
            const img = document.createElement('div');
            img.className = 'screenshot image-placeholder';
            img.textContent = `Скриншот ${i}`;
            screenshotsContainer.appendChild(img);
        }
    }
    
    // Видео
    const videoContainer = document.getElementById('modal-video');
    if (game.detailedInfo.video) {
        videoContainer.innerHTML = `<iframe src="${game.detailedInfo.video}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else {
        videoContainer.innerHTML = '<div class="image-placeholder">Видео превью</div>';
    }
    
    // Информация об игре
    document.getElementById('modal-developer').textContent = game.detailedInfo.developer || "Не указан";
    document.getElementById('modal-publisher').textContent = game.detailedInfo.publisher || "Не указан";
    document.getElementById('modal-release-date').textContent = game.detailedInfo.releaseDate || "Не указана";
    
    // Системные требования
    const requirementsContainer = document.getElementById('modal-requirements');
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
    
    // Цена
    document.getElementById('modal-price').textContent = game.price === 0 ? 'Бесплатно' : `${game.price} ₽`;
    
    // Кнопка добавления в корзину
    const addToCartBtn = document.getElementById('modal-add-to-cart');
    
    // Проверяем, есть ли игра в библиотеке пользователя
    let isOwned = false;
    if (currentUser && currentUser.purchasedGames) {
        isOwned = currentUser.purchasedGames.includes(game.id);
    }
    
    if (isOwned) {
        addToCartBtn.textContent = 'В библиотеке';
        addToCartBtn.disabled = true;
    } else {
        addToCartBtn.textContent = game.price === 0 ? 'Добавить в библиотеку' : 'Добавить в корзину';
        addToCartBtn.disabled = false;
        addToCartBtn.onclick = function() {
            addToCart(game.id);
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
    }
    
    // Показать модальное окно
    modal.classList.add('active');
    
    // Блокировка прокрутки body
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
document.getElementById('modal-close').addEventListener('click', function() {
    const modal = document.getElementById('game-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Закрытие модального окна при клике вне его
document.getElementById('game-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Добавление в корзину
function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    
    // Если игра бесплатная, добавляем сразу в библиотеку
    if (game.price === 0) {
        if (currentUser) {
            if (!currentUser.purchasedGames.includes(gameId)) {
                currentUser.purchasedGames.push(gameId);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Обновляем всех пользователей
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex(u => u.id === currentUser.id);
                if (userIndex !== -1) {
                    users[userIndex] = currentUser;
                    localStorage.setItem('users', JSON.stringify(users));
                }
                
                // Обновляем отображение
                populateCatalog();
                populateFreeGames();
                populateDiscountGames();
                
                showNotification(`"${game.title}" добавлена в вашу библиотеку!`);
            } else {
                showNotification(`"${game.title}" уже есть в вашей библиотеке`, 'warning');
            }
        } else {
            showNotification('Для добавления бесплатной игры необходимо войти в аккаунт', 'warning');
            showPage('auth');
        }
        return;
    }
    
    // Проверка, есть ли уже игра в корзине
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
    
    // Сохранение в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновление отображения корзины
    updateCart();
    
    // Показать уведомление
    showNotification(`"${game.title}" добавлена в корзину!`);
}

// Обновление корзины
function updateCart() {
    // Обновление счетчика в шапке
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(countEl => {
        countEl.textContent = totalItems;
    });
}

// Обновление отображения корзины
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.querySelector('.cart-summary');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <h3>Ваша корзина пуста</h3>
                <p>Добавьте игры из каталога, чтобы они появились здесь</p>
            </div>
        `;
        
        // Обновление итоговой суммы
        cartSummary.querySelectorAll('.cart-summary-row')[0].innerHTML = '<span>Товары (0)</span><span>0 ₽</span>';
        cartSummary.querySelectorAll('.cart-summary-row')[1].innerHTML = '<span>Скидка</span><span>0 ₽</span>';
        cartSummary.querySelector('.cart-summary-total').textContent = '0 ₽';
        
        return;
    }
    
    // Отображение товаров в корзине
    let cartHTML = '';
    let totalPrice = 0;
    let totalItems = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
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
                </div>
                <div class="cart-item-price">${item.price === 0 ? 'Бесплатно' : `${itemTotal} ₽`}</div>
                <div class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    
    // Расчет скидки (10% от общей суммы, если больше 0)
    const discount = totalPrice > 0 ? Math.round(totalPrice * 0.1) : 0;
    const finalPrice = totalPrice - discount;
    
    // Обновление итоговой суммы
    cartSummary.querySelectorAll('.cart-summary-row')[0].innerHTML = `<span>Товары (${totalItems})</span><span>${totalPrice} ₽</span>`;
    cartSummary.querySelectorAll('.cart-summary-row')[1].innerHTML = `<span>Скидка</span><span>-${discount} ₽</span>`;
    cartSummary.querySelector('.cart-summary-total').textContent = `${finalPrice} ₽`;
    
    // Добавление обработчиков для кнопок удаления
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            removeFromCart(itemId);
        });
    });
}

// Удаление из корзины
function removeFromCart(gameId) {
    cart = cart.filter(item => item.id !== gameId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartDisplay();
    
    // Показать уведомление
    const game = games.find(g => g.id === gameId);
    if (game) {
        showNotification(`"${game.title}" удалена из корзины`);
    }
}

// Настройка поиска
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    
    // Поиск из шапки
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length > 0) {
            // Переход на страницу каталога с поиском
            showPage('catalog');
            
            // Применение поиска
            const filteredGames = games.filter(game => 
                game.title.toLowerCase().includes(searchTerm) ||
                game.description.toLowerCase().includes(searchTerm) ||
                (game.detailedInfo.genre && game.detailedInfo.genre.toLowerCase().includes(searchTerm))
            );
            
            populateCatalog(filteredGames);
        } else {
            // Если поиск пустой, показать все игры
            populateCatalog();
        }
    });
}

// Настройка фильтров
function setupFilters() {
    const genreFilter = document.getElementById('genre-filter');
    
    const applyFilters = () => {
        const genre = genreFilter.value;
        
        let filteredGames = games;
        
        if (genre) {
            filteredGames = filteredGames.filter(game => game.genre === genre);
        }
        
        populateCatalog(filteredGames);
    };
    
    genreFilter.addEventListener('change', applyFilters);
}

// Настройка обработчиков событий
function setupEventHandlers() {
    // Форма подписки
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        if (email) {
            showNotification('Вы успешно подписались на рассылку!');
            this.reset();
        }
    });
    
    // Кнопка оформления заказа
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Корзина пуста. Добавьте игры для оформления заказа.', 'error');
            return;
        }
        
        if (!currentUser) {
            showNotification('Для оформления заказа необходимо войти в аккаунт', 'warning');
            showPage('auth');
            return;
        }
        
        // Расчет общей суммы
        let totalAmount = 0;
        cart.forEach(item => {
            totalAmount += item.price * item.quantity;
        });
        
        // Добавление игр в библиотеку пользователя
        cart.forEach(item => {
            if (!currentUser.purchasedGames.includes(item.id)) {
                currentUser.purchasedGames.push(item.id);
            }
        });
        
        // Обновление общей суммы покупок
        currentUser.totalSpent = (currentUser.totalSpent || 0) + totalAmount;
        
        // Сохранение обновленного пользователя
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Обновление всех пользователей
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        showNotification('Заказ оформлен успешно! Игры добавлены в вашу библиотеку!');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        updateCartDisplay();
        
        // Обновление отображения каталога (чтобы кнопки стали "В библиотеке")
        populateCatalog();
        populateFreeGames();
        populateDiscountGames();
    });
}

// Показать уведомление
function showNotification(message, type = 'success') {
    // Создание элемента уведомления
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'error' ? 'error' : type === 'warning' ? 'warning' : ''}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Удаление уведомления через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}