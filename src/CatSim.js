import React, { useState } from 'react';
import './CatSim.scss';
import { Button, ButtonGroup, Alert} from 'reactstrap';

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerCount: 0,
            catList: [
                {   
                    name: 'Oliver',    
                    levels: {
                        hunger: 5,  
                        love: 6
                    },
                    notes: ''
                }, 
                {
                    name: 'Xander', 
                    levels: {
                        hunger: 2,  
                        love: 2
                    },
                    notes: ''
                }, 
                {
                    name: 'Percy', 
                    levels: {
                        hunger: 3,  
                        love: 4
                    },
                    notes: ''
                }
            ]
        }
        this.feedHandler = this.feedHandler.bind(this);
        this.petHandler = this.petHandler.bind(this);
        this.surrHandler = this.surrHandler.bind(this);
    }

    feedHandler(index){
        const workingList = this.state.catList;
        (workingList[index].levels.hunger == 10 ? this.feedMax(index) : workingList[index].levels.hunger++);
        this.setState(
            { workingList }
        );
    };
    feedMax(index){
        const workingList = this.state.catList;
        workingList[index].notes += "\nI'm too full to eat!";
        this.setState(
            { workingList }
        );
        setTimeout(() => {(
            this.setState((state) => {
                state.catList[index].notes = ''}));
        }, 3000);
    }
    petHandler(index){
        const workingList = this.state.catList;
        (workingList[index].levels.love == 10 ? this.petMax(index) : workingList[index].levels.love++);
        this.setState(
            { workingList }
        );
    };
    petMax(index){
        const workingList = this.state.catList;
        workingList[index].notes += "\nI'm too loved to be pet!";
        this.setState(
            { workingList }
        );
        setTimeout(() => {(
            this.setState((state) => {
                state.catList[index].notes = ''}));
        }, 3000);
    }
    surrHandler(index){
        
    };

    // TIMERS
    componentDidMount() {
        this.timerBase = setInterval( () => this.tick(), 1000)
        this.statTimer = setInterval( () => this.decrementStats(), 3000)
    };
    componentWillUnmount(){
        clearInterval(this.timerBase);
    };

    tick(){
        let newCount = 0;
        this.setState(state => {
            newCount = state.timerCount;
            newCount++;
            return {
                timerCount: newCount
            }
        });
    };

    decrementStats(){
        let newList = this.state.catList.map( (cat) => ({
            name: cat.name,
            levels: {
                hunger: (cat.levels.hunger == 0 ? 0 : (cat.levels.hunger - 1)),
                love: (cat.levels.hunger == 0 ? 0 : (cat.levels.love - 1))
            },
            notes: cat.notes
        })
        );
            // let newLevels = cat.levels.map(level => level-1);
            // return cat.newLevels;
            
            // cat.levels.hunger = cat.levels.hunger - 1;
            // cat.levels.love = cat.levels.love - 1;

            console.log(newList)
        this.setState( {catList: newList}) ;
    };

    render(){
        const cats = this.state.catList.map((cat, index) => (
            <div className='cat-card' key={index}>
                <div className='cat-card header font'>{cat.name}</div>
                <div className='cat-card body text-primary text-left'>
                    <div className='stats text-primary'>
                        <CatStat stat='Hunger' level={cat.levels.hunger} />
                        <CatStat stat='Love' level={cat.levels.love} />
                        <CatLert note={cat.notes} />
                    </div>
                
                    <div className='cat-card footer text-secondary text-center'>Cat {index+1} out of {this.state.catList.length}</div>
                    <div className='cat-card button-bar'>
                        <ButtonGroup size="sm">
                            <Button color='primary' className='bb-item' onClick={()=>this.feedHandler(index)}>Feed</Button>
                            <Button color='info' className='bb-item' onClick={()=>this.petHandler(index)}>Pet</Button>
                            <Button color='danger'  className='bb-item' onClick={ () => this.surrHandler(index)}>Surrender</Button>
                        </ButtonGroup>
                        </div>
                </div>
            </div>
            )
        );
        
        const timer = <div className="text-warning bg-dark p-2 rounded">Elapsed: {this.state.timerCount}</div>
        return (
            <div className='master-container'>
                <div className='gutter'>gutter</div>
                    <div className='cat-container'>
                        {cats}
                        <div className="break"/>
                        {timer}
                    </div>
                <div className='gutter'>gutter</div>
            </div>);
    }

}

class CatStat extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let levelColor;
        if (this.props.level >= 7 ) {
            levelColor = 'text-success';
         }else if(this.props.level >= 4){
             levelColor= 'text-warning';
         } else {
             levelColor='text-danger'
         };

         return (
             <div className={levelColor}>
                {this.props.stat}: {this.props.level}/10
             </div>
         )
    }
}

class CatLert extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false
        };
    }
    render(){

        return(
        <div>
                {this.props.note}
        </div>
        )
    }
}



// const catCardHeader = {
//     fontSize: 24,
//     color: 'blue',
//     fontWeight: 'bold'
// };
// const catCardBody = {
//     fontSize: 12,
//     color: 'black',
//     fontWeight: 'normal'
// };

export default Main;