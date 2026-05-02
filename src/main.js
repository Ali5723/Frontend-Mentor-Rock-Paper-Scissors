if (localStorage.getItem("score")) {
  document.getElementById("scoreDisplay").innerText =
    localStorage.getItem("score");
} else {
  localStorage.setItem("score", 0);
}

["#rulesButton", ".closeButton"].forEach((selector) => {
  document.querySelector(selector).addEventListener("click", (e) => {
    document.querySelector(".overlay").classList.toggle("hidden");
    document.querySelector(".rules").classList.toggle("hidden");
  });
});

document.querySelectorAll(".main .choose .chooseItem").forEach((selector) => {
  selector.addEventListener("click", (e) => {
    // console.log(selector.querySelector("img").alt);

    const theTypes = ["paper", "scissors", "rock"];
    theTypes.forEach((theType) => {
      document.querySelector(".game .user .image").classList.remove(theType);
      document.querySelector(".game .house .image").classList.remove(theType);

      const theImg = document.querySelector(".game .house .image img");
      theImg.src = "";
      theImg.alt = "";
    });

    const theGame = new Promise((resolveFunction, rejectFunction) => {
      const chosenType = selector.querySelector("img").alt;
      const theImg = document.querySelector(".main .game .user .image img");

      theImg.src = `/images/icon-${chosenType}.svg`;
      theImg.alt = chosenType;

      document.querySelector(".game .user .image").append(theImg);
      document.querySelector(".game .user .image").classList.add(chosenType);

      document.querySelector(".main .choose").classList.toggle("hidden");
      document.querySelector(".main .game").classList.toggle("hidden");

      resolveFunction(chosenType);
    })
      .then((userChoice) => {
        const userChoiceNumber = theTypes.indexOf(userChoice);

        const houseChoiceNumber = Math.trunc(Math.random() * 1000) % 3;
        const houseChoice = theTypes[houseChoiceNumber];

        document
          .querySelector(".game .house .image")
          .classList.add(houseChoice);

        const theImg = document.querySelector(".game .house .image img");
        theImg.src = `/images/icon-${houseChoice}.svg`;
        theImg.alt = houseChoice;

        const theResult =
          (userChoiceNumber === 1 && houseChoiceNumber === 0) ||
          (userChoiceNumber === 0 && houseChoiceNumber === 2) ||
          (userChoiceNumber === 2 && houseChoiceNumber === 1);
        const isDraw = userChoiceNumber === houseChoiceNumber;

        return { win: theResult, draw: isDraw };
      })
      .then((theResult) => {
        document.querySelector(".main .result").classList.remove("hidden");
        const resultTitle = document.getElementById("resultTitle");
        if (theResult.draw) {
          resultTitle.innerText = "Draw";
        } else {
          if (theResult.win) {
            resultTitle.innerText = "You Won";

            document.getElementById("scoreDisplay").innerText =
              +document.getElementById("scoreDisplay").innerText + 1;

            localStorage.setItem("score", +localStorage.getItem("score") + 1);
          } else {
            resultTitle.innerText = "You Lost";

            document.getElementById("scoreDisplay").innerText =
              +document.getElementById("scoreDisplay").innerText - 1;

            localStorage.setItem("score", +localStorage.getItem("score") - 1);
          }
        }
      })
      .catch((error) => console.log(Error(error)));
  });
});

document.getElementById("scoreDisplay").addEventListener("dblclick", (e) => {
  localStorage.setItem("score", 0);
  e.target.innerText = 0;
});

document.getElementById("playAgainButton").addEventListener("click", (e) => {
  document.querySelector(".main .result").classList.add("hidden");
  document.querySelector(".main .game").classList.add("hidden");
  document.querySelector(".main .choose").classList.remove("hidden");
});
