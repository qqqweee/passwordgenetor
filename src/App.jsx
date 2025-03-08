import { useState } from 'react'
import './App.css'
import usepasswordgenerator from './hooks/usepasswordgen';

function App() {
  const [range, setrange] = useState(4)
  const [copy, setcopy] = useState(false)
  const [checkboxes, setcheckboxes] = useState({
    1: { title: "includes uppercase", state: false },
    2: { title: "includes lowercase", state: false },
    3: { title: "includes symbols", state: false },
    4: { title: "includes numbers", state: false },
  })
  const handlecheckbox = (key) => {
    setcheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [key]: {
        ...prevCheckboxes[key],
        state: !prevCheckboxes[key].state,
      },
    }));
  };
   
  const { password, error, generatepassword ,strength } = usepasswordgenerator()
  
  const handleclick =()=>{
    navigator.clipboard.writeText(password)
    setcopy(true)

    setTimeout(() => {
      setcopy(false)
    }, 500);
  };
  return (
    <>
      <div className="container">
        {password && <div className='header'>
          <div style={{fontSize:"20px"}}> {password} </div>
          <button className='buttons 'onClick={handleclick} > {copy?"copied":'copy'} </button>
        </div>}

        
        <div className='charlen'>
          <h1>Character Length</h1>
          <h1>{range}</h1>
        </div>

        <input className='ranger' type="range"
          min={4}
          max={20}
          value={range}
          onChange={(e) => { setrange(e.target.value) }} />

        <div className='footer'>
          {
            Object.keys(checkboxes).map((key, index) => (
              <div className='selectors' key={index}>
                <input type="checkbox" checked={checkboxes[key].state} onChange={() => handlecheckbox(key)} />
                <label> {checkboxes[key].title} </label>
              </div>
            ))
          }
        </div>
       <div style={{display:"flex",justifyContent:"space-between",textTransform:"capitalize",fontSize:"12px",marginBottom:"10px"}}>
       <span style={{color:"red",fontSize:"12px"}}>{error?"Please select atleast one option to generate password":" "}</span>
       <span>strength:{strength}</span>
       </div>
        <button className='buttons btn1' onClick={() => generatepassword(range, checkboxes)}>Generate password</button>
        
      </div>
    </>
  )
}

export default App
