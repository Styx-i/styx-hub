"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { currency, getToken, user } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/order/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setOrders(data.orders.reverse());
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        <div className="space-y-5">
          <h2 className="text-lg font-medium mt-6">My Orders</h2>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="max-w-5xl border-t border-gray-300 text-sm">
                {paginatedOrders.map((order, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
                  >
                    <div className="flex-1 flex gap-5 max-w-80">
                      <Image
                        className="max-w-16 max-h-16 object-cover"
                        src={
                          order.items[0]?.product?.image?.[0] || assets.box_icon
                        }
                        alt={order.items[0]?.product?.name || "product image"}
                        width={64}
                        height={64}
                      />
                      <p className="flex flex-col gap-3">
                        <span className="font-medium text-base">
                          {order.items
                            .map(
                              (item) => item.product.name + ` x ${item.quantity}`
                            )
                            .join(", ")}
                        </span>
                        <span>Items : {order.items.length}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-medium">
                          {order.address.fullName}
                        </span>
                        <br />
                        <span>{order.address.area}</span>
                        <br />
                        <span>{`${order.address.city}, ${order.address.state}`}</span>
                        <br />
                        <span>{order.address.phoneNumber}</span>
                      </p>
                    </div>
                    <p className="font-medium my-auto">
                      {currency}
                      {order.amount}
                    </p>
                    <div>
                      <p className="flex flex-col">
                        <span>Method : COD</span>
                        <span>
                          Date : {new Date(order.date).toLocaleDateString()}
                        </span>
                        <span>
                          Status: <b>{order.status}</b>
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center gap-4 py-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;