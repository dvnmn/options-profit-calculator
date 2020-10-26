import React, { useState } from "react";
import "./Calculator.css";

function Output(props) {
    return (
        <div class="Output"></div>
    );
}

function Input(props) {
    return (
        <div class="Input">
            <p>Ticker: </p>
            <input type="text"></input>
            <p>Price: </p>
            <input type="text"></input>
            <p>Strike: </p>
            <input type="text"></input>
            <p>Type: </p>
            <input type="text"></input>

            <button>
                Click me!
            </button>
        </div>
    );
}


function Calculator() {
    return (
      <div className="Calculator">
          <Input />
          <Output />
      </div>
    );
}

export default Calculator;