"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, getToken, user } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state and logic
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const fetchSellerOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/order/seller-order", {
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

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = await getToken();
      const { data } = await axios.put(
        "/api/order/seller-order-update",
        { orderId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(`Order marked as ${status}`);
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerOrders();
    }
  }, [user]);

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium">Orders</h2>
          <div className="max-w-4xl rounded-md">
            {paginatedOrders.map((order, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
              >
                <div className="flex-1 flex gap-5 max-w-80">
                  <Image
                    className="max-w-16 max-h-16 object-cover"
                    src={order.items[0]?.product?.image?.[0] || assets.box_icon}
                    alt={order.items[0]?.product?.name || "product image"}
                    width={64}
                    height={64}
                  />
                  <p className="flex flex-col gap-3">
                    <span className="font-medium">
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
                      Status : <b>{order.status}</b>
                    </span>
                  </p>
                  {order.status === "Order Placed" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "Confirmed")}
                      className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Confirm Order
                    </button>
                  )}
                  {order.status === "Confirmed" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "Delivered")}
                      className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Mark as Delivered
                    </button>
                  )}
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
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;