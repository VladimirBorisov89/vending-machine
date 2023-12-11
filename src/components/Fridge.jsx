export default function Fridge({ products, deposit, handleBuy }) {
    return (
        <div className="fridge">
            {
                products.map((product, index) => (
                    <span className="product" key={product.objectId}>
                        <h1 className="product-name">{product.name}</h1>
                        <img className="product-img" width="100px" src={product.img} alt={product.name} />
                        <p className="product-price">{product.price} €</p>
                        {<p className="product-stock">{product.stock} pieces</p>}
                        {deposit >= product.price && product.stock > 0 ?
                            <button className="buy-btn" onClick={() => handleBuy(index)}>Buy</button>
                            : product.stock === 0 ?
                                <p className="no-stock">Out of Stock</p>
                                :
                                <p className="no-money">Not enough money</p>
                        }
                    </span>
                ))
            }
        </div>
    )
}