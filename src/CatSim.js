import React, { useState } from 'react';
import './CatSim.scss';
import { Button, ButtonGroup, Alert} from 'reactstrap';

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerCount: 0,
            catList: [ ]
        }
        // some vars
        this.decrementInterval = 5000;
        this.noteCountdownStart = 2;

        // start with 2 new cats
        this.newCat();
        this.newCat();

        // bind functions
        this.feedHandler = this.feedHandler.bind(this);
        this.petHandler = this.petHandler.bind(this);
        this.surrHandler = this.surrHandler.bind(this);

        // this.defaultCat = {   
        //     name: 'Oliver',    
        //     levels: {
        //         hunger: 5,  
        //         love: 6
        //     },
        //     notes: [{
        //         message: "Too many pets!",
        //         timeout: 3
        //     },
        //     {
        //         message: "I'm hungry!",
        //         timeout: 2
        //     }],
        //     imageURL: 'https://cdn2.thecatapi.com/images/b32.jpg'
        // }
    }

// CREATION FUNCTIONS
    async newCat(){
        const workingList = this.state.catList;
        const newName = this.getNewName();
        const newLevels = {
            hunger: 10,
            love: 10
        };
        const newNotes = {
            message: 'Just adopted!', 
            timeout: this.noteCountdownStart 
        };
        const newImage  = await this.getNewImage();
        const newCat = {
            name: newName,    
            levels: newLevels,
            notes: [newNotes],
            imageURL: newImage
        };
        workingList.push(newCat);
        this.setState(
            { workingList }
        );
    };

    getNewName(){
        // top 100 boys & girl names from ssa.gov
        let nameList = ["Liam", "Olivia", "Noah", "Emma", "Oliver", "Ava", "William", "Sophia", "Elijah", "Isabella", "James", "Charlotte", "Benjamin", "Amelia", "Lucas", "Mia", "Mason", "Harper", "Ethan", "Evelyn", "Alexander", "Abigail", "Henry", "Emily", "Jacob", "Ella", "Michael", "Elizabeth", "Daniel", "Camila", "Logan", "Luna", "Jackson", "Sofia", "Sebastian", "Avery", "Jack", "Mila", "Aiden", "Aria", "Owen", "Scarlett", "Samuel", "Penelope", "Matthew", "Layla", "Joseph", "Chloe", "Levi", "Victoria", "Mateo", "Madison", "David", "Eleanor", "John", "Grace", "Wyatt", "Nora", "Carter", "Riley", "Julian", "Zoey", "Luke", "Hannah", "Grayson", "Hazel", "Isaac", "Lily", "Jayden", "Ellie", "Theodore", "Violet", "Gabriel", "Lillian", "Anthony", "Zoe", "Dylan", "Stella", "Leo", "Aurora", "Lincoln", "Natalie", "Jaxon", "Emilia", "Asher", "Everly", "Christopher", "Leah", "Josiah", "Aubrey", "Andrew", "Willow", "Thomas", "Addison", "Joshua", "Lucy", "Ezra", "Audrey", "Hudson", "Bella", "Charles", "Nova", "Caleb", "Brooklyn", "Isaiah", "Paisley", "Ryan", "Savannah", "Nathan", "Claire", "Adrian", "Skylar", "Christian", "Isla", "Maverick", "Genesis", "Colton", "Naomi", "Elias", "Elena", "Aaron", "Caroline", "Eli", "Eliana", "Landon", "Anna", "Jonathan", "Maya", "Nolan", "Valentina", "Hunter", "Ruby", "Cameron", "Kennedy", "Connor", "Ivy", "Santiago", "Ariana", "Jeremiah", "Aaliyah", "Ezekiel", "Cora", "Angel", "Madelyn", "Roman", "Alice", "Easton", "Kinsley", "Miles", "Hailey", "Robert", "Gabriella", "Jameson", "Allison", "Nicholas", "Gianna", "Greyson", "Serenity", "Cooper", "Samantha", "Ian", "Sarah", "Carson", "Autumn", "Axel", "Quinn", "Jaxson", "Eva", "Dominic", "Piper", "Leonardo", "Sophie", "Luca", "Sadie", "Austin", "Delilah", "Jordan", "Josephine", "Adam", "Nevaeh", "Xavier", "Adeline", "Jose", "Arya", "Jace", "Emery", "Everett", "Lydia", "Declan", "Clara", "Evan", "Vivian", "Kayden", "Madeline", "Parker", "Peyton", "Wesley", "Julia", "Kai", "Rylee"];
        let newName = nameList[Math.floor(Math.random() * nameList.length)];
        return newName;
    
    };

    async getNewImage(){
        let response = await fetch("https://api.thecatapi.com/v1/images/search");
        let resultString = await response.json();
        let final = (resultString[0].url);
        return final;
    };

    // CAT ACTIONS
    feedHandler(index){
        const workingList = this.state.catList;
        (workingList[index].levels.hunger >= 10 ? this.feedMax(index) : workingList[index].levels.hunger++);
        this.setState(
            { workingList }
        );
    };
    feedMax(index){
        const workingList = this.state.catList;
        workingList[index].notes.push( { message: "I'm too full to eat!", timeout: this.noteCountdownStart });
        this.setState(
            { workingList }
        );
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
        workingList[index].notes.push ({ message: "I'm too loved to be pet!", timeout: this.noteCountdownStart });
        this.setState(
            { workingList }
        );
    }
    surrHandler(index){
        // get the current list
        const ogList = this.state.catList;
        // prompt for confirmation
        const confReply = this.confirmSurrender(ogList[index].name);
        // execute
        let newList;
        if (confReply == true){
            newList = ogList.slice(0,index).concat(ogList.slice(index+1, ogList.length));
        } else {
            return;
        }
        console.log(newList);
        this.setState( 
            {catList: newList}
        );
        ;        
    };
    // return bool
    confirmSurrender(catName){
        return window.confirm('Are you sure you want to surrender ' + catName + '?');
    };

    // TIMERS
    componentDidMount() {
        this.timerBase = setInterval( () => this.tick(), 1000)
        this.statTimer = setInterval( () => this.decrementStats(), this.decrementInterval)
    };
    componentWillUnmount(){
        clearInterval(this.timerBase);
    };
    tick(){
        this.setState((prevState) => ({ timerCount: prevState.timerCount + 1 }))
    };

    // check each notes timer, decrement and remove expired notes
    noteTimeout(){
        let newList = this.state.catList;
        newList.forEach((cat, catIndex) => {
            // remove expired notes
            let filtNotes = cat.notes.filter(note => note.timeout > 0);
            // decrement timeout
            filtNotes.forEach(note => note.timeout--);
            // update newList
            newList[catIndex].notes = filtNotes;
            });
        this.setState( { catList: newList })
        };
    
    decrementStats(){
        let newList = this.state.catList;
        newList.forEach( cat => {

            cat.levels = {
                hunger: (cat.levels.hunger == 0 ? 0 : (cat.levels.hunger - 1)),
                love: (cat.levels.hunger == 0 ? 0 : (cat.levels.love - 1))
            };
        });

        
        
            // let newLevels = cat.levels.map(level => level-1);
            // return cat.newLevels;
            
            // cat.levels.hunger = cat.levels.hunger - 1;
            // cat.levels.love = cat.levels.love - 1;

        console.log(newList)
        this.setState( {catList: newList}) ;
        this.noteTimeout();
    };



    render(){
        const cats = this.state.catList.map((cat, index) => (
            <div className='cat-card' key={index}>
                <div className='cat-card header font'>{cat.name}<br/>
                    <img className='cat-pic mb-2' src={cat.imageURL} width='150' height='100' ></img>
                </div>
                <div className='cat-card body text-primary text-left'>
                    <div className='stats text-primary'>
                        <CatStat stat='Hunger' level={cat.levels.hunger} />
                        <CatStat stat='Love' level={cat.levels.love} />
                        <CatLert notes={cat.notes} />
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
        const appInfo = <div class="text-light lead m-4">Cat stats decrement every <span class="text-warning">{this.decrementInterval / 1000}</span> seconds! 
        <p>Keep your kitties happy!</p></div>

        const actionBar = 
            <div className="
            rounded border border-primary border-2
            px-2 text-light
            d-flex align-items-center">
                <Button color='success' onClick={ () => this.newCat()}>Adopt New Cat</Button>
                <div className="bg-primary h-100 pr-1 mx-2"></div>
                <div className="text-warning bg-dark p-2 rounded my-2">Time Elapsed: {this.state.timerCount}</div>
                
            </div>

        // const timer = <div className="text-warning bg-dark p-2 rounded">Elapsed: {this.state.timerCount}</div>
        return (
            <div className='master-container'>
                <div className='gutter'></div>
                    <div className='cat-container'>
                        {appInfo}
                        <div className="break"/>
                        {actionBar}
                        <div className="break"/>
                        {cats}
                        <div className="break"/>

                    </div>
                <div className='gutter'></div>
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
        const notesOut = this.props.notes.map( note => ( 
        <p>{note.message}</p>
        ));

        return(
        <div>
                {notesOut}
        </div>
        )
    }
}

export default Main;