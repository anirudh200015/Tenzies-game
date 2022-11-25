import React from "react"
import style from "./style.css"
import Die from "./component/Die"
import Confetti from "react-confetti"


let moves=0  // for total no of moves taken to solve to game 
let flag=false

function App(){

    const [best,setBest]=React.useState(JSON.parse(localStorage.getItem("best")) || 100000)
    const [tenzies,setTenzies] =React.useState(false)
    const [numbers,setNumbers] =React.useState(allNewDice())
    
    
    React.useEffect(()=>{            
       
        const held=numbers.every(die=> die.isHeld===true)
        const first= numbers[0].value
        const all_val=numbers.every(die => die.value===first)
        
        if(held && all_val){
            setTenzies(true) 
            
            if(moves<best){
                 
                flag=true 
                setBest(moves)
                
                localStorage.setItem("best",JSON.stringify(moves))
            }
        }
        
        
     },[numbers])
     


    function allNewDice() {
        const newDice = []
         for (let i = 0; i < 10; i++) {
             newDice.push( {
                 id:i,              
                 value: Math.ceil(Math.random() * 6) , 
                 isHeld:false 
                 })
             
         } 
         return newDice
     }

     function hold(id){
         
        setNumbers(oldval=>
           
            oldval.map(item=>{
          return  (     item.id===id ? 
                {
                    ...item,
                    isHeld: !item.isHeld    
                }
                :        
                    item
          )
                
            })
        
        )
        
    }




   React.useEffect(()=>{  
    
    
        console.log("setting")
    
       localStorage.setItem("best",JSON.stringify(best))

       return (
        localStorage.setItem("best",JSON.stringify(best))
       )
       
   }, [best])
    

    function handleChange() {
        moves=moves+1

        console.log(moves)

        setNumbers(oldval=>{
        const array=[]         
        oldval.map(item=>{
            array .push({...item,
                value : item.isHeld=== false ? Math.ceil(Math.random() * 6) :item.value
            })
            
            })
        return array
        })
    }
   
    function playAgain (){
        moves=0
        flag=false
        setTenzies(false)
        setNumbers(allNewDice)
    }
    




const diceElements = numbers.map(die =>(

                < Die key={die.id} 
                value={die.value} 
                id={die.id}
                isHold={die.isHeld}
                hold={hold}
                />
            ))

    return (
        <main>
        {
        tenzies===false 
        ?

        <div className= "game-board">
            <h1> Tenzies</h1>
            <h3 className="moves">Moves: {moves}</h3>
            <p className="discription">  Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={handleChange}>Roll</button>
        
        </div>

    :

    <div className="win-div">  
    <h1> CONGRATULATIONS!!! </h1>
    { flag===true ? <p className="high_score"> High Score!!! </p> : "" }

    <div className="score">
                <h2>Score: {moves}</h2>
                
                <h2>Best Score : { best}</h2>
    </div>
    <Confetti /> 
        
    <button  onClick={playAgain}  className="play-again"> Play Again </button>
    </div>
        }
        </main>
    )
}

export default App;