/* eslint-disable */
import React, { Fragment } from "react";
import "../src/index.css";

const exports = {};

exports.Wrapper = class extends React.Component {
    render() {
        const { content } = this.props;
        return (
            <div className="Player">
                <h2 className="header-main-sub">
                    Oyuncu
          </h2>
                {content}
            </div>
        );
    }
};

exports.BattleshipGame = class extends React.Component{

}
exports.HamleYap = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hamle: 0,
            hamleListesi: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            index: 0,
        };
    }

    render() {
            const numShips = 5;
const boardSize = 10;
// eslint-disable-next-line
const shipLength = 3;
const generateShipLocations = () => {
  var locations;
  for (var i = 0; i < numShips; i++) {
    do {
      locations = generateShip(ships[i]);
    } while (collision(locations));
    ships[i].locations = locations;
  }
};

const generateShip = (ship) => {
  var direction = Math.floor(Math.random() * 2);
  var row, col;

  if (direction === 1) {
    row = Math.floor(Math.random() * boardSize);
    col = Math.floor(Math.random() * (boardSize - ship.length));
  } else {
    row = Math.floor(Math.random() * (boardSize - ship.length));
    col = Math.floor(Math.random() * boardSize);
  }

  var newShipLocations = [];
  for (var i = 0; i < ship.length; i++) {
    if (direction === 1) {
      newShipLocations.push(row + "" + (col + i));
    } else {
      newShipLocations.push(row + i + "" + col);
    }
  }
  //console.log(newShipLocations);
  return newShipLocations;
};

const collision = (locations) => {
  for (var i = 0; i < numShips; i++) {
    var ship = ships[i];
    for (var j = 0; j < locations.length; j++) {
      if (ship.locations.indexOf(locations[j]) >= 0) {
        return true;
      }
    }
  }
  return false;
};

const fire = (guess) => {
  if (guess < 10) {
    guess = "0" + guess.toString();
  }
  for (var i = 0; i < numShips; i++) {
    var ship = ships[i];
    //console.log(ship.locations);

    for (var j = 0; j < ship.length; j++) {
      var index = ship.locations[j];
      //console.log("GUESS : ", guess);
      //console.log("Index: ", index);

      if (guess.toString() === index) {
        //console.log("A BIG HIT!!");
        ship.hits = ship.hits + 1;
        //console.log(ship.hits);
        if (ship.hits === ship.length) {
          ship.isGone = true;
          //console.log("SHIP IS GONE");
        }
        return true;
      }
    }
  }
  return false;
};
function refreshPage() {
  window.location.reload();
}
generateShipLocations();
const Game = () => {
  var isGameEnded = false;
  const [history, setHistory] = useState([Array(100).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  // eslint-disable-next-line
  const [xIsNext, setXisNext] = useState(true);
  const [firedPoints, setFiredPoints] = useState([Array(100).fill(null)]);
  const [fireCounter, setFireCounter] = useState(1);
  //const [hittedShips, setHittedShips] = useState(1);
  var hittedShips = 0;
  const winner = calculateWinner(ships, fireCounter - 1);
  //const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    if (winner) {
      const win = [...winner, 0,0,0,0,0,0,0,0,0];
     this.state.hamleYapBelirle(win);
      return winner;
    }
    //console.log("Selected index", i);
    setFiredPoints([...firedPoints, i]);
    if (firedPoints.includes(i)) {
      //console.log("Already hitted");
      return;
    }
    setFireCounter(fireCounter + 1);
    //console.log("Fire counter", fireCounter);
    const isThisAHit = fire(i) ? "O" : "X";

    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    //if (winner) return;
    // select square
    squares[i] = isThisAHit;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    //setHittedShips(1);

    //setXisNext(shipPlaces[i] === 1);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };
// eslint-disable-next-line
  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });
  const getHittedShips = () => {
    for (var shipIndex = 0; shipIndex < ships.length; shipIndex++) {
      if (ships[shipIndex].isGone === true) {
        //console.log("This ship battı! with ", fireCounter, " hits");
        hittedShips = hittedShips + 1;
      }
      //console.log("Hitted ships ", hittedShips);
      if (hittedShips === ships.length) {
        //console.log("All ships sunk! ", (11 / fireCounter) * 100, "%");
        // eslint-disable-next-line
        isGameEnded = true;
      }
    }
    return hittedShips;
  };
  return (
    <>
      <h1>Battleship Game</h1>
      <div className="column">
        <h4>
          {ships[0].isGone ? (
            <del> {ships[0].name} battı! </del>
          ) : (
            `${ships[0].name} hayatta!`
          )}{" "}
        </h4>
        <h4>
          {ships[1].isGone ? (
            <del> {ships[1].name} battı! </del>
          ) : (
            `${ships[1].name} hayatta!`
          )}{" "}
        </h4>
        <h4>
          {ships[2].isGone ? (
            <del> {ships[2].name} battı! </del>
          ) : (
            `${ships[2].name} hayatta!`
          )}{" "}
        </h4>
        <h4>
          {ships[3].isGone ? (
            <del> {ships[3].name} battı! </del>
          ) : (
            `${ships[3].name} hayatta!`
          )}{" "}
        </h4>
        <h4>
          {ships[4].isGone ? (
            <del> {ships[4].name} battı! </del>
          ) : (
            `${ships[4].name} hayatta!`
          )}{" "}
        </h4>
      </div>
      <h5>Fired torpedos: {fireCounter - 1}</h5>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <button type="button" onClick={refreshPage}>
        <span>Reload</span>
      </button>{" "}
      <div className="info-wrapper">
        <h3>
          {winner
            ? "Gemilerin hepsini %" + winner + " ile batırdın! Sonucunu gönder"
            : "Continue to sunk all ships"}
        </h3>
        <h3>{"Sunk ships: " + getHittedShips()}</h3>
      </div>
    </>
  );
};

      
    }
}

export default exports;
