import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./Calculator.css";


/**
 * Componenet used to retrieve input from the user in the calculator.
 * 
 * @param props
 * @returns the left side of the calculator which takes input in from the user.
 */
function Input(props) {
    const [ticker, setTicker] = useState("");
    const [price, setPrice] = useState("");
    const [strike, setStrike] = useState("");
    const [type, setType] = useState("");
    const [optionsPrice, setOPrice] = useState("");

    /**
     * Validates the user's input to make sure there are no errors.
     * 
     * @returns true if no errors are found; false otherwise.
     */
    const validate = () => {
        let error = "";

        //Strike test
        if (/[^0-9.]/.test(strike) || strike === "") {
            error += "Invalid strike.\n";
            setStrike("");
        }

        if (type === "") {
            error += "Please select an option type.\n";
            setType("");
        }
        //Option price test
        if (/[^0-9.]/.test(optionsPrice) || optionsPrice === "") {
            error += "Invalid options price.\n";
            setOPrice("");
        }

        //If the error is not empty, alert the error/s and return false.
        if (error !== "") {
            alert(error);
            return false;
        }

        return true;
    };

    /**
     * Grabs the current price of the given ticker using Finacial Modeling Prep's
     * realtime stock data API.
     */
    const getTickerPrice = () => {
        var numbers = 'demo';

        //Requests the ticker's price from Financial Modeling Prep's API
        getRequest(
            'https://financialmodelingprep.com/api/v3/quote-short/'
            + ticker + '?apikey=' + numbers,
           
            (responseText) => {
                let resp = JSON.parse(responseText);

                /**
                 * Attemps to acquire the price value from the JSON resp.
                 * If an error is thrown, alerts the user that the given ticker is invalid.
                 */
                try {
                    setPrice(resp[0].price);
                } catch (e) {
                    alert("Invalid ticker.");
                }
            }
        );

        function getRequest(url, success) {
            var req = false;
            
            try {
                req = new XMLHttpRequest();
            } catch (e) {
                return false;
            }

            if (!req) return false;
            if (typeof success != 'function') success = function() {};
            
            req.onreadystatechange = () => {
                if (req.readyState == 4) {
                    if (req.status === 200) {
                        success(req.responseText)
                    }
                }
            }
        
            req.open("GET", url, true);
            req.send(null);
            
            return req;
        }
    }

    return (
        <div class="Input">
            <div class="wrapper">
                {/* Obtains ticker symbol from the user. */}
                <input 
                    type="text"
                    placeholder="Ticker"
                    value={ticker} 
                    onChange={(e) => setTicker(e.target.value)}
                    onBlur={() => getTickerPrice()}
                ></input>
                
                {/* Obtains the price of the underlying from the user. */}
                <input 
                    type="text"
                    placeholder="Current price"
                    value={price} 
                    readOnly
                ></input>
                
                {/* Obtains the strike price of the option from the user. */}
                <input 
                    type="text"
                    placeholder="Strike price"
                    value={strike} 
                    onChange={(e) => setStrike(e.target.value)}
                ></input>
            
                {/* Drop-down list with types of options the user can choose. */}
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="" id="typeTitle" disabled selected>Choose an option type</option>
                    <option value="Call">Call</option>
                    <option value="Put">Put</option>
                </select>

                {/* Obtains the price of the option from the user. */}
                <input 
                    type="text"
                    placeholder="Option Price"
                    value={optionsPrice} 
                    onChange={(e) => setOPrice(e.target.value)}
                ></input>
                
                {/* When button is pressed, the output graph is rendered. */}
                <button onClick={() => {
                    if (validate()) {
                        props.createOutput(
                            <Output 
                                ticker={ticker.toUpperCase()} 
                                price={price}
                                strike={strike}
                                type={type}
                                optionPrice={optionsPrice}
                            />
                        )
                    }
                }}>Calculate</button>           
            </div>
        </div>
    );
}

/**
 * Creates the table showing profit/losses on the given options play.
 * 
 * @param props
 * @returns the right side of the calculator which displays a graph and other information 
 * about the given option play.
 */
function Output(props) {
    const [chartData, setChartData] = useState({});
   
    /**
     * Renders the line graph showing the profit/losses of the given option play.
     */
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
    
    /**
     * Calculates the x-axis representing the price of the underlying stock.
     * 
     * @returns an Array with the price points that will be displayed on the graph.
     * It will always include the strike price of the option as the middle value.
     */
    const calcKeyPrices = () => {
        var keyPrices = [];

        keyPrices.push(props.strike - 4);
        keyPrices.push(props.strike - 2);
        keyPrices.push(props.strike);
        keyPrices.push(parseInt(props.strike) + 2);
        keyPrices.push(parseInt(props.strike) + 4);

        return keyPrices;
    };
    
    /**
     * Calculates the profit/loss values for the given option play and returns
     * an array with the profit/loss at the given price points.
     * 
     * @param {Array} prices 
     * @param {String} optionType 
     * @returns profit/loss values at the given price points.
     */
    const calcProfitLoss = (prices, optionType) => {
        switch(optionType.toLowerCase()) {
            case "call": return calcCall(prices);
            case "put": return calcPut(prices);
        }
    };

    /**
     * Calculates the profit/losses of a PUT option.
     * 
     * @param {Array} prices 
     * @retursn profit/loss values at the given price points.
     */
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

    /**
     * Calculates the profit/losses of a CALL options.
     * 
     * @param {Array} prices
     * @returns profit/loss values at the given price points.
     */
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
 * 
 * @returns calculator component.
 */
function Calculator() {
    const [output, setOutput] = useState("");
    const [basicSelected, setBasicSelection] = useState("selected");
    const [spreadsSelected, setSpreadSelection] = useState("");

    return (
        <div class="Calculator">
            <div class="calc-navbar">
                <button 
                    class={basicSelected}
                    onClick={() => {
                        setBasicSelection("selected");
                        setSpreadSelection("");
                    }}
                >Basic</button>
                <button 
                    class={spreadsSelected}
                    onClick={() => {
                        setBasicSelection("");
                        setSpreadSelection("selected");
                    }}
                >Spreads</button>
            </div>

            <div class="calc-main">
                <Input createOutput={setOutput} />
                {output}
            </div>
        </div>
    );
}

export default Calculator;