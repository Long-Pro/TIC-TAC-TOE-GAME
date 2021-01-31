import React from 'react';
import Board from './Board'

class Game extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        squares: Array(26*26).fill(null),
        xIsNext: true   ,
        isPvP:true
      };
  }
  handleClick(i) {
    const squares = this.state.squares;
    if (squares[i]!=null ||calculateWinner(squares)!=null) {
      return;
    }
    
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
    
  }
  render() {
    let isPvP=this.state.isPvP;
    let status=<span>Next player: </span>;
    let winner=calculateWinner(this.state.squares);
    
    if(this.state.isPvP==false&&this.state.xIsNext){
      let t=findNextValue(this.state.squares);
      this.handleClick(t);
    }
    
    if(winner===null)status=this.state.xIsNext?
      <span>{status}<span style={{fontSize:'100px',color:'red'}}>X</span> </span>:
      <span>{status}<span style={{fontSize:'100px',color:'blue'}}>O</span> </span>;
    
    if(winner==='X') status=<span><span>Winner : </span><span style={{fontSize:'100px',color:'red'}}>X</span> </span>;
    if(winner==='O') status=<span><span>Winner : </span><span style={{fontSize:'100px',color:'blue'}}>O</span> </span>;
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>

        <div className="game-info">
          <div className="status">{status}</div>
          <div  >
            <button 
              class="bttn-slant bttn-lg bttn-primary"
              
              onClick={()=>{
                this.setState({squares: Array(26*26).fill(null),isPvP:true})
              }}
            >Playes VS Playes</button>
            
            <button 
              class="bttn-slant bttn-lg bttn-primary"
              style={{marginLeft:'100px'}}
              onClick={()=>{
                this.setState({squares: Array(26*26).fill(null),isPvP:false})
              }}
            >Playes VS Computer</button>
            
            
          </div>
        </div>
        
      </div>
    );
  }
}


function calculateWinner(arr) {
  let t=[];
  for(let i=0;i<arr.length/26;i++)t.push(arr.slice(i*26,i*26+26));

  for(let i=0;i<26;i++)
    for(let j=0;j<26;j++) if(t[i][j]!=null) {
      let r=25,u=25,ru=Math.min(25-i,25-j),ul=Math.min(i,25-j),kt=0;

      kt=0;
      for(let k=i;k<=r;k++) if(t[k][j]===t[i][j]) kt++;else break;
      if(kt==5) return t[i][j];

      kt=0;
      for(let k=j;k<=u;k++) if(t[i][k]===t[i][j]) kt++;else break;
      if(kt==5) return t[i][j];

      kt=0;
      for(let k=0;k<=ru;k++) if(t[i+k][j+k]===t[i][j]) kt++;else break;
      if(kt==5) return t[i][j];

      kt=0;
      for(let k=0;k<=ul;k++) if(t[i-k][j+k]===t[i][j]) kt++;else break;
      if(kt==5) return t[i][j];
    }
  return null;
}
function findNextValue(arr) {
  let t;
  while(true){
    t= Math.floor(Math.random() * 676);
    if(arr[t]===null) return t;
  }

}
export default Game;