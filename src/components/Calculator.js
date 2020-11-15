import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./Calculator.css";


/**
 * Componenet used to retrieve input from the user in the calculator.
 * @param props 
 */
function Input(props) {
    const [ticker, setTicker] = useState("");
    const [price, setPrice] = useState("");
    const [strike, setStrike] = useState("");
    const [type, setType] = useState("");
    const [optionsPrice, setOPrice] = useState("");

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

                <p>Option Price: </p>
                <input 
                    type="text"  
                    value={optionsPrice} 
                    onChange={(e) => setOPrice(e.target.value)}
                ></input>
                
                <button onClick={() => props.createOutput(
                    <Output 
                        ticker={ticker} 
                        price={price}
                        strike={strike}
                        type={type}
                        optionPrice={optionsPrice}
                    />)}
                >Click me!</button>
            </div>
        </div>
    );
}

/**
 * Creates the table showing profit/losses on the given options play.
 * @param props 
 */
function Output(props) {
    const [chartData, setChartData] = useState({});
   
    const chart = () => {
        setChartData({
            labels: calcKeyPrices(),
            datasets: [{
                label: `${props.ticker} ${props.strike} ${props.type}`,
                data: calcProfitLoss(calcKeyPrices()),
                borderColor: 'rgba(255, 99, 132, 100)',
                fill: false,
                borderJoinStyle: 'miter',
                lineTension: 0
            }]
        });
    };
    
    const calcKeyPrices = () => {
        var keyPrices = [];

        keyPrices.push(props.strike - 4);
        keyPrices.push(props.strike - 2);
        keyPrices.push(props.strike);
        keyPrices.push(parseInt(props.strike) + 2);
        keyPrices.push(parseInt(props.strike) + 4);

        return keyPrices;
    };

    const calcProfitLoss = (prices) => {
        var profitLoss = [];

        for (var i = 0; i < prices.length; i ++) {
            if (prices[i] <= props.strike) {
                let loss = 0 - parseFloat(props.optionPrice);
                profitLoss.push(loss * 100);
            } else{
                let profit = prices[i] - props.strike - props.optionPrice;
                profitLoss.push(profit * 100);
            }
        }

        return profitLoss;
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

/**
 * Creates the main calculator found in the middle of the application.
 */
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