// import './App.css';
import { catData } from './data';
import React from 'react'

function App() {
  const handleBtnClick= async()=>{
    try {
      const response = await fetch('https://api.example.com/data');
      const jsonData = await response.json();

      console.log("JSON",jsonData)
    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  return (
    <div>
      <div className="grid-container">
        {catData.map((data,i)=>{
            return(
              <div key={i} className="card">
                <h3>{data.title}</h3>
                {/* <img onClick={<ImageModal src={data.logo} alt="Example Image"/>} src={data.logo} alt="loading"/> */}
                <img src={data.logo} alt="loading"/>
              </div>
            )
          })}
      </div>
      <button onClick={handleBtnClick}>Save</button>
    </div>
  );
}

export default App;
