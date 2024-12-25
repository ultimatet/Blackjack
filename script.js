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

class Card {
    constructor(suit, rank, value){
        this.suit = suit;
        this.rank = rank;
        this.value = Array.isArray(value) ? value[0] : value; 
        // Default to first value for Ace
    }
    isAce() {
        return this.rank === "1";
    }

    displayCard() {
        console.log(`Suit: ${this.suit}`);
        console.log(`Rank: ${this.rank}`);
        
    }
}


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
        console.log(`Current card number: ${this.playerCards.length}`); 
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
    return { 
        players: players,
        remainingDeck: shuffledDeck
    };
}


class Game {
    constructor(players) {
        this.players = players;
        this.currentPlayerIndex = 0;
        this.gameState = 'ready';
        this.deck = this.createInitialDeck(); // We'll create the deck when game is initialized
    }
    
    createInitialDeck() {
        const newDeck = [];
        for (const suit in Suits) {
            for (const rank in Ranks) {
                const card = new Card(Suits[suit], Ranks[rank], Values[rank]);
                newDeck.push(card);
            }
        }
        return newDeck;
    }

    startGame() {
        // Before dealing, let's make sure the game isn't already in progress
        if (this.gameState !== 'ready') {
            console.log('Cannot start game - game is already in progress or has ended');
            return;
        }

        this.gameState = 'playing';
        
        console.log("Game started!");
        console.log(`It's ${this.getCurrentPlayer().playerName}'s turn`);
        this.calPoint();
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    nextTurn() {
        if (this.gameState !== 'playing') {
            console.log('Game is not in playing state');
            return;
        }

        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        console.log(`Now it's ${this.getCurrentPlayer().playerName}'s turn`);
    }

    drawCard() {
        if (this.gameState !== 'playing') {
            console.log('Game is not in playing state');
            return;
        }

        const currentPlayer = this.getCurrentPlayer();
        
        if (this.deck.length > 0) {
            const drawnCard = this.deck.shift();
            currentPlayer.addCard(drawnCard);
            
            console.log(`${currentPlayer.playerName} drew a card:`);
            drawnCard.displayCard(); // Show the drawn card
            console.log("\nUpdated hand:");
            currentPlayer.getHandSize();
            currentPlayer.displayHand();
        
        } else {
            console.log('No more cards in the deck!');
            this.gameState = 'ended';
        }

        this.calPoint();

        if (currentPlayer.playerCards.length >= 5) { 
            this.nextTurn();
        }
    }
    displayGameState() {
        console.log('\n=== Current Game State ===');
        console.log(`Current Player: ${this.getCurrentPlayer().playerName}`);
        console.log(`Cards in Deck: ${this.deck.length}`);
        console.log(`Game Status: ${this.gameState}`);
        console.log('\nAll Players\' Hands:');
        this.players.forEach(player => {
            player.displayHand();
            console.log('---');
        });
    }

    calPoint() {
        const currentPlayer = this.getCurrentPlayer();
        let totalPoint = 0;
        let aceCount = 0;
        for (const card of currentPlayer.playerCards) {
            if (card.isAce()) {
                aceCount++;
            } else {
                totalPoint += Number(card.value);
            }
        for (let i = 0; i < aceCount; i++) {
            if (totalPoint + 11 <= 21) {
                totalPoint += 11;
            } else {
                totalPoint += 1;
            }
        }
        if (totalPoint > 21) {
            console.log("Bust!");
            
        } else if (totalPoint === 21) {
            console.log("Perfect 21!");
            this.nextTurn();
        }
        
        }
        console.log(`Total point is: ${totalPoint}`)
    }
    
}

class gameUI {
    constructor(game) {
        this.game = game;
        this.initializeUI();
    }

    initializeUI() {
        this.drawBtn = document.getElementById("drawCard");
        this.nextTurnBtn = document.getElementById("nextTurn");
        this.playersContainer = document.getElementById('playersContainer');
        this.gameStatus = document.getElementById('gameStatus');

        this.drawBtn.addEventListener('click', () => {
            game.drawCard();
            this.updateUI();
        });

        this.nextTurnBtn.addEventListener('click', () => {
            game.nextTurn();
            this.updateUI();
        });

        this.updateUI();
    }

    updateUI() {
        // Update game status
        this.updateGameStatus();
        // Update players' hands
        this.updatePlayersHands();
    }
}

//TODO:  add player btn


// Example:
const player1 = new Player("enzo");
const player2 = new Player("hieu");
const player3 = new Player("tml");

const players = [player1, player2, player3]
const game = new Game(players);
game.startGame();
game.displayGameState;

