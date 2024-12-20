class Card {
    constructor(suit, rank, value){
        this.suit = suit;
        this.rank = rank;
        this.value = Array.isArray(value) ? value[0] : value; 
        // Default to first value for Ace
    }

    displayCard() {
        console.log(`Suit: ${this.suit}`);
        console.log(`Rank: ${this.rank}`);
        console.log(`Value: ${this.value}`)
    }
}

const Suits = {
    Spades: "spades",
    Hearts: "hearts",
    Diamonds: "diamonds",
    Clubs: "clubs",
};

const Ranks = {
    r2: "2", 
    r3: "3",
    r4: "4",
    r5: "5", 
    r6: "6",
    r7: "7",
    r8: "8",
    r9: "9",
    r10: "10",
    Jack: "jack",
    Queen: "queen",
    King: "king",
    Ace: "1",
}

const Values = {
    r2: "2", 
    r3: "3",
    r4: "4",
    r5: "5", 
    r6: "6",
    r7: "7",
    r8: "8",
    r9: "9",
    r10: "10",
    Jack: "11",
    Queen: "12",
    King: "13",
    Ace: ["1", "11"],
}

const deck = [];

for (const suit in Suits) {
    for (const rank in Ranks) {
        const card = new Card(Suits[suit], Ranks[rank], Values[rank]);
        deck.push(card);
        }
}


// // Display all cards in the deck
// for (const card of deck) {
//     card.displayCard(); 
// }


class Player {
    constructor(name) {
        this.playerName = name;
        this.playerCards = [];
    }

    addCard(card) {
        this.playerCards.push(card);
    }

    clearHand() {
        this.playerCards = [];
    }

    getHandSize() {
        return this.playerCards.length;
    }

    displayHand() {
        console.log(`${this.playerName}'s hand:`);
        this.playerCards.forEach(card => card.displayCard());
    }
}

function dealCard(deck, players, cardsPerPlayer) {
    //shuffle deck
    const shuffledDeck = [...deck].sort(() => 0.5 - Math.random());
    //deal card to each player
    for (let i = 0; i < cardsPerPlayer; i++) {
        for (const player of players) {
            if (shuffledDeck.length > 0) {
                player.addCard(shuffledDeck.shift());
                console.log(`${cardsPerPlayer} have been delt`)
            }
        }
    }
    return { //return players and the
        players: players,
        remainingDeck: shuffledDeck
    };
}





const player1 = new Player("enzo");
const player2 = new Player("hieu");
const player3 = new Player("tml");

const players = [player1, player2, player3]
//show hand
// player3.displayHand();


currentPlayIndex = 0;

function nextTurn() {
    currentPlayIndex = (currentPlayIndex + 1) % players.length;
    console.log(`Currently player ${currentPlayIndex}'s turn`)
}
