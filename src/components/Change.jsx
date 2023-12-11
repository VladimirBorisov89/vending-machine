import { useState, useEffect } from "react";

export default function Change({ deposit, setDeposit, coins, resetChange }) {
    const [change, setChange] = useState({});

    // Clear old change when new coin is inserted:
    useEffect(() => {
        setChange({});
    }, [resetChange])

    function handleChange() {
        const coinsSorted = coins.toSorted((a, b) => b - a);
        const newChange = {};
        let newDeposit = deposit;
        for (let i = 0; i < coinsSorted.length; i++) {
            if (newDeposit / (coinsSorted[i] / 100) >= 1) {
                newChange[coinsSorted[i]] = Math.floor(newDeposit / (coinsSorted[i] / 100));
                newDeposit %= coinsSorted[i] / 100;
                newDeposit = Math.round(newDeposit * 100) / 100;
            }
        }
        setDeposit(newDeposit);
        setChange(newChange);
    }

    return (
        <div className="change">
            <button className="drop-change-btn" onClick={handleChange}>Drop the change</button>
            <ul className="change-list">
                {Object.keys(change).map((coin) => <li className="change-list-item">{change[coin]}x {coin} ¢</li>)}
            </ul>
        </div>
    )
}