import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CreditBoard from '../src/components/CreditBoard';
import SlotContainer from '../src/components/SlotContainer';
import Button from '../src/components/Button';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      credits: 100,
      creditPayout: 0,
      highestScore: 0,
      gameActive: false,
      gameOver: false,
      slotDatum: ['X', 'X', 'X'],
      isWin: false,
      possibleSlots: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    }
    this.getSlotData = this.getSlotData.bind(this);
    this.didWin = this.didWin.bind(this);
    this.getWeightedData = this.getWeightedData.bind(this);
  }

  // Instead of random math, possibly an array with random index. 

  getWeightedData() {
    const weightedNumber = Math.floor(Math.random(0, 13) * 13);
    let returnedNumber;
    if(weightedNumber >= 9) {
      returnedNumber = Math.floor(Math.random(10, 13) * 10);
      console.log(weightedNumber)
    } else if(weightedNumber >= 6 && weightedNumber < 9) {
      returnedNumber = Math.floor(Math.random(6,10) * 10);
    } else {
      returnedNumber = Math.floor(Math.random(1, 6) * 10);
    }
    return this.state.possibleSlots[returnedNumber];
  }
  
  getSlotData(creditAmount) {
    let multiplierAmount;
    switch(creditAmount) {
      case 25:
        multiplierAmount = 5;
        break;
      case 50:
        multiplierAmount = 10;
        break;
      default:
        multiplierAmount = 1;
        break;
    }

    this.setState({
      slotDatum: [
        this.getWeightedData(),
        this.getWeightedData(),
        this.getWeightedData()
      ],
      credits: this.state.credits - creditAmount,
      isWin: false
    }, () =>{this.didWin(this.state.slotDatum, multiplierAmount)});

  }

  didWin(data, multiplierAmount) {

    let isWin = false;
    let payOut = 0;
    let newCreditCount = this.state.credits;
    if(data[0] === data[1] && data[0] === data[2]) {
      isWin = true;
      payOut = 25 * multiplierAmount;
      newCreditCount += payOut;
    } else if(data[0] === data[1]) {
      isWin = true;
      payOut = 10 * multiplierAmount;
      newCreditCount += payOut;
    }

    

    if(newCreditCount <= 0) {
      return this.setState({
        gameOver: true,
        gameActive: false
      })
    }


    
    this.setState({
      credits: newCreditCount,
      creditPayout: payOut,
      isWin: isWin,
      highestScore: this.state.highestScore > newCreditCount ? this.state.highestScore : newCreditCount
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Slots</h1>
        </header>
        <CreditBoard credits={this.state.credits} />
        {this.state.gameOver &&
          <p>Game over. Play again?</p>
        }
        {!this.state.gameActive &&
          <div>
            <p>Press the button to play.</p>
            <button
              onClick={() => this.setState({
                gameActive: !this.state.gameActive,
                gameOver: false,
                credits: 100
              })}>
              Start Game
            </button>
          </div>
        }

        {(this.state.gameActive && !this.state.gameOver) &&
          <div>
            <SlotContainer slotDatum={this.state.slotDatum}/>
            <Button 
              onclick={() => this.getSlotData(5)}
              creditValue={5}
              currentCredits={this.state.credits}
            />
            <Button 
              onclick={() => this.getSlotData(25)}
              creditValue={25}
              currentCredits={this.state.credits}
            />
            <Button 
              onclick={() => this.getSlotData(50)}
              creditValue={50}
              currentCredits={this.state.credits}
            />
          </div>
        }
        {this.state.isWin &&
          <p>You Won {this.state.creditPayout}</p>
        }
        <p>Highest Score: {this.state.highestScore}</p>
        
      </div>
    );
  }
}

export default App;
