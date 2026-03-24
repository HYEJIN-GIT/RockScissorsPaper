import { Children, useState } from 'react'
import Box from './component/Box'
import './App.css'


const choice = {
  rock : {
    name : "Rock",
    img : "✊",
  },
  scissors : {
    name : "Scissors",
    img : "✌️",
  }
  ,
  paper : {
    name : "Paper",
    img : "✋",
  }
}

function App() {
  const [count, setCount] = useState(0)

  //1. 박스 2개 (사진정보,타이틀,결과)
  //2. 버튼
  //3. 버튼 클릭 시 클릭한 값이 보임
  //4. 컴퓨터의 값은 랜덤하게 선택이 됨
  //5. 3 4번의 결과를 가지고 누가 이겼는지 승패 여부 따지기
  //6. 테두리 컬러 정하기 (이길때, 질때, 비겼을때)

  const [userSelect,setUserSelect]=useState(null)
  const [computerSelect,setComputerSelect] = useState(null)
  const [result,setResult] = useState('')
  const [chance,setChance]  = useState(5)
  const [userWin,setUserWin] = useState(0)
  const [computerWin,setComputerWin] = useState(0)

  // 버튼 영역
  const play = (userChoice)=>{
    if (chance === 0) {
      return;
    }
     
    setChance(prev=>prev-1)

  setUserSelect(choice[userChoice])
  const random = randomSelect()
  setComputerSelect(choice[random])
  const resultContent = judgement(choice[userChoice],choice[random])
  setUserWin(prev=>
    {
      if(resultContent === "Win")
      return prev+1

      return prev
    }
 )

 setComputerWin(prev=>
  {
    if(resultContent === "Lose")
    return prev+1

    return prev
  }
)

  setResult(resultContent)

  }

  //computer Random 영역

  const randomSelect = ()=>{
    let array = Object.keys(choice)
    let randomContent = Math.floor(Math.random()* array.length)
    let final = array[randomContent]
  return  final
  
  }

  //result
  const judgement = (user,computer)=>{
    if(user.name === computer.name) return "Tie"
    if(user.name === "Rock") return computer.name === "Scissors"? 'Win' : "Lose"
    if(user.name === "Scissors") return computer.name === "Paper"? 'Win' : "Lose"
    if(user.name === "Paper") return computer.name === "Rock"?  'Win' : "Lose"
  console.log("user,computer",user,computer)
  }

const reset = ()=>{
  setChance(5)
  setResult('')
  setComputerSelect(null)
  setUserSelect(null)
  setUserWin(0)
  setComputerWin(0)
}


  return (
    <div className='boarder-area'>
      <div className='score-board'>기회 : {chance}번</div>
    <div className='box-container'>
      <Box title="user" item={userSelect} result={result} win={userWin} />
      <h2>vs</h2>
      <Box title="computer" item={computerSelect} result={result} win={computerWin} />
    </div>
  
  <div className='result-text'>
 전체 결과는 {
    chance === 0
      ? userWin > computerWin
        ? "유저가 이겼습니다!"
        : computerWin > userWin
        ? "컴퓨터가 이겼습니다!"
        : "무승부입니다!"
      : " "
  }
   </div>
    <div className='btn-area'>
      <button disabled={chance === 0}  onClick={() => play("rock")}>주먹</button>
      <button  disabled={chance === 0}  onClick={() => play("scissors")}>가위</button>
      <button  disabled={chance === 0}  onClick={() => play("paper")}>보</button>
    
    </div>
    <div className='reset-area'>
    <button   onClick = {()=>reset()}>리셋</button>
    </div>
   
  </div>
  )
}

export default App
