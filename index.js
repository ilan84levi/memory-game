(function () {

    const cards = document.querySelectorAll(".card");

    let firstCard = null;
    let secondCard = null;

    let gameOver = false;
    let boardLocked = true;

    let timeCounter = 0;
    let stepsCounter = 0;
    let pairsCounter = 8;

    function flipCard() {

        if (gameOver === true || boardLocked === true) return;

        if (firstCard === null) {
            firstCard = this;

            this.classList.add('unflip');
            this.classList.remove('card');
        } else {
            secondCard = this;

            this.classList.add('unflip');
            this.classList.remove('card');
            checkForMatch();
        }

    }

    function countTime() {

        setInterval(function () {
            timeCounter++;
            $("#counter").html(timeCounter);
        }, 1000);

    }

    document.querySelector(".startPlaying").addEventListener('click', newGame);
    document.querySelector(".headerStartButton").addEventListener('click', newGame );


    function newGame() {

        timeCounter = 0;
        stepsCounter = 0;
        pairsCounter = 8;

        let endGameMessage = document.querySelector(".endGameMessage");
        endGameMessage.setAttribute("style", 'visibility:hidden');

        $(".playerMoves").text(0);
        $("#counter").html(0);

        let start = $(".startPlaying");
        start.remove();

        let startFromHeaderButton = document.querySelector(".headerStartButton");
        startFromHeaderButton.setAttribute("style", 'Animation:none');

        cards.forEach(card => {
            if(card.classList.contains("unflip")){
                card.classList.remove("unflip");
            }
        })

        cards.forEach(card => {

            if(!card.classList.contains("card")){
                card.classList.add("card");
            }

        });
        
        cards.forEach(card => card.addEventListener('click', flipCard));

        countTime();
        restBoard();
        
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 16);
            card.style.order = randomPos;
        })
    }


    function checkForMatch() {
        stepsCounter++;

        $(".playerMoves").text(stepsCounter);
 
        boardLocked === true;
        let isMatch = firstCard.dataset.code === secondCard.dataset.code;
        isMatch ? match() : noMatch();

        if (pairsCounter === 0) {
            endGame();
        }

    }

    function match() {
        boardLocked = true;
        firstCard.removeEventListener('click', flipCard, false);
        secondCard.removeEventListener('click', flipCard, false);
        pairsCounter--;
        restBoard();
        if(pairsCounter === 0){
            endGame();
        }
    }

    function noMatch() {
        boardLocked = true;
        setTimeout(() => {
            firstCard.classList.remove('unflip');
            secondCard.classList.remove('unflip');
            firstCard.classList.add('card');
            secondCard.classList.add('card');
            restBoard();
        }, 1500);
    }

    function restBoard() {
        boardLocked = false;
        gameOver = false;
        firstCard = null;
        secondCard = null;

    }

    function endGame() {
      let endGameMessage = document.querySelector(".endGameMessage");
      endGameMessage.setAttribute("style", 'visibility:visible');
    }


    (function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 16);
            card.style.order = randomPos;
        })
    })();


    cards.forEach(card => card.addEventListener('click', flipCard));

})();