# TestShop — Frontend

Frontend частина тестового завдання **TestShop** — простий e-commerce демо-додаток, побудований на **React + TypeScript**, який працює з **Rails API backend**.

Проєкт демонструє:

* авторизацію користувачів
* роботу з cookies / сесіями
* отримання списку товарів
* створення замовлень
* базову навігацію між сторінками

---

## 🚀 Live Demo

🔗 **Frontend (Netlify)**
[https://brilliant-choux-11b80d.netlify.app/](https://brilliant-choux-11b80d.netlify.app/)

🔗 **Backend API (Render)**
[https://solowey-consulting-test-task-backend.onrender.com](https://solowey-consulting-test-task-backend.onrender.com)

---

## 🧑‍💻 Test Credentials

Для демо можна використати тестового користувача:

```
Email: john@example.com
Password: password
```

> Або зареєструвати нового користувача через форму логіну.

---

## 🛠️ Tech Stack

* **React**
* **TypeScript**
* **Vite**
* **React Router**
* **Fetch API**
* **CSS / SCSS**
* **Netlify** — хостинг frontend
* **Rails API + Devise** — backend (cookies auth)

---

## 🔐 Authentication

* Авторизація реалізована через **cookie-based sessions**
* Використовується `credentials: "include"` для HTTP-запитів
* CORS налаштований на backend для конкретного Netlify домену

---

## ⚙️ Environment Variables

Для локального запуску створи `.env` файл:

```env
VITE_API_URL=http://localhost:3000
```

Для production (Netlify):

```env
VITE_API_URL=https://solowey-consulting-test-task-backend.onrender.com
```

---

## 🧪 Local Development

1. Клонувати репозиторій:

```bash
git clone https://github.com/your-username/testshop-frontend.git
cd testshop-frontend
```

2. Встановити залежності:

```bash
npm install
```

3. Запустити dev сервер:

```bash
npm run dev
```

Frontend буде доступний за адресою:
👉 `http://localhost:5173`

---

## 🏗️ Build

```bash
npm run build
```

---

## 📌 Notes

* Проєкт створений у рамках тестового завдання
* Основний фокус — **функціональність**, а не дизайн
* Реалізовано повний flow: login → items → orders
* Backend та frontend розгорнуті окремо

---

## 👤 Author

**Dmytro Lymar**
Frontend / Fullstack Developer

* GitHub: [https://github.com/DmytroLymar](https://github.com/DmytroLymar)
* LinkedIn: [https://www.linkedin.com/in/dmytro-lymar-47338a38a/]

---
