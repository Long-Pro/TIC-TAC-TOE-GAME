import Square from "./Square";
import React from 'react';

class Board extends React.Component{
    constructor(props){
        super(props);
    }
    
    
    render() {
        
        let content=this.props.squares.map((value,index)=>{
            return <Square
                value={value}
                onClick={() => this.props.onClick(index)}
                key={index.toString()}
             />
        })
        for(let i=0;i<content.length;i++){
            if((i)%27===0) content[i]=<div key ={i.toString()}>{content[i]}</div>
        } 
        return (
            <div>
                {content}  
            </div>
        );
    }
}
export default Board;