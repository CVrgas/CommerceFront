import cartStore from "../App/Store/cart.ts";
import userStore from "../App/Store/user.ts";
import { useEffect, useState } from "react";
import user from "../App/Store/user.ts";

type CardProp = {
  product: Product;
};

function ProductCard({ product }: CardProp) {
  const cart = cartStore((s) => s.Products);
  const [quantity, setQuantity] = useState(0);
  const totalStars = 5;
  const stars = Array.from({ length: totalStars }, (_, index) =>
    index < product.rating ? "★" : "☆",
  );

  const onIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const onDecrement = () => {
    setQuantity((prev) => prev - 1);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-md shadow-black bg-white border">
      <div className="w-full h-48">
        <img
          className="w-full h-full object-cover"
          src={product.imageUrl ?? "https://via.placeholder.com/300x200"}
          alt="Product Image"
        />
      </div>
      <div className="px-4 py-2">
        <h3 className="font-bold text-xl mb-2">{product.name}</h3>
        <p className="text-gray-700 text-base truncate">
          {product.description}
        </p>
        <div className="flex items-center my-2">
          <span className="text-yellow-400 text-lg">{stars}</span>
          <span className="text-gray-600 text-sm ml-2">
            ({product.ratingCount} Reviews)
          </span>
        </div>
      </div>
      <div className="px-4 py-2 flex items-center justify-between">
        <span className="font-bold text-lg">${product.price}</span>
        {quantity > 0 ? (
          <div className="flex items-center">
            <button
              className="text-blue-500 bg-gray-200 font-bold py-1 px-4 rounded-l-full hover:bg-blue-100"
              onClick={onDecrement}
            >
              -
            </button>
            <p className="py-1 px-4">{quantity}</p>
            <button
              className="text-blue-500 bg-gray-200 font-bold py-1 px-4 my-1 rounded-r-full hover:bg-blue-100"
              onClick={onIncrement}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            onClick={onIncrement}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
