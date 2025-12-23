"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconTruck,
  IconBox,
  IconCircleCheck,
  IconClock,
  IconShoppingBag,
  IconSend,
} from "@tabler/icons-react";
import { getAllUserOrdersRequest } from "@/api/order/orderAPI";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Types
type OrderItem = {
  ProductItem: string;
  ProductName?: string;
  productImage?: string;
  price?: number;
  quantity: number;
};

type Order = {
  _id: string;
  OrderItems: OrderItem[];
  total_price: number;
  order_status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
};

// Status styles
const statusStyle = {
  pending: { label: "Pending", icon: <IconClock size={16} />, gradient: "bg-gradient-to-r from-yellow-300 via-yellow-200 to-amber-300 text-yellow-900" },
  processing: { label: "Processing", icon: <IconTruck size={16} />, gradient: "bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 text-blue-900" },
  shipped: { label: "Shipped", icon: <IconSend size={16} />, gradient: "bg-gradient-to-r from-indigo-400 via-indigo-300 to-blue-300 text-indigo-900" },
  delivered: { label: "Delivered", icon: <IconCircleCheck size={16} />, gradient: "bg-gradient-to-r from-green-400 via-emerald-300 to-teal-300 text-green-900" },
  cancelled: { label: "Cancelled", icon: <IconBox size={16} />, gradient: "bg-gradient-to-r from-rose-400 via-pink-300 to-rose-200 text-rose-900" },
};

export default function PurchasedProducts() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllUserOrdersRequest();
        setOrders(res.data?.orders || []);
      } catch (err: unknown) {
        let errorMessage = "Failed to load orders";
        if (err instanceof Error) {
          errorMessage = err.message || errorMessage;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading your amazing orders...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (orders.length === 0)
    return (
      <div className="min-h-[70vh] flex flex-col mx-auto items-center justify-center text-gray-500 text-center gap-3">
        <IconShoppingBag className="w-12 h-12 opacity-60" />
        <p className="text-lg font-medium">You haven’t placed any orders yet.</p>
      </div>
    );
  

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen font-sans">
      <h2 className="text-4xl font-extrabold mb-10 text-gray-800 tracking-wide text-center drop-shadow-sm">My Orders</h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => {
          const firstItem = order.OrderItems[0];
          const title = firstItem?.ProductName || "Product";
          // const image = firstItem?.productImage || "https://via.placeholder.com/400x300";
          const placedAt = new Date(order.createdAt).toLocaleDateString();
          const formattedPrice = new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", minimumFractionDigits: 2 }).format(order.total_price);
          const status = statusStyle[order.order_status];

          const productNames = order.OrderItems.map((item) => item.ProductName).filter(Boolean).join(", ");

          return (
            <motion.div key={order._id} layout>
              <Card
                className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/60 backdrop-blur-xl hover:scale-[1.04] transition-transform duration-300 cursor-pointer border border-gray-100"
                onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400" />

                <CardContent className="p-5 space-y-3">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1 tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">{title}</h3>
                      <p className="text-xs text-gray-500 mt-1 italic">Placed on {placedAt}</p>
                      <p className="text-sm text-gray-700 mt-1 line-clamp-1" title={productNames}>
                        {productNames}
                      </p>
                      <p className="text-sm text-gray-700 mt-1 font-medium">{order.OrderItems.length} item{order.OrderItems.length > 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-indigo-600 font-extrabold text-lg bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-500 bg-clip-text text-transparent">
                        {formattedPrice}
                      </span>
                      <Badge className={cn("flex items-center gap-1 px-3 py-1 rounded-full shadow-md font-semibold", status.gradient)}>
                        {status.icon} {status.label}
                      </Badge>
                    </div>
                  </div>

                  <button
                    className="w-full py-2 mt-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition shadow-lg"
                    onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
                  >
                    {expandedOrderId === order._id ? "Hide Details" : "View Order"}
                  </button>

                  <AnimatePresence>
                    {expandedOrderId === order._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-3 border-t border-gray-200 pt-3 max-h-80 overflow-y-auto"
                      >
                        {order.OrderItems.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-white/50 backdrop-blur-md p-2 rounded-xl shadow-md">
                            <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                              <Image
                                src={item.productImage || "https://via.placeholder.com/48"}
                                alt={item.ProductName || "Product"}
                                width={56}
                                height={56}
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 tracking-wide">{item.ProductName}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <span className="font-bold text-indigo-600">
                              {new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", minimumFractionDigits: 2 }).format(item.price || 0)}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
