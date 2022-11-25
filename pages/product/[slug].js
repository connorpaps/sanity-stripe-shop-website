import React, {useState} from 'react';
import {client, urlFor} from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

// [] around slug dynamically loads content for every /product/item page route
const ProductDetails = ({ product, products }) => {

    const {image, name, details, price} = product;
    // state to determine current selected product preview image
    const [index, setIndex] = useState(0);
    // obtaining quantity functions from global context to use
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
    // add item and go straight to cart to buy now at checkout
    const handleBuyNow = () => {
        onAdd(product, qty);
        setShowCart(true);
    }

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[index])} 
                        className="product-detail-image" />
                    </div>
                    {/* displays large version of an image on hover of a small preview image*/}
                    <div className="small-images-container">
                        {image?.map((item, i) => (
                            <img 
                            key={i}
                            src={urlFor(item)} 
                            className={i === index ? 'small-image selected-image' : 'small-image'}
                            onMouseEnter={() => setIndex(i)}/>
                        ))}
                    </div>
                </div>
                {/* product details including reviews, description, price, and quantity/cart button functionality*/}
                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>
                    <div className="quantity">
                        <h3>Quantity</h3>
                        <p className="quantity-desc">
                            {/* uses quantity functions from context to change and track quantity on click*/}
                            <span className="minus" onClick={decQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className="num">
                                {qty}
                            </span>
                            <span className="plus" onClick={incQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        {/* uses onAdd function from state to add the product to the cart*/}
                        <button
                        type="button"
                        className="add-to-cart"
                        onClick={() => onAdd(product, qty)}>
                            Add to Cart
                        </button>
                        <button
                        type="button"
                        className="buy-now"
                        onClick={handleBuyNow}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
            {/* scrolling products list under the product details*/}                    
            <div className="maylike-products-wrapper">
                <h2>You make also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item) => (
                            <Product 
                            key={item._id}
                            product={item}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    // obtaining the slug property for the products, required for getStaticProps
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }` 
    const products = await client.fetch(query);
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));
    return {
        paths, fallback: 'blocking'
    }
}

// slug param is dynamic and will be whatever is in the url bar
export const getStaticProps = async ({ params: { slug }}) => {
    // getting product based on current slug that matches slug in sanity database
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';
    // fetching the current product and related products
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
    // queries returned and available above in ProductDetails props
    return {
      props: { products, product }
    }
  }

export default ProductDetails;