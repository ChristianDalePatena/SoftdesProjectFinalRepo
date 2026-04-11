import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiPackage, FiImage, FiLogOut, FiEdit3, FiDownload, FiEye } from 'react-icons/fi';

// --- MOCK CUSTOMER DATA ---
const customerProfile = {
  name: "Juan Dela Cruz",
  email: "juan.delacruz@email.com",
  phone: "0912-345-6789",
  address: "123 Mabini St, Barangay San Lorenzo, Makati City, Metro Manila",
};

const mockOrders = [
  { id: "ORD-7X9P2A", date: "April 09, 2026", service: "Custom T-Shirt", qty: 50, total: 12500, status: "Processing", image: "/images/1/t-shirt.jpg" },
  { id: "ORD-3B1M8Z", date: "April 02, 2026", service: "Tarpaulin Banner", qty: 2, total: 900, status: "To Receive", image: "/images/1/tarpaulin.jpg" },
  { id: "ORD-9K4L2W", date: "March 15, 2026", service: "PVC ID Cards", qty: 100, total: 3600, status: "Completed", image: "/images/2/pvc.jpg" },
];

const mockDesigns = [
  { id: "DSGN-1", name: "Company Logo V2", type: "PNG", size: "2.4 MB", date: "Apr 09, 2026", preview: "https://placehold.co/400x300/eeeeee/999999?text=Logo" },
  { id: "DSGN-2", name: "Birthday Tarp Layout", type: "PDF", size: "15.1 MB", date: "Apr 02, 2026", preview: "https://placehold.co/400x300/eeeeee/999999?text=Tarp+Design" },
];

