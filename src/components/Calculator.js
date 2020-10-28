import React, { useState } from "react";
import "./Calculator.css";


function Input(props) {
    const [ticker, setTicker] = useState("");
    const [price, setPrice] = useState("");
    const [strike, setStrike] = useState("");
    const [type, setType] = useState("");

    return (
        <div class="Input">
            <div class="wrapper">
                <p>Ticker: </p>
                <input 
                    type="text" 
                    value={ticker} 
                    onChange={(e) => setTicker(e.target.value)}
                ></input>
                
                <p>Price: </p>
                <input 
                    type="text"
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                ></input>
                
                <p>Strike: </p>
                <input 
                    type="text"
                    value={strike} 
                    onChange={(e) => setStrike(e.target.value)}
                ></input>
            
                <p>Type: </p>
                <input 
                    type="text"  
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                ></input>
                
                <button onClick = {() => props.createOutput(
                    <Output 
                        ticker={ticker} 
                        price={price}
                        strike={strike}
                        type={type}
                    />)}
                >Click me!</button>
            </div>
        </div>
    );
}


function Output(props) {
    return (
        <div class="Output">
            <div class="wrapper">
                <p>
                    Ticker: {props.ticker} <br/>
                    Price: {props.price} <br/>
                    Strike: {props.strike} <br/>
                    Type: {props.type} <br/>
                </p>
            </div>
        </div>
       
    );
}


function Calculator() {
    const [output, setOutput] = useState("");
   
    return (
      <div className="Calculator">
          <Input createOutput={setOutput} />
          {output}
      </div>
    );
}

export default Calculator;