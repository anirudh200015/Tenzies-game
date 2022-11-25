import React from "react"

function Die(props){

    const style={ 
        backgroundColor: props.isHold === true ? "#59E391" : "white"

    }

    return (
       <div  onClick={ ()=>props.hold(props.id) } className="die"  style={style}>
       
                <h2 className="die-num" >{props.value}</h2>
       </div>           
    )
        
         
}

export default Die;