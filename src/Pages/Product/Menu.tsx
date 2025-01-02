import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useLocation } from "react-router-dom";

function Menu() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const location = useLocation();
  const isMenuRoot = location.pathname === "/menu";

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);

      try {
        const url = "https://localhost:44309/ProductCategory/GetCategories";
        const response = await axios.get<ProductCategory[]>(url);

        if (response.data) {
          setCategories(response.data.map((v) => v.name));
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-blue-500 font-medium">Loading...</span>
      </div>
    );
  }

  return (
    <div className="h-full bg-white py-4 px-8 flex-grow">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl lg:text-5xl">Menu</h1>
        {!isMenuRoot && (
          <Link
            to={"/menu"}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            go back
          </Link>
        )}
      </div>
      <hr className="my-2 border border-t-0 border-gray-400" />
      {isMenuRoot ? (
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
          {categories.map((category) => (
            <Link
              to={"/menu/" + category.replace(" ", "_")}
              key={category}
              className="flex gap-2 hover:bg-gray-50 p-2"
            >
              <div className="w-28 h-28 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                <img
                  src="https://via.placeholder.com/300x300"
                  alt={"Not found"}
                />
              </div>
              <span className="ml-4 my-auto font-bold text-xl lg:text-3xl">
                {category}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default Menu;
