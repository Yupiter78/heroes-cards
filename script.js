let heroes = [
    ["Axe", "Tank"],
    ["Crystal Maiden", "Support"],
    ["Crystal", "Supp"]
];

const handleDelete = (cardButton) => {
    const hero = cardButton.dataset.hero;
    const classes = cardButton.dataset.classes;
    const removeSpaces = (str) => str.split(" ").join("");
    const cardId = removeSpaces(hero) + removeSpaces(classes);
    heroes = heroes.filter((card) => {
        return cardId !== removeSpaces(card[0]) + removeSpaces(card[1]);
    });
    displayHeroes();
};

const heroesContainer = document.getElementById("heroesContainer");

function displayHeroes() {
    // Очищаем текущее содержимое
    heroesContainer.innerHTML = "";

    for (let i = 0; i < heroes.length; i += 3) {
        const heroesSlice = heroes.slice(i, i + 3);
        const row = document.createElement("div");
        row.classList.add("row");
        heroesContainer.appendChild(row);

        for (const [hero, classes] of heroesSlice) {
            let heroDiv = document.createElement("div");
            heroDiv.classList.add("card");
            const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${(
                Math.random() + 1
            )
                .toString(36)
                .substring(7)}`;
            heroDiv.innerHTML = `
<img
    src='${avatarUrl}'
    class="rounded-circle shadow-1-strong me-3"
    alt="avatar"
    width="65"
    height="65"
/>
<h3>${hero}</h3>
<p>${classes}</p>
<button data-hero="${hero}" data-classes="${classes}" onclick="handleDelete(this)">Delete</button>`;

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

    /* Кидаем новые данные из инпутов в массивы с именами и классами */

    newHeroName &&
        newHeroClass &&
        (heroes = [...heroes, [newHeroName, newHeroClass]]);
    /*
        Используем функцию, которую мы подготовили в прошлом уроке,
        чтобы обновить список героев на странице
    */

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
