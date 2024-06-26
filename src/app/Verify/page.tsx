"use client"; // This is a client component 👈🏽

import React, { useState } from "react";
import SidebarWithNavbar from "../../components/SidebarWithNewbar";
import { CommonConstants } from "@/common/constants";

const products = [
  {
    id: 1,
    name: "Basmati Rice",
    href: "#",
    imageSrc: "basmati-rice-grains.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$50",
    color: "Black",
  },
  {
    id: 2,
    name: "Grapes",
    href: "#",
    imageSrc: "Grapes.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$70",
    color: "Black",
  },
  {
    id: 3,
    name: "Mango",
    href: "#",
    imageSrc: "pexels-ashan-2667738.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$233",
    color: "Black",
  },
  {
    id: 4,
    name: "Wheat",
    href: "#",
    imageSrc: "wheat.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$200",
    color: "Black",
  },
];

const data = [
  {
    id: 1,
    title: "Estimated delivery in 24 Nov 2023",
    subtitle: "Products delivered",
  },
  {
    id: 2,
    title: "Today",
    subtitle: "Products being delivered",
  },
  {
    id: 3,
    title: "23 Nov 2023, 15:15",
    subtitle: "Products in the courier",
  },
  {
    id: 4,
    title: "22 Nov 2023, 12:27",
    subtitle: "Products delivered to the courier - DHL Express",
  },
  {
    id: 5,
    title: "19 Nov 2023, 10:47",
    subtitle: "Payment accepted - VISA Credit Card",
  },
  {
    id: 6,
    title: "19 Nov 2023, 10:44",
    subtitle: "Order placed - Receipt #647563",
  },
];

const Verify = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [data, setData] = useState([]);
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = async (selectedprod: any) => {
    setSelectedProduct(selectedprod);
    setShowModal(true);
    setLoading(true);

    try {
      const productIdTemp = localStorage.getItem("userPaylod");
      let productDetails;
      if (productIdTemp) {
        productDetails = JSON.parse(productIdTemp);
      }
      console.log("productId::::", productDetails.productId);
      setProductId(productDetails.productId);
      const encodeUrl = encodeURIComponent(productDetails.productId as string);
      const response = await fetch(
        `${CommonConstants.BASE_URL}/product/${encodeUrl}`
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log("responseData::::", responseData);
        setData(responseData.data);
        console.log("data", { responseData });
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const filteredData = data.filter(
    (item) =>
      item["Product Name"] &&
      item["Farmer Name"] &&
      item["Date"] &&
      item["stateName"]
  );

  console.log({ data });
  return (
    <SidebarWithNavbar>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="text-2xl text-center font-bold tracking-tight text-gray-900">
            Verify Product Quality
          </h1>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute" />
                    {product.name}
                  </h3>{product.price}
                </div>
                <div className="mt-5 text-center">
                  <button
                    className="bg-blue-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => openModal(product.id)}
                  >
                    Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
          {showModal && selectedProduct ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full sm:w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Product Order history
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      {loading ? (
                        <div className="flex justify-center items-center">
                          <div className="loader">Loading...</div>{" "}
                          {/* Add your loader styling here */}
                        </div>
                      ) : (
                        <div className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          <div className="space-y-10">
                            <fieldset>
                              <div className="space-y-6">
                                <div className="relative flex gap-3">
                                  <div className="mt-6 sm:mt-8 lg:mt-0">
                                    <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                      <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                                        {filteredData.map((item, index) => (
                                          <li
                                            className="mb-10 sm:ms-6"
                                            key={item["Product Name"]}
                                          >
                                            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                              <svg
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  stroke="currentColor"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M5 11.917 9.724 16.5 19 7.5"
                                                />
                                              </svg>
                                            </span>
                                            <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">
                                              {item["stateName"]}
                                            </h4>
                                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                              Farmer: {item["Farmer Name"]}
                                            </p>
                                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                              Date: {item["Date"]}
                                            </p>
                                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                              Product Name: {item["Product Name"]}
                                            </p>
                                          </li>
                                        ))}
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      &nbsp;
                      <button
                        className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          window.location.href = `https://www.oklink.com/amoy/address/0xC4E9a43EA11658F440a9974bc3D29CE9f65db80A`;
                        }}
                      >
                        Check on Leader
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
    </SidebarWithNavbar>
  );
};

export default Verify;
