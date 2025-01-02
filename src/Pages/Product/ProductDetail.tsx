import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetail() {
  const { product } = useParams();
  const [productData, setProductData] = useState<Product>();

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
  return (
    <>
      <h1>{productData?.name ?? "?"}</h1>
      <p>{productData?.price.toFixed(2) ?? 0.0}</p>
    </>
  );
}

export default ProductDetail;
