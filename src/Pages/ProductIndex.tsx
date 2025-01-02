import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Paginated } from "../Types/PaginatedResponse";
import FullPageLoader from "../Components/FullPageLoader.tsx";

interface Params {
  page: number;
  pageSize: number;
  searchQuery?: string;
}

function ProductIndex() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      // Extraer valores directamente de searchParams
      const page = parseInt(searchParams.get("page") || "1", 10);
      const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
      const searchQuery = searchParams.get("search") || undefined;

      try {
        const query = `?pageIndex=${page}&pageSize=${pageSize}${
          searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : ""
        }`;

        const response = await axios.get<Paginated<Product>>(
          `https://localhost:44309/api/product/Paginated${query}`,
        );

        if (response.data.entities) {
          setProducts(response.data.entities);
        }
        if (response.data.totalPages) {
          setTotalPages(totalPages);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
        setParams({ page: page, pageSize: pageSize, searchQuery: searchQuery });
      }
    };

    fetchProducts();
  }, [searchParams]);

  // Renderizar contenido
  if (isLoading)
    return (
      <FullPageLoader
        header={"Loading..."}
        message={"Please wait while we retrieve the latest products for you."}
      ></FullPageLoader>
    );

  return (
    <div className="mt-4 mx-auto grid grid-rows-[1fr_auto_1fr] max-w-[1500px] gap-4 px-4">
      {/* Header - begin */}
      <div className="flex justify-between flex-wrap">
        <div className="py-2">
          <span>1-10 of over 100 result for *Product*</span>
        </div>
        <div className="col-start-3 grid">
          <select
            id="countries"
            className=" max-w-sm justify-self-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </select>
        </div>
      </div>
      {/* Header - end */}

      {/* List - begin */}
      <ProductIndex_List products={products} />
      {/* List - end */}

      {/* navigation - begin */}
      <Navigation
        currentPage={params.page}
        pageSize={params.pageSize}
        totalPages={totalPages}
        searchParams={params.searchQuery}
      />
      {/* navigation - end */}
    </div>
  );
}

function Navigation({
  currentPage = 1,
  pageSize = 10,
  totalPages = 1,
  searchParams,
}: {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  searchParams?: string;
}) {
  const prevOptions = Array.from(Array(currentPage).keys())
    .map((num) => currentPage - num)
    .filter((n) => n < currentPage)
    .slice(0, 2)
    .reverse();

  const nextOptions = Array.from(Array(totalPages + 1).keys())
    .filter((n) => n > currentPage)
    .slice(0, 2);

  return (
    <nav aria-label="Page navigation example" className="flex justify-center">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          {currentPage > 1 ? (
            <a
              href={
                `/products?page=${currentPage - 1}&pageSize=${pageSize}` +
                (searchParams != undefined ? `&query=${searchParams}` : "")
              }
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          ) : (
            <p className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 cursor-not-allowed">
              Previous
            </p>
          )}
        </li>
        {prevOptions.map((n) => (
          <li key={n}>
            <a
              href={
                `/products?page=${n}&pageSize=${pageSize}` +
                (searchParams != undefined ? `&query=${searchParams}` : "")
              }
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {n}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            aria-current="page"
            className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            {currentPage}
          </a>
        </li>
        {nextOptions.map((n) => (
          <li key={n}>
            <a
              href={
                `/products?page=${n}&pageSize=${pageSize}` +
                (searchParams != undefined ? `&query=${searchParams}` : "")
              }
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {n}
            </a>
          </li>
        ))}
        <li>
          {totalPages > currentPage ? (
            <a
              href={
                `/products?page=${currentPage + 1}&pageSize=${pageSize}` +
                (searchParams != undefined ? `&query=${searchParams}` : "")
              }
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          ) : (
            <p className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-not-allowed">
              Next
            </p>
          )}
        </li>
      </ul>
    </nav>
  );
}

function ProductIndex_List({ products }: { products: Product[] }) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4">
      {products.map((product, i) => {
        return (
          <ProductCard
            key={`product-card-${i}${product.name}`}
            product={product}
          />
        );
      })}
    </div>
  );
}

export default ProductIndex;
