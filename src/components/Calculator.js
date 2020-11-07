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
            labels: [
                props.price - 3, 
                props.price - 2,
                props.price - 1,
                props.price,
                parseInt(props.price) + 1,
                parseInt(props.price) + 2,
                parseInt(props.price) + 3, 
            ],
            datasets: [
              {
                label: `${props.ticker} ${props.strike} ${props.type}`,
                data: [-3, -3, -3, 0, 3, 6, 9],
                borderColor: 'rgba(255, 99, 132, 100)',
                fill: false,
                borderJoinStyle: 'miter',
                lineTension: 0
              }
            ]
        });
    };

    useEffect(() => {
        chart();
    });

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