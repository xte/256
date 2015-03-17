var Game = (function() {

    function removeZeros(element) { return element !== 0 }

    function addNum(num1, num2) { if (num1 === num2) { return num1 + num2 }}

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

  function Game() {
    this.tiles = [];
    this.board = this.seed(("0000000000000000").split("")).map(function(currentValue){ return parseInt(currentValue) });
  }

  Game.prototype.seed = function(array) {
    var array_location = parseInt(Math.random(15) * 15);
    array[array_location] = "2";
    var new_location = parseInt(Math.random(15) * 15);
    while (array[new_location] === "2"){
      new_location = parseInt(Math.random(15) * 15);
    };
    array[new_location] = "2";
    return array
  }

  Game.prototype.getRows = function() {
    var rows = [];
    for(i = 0; i <= 12; i += 4){
      rows.push(this.board.slice(i,i+4));
    }
    return rows;
  }

  Game.prototype.setRows = function(rows) {
    this.board = rows[0].concat.apply(rows[0],rows.slice(1));
  }

  Game.prototype.getCols = function() {
    var cols = [];
    var rows = this.getRows();
    for(i = 0; i < 4; i++){
      cols.push([rows[0][i], rows[1][i], rows[2][i], rows[3][i]]);
    }
    return cols;
  }

  Game.prototype.setCols = function(cols) {
    var rows = [];
    for(i = 0; i < 4; i++){
      rows.push([cols[0][i], cols[1][i], cols[2][i], cols[3][i]]);
    }
    this.setRows(rows);
  }


  Game.prototype.toString = function() {
    var displayBoard = ""
    for(i = 0; i < 16; i++) {
        displayBoard += this.board[i];
        if (i % 4 === 3){
          displayBoard += "\n";
        };
    }
    return displayBoard;
  }

  Game.prototype.toHtml = function() {
    var boardHtml = "<div id='board'>";
    for(i = 0; i < 16; i++) {
      if(i % 4 === 0) {
        boardHtml += "<div class='row'>";
      }
      var cell = this.board[i];
      boardHtml += "<div class='cell val" + cell + "'>" + cell + "</div>"
        if (i % 4 === 3){
          boardHtml += "</div>";
        };
    }
    document.getElementById("game-container").innerHTML = boardHtml;
  }

  Game.prototype.randomSpawn = function() {
    var spawned = false;
    // this gets into an infinite loop
    while(spawned === false) {
      var randomBoardSlot = getRandomInt(0,17);
      if( this.board[randomBoardSlot] === 0) {
        this.board[randomBoardSlot] = 2;
        spawned = true;
      } else {
        // check if the board is full (dumb way)
        var full = true;
        for(i = 0; i < 16; i ++) {
          if(this.board[i] === 0) {
            full = false;
          }
        }
        if( full === true ) {
          spawned = true;
        }
      } // end else
    }
  }

  Game.prototype.chaChaSlide = function(direction) {
    var self = this;
    switch(direction){
      case 'left':
        var mappedRows = self.getRows().map(function(row, index, board) {
          var filteredRow = row.filter(removeZeros);
          // user hits left, we start on the first column and iterate right
          // user hits right, we should start on the last (right-most) column and iterate left
          // user hits down, we should start on the last (bottom) row and iterate up
          // user hits up, we should start on the first (top) row and iterate down
          if(filteredRow.length > 1) {
            for(i = 0; i < filteredRow.length-1; i++){
              if(filteredRow[i] === filteredRow[i+1]){
                filteredRow.splice(i, 2, (filteredRow[i] * 2));
                filteredRow.push(0);
              }
            }
          }
          while(filteredRow.length < 4) {
            filteredRow.push(0);
          }
          return filteredRow;
        });
        self.setRows(mappedRows);
        self.randomSpawn();
        self.toHtml();
        break;
      case 'right':
       var mappedRows = self.getRows().map(function(row, index, board) {
          var filteredRow = row.filter(removeZeros).reverse();
          if(filteredRow.length > 1) {
            for(i = 0; i < filteredRow.length-1; i++){
              if(filteredRow[i] === filteredRow[i+1]){
                filteredRow.splice(i, 2, (filteredRow[i] * 2));
                filteredRow.push(0);
              }
            }
          }
          while(filteredRow.length < 4) {
            filteredRow.push(0);
          }
          return filteredRow.reverse();
        });
        self.setRows(mappedRows);
        self.randomSpawn();
        self.toHtml();
        break;
      case 'up':
        var mappedCols = self.getCols().map(function(col, index, board) {
          var filteredCol = col.filter(removeZeros);
          if(filteredCol.length > 1) {
            for(i = 0; i < filteredCol.length-1; i++){
              if(filteredCol[i] === filteredCol[i+1]){
                filteredCol.splice(i, 2, (filteredCol[i] * 2));
                filteredCol.push(0);
              }
            }
          }
          while(filteredCol.length < 4) {
            filteredCol.push(0);
          }
          return filteredCol;
        });
        self.setCols(mappedCols);
        self.randomSpawn();
        self.toHtml();
        break;
      case 'down':
        var mappedCols = self.getCols().map(function(col, index, board) {
          var filteredCol = col.filter(removeZeros).reverse();
          if(filteredCol.length > 1) {
            for(i = 0; i < filteredCol.length-1; i++){
              if(filteredCol[i] === filteredCol[i+1]){
                filteredCol.splice(i, 2, (filteredCol[i] * 2));
                filteredCol.push(0);
              }
            }
          }
          while(filteredCol.length < 4) {
            filteredCol.push(0);
          }
          return filteredCol.reverse();
        });
        self.setCols(mappedCols);
        self.randomSpawn();
        self.toHtml();
        break;
    }
  }


  //// NOT FINISHED BELOW THIS LINE ////

  // Game.prototype.checkNeighbors = function() {

  // };

  // Game.prototype.checkMoves = function() {

  // };



  // Game.prototype.checkWin = function() {
  //   var self = this;
  //   for (i = 0; i < self.tiles.length; i++) {
  //     if (self.tiles[i] == "256" ){
  //       return true;
  //       alert("YOU HAVE WON THIS ITERATION OF 256...");
  //     };
  //   }
  // }

  // Game.prototype.checkLose = function() {


  // }


  // TEST CODE

  function assert (actual, expected) {
    console.log(deepEqual(actual, expected));
  }


  function deepEqual (object1, object2) {
    if (object1.length !== object2.length){
      return false;
    }
    for (i = 0; i < object1.length; i++){
      for (j = 0; j < object1[i].length; j++){
        if (object1[i][j] !== object2[i][j]) {
          return false;
        }
      }

    }
    return true;
    // if (object1.length === object2.length) {
    //   for (i = 0; i < object1.length ; i ++){
    //     if (object1[i] !== object2[i]) {
    //       return false;
    //     }
    //   }
    // return true;
    // }
    // else {
    //   return false;
    // }
  }
  return Game;
})();


var game = new Game();

// console.log(game.toString());
// // console.log(game.getRows());

// game.chaChaSlide('down');

// console.log(game.toString());

// console.log(game.toString());

// function filterBoard (element) {
//   return (element === 2);
// }

// var filteredBoard = game.board.filter(filterBoard)

// assert(filteredBoard, [2,2]);

// game.board = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

// assert(game.getCols(), [[1,5,9,13],[2,6,10,14],[3,7,11,15],[4,8,12,16]]);
// assert(game.getRows(), [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]);
