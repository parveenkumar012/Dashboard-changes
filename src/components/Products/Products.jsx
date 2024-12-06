import React from "react"
import ProductRow from "./ProductRow/ProductRow"

const Products = ({ products, renderTaskCards, expandCollapse }) => {
  return (
    <div>
      {products.map((product) => (
        <ProductRow key={product.id} product={product} renderTaskCards={renderTaskCards} expandCollapse={expandCollapse} />
      ))}
    </div>
  );
};

export default Products;
