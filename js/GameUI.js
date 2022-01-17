class Game {
  cells = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  turn = "X";
  getCells() {
    return this.cells;
  }


  
  getTurn() {
    return this.turn;
  }

  getWinner() {
    //rows

    if (this.cells[0] === this.cells[1] && this.cells[1] === this.cells[2]) {
      return this.cells[0];
    }
    if (this.cells[3] === this.cells[4] && this.cells[4] === this.cells[5]) {
      return this.cells[3];
    }
    if (this.cells[6] === this.cells[7] && this.cells[7] === this.cells[8]) {
      return this.cells[6];
    }
    //columns
    if (this.cells[0] === this.cells[3] && this.cells[3] === this.cells[6]) {
      return this.cells[0];
    }
    if (this.cells[1] === this.cells[4] && this.cells[4] === this.cells[7]) {
      return this.cells[1];
    }
    if (this.cells[2] === this.cells[5] && this.cells[5] === this.cells[8]) {
      return this.cells[2];
    }
    //dioganals
    if (this.cells[0] === this.cells[4] && this.cells[4] === this.cells[8]) {
      return this.cells[0];
    }
    if (this.cells[2] === this.cells[4] && this.cells[4] === this.cells[6]) {
      return this.cells[2];
    }
    {
      return "-";
    }
  }

  isTie() {
    return this.cells.every((item) => item !== "-" && this.getWinner() === "-");
  }

  onClick(i) {
    if (this.cells[i] === "-" && this.getWinner() === "-") {
      console.log(`cell ${i} clicked`);
      this.cells[i] = this.getTurn();
      this.turn = this.turn === "X" ? "O" : "X";
    }
  }

  restart() {
    this.cells = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    this.turn = "X";
    console.log("restart called", this.cells, this.turn);
  }
}


const game = new Game();

const info = document.getElementById("info");
const button = document.getElementById("play-button");
const board = document.getElementById("board");

button.addEventListener("click", () => {
  game.restart();
  draw(game);
});

const draw = (game) => {
  board.innerHTML = "";

  game.getCells().forEach((cell, i) => {
    const div = document.createElement("div");
    div.className = "box";
    if (cell !== "-") {
      div.innerText = cell;
    }
    div.addEventListener("click", () => {
      game.onClick(i);
      draw(game);
    });
    board.appendChild(div);
  });

  if (game.isTie()) {
    info.innerText = `Neizšķirts!`;
    button.removeAttribute("disabled");
    button.className = "button button-hoverable";
  } else if (game.getWinner() !== "-") {
    info.innerText = `Lieliski, ${game.getWinner()} uzvarēja`;
    button.removeAttribute("disabled");
    button.className = "button button-hoverable";
  } else {
    info.innerText = `${game.getTurn()} gājiens`;
    button.setAttribute("disabled", "true");
    button.className = "button";
  }
};

draw(game);
