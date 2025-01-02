import { Link, useParams } from "react-router-dom";
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
  }, [category]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {Products.map((product) => (
          <Link
            to={
              "/menu/" +
              category +
              "/" +
              product.name.replace(" ", "_").toLowerCase()
            }
            key={product.name}
            className="flex items-center flex-row lg:flex-col justify-start gap-2 hover:bg-gray-50 p-2"
          >
            <div className="w-28 h-28 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="https://via.placeholder.com/300x300"
                alt={"Not found"}
              />
            </div>
            <span className="my-auto font-bold text-xl">{product.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default CategoryProduct;
