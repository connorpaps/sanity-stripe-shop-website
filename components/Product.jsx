import React from 'react';
import Link from 'next/link';
// grabs image url from sanity dashboard
import { urlFor } from '../lib/client';

const Product = ({product: {image, name, slug, price}}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        {/*Creating a single product card with image, name, and price */}
        <div className="product-card">
          <img src={urlFor(image && image[0])} 
          width={250} 
          height={250}
          className="product-image"/>
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>

    </div>
  )
}

export default Product