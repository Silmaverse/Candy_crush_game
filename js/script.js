let candies = ["Blue", "Orange", "Red", "Green", "Yellow", "Purple"];
let board = [];
let row = 9;
let column = 9;
let score = 0;

let currtile;
let othertile;

window.onload = function () {
  startGame();

  //1/10 milisecond it calls a function
  window.setInterval(function () {
    crushCandy();
    slideCandy();
    generateCandy();
  }, 100);
};

// random candy function

function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];
}

// starting game

function startGame() {
  for (let r = 0; r < row; r++) {
    let row = [];

    for (let c = 0; c < column; c++) {
      // create imag tag

      let tile = document.createElement("img");
      tile.id = r.toString() + "_" + c.toString();
      tile.src = "images/" + randomCandy() + ".png";

      // Drag functionlity
      tile.addEventListener("dragstart", dragStart); // click on a candy , initializing  darg process
      tile.addEventListener("dragover", dragOver); // clicking on a candy , moving mous to drag the candy
      tile.addEventListener("dragenter", dragEnter); //draging candy onto another candy
      tile.addEventListener("dragleave", dragLeave); //leave candy over another candy
      tile.addEventListener("drop", dragDrop); //after drag  process completed , we swap candies
      tile.addEventListener("dragend", dragEnd); //droping a candy over another candy

      document.querySelector("#board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
}

//starting the draging process

function dragStart() {
  //this refers to the tile that was clicked before
  currtile = this;
}

//start the process

function dragOver(e) {
  e.preventDefault();
}

//draging candy into another candy

function dragEnter(e) {
  e.preventDefault();
}

//leave candy over another candy

function dragLeave() {}

//drop the candy ovr another candy

function dragDrop() {
  //this refers to the target tile that was dropped on;
  othertile = this;
}

function dragEnd() {
  if (currtile.src.includes("blank") || othertile.src.includes("blank")) {
    return;
  }

  let currCoords = currtile.id.split("_");
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = othertile.id.split("_");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  //moving candy in the horizontal direction
  let moveLeft = c2 == c - 1 && r == r2;
  let moveRight = c2 == c + 1 && r == r2;

  // moving candy int vertical direction

  let moveUp = r == r2 - 1 && c == c2;
  let moveDown = r == r2 + 1 && c == c2;

  let isAdjancent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjancent) {
    let currImg = currtile.src;
    let otherImg = othertile.src;
    currtile.src = otherImg;
    othertile.src = currImg;

    let validMove = checkValid();

    if (!validMove) {
      let currImg = currtile.src;
      let otherImg = othertile.src;
      currtile.src = otherImg;
      othertile.src = currImg;
    }
  }
}

function crushCandy() {

  crushFour();
  crushThree();
  crushFive();
  document.querySelector("#score").innerHTML=score;
}

function crushThree() {
  //chek rows
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < column - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "images/blank.png";
        candy2.src = "images/blank.png";
        candy3.src = "images/blank.png";

        score += 3;
      }
    }
  }

  //chek columns
  for (let c = 0; c < column; c++) {
    for (let r = 0; r < row - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank.png")
      ) {
        candy1.src = "images/blank.png";
        candy2.src = "images/blank.png";
        candy3.src = "images/blank.png";

        score += 3;
      }
    }
  }
}

function crushFour() {
  //chek rows
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < column - 3; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      let candy4 = board[r][c + 3];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&  candy3.src == candy4.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "images/blank.png";
        candy2.src = "images/blank.png";
        candy3.src = "images/blank.png";
        candy4.src = "images/blank.png";
        

        score += 4;
      }
    }
  }

  //chek columns
  for (let c = 0; c < column; c++) {
    for (let r = 0; r < row - 3; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      let candy4 = board[r + 3][c];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src && candy3.src == candy4.src &&
        !candy1.src.includes("blank.png")
      ) {
        candy1.src = "images/blank.png";
        candy2.src = "images/blank.png";
        candy3.src = "images/blank.png";
        candy4.src = "images/blank.png";

        score += 4;
      }
    }
  }
}

function crushFive() {
  //chek rows
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < column - 4; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      let candy4 = board[r][c + 3];
      let candy5 = board[r][c + 4];


      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&  candy3.src == candy4.src && candy4.src== candy5.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "images/blank.png";
        candy2.src = "images/blank.png";
        candy3.src = "images/blank.png";
        candy4.src = "images/blank.png";
        candy5.src = "images/blank.png";

        

        score += 5;
      }
    }
  }

  //chek columns
  for (let c = 0; c < column; c++) {
    for (let r = 0; r < row - 5; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      let candy4 = board[r + 3][c];
      let candy5 = board[r + 4][c];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src && candy3.src == candy4.src && candy4.src==candy5.src &&
        !candy1.src.includes("blank.png")
      ) {
        candy1.src = "images/blank.png";
        candy2.src = "images/blank.png";
        candy3.src = "images/blank.png";
        candy4.src = "images/blank.png";
        candy5.src = "images/blank.png";

        score += 5;
      }
    }
  }
}



function checkValid() {
  //chek rows
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < column - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];

      if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
        return true;
      }
    }
  }

  //chek columns
  for (let c = 0; c < column; c++) {
    for (let r = 0; r < row - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];

      if ( candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
        return true;
      }
    }
  }



  return false;
}

//sliding candy

function slideCandy(){

  for(let c =0; c<column ; c++){
      let ind =row-1;
     
      for(let r =row-1; r>=0 ; r--){
        
        if(!board[r][c].src.includes("blank")){
           board[ind][c].src = board[r][c].src;
          
           ind-=1;
        }

      }

      for(let r =ind ; r>=0; r--){
        board[r][c].src ="images/blank.png"
      }


   }


}


function generateCandy(){

  for(let c=0 ; c<column ;c++){
    if(board[0][c].src.includes("blank")){
       board[0][c].src ="images/" + randomCandy() + ".png"

    }
  }

}







