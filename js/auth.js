document.addEventListener('DOMContentLoaded', function() {
    updateUserDisplay();
});

function switchTab(tabName) {
    // Обновление вкладок
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    
    document.querySelector(`.auth-tab[onclick*="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-form`).classList.add('active');
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        showNotification('Пожалуйста, заполните все поля', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showNotification(`Добро пожаловать, ${user.username}!`, 'success');
        setTimeout(() => {
            window.location.href = '../html/account.html';
        }, 1000);
    } else {
        showNotification('Неверный email или пароль', 'error');
    }
}

function register() {
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
    
    // Проверка существующего пользователя
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        showNotification('Пользователь с таким email уже существует', 'error');
        return;
    }
    
    // Создание нового пользователя
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
    setTimeout(() => {
        window.location.href = '../html/account.html';
    }, 1000);
}

function forgotPassword() {
    showNotification('Функция восстановления пароля временно недоступна', 'warning');
}

function socialLogin(provider) {
    showNotification(`Вход через ${provider} временно недоступен`, 'warning');
}