import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as firstComp from "./firstComps.js";
import * as CatSim from "./CatSim.js";
import { Button } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <AppContainer />
    </div>
  );
}

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainApps: [<firstComp.CatList />, <CatSim.Main />],
      appIndex: 1
    }
    this.changeApp = this.changeApp.bind(this);
  }

  changeApp(){
    let newIndex = (this.state.appIndex + 1);

    if (newIndex == this.state.mainApps.length){
      newIndex = 0;
    }

    this.setState({
      appIndex: newIndex
    });
  }
  render(){

    let currentAppString = this.state.mainApps[this.state.appIndex];
    return ( 
      <div className="playground">
        <Button color="primary" size="lg" onClick={this.changeApp}>Switch App</Button>
        {currentAppString}
        </div>
      );
  };
};



export default App;
