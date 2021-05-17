
/* eslint-disable */
import React, { Fragment } from "react";
import "../src/index.css";


import Game from "../src/components/Game";
import Board from '../src/components/Board'
//import { calculateWinner } from "../src/helper";

const exports = {};

exports.Wrapper = class extends React.Component {
    render() {
        const { content } = this.props;
        return (
            <div className="Player">
                <h2 className="header-main-sub">
                    Player
          </h2>
                {content}
            </div>
        );
    }
};

exports.Attach = class extends React.Component {
    render() {
        const { parent } = this.props;
        const { ctcInfoStr } = this.state || {};
        return (
            <Fragment>
                <div className="container">
                    <div className="row j-center flex-column w-400 m-auto mt-5">
                        Please paste the contract details here:
                        <br />
                        <br />
                        <textarea
                            className="ContractInfo"
                            onChange={(e) =>
                                this.setState({ ctcInfoStr: e.currentTarget.value })
                            }
                            placeholder="{}"
                        />
                        <br />
                        <button
                            className="attach-button mt-2"
                            disabled={!ctcInfoStr}
                            onClick={() => parent.attach(ctcInfoStr)}
                        >
                            Attach
                         </button>
                    </div>
                </div>
            </Fragment>
        );
    }
};


exports.Attaching = class extends React.Component {
    render() {
        const { parent } = this.props;
        return (
            <div className="container">
                <div className="row j-center">
                    <h3 className="game-finished">Attaching, please wait...</h3>
                </div>
            </div>
        );
    }
};

exports.HamleYap = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hamle: 0,
            hamleListesi: 0,
            index: 0,
            fireCounter: 0,
            squares : Array(100).fill(null),
            history:Array(100).fill(null),
            created: 0,
            boardSize : 10,
            winner: 0,
            stepNumber: 0,
            firedPoints: [],
            isGameEnded: false,
            hittedShips: 0,
            buttonValue : 0,   
        };

        if ( this.state.created === 0)
                  {
                    this.generateShipLocations();
                    this.setState((state) => ({
                      created: 1,
                   }));
                    console.log("Thiss", this.state.created);
                  }
    }
       
        refreshPage() {
          //console.log("WINN" , this.state.winner);
          window.location.reload();
        }
        handleClick = (i) => {
          if (this.state.winner) {
            //const win = [...this.state.winner, 0,0,0,0,0,0,0,0,0];
           //this.state.hamleYapBelirle(win);
            //return this.state.winner;
            return;
          }
          if (this.state.firedPoints.includes(i)) {
            console.log("Already hitted");
            return;
          }
         // console.log("Selected index", i);
          this.state.firedPoints[this.state.index] = i;
          //console.log("this index", this.state.index);
          this.state.index = this.state.index+1;
          //console.log("Fired points", this.state.firedPoints);
        
          this.setState({fireCounter: this.state.fireCounter+1});
          //console.log("Fire counter", fireCounter);
          const isThisAHit = this.fire(i) ? "O" : "X";
        
          const historyPoint = this.state.history.slice(0, this.state.stepNumber + 1);
          const current = historyPoint[this.state.stepNumber];
          //const squares = [...current];
          // return if won or occupied
          //if (winner) return;
          // select square
          //this.state.squares[0][i] = isThisAHit;
        
          var arr = this.state.squares;
          //console.log("This is an arrayyy", arr);
          arr[i] = isThisAHit;

          var arr2 = this.state.firedPoints;
          arr2[this.state.index] = i;
          this.setState((state) => ({
              squares: arr,
              history: arr,
              firedPoints: arr2,
              index: state.index+1,
              stepNumber: historyPoint.length,
          }));
        
          //this.setState({squares: this.state.squares})
          //setHistory([...historyPoint, squares]);
          //this.state.stepNumber = historyPoint.length;
          //console.log("Step no", this.state.stepNumber);
          //setHittedShips(1);
        
          //setXisNext(shipPlaces[i] === 1);
        };
       
        Game = () => {
          //var isGameEnded = false;
          //const [stepNumber, setStepNumber] = useState(0);
          // eslint-disable-next-line
          //const [fireCounter, setFireCounter] = useState(1);
          //const [hittedShips, setHittedShips] = useState(1);
          winner = calculateWinner(ships, this.state.fireCounter - 1);
          if ( winner ){
            //this.state({view:'GameEnded', gameVal: winner});
          }
          //const xO = xIsNext ? "X" : "O";
                       
                }
                
                //this.generateShipLocations();
                render() {
                  
                  const { parent, oncekiHamle, standardUnit, bakiye } = this.props;
        return ( 
          <Fragment>
            <h4>Current Balance: {bakiye} {standardUnit}</h4>
  
            <div className="column">
              <h4>
                  {this.state.ships[0].isGone ? (
                    <del>
                      {" "}
                      {this.state.ships[0].name} [{this.state.ships[0].length}]
                    </del>
                  ) : (
                    `${this.state.ships[0].name} [${this.state.ships[0].length}]`
                  )}{" "}
                </h4>
                <h4>
                  {this.state.ships[1].isGone ? (
                    <del>
                      {" "}
                      {this.state.ships[1].name} [{this.state.ships[1].length}]
                    </del>
                  ) : (
                    `${this.state.ships[1].name} [${this.state.ships[1].length}]`
                  )}{" "}
                </h4>
                <h4>
                  {this.state.ships[2].isGone ? (
                    <del>
                      {" "}
                      {this.state.ships[2].name} [{this.state.ships[2].length}]
                    </del>
                  ) : (
                    `${this.state.ships[2].name} [${this.state.ships[2].length}]`
                  )}{" "}
                </h4>
                <h4>
                  {this.state.ships[3].isGone ? (
                    <del>
                      {" "}
                      {this.state.ships[3].name} [{this.state.ships[3].length}]
                    </del>
                  ) : (
                    `${this.state.ships[3].name} [${this.state.ships[3].length}]`
                  )}{" "}
                </h4>
                <h4>
                  {this.state.ships[4].isGone ? (
                    <del>
                      {" "}
                      {this.state.ships[4].name} [{this.state.ships[4].length}]
                    </del>
                  ) : (
                    `${this.state.ships[4].name} [${this.state.ships[4].length}]`
                  )}{" "}
                </h4>
              </div>
              <br/>
              <div className="score-area">
              <h4>
                {" "}
                {this.state.winner
                ? "You sank all ships with " + this.state.winner + "%! Please send your result to Admin."
                : "Continue to sink them..."}
              </h4>
              <div className="score-area-info">
                <h5> Fired Torpedos: {this.state.fireCounter}</h5>
                <h5> {"Sink Ships: " + this.state.hittedShips}</h5>
              </div>
            </div>
            <Board squares={this.state.history} onClick={this.handleClick} />
            <button disabled = {!this.state.buttonValue} id="send-all-button" type="button" 
                  onClick={() => {parent.hamleYapBelirle(this.state.hamleListesi);}}>SEND</button>
          </Fragment>
        )
    }
  };

export default exports;
