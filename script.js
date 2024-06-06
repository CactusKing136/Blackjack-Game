let player = {
    name: "",
    credits: 200
}

let cards = []
let sum = 0
let compSum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let creditsBet = 0
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let stickEl = document.querySelector(".stick-btn")
let compSumEl = document.getElementById("comp-sum-el")
let compCardsEl = document.getElementById("comp-cards-el")
let nameBtnEl = document.querySelector(".name-input-btn")
let nameInputEl = document.querySelector(".name-input")
let nameCreditsEl = document.querySelector(".name-credits")
let newGameBtnEl = document.querySelector(".new-game-btn")
let gameButtonsEl = document.querySelector(".game-buttons")
let betButtonEl = document.querySelector(".bet-input-btn")
let betInputEl = document.querySelector(".bet-input")
let betEl = document.querySelector(".bet")
let creditsEl = document.querySelector(".credits")
let nameInputDiv = document.querySelector(".name-input-div")
let undoBtnEl = document.querySelector(".undo-bet")

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }

    messageEl.textContent = message

    gameButtonsEl.innerHTML = `<button class="game-button hit-me-btn" onclick="newCard()">HIT ME!</button>
    <button class="game-button stick-btn" class="stick-btn">STICK!</button>`

    if (isAlive === false || hasBlackJack === true) {
        gameButtonsEl.innerHTML = ""
        newGameBtnEl.innerHTML = `<button class="game-button" onclick="startGame()">NEW GAME</button>`
        
    }
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

nameBtnEl.addEventListener("click", () => {
    if (nameInputEl.value != "") {
        player.name = nameInputEl.value
        nameCreditsEl.textContent = `${player.name}: £${player.credits}`
        nameInputEl.value = ""
    }
})

newGameBtnEl.addEventListener("click", () => {
    newGameBtnEl.innerHTML = ""
})

betButtonEl.addEventListener("click", () => {
    if (betInputEl.value != "") {
        creditsBet += parseInt(betInputEl.value)
        betEl.textContent = `Bet: £${creditsBet}`
        player.credits -= parseInt(betInputEl.value)
        betInputEl.value = ""
        nameCreditsEl.textContent = `${player.name}: £${player.credits}`
    }
})

undoBtnEl.addEventListener("click", () => {
    player.credits += creditsBet
    creditsBet = 0
    betEl.textContent = `Bet: £${creditsBet}`
    nameCreditsEl.textContent = `${player.name}: £${player.credits}`
})





