import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiPackage, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiEdit2, 
  FiTrash2,
  FiEye,
  FiAlertCircle,
  FiX,
  FiDownload,
  FiMapPin,
  FiCreditCard
} from 'react-icons/fi';

// --- MOCK DATA ---
const initialOrders = [
  {
    id: "ORD-10294",
    date: "April 11, 2026",
    status: "Pending",
    total: 4500.00,
    items: [
      { name: "Custom T-Shirt", qty: 30, details: "Cotton, Large, Black" }
    ],
    canEdit: true,
  },
  {
    id: "ORD-09832",
    date: "April 08, 2026",
    status: "Processing",
    total: 1250.00,
    items: [
      { name: "Tarpaulin Banner", qty: 1, details: "3x6 ft, Matte finish" },
      { name: "Custom Stickers", qty: 100, details: "Die-cut, Glossy" }
    ],
    canEdit: false,
  },
  {
    id: "ORD-08711",
    date: "March 22, 2026",
    status: "Completed",
    total: 8900.00,
    items: [
      { name: "PVC ID Cards", qty: 50, details: "Standard CR80, with Lanyards" }
    ],
    canEdit: false,
  },
  {
    id: "ORD-08502",
    date: "March 15, 2026",
    status: "Cancelled",
    total: 600.00,
    items: [
      { name: "Personalized Mugs", qty: 4, details: "White, Magic Mug" }
    ],
    canEdit: false,
  }
];

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("All");
  
  // NEW: State to control the View Details Modal
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter logic
  const filteredOrders = orders.filter(order => {
    if (activeTab === "All") return true;
    return order.status === activeTab;
  });

  // Actions
  const handleCancelOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to cancel order ${orderId}?`)) {
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: "Cancelled", canEdit: false } 
          : order
      ));
    }
  };

  const handleEditOrder = (orderId) => {
    alert(`Edit mode activated for ${orderId}.`);
  };

  // Helper for status styling
  const getStatusDisplay = (status) => {
    switch (status) {
      case "Pending":
        return { color: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: <FiClock /> };
      case "Processing":
        return { color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: <FiPackage /> };
      case "Completed":
        return { color: "bg-green-500/10 text-green-400 border-green-500/20", icon: <FiCheckCircle /> };
      case "Cancelled":
        return { color: "bg-red-500/10 text-red-400 border-red-500/20", icon: <FiXCircle /> };
      default:
        return { color: "bg-gray-500/10 text-gray-400 border-gray-500/20", icon: <FiPackage /> };
    }
  };

  return (
    <div className="flex-1 bg-gray-300 py-16 md:py-24 font-sans min-h-screen relative">
      {/* UPDATED: max-w-6xl to make the central column wider and roomier */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {/* UPDATED: font-thin and uppercase tracking-widest for minimalist look */}
            <h1 className="text-4xl md:text-5xl font-thin uppercase tracking-widest text-gray-900 mb-4">
              My Orders
            </h1>
            <p className="text-gray-600 text-lg font-light tracking-wide">
              Track, manage, and review your printing requests.
            </p>
          </div>
          
          <Link to="/shop" className="inline-flex items-center justify-center bg-[#0a0f14] text-white px-8 py-3.5 rounded-full font-light text-xs uppercase tracking-[0.2em] hover:bg-red-600 transition-all duration-300 shadow-lg border border-gray-800 hover:border-red-500 hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            Start New Order
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-10 gap-4 no-scrollbar">
          {["All", "Pending", "Processing", "Completed", "Cancelled"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab 
                  ? "bg-[#0a0f14] text-white shadow-md border border-gray-700" 
                  : "bg-gray-200 text-gray-500 border border-gray-300 hover:border-gray-400 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {/* UPDATED: gap-10 for more breathing room between cards */}
        <div className="flex flex-col gap-10">
          {filteredOrders.length === 0 ? (
            <div className="bg-[#0a0f14] rounded-3xl border border-gray-800 p-20 flex flex-col items-center justify-center text-center shadow-sm">
              <FiAlertCircle className="text-6xl text-gray-700 mb-6" />
              <h3 className="text-3xl font-light tracking-wide text-white mb-3">No orders found</h3>
              <p className="text-gray-500 font-light text-lg">You don't have any {activeTab !== "All" ? activeTab.toLowerCase() : ""} orders yet.</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const statusDisplay = getStatusDisplay(order.status);
              
              return (
                <div key={order.id} className="bg-[#0a0f14] rounded-[2rem] border border-gray-800 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-gray-700">
                  
                  {/* Card Header */}
                  {/* UPDATED: p-8 md:p-10 for larger padding inside the card */}
                  <div className="border-b border-gray-800 p-8 md:px-10 py-6 bg-[#111820] flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Order ID</p>
                      {/* UPDATED: font-light and text-2xl */}
                      <h2 className="text-2xl font-light tracking-wide text-white">{order.id}</h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-8">
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Date Placed</p>
                        <p className="text-base font-light tracking-wide text-gray-300">{order.date}</p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border ${statusDisplay.color}`}>
                          {statusDisplay.icon}
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-8 md:p-10 bg-[#1a232e]">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Items Summary</p>
                    <div className="flex flex-col gap-6">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-[#0a0f14] border border-gray-800 rounded-2xl flex items-center justify-center text-gray-500 shrink-0 shadow-inner">
                              <FiPackage className="text-2xl" />
                            </div>
                            <div>
                              {/* UPDATED: font-light tracking-wide */}
                              <h3 className="text-xl font-light tracking-wide text-white">{item.name}</h3>
                              <p className="text-sm text-gray-400 font-light mt-1">{item.details}</p>
                            </div>
                          </div>
                          <span className="text-sm font-light tracking-widest text-gray-300 bg-[#0a0f14] border border-gray-800 px-4 py-2 rounded-xl">
                            Qty: <strong className="font-bold">{item.qty}</strong>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="border-t border-gray-800 p-8 md:px-10 py-6 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-[#111820]">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Total Amount</p>
                      {/* UPDATED: text-3xl font-light */}
                      <p className="text-3xl font-light tracking-wide text-white">₱{order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      {/* TRIGGER MODAL */}
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-light tracking-wider text-gray-300 bg-[#1a232e] hover:text-white hover:bg-gray-800 border border-gray-700 transition-colors"
                      >
                        <FiEye /> View Details
                      </button>

                      {order.canEdit && (
                        <button 
                          onClick={() => handleEditOrder(order.id)}
                          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-light tracking-wider text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
                        >
                          <FiEdit2 /> Edit Order
                        </button>
                      )}

                      {order.canEdit && (
                        <button 
                          onClick={() => handleCancelOrder(order.id)}
                          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-light tracking-wider text-red-500 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                        >
                          <FiTrash2 /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                  
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* --- VIEW DETAILS MODAL --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          {/* Modal Container */}
          <div className="bg-[#0a0f14] w-full max-w-3xl rounded-[2rem] border border-gray-800 shadow-2xl flex flex-col max-h-[90vh] animate-fade-in overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-8 border-b border-gray-800 bg-[#111820]">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Order Details</p>
                <h2 className="text-2xl font-light tracking-wide text-white">{selectedOrder.id}</h2>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-8 overflow-y-auto bg-[#1a232e] text-gray-300 space-y-10 flex-1 custom-scrollbar">
              
              {/* Top Info Grid */}
              <div className="grid grid-cols-2 gap-8 bg-[#111820] p-8 rounded-2xl border border-gray-800">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Status</p>
                  <p className="font-light tracking-wide text-lg text-white">{selectedOrder.status}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Date Ordered</p>
                  <p className="font-light tracking-wide text-lg text-white">{selectedOrder.date}</p>
                </div>
              </div>

              {/* Delivery & Payment Mock Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-5">
                  <FiMapPin className="text-3xl text-gray-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Delivery Address</p>
                    <p className="text-base font-light tracking-wide leading-relaxed text-gray-300">123 Printing Ave.<br/>Brgy. San Lorenzo<br/>Makati City, 1223</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <FiCreditCard className="text-3xl text-gray-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Payment Method</p>
                    <p className="text-base font-light tracking-wide leading-relaxed text-gray-300">GCash<br/>Ref: 0001928374</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800"></div>

              {/* Items List */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Items Included</p>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-[#111820] p-6 rounded-2xl border border-gray-800">
                      <div>
                        <p className="font-light text-lg tracking-wide text-white">{item.name}</p>
                        <p className="text-sm font-light text-gray-400 mt-1">{item.details}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-light text-gray-400 tracking-wide">Qty: <span className="text-white font-bold">{item.qty}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-800"></div>

              {/* Price Breakdown */}
              <div className="space-y-4 text-base font-light tracking-wide">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-gray-300">₱{(selectedOrder.total - 150).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping Fee</span>
                  <span className="text-gray-300">₱150.00</span>
                </div>
                <div className="flex justify-between pt-6 mt-4 border-t border-gray-800 items-end">
                  <span className="font-bold text-gray-500 uppercase tracking-widest text-xs">Total</span>
                  <span className="text-3xl font-light text-red-500">₱{selectedOrder.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-gray-800 bg-[#111820] flex justify-end">
              <button className="flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-light tracking-widest uppercase text-white bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700">
                <FiDownload size={18} /> Download Invoice
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}