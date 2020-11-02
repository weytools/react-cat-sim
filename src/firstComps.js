import React from 'react';
import './App.css';

export class CatList extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
        {/* <NewMeow meow={true} />
        <NewMeow meow={false}/>
        <hr />
        <MeowList />
        <hr /> */}
        <ButtonGridContainer />
        </div>
        );
    };
  };
  
  const NewMeow = (props) => 
   { 
    if (props.meow == true) {
       return <p>True Meow</p>;
     } else {
       return <p>No Meow</p>;
     }
   }
  
  const MeowList = function() {
    let output = [];
    for (let i = 0; i < 2; i++){
      output.push(<p>meow</p>);
    };
    return output;
  }
  
  const ButtonGridContainer = () => (
      <div className="button-grid">
        <ButtonGrid />
      </div>
  )
  
  class ButtonGrid extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        squareCount: 4,
        squareText: ['Alpha', 'Bravo', 'Charlie', 'Delta']
      }
      this.addSquare = this.addSquare.bind(this);
    }
  
    addSquare() {
      // get string
      const newString = document.getElementById("input-text").value;
      
      // check for blanks
      if (newString == "" || newString == null){
        alert("Cannot be blank");
        return;
      }
      
      // set up new sq count
      let newCount = this.state.squareCount;
      newCount++;
  
      // set up new array
      const newTextArr = this.state.squareText;
      console.log(newTextArr, typeof(newTextArr));
      newTextArr.push(newString);
  
      // apply
      this.setState({
        squareCount: newCount,
        squareText: newTextArr
      });
    };
  
    render(){
      const gridVein = [];
  
      for (let i = 0; i < this.state.squareText.length; i++) {
        gridVein.push(
          <div className="bg-item"><div className="bg-item-head">{i + 1} out of {this.state.squareCount}</div>{this.state.squareText[i]}</div>
        );
      }
  
      gridVein.push( <input className="bg-item bg-item-head" id="input-text" type="text" placeholder="Anonymous" /> );
      gridVein.push (<button className="bg-item" id="input-button" onClick={this.addSquare}>Add</button>);
  
    return gridVein;
    }
  
  }