export default function AccountLogin() {
  const [activeTab, setActiveTab] = useState('profile');
  const [orderFilter, setOrderFilter] = useState('All');

  const filteredOrders = orderFilter === 'All' ? mockOrders : mockOrders.filter(order => order.status === orderFilter);

  const handleEditProfile = () => alert("[Backend Placeholder] Fetch user data and open Edit Profile Modal/Form");
  const handleUploadNew = () => alert("[Backend Placeholder] Trigger File Uploader API");

  const StatusBadge = ({ status }) => {
    const colors = {
      "Processing": "bg-orange-50 text-orange-600 border border-orange-100",
      "To Receive": "bg-blue-50 text-blue-600 border border-blue-100",
      "Completed": "bg-green-50 text-green-600 border border-green-100",
    };
    return (
      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${colors[status] || "bg-gray-50 text-gray-600"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex-1 bg-gray-300 py-16 font-sans min-h-screen">
      {/* Container widened to 90rem to eliminate dead space */}
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12">
        
        {/* --- LEFT SIDEBAR (Larger & More Prominent) --- */}
        <div className="w-full lg:w-1/3 xl:w-1/4">
          <div className="bg-white rounded-[2rem] shadow-xl border border-gray-200 p-10 h-fit transition-all duration-500">
            <div className="flex flex-col items-center text-center gap-6 mb-10 pb-10 border-b border-gray-100">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center shadow-inner border-4 border-gray-50">
                <FiUser className="text-6xl text-gray-300" />
              </div>
              <div>
                <p className="text-2xl font-thin tracking-widest text-gray-900 uppercase">{customerProfile.name}</p>
                <button 
                  onClick={handleEditProfile}
                  className="text-xs font-bold text-gray-400 hover:text-red-600 transition-colors flex items-center justify-center gap-2 mt-3 uppercase tracking-tighter"
                >
                  <FiEdit3 /> Edit Profile
                </button>
              </div>
            </div>

            <nav className="space-y-3">
              {[
                { id: 'profile', icon: FiUser, label: 'Edit Profile' },
                { id: 'orders', icon: FiPackage, label: 'Order History' },
                { id: 'designs', icon: FiImage, label: 'Saved Designs' }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)} 
                  className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl font-light tracking-wide transition-all duration-300 ${activeTab === tab.id ? 'text-white bg-gray-900 shadow-lg translate-x-2' : 'text-gray-500 hover:text-red-600 hover:bg-gray-50'}`}
                >
                  <tab.icon className="text-xl" /> {tab.label}
                </button>
              ))}
              
              <div className="pt-8 mt-6 border-t border-gray-100">
                <Link to="/signin" className="w-full flex items-center gap-5 px-6 py-4 rounded-2xl font-light text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all">
                  <FiLogOut className="text-xl" /> Sign Out
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* --- RIGHT CONTENT AREA --- */}
        <div className="w-full lg:w-2/3 xl:w-3/4">
          
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-200 p-10 md:p-14 animate-fade-in">
              <h2 className="text-4xl font-thin text-gray-900 mb-10 border-b border-gray-100 pb-8 tracking-widest uppercase">Edit Profile</h2>
              <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Profile Saved!'); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                    <input type="text" defaultValue={customerProfile.name} className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-red-600 rounded-2xl p-5 text-gray-900 font-light transition-all outline-none text-lg" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                    <input type="tel" defaultValue={customerProfile.phone} className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-red-600 rounded-2xl p-5 text-gray-900 font-light transition-all outline-none text-lg" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                    <input type="email" defaultValue={customerProfile.email} className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-red-600 rounded-2xl p-5 text-gray-900 font-light transition-all outline-none text-lg" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Delivery Address</label>
                    <textarea rows="4" defaultValue={customerProfile.address} className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-red-600 rounded-2xl p-5 text-gray-900 font-light transition-all outline-none resize-none text-lg leading-relaxed"></textarea>
                  </div>
                </div>
                <div className="pt-6">
                  <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-light uppercase tracking-widest text-sm px-12 py-5 rounded-full transition-all shadow-xl shadow-red-200 hover:scale-105 active:scale-95">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="animate-fade-in space-y-8">
              <div className="bg-white rounded-full shadow-sm border border-gray-200 flex p-2 overflow-x-auto no-scrollbar">
                {['All', 'Processing', 'To Receive', 'Completed'].map(status => (
                  <button 
                    key={status} 
                    onClick={() => setOrderFilter(status)} 
                    className={`flex-1 py-4 px-8 rounded-full font-light text-sm uppercase tracking-widest transition-all duration-300 ${orderFilter === status ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <div className="space-y-8">
                {filteredOrders.map(order => (
                  <div key={order.id} className="bg-white rounded-[2rem] shadow-xl border border-gray-200 overflow-hidden hover:border-red-100 transition-colors duration-500">
                    <div className="bg-gray-50/50 px-10 py-6 border-b border-gray-100 flex justify-between items-center">
                      <div className="flex gap-6 items-center">
                        <span className="font-light tracking-widest text-gray-900 text-lg uppercase">Order {order.id}</span>
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-tighter hidden md:block">Placed {order.date}</span>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="p-10 flex flex-col md:row gap-10 items-center">
                      <div className="w-32 h-32 bg-gray-100 rounded-[2rem] overflow-hidden border border-gray-200 shrink-0 shadow-inner">
                        <img src={order.image} alt={order.service} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" onError={(e) => {e.target.src='https://placehold.co/200x200?text=Product'}} />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-thin tracking-widest text-gray-900 uppercase">{order.service}</h3>
                        <p className="text-gray-400 font-light mt-2 text-lg">Quantity: {order.qty}</p>
                      </div>
                      <div className="md:text-right w-full md:w-auto border-t md:border-t-0 pt-6 md:pt-0 border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Total Amount</p>
                        <p className="text-4xl font-thin text-red-600">₱{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SAVED DESIGNS */}
          {activeTab === 'designs' && (
            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-200 p-10 md:p-14 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-100 pb-10 mb-12 gap-6">
                <div className="text-center sm:text-left">
                  <h2 className="text-4xl font-thin text-gray-900 tracking-widest uppercase">Saved Designs</h2>
                  <p className="text-gray-400 mt-2 font-light text-lg tracking-wide">Manage your uploaded artworks and assets</p>
                </div>
                <button 
                  onClick={handleUploadNew}
                  className="bg-gray-900 hover:bg-black text-white font-light uppercase tracking-widest text-xs px-10 py-5 rounded-full transition-all shadow-xl hover:scale-105"
                >
                  + Upload New
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {mockDesigns.map(design => (
                  <div key={design.id} className="group border border-gray-100 rounded-[2rem] overflow-hidden bg-gray-50/30 transition-all duration-500 hover:shadow-2xl hover:border-red-200">
                    <div className="h-64 relative overflow-hidden">
                      <img src={design.preview} alt={design.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 backdrop-blur-sm">
                        <button className="bg-white text-gray-900 p-4 rounded-full hover:bg-red-600 hover:text-white transition-all transform hover:scale-110"><FiEye size={24} /></button>
                        <button className="bg-white text-gray-900 p-4 rounded-full hover:bg-red-600 hover:text-white transition-all transform hover:scale-110"><FiDownload size={24} /></button>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-lg font-light tracking-widest text-gray-900 uppercase truncate" title={design.name}>{design.name}</h3>
                      <div className="flex justify-between items-center mt-6">
                        <span className="text-[10px] font-bold text-gray-400 bg-white border border-gray-100 px-3 py-1.5 rounded-lg uppercase tracking-widest">{design.type} • {design.size}</span>
                        <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">{design.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}