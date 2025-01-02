import { useEffect, useState } from "react";

type CartState = {
  TotalItems: number;
  TotalPrice: number;
};

function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<CartState>({
    TotalItems: 0,
    TotalPrice: 0.0,
  });

  useEffect(() => {
    setIsLoading(true);

    const loadProducts = () => {
      setTimeout(() => {
        setProducts([]);
        setIsLoading(false);
        setState({ TotalItems: 0, TotalPrice: 0.0 });
      }, 400);
    };

    loadProducts();
  }, []);

  return (
    <div className="cart flex flex-wrap gap-2 mt-4 justify-center flex-grow mx-16">
      <div className="min-h-10 col-span-2 flex-1">
        <form className="flex flex-col gap-4 px-4">
          {isLoading && (
            <>
              <ProductPlaceholder></ProductPlaceholder>
              <ProductPlaceholder></ProductPlaceholder>
              <ProductPlaceholder></ProductPlaceholder>
            </>
          )}
          {!isLoading &&
            products.length > 0 &&
            products.map((product) => <div>{product.name} Product here</div>)}
          {!isLoading && products.length <= 0 && <EmptyCartMessage />}
        </form>
      </div>
      <div className="min-h-10 bg-white shadow-md max-h-fit flex-2">
        <div className="flex flex-col items-center justify-center px-5 py-4 gap-4">
          <p className="text-xl text-nowrap">
            Subtotal ({state.TotalItems} items):{" "}
            <strong>${state.TotalPrice.toFixed(2)}</strong>
          </p>
          <button
            type="button"
            disabled={isLoading || products.length === 0}
            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
function ProductPlaceholder() {
  return (
    <div className="p-4 bg-white flex gap-2 shadow-md">
      <div className="my-auto h-10 bg-gray-200 dark:bg-gray-700 w-10"></div>
      <div className="grow flex items-center justify-center max-w-[250px] h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="grow flex flex-col py-4">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-44 mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-44 mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-4"></div>
        <div className="mt-auto h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      </div>
      <div className="py-4">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
      </div>
    </div>
  );
}

function EmptyCartMessage() {
  return (
    <div className="bg-white flex flex-col items-center justify-center px-5 py-4 gap-4 shadow-md">
      <h2 className="text-xl text-nowrap">No product on cart</h2>
    </div>
  );
}

export default Cart;
