"use client";
import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
  const { products } = useAppContext();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex flex-row items-center justify-between pt-12 w-full mb-4">
          <div className="flex flex-col">
            <p className="text-2xl font-medium">All products</p>
            <div className="w-16 h-0.5 bg-orange-600 rounded-full mt-1"></div>
          </div>
          <div>
            <select
              className="border rounded px-4 py-2 text-gray-700"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-0 pb-14 w-full">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
