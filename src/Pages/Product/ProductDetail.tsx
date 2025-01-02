import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const [milkOption, setMilkOption] = useState<string>("Whole Milk");
  const [extras, setExtras] = useState<string[]>([]);

  const { product } = useParams();
  const [productData, setProductData] = useState<Product>({
    category: [],
    description: "",
    disabled: false,
    id: 0,
    imageUrl: "",
    name: "",
    price: 0,
    rating: 0,
    ratingCount: 0,
    ratingSum: 0,
  });

  useEffect(() => {
    const FetchProduct = async () => {
      try {
        const response = await axios.get<Product[]>(
          `https://localhost:44309/api/Product?query=${product}`,
        );
        if (response.data) {
          setProductData(response.data[0]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    FetchProduct();
  }, []);

  const milkOptions = ["Whole Milk", "Skim Milk", "Almond Milk", "Oat Milk"];
  const extraOptions = [
    "Extra Shot",
    "Whipped Cream",
    "Caramel Drizzle",
    "Vanilla Syrup",
  ];

  const handleExtrasChange = (extra: string) => {
    setExtras((prevExtras) =>
      prevExtras.includes(extra)
        ? prevExtras.filter((item) => item !== extra)
        : [...prevExtras, extra],
    );
  };

  const handleAddToCart = () => {
    alert(
      `Added to cart: ${productData.name} with ${milkOption} and ${extras.join(", ")}`,
    );
  };

  const handleBuyNow = () => {
    alert(
      `Purchased: ${productData.name} with ${milkOption} and ${extras.join(", ")}`,
    );
  };

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="max-w-5xl w-full flex">
        <div className="w-1/2">
          <img
            src={productData.imageUrl ?? "https://via.placeholder.com/600x800"}
            alt={productData.name}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-semibold mb-4">{productData.name}</h1>
          <p className="text-gray-600 mb-6">{productData.description}</p>
          <p className="text-2xl font-bold mb-6">
            ${productData.price.toFixed(2)}
          </p>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Milk Option:
            </label>
            <select
              value={milkOption}
              onChange={(e) => setMilkOption(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {milkOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Extras:
            </label>
            <div className="flex flex-wrap gap-3">
              {extraOptions.map((extra) => (
                <div className="flex items-center mb-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    checked={extras.includes(extra)}
                    onChange={() => handleExtrasChange(extra)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    //for="default-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {extra}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
