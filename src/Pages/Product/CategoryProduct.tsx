import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CategoryProduct() {
  const { category } = useParams();
  const [Products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          `https://localhost:44309/api/Product?query=${category?.replace("_", "")}`,
        );
        if (response.data) {
          setProducts(response.data);
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        console.log("fetch products done");
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {Products.map((product) => (
          <a
            href={
              "/menu/" +
              category +
              "/" +
              product.name.replace(" ", "_").toLowerCase()
            }
            key={product.name}
            className="flex items-center flex-col justify-start gap-2 hover:bg-gray-50 p-2"
          >
            <div className="w-36 h-36 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
              <img
                src="https://via.placeholder.com/300x300"
                alt={"Not found"}
              />
            </div>
            <span className="my-auto font-bold text-xl">{product.name}</span>
          </a>
        ))}
      </div>
    </>
  );
}

export default CategoryProduct;
