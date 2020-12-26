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
                {/* Obtains ticker symbol from the user. */}
                <p>Ticker: </p>
                <input 
                    type="text" 
                    value={ticker} 
                    onChange={(e) => setTicker(e.target.value)}
                ></input>
                
                {/* Obtains the price of the underlying from the user. */}
                <p>Price: </p>
                <input 
                    type="text"
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                ></input>
                
                {/* Obtains the strike price of the option from the user. */}
                <p>Strike: </p>
                <input 
                    type="text"
                    value={strike} 
                    onChange={(e) => setStrike(e.target.value)}
                ></input>
            
                {/* Obtains the type of option from the user. */}
                <p>Type: </p>
                <input 
                    type="text"  
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                ></input>

                {/* Obtains the price of the option from the user. */}
                <p>Option Price: </p>
                <input 
                    type="text"  
                    value={optionsPrice} 
                    onChange={(e) => setOPrice(e.target.value)}
                ></input>
                
                {/* When button is pressed, the output graph is rendered. */}
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
   
    //Renders the line graph showing the profit/loss of the given option play.
    const chart = () => {
        setChartData({
            labels: calcKeyPrices(),
            datasets: [{
                label: `${props.ticker} ${props.strike} ${props.type}`,
                data: calcProfitLoss(calcKeyPrices(), props.type),
                borderColor: 'rgba(255, 99, 132, 100)',
                fill: false,
                borderJoinStyle: 'miter',
                lineTension: 0
            }]
        });
    };
    
    //Calculates the x-axis representing the price of the underlying stock.
    const calcKeyPrices = () => {
        var keyPrices = [];

        keyPrices.push(props.strike - 4);
        keyPrices.push(props.strike - 2);
        keyPrices.push(props.strike);
        keyPrices.push(parseInt(props.strike) + 2);
        keyPrices.push(parseInt(props.strike) + 4);

        return keyPrices;
    };

    //Calculates the profit/loss values for the given option.
    const calcProfitLoss = (prices, optionType) => {
        switch(optionType) {
            case "call": return calcCall(prices);
            case "put": return calcPut(prices);
        }
    };

    //Calculates the profit/losses of a put option.
    const calcPut = (prices) => {
        var profitLoss = [];

        for (var i = 0; i < prices.length; i++) {
            /**
             * If the price of the underlying is less than the strike,
             * profit or a lesser loss was made.
             */
            if (prices[i] <= props.strike) {
                let profit = props.strike - prices[i] - props.optionPrice;
                profitLoss.push(profit * 100);
            
            /**
             * If the price of the underylying is greater than the strike,
             * a full loss was made.
             */
            } else{
                let loss = 0 - parseFloat(props.optionPrice);
                profitLoss.push(loss * 100);
            }
        }

        return profitLoss;
    }

    //Calculates the profit/losses of a call option.
    const calcCall = (prices) => {
        var profitLoss = [];

        for (var i = 0; i < prices.length; i++) {
            /**
             * If the price of the underlying is greater than the strike,
             * profit or a lesser loss was made.
             */
            if (prices[i] <= props.strike) {
                let loss = 0 - parseFloat(props.optionPrice);
                profitLoss.push(loss * 100);
           
           /**
             * If the price of the underylying is less than the strike,
             * a full loss was made.
             */
            } else{
                let profit = prices[i] - props.strike - props.optionPrice;
                profitLoss.push(profit * 100);
            }
        }

        return profitLoss;
    }

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