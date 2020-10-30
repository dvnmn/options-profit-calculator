import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
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
                
                <button onClick={() => props.createOutput(
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
    const [chartData, setChartData] = useState({});
   
    const chart = () => {
        setChartData({
            labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            dataSets: [
                {
                    label: 'Title',
                    data: [32, 45, 12, 76, 69],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderWidth: 4
                }
            ]
        })
    }

    useEffect(() => {chart()}, [])

    return (
        <div class="Output">
            <div class="wrapper">
                <Line data={chartData} />
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