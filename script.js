console.log("Welcomei");

let audioTurn = new Audio("ting.mp3");
let music = new Audio("music.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;
let description = document.getElementsByClassName("description")[0];
let imgElement = document.querySelector("img");
let button = document.querySelector(".btn");
let boxElement = document.querySelector(".gridContainer");
let boxes1 = document.querySelectorAll(".box");
let clickedBoxes = [];
let firstClickedBox = '';
let boxes = document.getElementsByClassName("box");

if (clickedBoxes.length >= 5) {
    clickedBoxes[0].classList.remove('nextToRemove'); // Remove class from previous 5th element
}

//Reset parttt....
button.addEventListener("click", () => {
  let boxTextElements = document.querySelectorAll(".boxtext");
  boxTextElements.forEach((boxText) => {
    boxText.innerText = ""; // Set the innerText of each boxtext element to an empty string
    turn = "X";
    document.querySelector(".info").innerText = "Turn for X";
    description.style.display = "block";
    imgElement.style.display = "none";
    boxElement.classList.remove("disabled");
    isgameover = false;
    boxes1.forEach((box) => {
      box.style.backgroundColor = "transparent"; // 
      box.classList.remove('nextToRemove');
    });
    clickedBoxes.splice(0, clickedBoxes.length);
  });
});
// boxes1[7].style.backgroundColor = 'aqua';

const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " Won";
      isgameover = true;
    }
  });
};

let firstClickedBoxIndex = -1; 

Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
      if (boxtext.innerText === "") {
        boxtext.innerText = turn;
        turn = changeTurn();
        audioTurn.play();
        checkWin();
        if (!isgameover) {
          document.getElementsByClassName("info")[0].innerText =
            "Turn for " + turn;
        } else {
          description.style.display = "none";
          imgElement.style.display = "block";
          console.log('hi')
          boxElement.classList.add("disabled");
          boxes1.forEach((box) => {
            box.style.backgroundColor = "rgb(243, 206, 155)";
          });
        }
  
        clickedBoxes.push(element);
        if (clickedBoxes.length == 5) {
            clickedBoxes[0].classList.add('nextToRemove'); // Add class to the 5th element
        }
  
        if (clickedBoxes.length === 6) {
          // Remove the first clicked box
          let firstClickedBox = clickedBoxes.shift();
          let firstClickedBoxText = firstClickedBox.querySelector(".boxtext");
          firstClickedBoxText.innerText = "";
          firstClickedBox.classList.remove('nextToRemove'); // Restore original color
        }
        if (clickedBoxes.length >= 5) {
            clickedBoxes[0].classList.add('nextToRemove'); // Add class to the new 5th element
        }
      }
    });
  });
  