export default function Coiner({ deposit, setDeposit, coins, setResetChange }) {

    function handleCoinInsert(coin) {
        // Add coin to deposit:
        setDeposit((deposit + (coin / 100)))
        // Clear change when new coin is inserted:
        setResetChange((prevResetChange) => !prevResetChange);
    }

    return (
        <div className="coiner">
            <h1 className="coins-header">Insert coins:</h1>
            {coins.map((coin) => (
                <button className="coin-btn" onClick={() => handleCoinInsert(coin)}>{coin} ¢</button>
            ))}
            <p className="deposit">Current deposit: {deposit.toFixed(2)} €</p>
        </div>
    )
}