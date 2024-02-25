//Skapa lämpliga klasser för Card, Player och Deck. Använd dig av ES6 Classes
//Skapa en datastruktur med en “normal/poker” kortlek med 52 kort, inga jokrar. Skriv ut kortleken i konsollen, varje kort ska innehålla sin färg, sitt namn och sitt värde (så att det går att räkna med korten). Blanda kortleken, skriv ut den blandade kortleken i konsollen.

class Card {
    constructor(suit, name, value) {
        this.suit = suit;
        this.name = name;
        this.value = value;
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    addCardToHand(card) {
        this.hand.push(card);
    }

    getHandValue() {
        return this.hand.reduce((total, card) => total + card.value, 0);
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.createDeck();
        this.shuffleDeck();
    }

    createDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

        for (let suit of suits) {
            for (let i = 0; i < names.length; i++) {
                let value = (i < 9) ? i + 2 : 10; // Värden för kort 2-10 är deras ansiktsvärden, Jack, Queen, King har värde 10, och Ace har värde 11
                this.cards.push(new Card(suit, names[i], value));
            }
            
        }
    }
    

    shuffleDeck() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    dealCard() {
        return this.cards.pop();
    }
}



// Skapar en kortlek och blandar den
const deck = new Deck();
 // skriver ut alla 52 cards
 console.log(deck.cards);

// Skapar två nya spelare
const slim = new Player('Slim');
const luke = new Player('Luke');

// Delar ut 5 kort vardera till de spelarna
for (let i = 0; i < 5; i++) {
    slim.addCardToHand(deck.dealCard());
    luke.addCardToHand(deck.dealCard());
}

// Skriver ut kortleken
console.log("Deck (now with " + deck.cards.length + " cards):");
console.log(deck.cards);

// Skriver ut spelarna och deras händer
console.log(slim.name + "'s hand:");
console.log(slim.hand);
console.log("Totalt value: " + slim.getHandValue());

console.log(luke.name + "'s hand:");
console.log(luke.hand);
console.log("Totalt value: " + luke.getHandValue());


//spelarna slänger 2 kort var i en kasthög. Spelarna drar 2 nya kort var ur kortleken. Skriv ut kortleken (nu med 38 kort kvar) och spelarna (med 5 kort var) i konsollen. Skriver också ut spelarnas händers sammanlagda numeriska värde.

// en funktion låten spelarna lägga bort 2 kort var i en kasthög
const discardPile = []; // definierar kasthög

function discard(player, count) {
    for (let i = 0; i < count; i++) {
        const discardedCard = player.hand.pop();
        discardPile.push(discardedCard);
    }
}
// en funktion låter spelarna lägga bort sina kort i en kasthög
discard(slim, 2);
discard(luke, 2);

// en funktion för att låta spelarna dra nya kort var ur kortleken
function draw(player, count) {
    for (let i = 0; i < count; i++) {
        if (deck.cards.length > 0) {
            player.addCardToHand(deck.dealCard());
        } else {
            console.log("Deck is empty.");
        }
    }
}
// spelarna drar 2 nya kort var ur kortleken
draw(slim, 2);
draw(luke, 2);

// Skriver ut kortleken
console.log("Deck (now with " + deck.cards.length + " cards):");
console.log(deck.cards);

// Skriver ut spelarna och deras händer
console.log(slim.name + "'s hand:");
console.log(slim.hand);
console.log("Totalt value: " + slim.getHandValue());

console.log(luke.name + "'s hand:");
console.log(luke.hand);
console.log("Totalt value: " + luke.getHandValue());


// spelarna slänger alla sina kort i kasthögen
function discardAll(player) {
    const discardedCards = player.hand.splice(0, player.hand.length);
    discardPile.push(...discardedCards);
}

discardAll(slim);
discardAll(luke);

// Flytta alla kort från kasthögen tillbaka till kortleken
deck.cards.push(...discardPile);
discardPile.length = 0;

// Blanda kortleken igen
deck.shuffleDeck();

// Skriv ut den blandade kortleken i konsollen
console.log("Shuffled deck (now with " + deck.cards.length + " cards with discardpile added):");
console.log(deck.cards);