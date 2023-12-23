let heroes = [
    {
        name: "Axe",
        classHero: "Tank",
        url: "https://api.dicebear.com/7.x/avataaars/svg?seed=2vwb0h"
    },
    {
        name: "Crystal Maiden",
        classHero: "Support",
        url: "https://api.dicebear.com/7.x/avataaars/svg?seed=2cncp"
    },
    {
        name: "Capitan America",
        classHero: "Avengers",
        url: "https://api.dicebear.com/7.x/avataaars/svg?seed=dl3my"
    }
];

//

function generateId() {
    const characters = "abcdefghijklmnopqrstuvwxyz",
        numbers = "0123456789";
    let id = "";

    for (let i = 0; i < 24; i++) {
        if (i % 2 === 0) {
            id += numbers.charAt(Math.floor(Math.random() * numbers.length));
        } else {
            id += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
    }

    return `${id}`;
}

const handleDelete = (cardButton) => {
    const cardId = cardButton.dataset.id;
    heroes = heroes.filter((card) => cardId !== card._id);
    displayHeroes();
};

const handleChangeAvatar = (cardButton) => {
    const cardId = cardButton.dataset.id;
    heroes = heroes.map((card) => {
        return cardId === card._id ? {...card, url: ""} : card;
    });
    displayHeroes();
}

const heroesContainer = document.getElementById("heroesContainer");

function displayHeroes() {
    // Очищаем текущее содержимое
    heroesContainer.innerHTML = "";

    for (let i = 0; i < heroes.length; i += 3) {
        const heroesSlice = heroes.slice(i, i + 3);
        const row = document.createElement("div");
        row.classList.add("row");
        heroesContainer.appendChild(row);

        for (let card of heroesSlice) {
            let heroDiv = document.createElement("div");
            heroDiv.classList.add("card");
            card.url = card.url
                ? card.url
                : `https://api.dicebear.com/7.x/avataaars/svg?seed=${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}`;
            card._id = card._id ? card._id : generateId();
            heroDiv.innerHTML = `
<img
    src='${card.url}'
    class="rounded-circle shadow-1-strong me-3"
    alt="avatar"
    width="65"
    height="65"
/>
<h3>${card.name}</h3>
<p>${card.classHero}</p>
<div class="buttons">
<button data-id="${card._id}"  onclick="handleDelete(this)">Delete</button>
<button data-id="${card._id}" onclick="handleChangeAvatar(this)">Change Avatar</button>
</div>`;

            // Добавляем карточку героя в контейнер
            row.appendChild(heroDiv);
        }
    }
}

// если в начале работы приложения массив heroes имеет данные, то выводим их на экран
heroes.length > 0 && displayHeroes();

function addHero() {
    /* Ищем поля ввода */
    const nameInput = document.getElementById("heroName");
    const classInput = document.getElementById("heroClass");
    const newHeroName = nameInput.value;
    const newHeroClass = classInput.value;

    newHeroName &&
    newHeroClass &&
    (heroes = [...heroes, {name: newHeroName, classHero: newHeroClass}]);

    // Вызываем написанную функцию
    displayHeroes();

    /*
        Очищаем поля ввода – чтобы пользователю было удобнее
        сразу иметь возможность вводить данные нового персонажа
    */
    nameInput.value = "";
    classInput.value = "";
}

document.getElementById("addButton").addEventListener("click", addHero);
