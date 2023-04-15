import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from 'react';
import {Configuration, OpenAIApi} from "openai";
//import "dotenv";
//require('dotenv').config()

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function runPrompt(food){
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `what is the carbon footprint of ${food}? answer only a number. if unable to answer, give me the closest number to the average. I want you to answer only a number with no other words. answer only a number.`
  });
  console.log(completion);
  return (completion.data.choices[0].text);
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [foods, setFoods] = useState([]);
  const table = document.getElementById("table");
  const [carbon, setCarbon] = useState({});



  const handleInputChange = (event) => {
    setInputValue(event.target.value);

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Input value:', inputValue);
    setFoods([...foods, inputValue]);
    const newCarbon = await runPrompt(inputValue);
    console.log("debug", newCarbon);
    const newCarbonObject = carbon;
    newCarbonObject[inputValue] = newCarbon;
    console.log("other debug", newCarbonObject);
    setCarbon(newCarbonObject);


    // Here you can send the inputValue to a server or update the UI with the input value.
  };

  /*
  const rows = foods.length;
  const columns = 2;
  for (let i=0; i < rows; i++){
    const row = table.insertRow(i);
    for(let j=0; j<columns;j++){
      const cell = row.insertCell(j);
    }
  } */
  const list = useEffect(()=> {return foods.map((item) =>
    <tr>
      <td>{item}</td>
      <td>{carbon[item]}</td>
    </tr>)}, [foods, carbon]
  )

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter input: 
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <table id="table">
      <tr>
        <th>Foods</th>
        <th>Carbon Footprint</th>
      </tr>
      {
        list
      }
    </table>
    </div>
  );
  /*
  console.log("Env var", process.env.CHAT_GPT_API_KEY);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Again
        </a>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Second Button
        </a>
      </header>
    </div>
  ); */
}

export default App;
