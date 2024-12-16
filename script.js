class Card {
    constructor(suit, rank){
        this.suit = suit;
        this.rank = rank;
    }

    displayCard() {
        console.log(`Suit: ${this.suit}`);
        console.log(`Rank: ${this.rank}`);
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

const deck = [];

for (const suit in Suits) {
    for (const rank in Ranks) {
        const card = new Card(Suits[suit], Ranks[rank]);
        deck.push(card);
    }
}

for (card in deck) {
    console.log(card);
}