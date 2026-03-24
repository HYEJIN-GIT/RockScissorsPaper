import React from 'react'


const Box = (props) => {
  const result =
  !props.result
    ? "결과없음"
    : props.title === "computer"
    ? props.result === "Tie"
      ? "Tie"
      : props.result === "Win"
      ? "Lose"
      : "Win"
    : props.result;
  
  return (
    <div className={`box-area ${result}`}>
      <h2>{props.title}</h2>
     <div className='state-area'>{props.item ? props.item.img : "💤" }</div>
     <div>결과 :{result}  </div>
    </div>
  )
}

export default Box
