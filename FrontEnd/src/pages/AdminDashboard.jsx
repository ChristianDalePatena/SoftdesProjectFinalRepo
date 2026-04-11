import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPieChart, FiBox, FiUsers, FiSettings, FiLogOut, FiRefreshCw, FiDownload } from 'react-icons/fi';

// --- REALISTIC INITIAL DATA ---
const initialOrders = [
  { id: "ORD-7X9P2A", customer: "Juan Dela Cruz", service: "Custom T-Shirt", date: "2026-04-09", status: "Pending", total: 1250, file: "team_logo.png", notes: "" },
  { id: "ORD-3B1M8Z", customer: "Maria Clara", service: "Tarpaulin Banner", date: "2026-04-08", status: "Processing", total: 450, file: "birthday_tarp.pdf", notes: "Rush order, needs bright colors." },
  { id: "ORD-9K4L2W", customer: "Pedro Penduko", service: "PVC ID Cards", date: "2026-04-07", status: "Completed", total: 3600, file: "id_data_batch1.csv", notes: "Picked up by customer." },
  { id: "ORD-1A2B3C", customer: "Leni Robredo", service: "Custom Stickers", date: "2026-04-09", status: "Pending", total: 850, file: "campaign_stickers.jpg", notes: "Die-cut requested." }
];

const mockCustomers = [
  { id: "CUST-001", name: "Juan Dela Cruz", email: "juan.delacruz@email.com", phone: "0912-345-6789", orders: 12, spent: 15400, joined: "Jan 12, 2026" },
  { id: "CUST-002", name: "Maria Clara", email: "maria.clara@email.com", phone: "0998-765-4321", orders: 3, spent: 4500, joined: "Feb 05, 2026" },
  { id: "CUST-003", name: "Pedro Penduko", email: "pedro.p@email.com", phone: "0917-111-2222", orders: 1, spent: 3600, joined: "Apr 07, 2026" },
  { id: "CUST-004", name: "Leni Robredo", email: "leni.r@email.com", phone: "0922-333-4444", orders: 5, spent: 8500, joined: "Mar 20, 2026" }
];

const topServices = [
  { name: "Custom T-Shirt", percentage: 45 },
  { name: "Tarpaulin Banner", percentage: 30 },
  { name: "Custom Stickers", percentage: 15 },
  { name: "PVC ID Cards", percentage: 10 },
];

const trendData = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 18 },
  { label: 'Wed', value: 25 },
  { label: 'Thu', value: 21 },
  { label: 'Fri', value: 38 },
  { label: 'Sat', value: 45 },
  { label: 'Sun', value: 32 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState(initialOrders);
  const [customers, setCustomers] = useState(mockCustomers);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [noteInput, setNoteInput] = useState("");

  const [settings, setSettings] = useState({
    storeName: "Pick2Print",
    contactEmail: "admin@pick2print.com",
    contactPhone: "0947-463-1561",
    emailNotifications: true,
    smsNotifications: false
  });

  // --- HANDLERS ---
  const fetchDashboardData = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleSaveNotes = (orderId) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, notes: noteInput } : o));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert("Backend Trigger: Store settings saved successfully!");
  };

  const maxTrendValue = Math.max(...trendData.map(d => d.value));

  // --- UI COMPONENTS ---
  const StatusBadge = ({ status }) => {
    const colors = {
      Pending: "bg-red-50 text-red-600 border-red-100",
      Processing: "bg-blue-50 text-blue-600 border-blue-100",
      Completed: "bg-green-50 text-green-600 border-green-100"
    };
    return (
      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${colors[status]}`}>
        {status}
      </span>
    );
  };

  const NavButton = ({ tabId, icon, label, badgeCount }) => (
    <button 
      onClick={() => setActiveTab(tabId)}
      className={`w-full flex justify-between items-center px-5 py-4 rounded-xl text-base font-medium transition-all ${
        activeTab === tabId 
          ? 'bg-red-600 text-white shadow-md' 
          : 'text-gray-400 hover:text-white hover:bg-gray-800'
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </div>
      {badgeCount > 0 && (
        <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${activeTab === tabId ? 'bg-white text-red-600' : 'bg-gray-700 text-gray-300'}`}>
          {badgeCount}
        </span>
      )}
    </button>
  );

  return (
    // STRICT SCREEN FIT: h-screen and overflow-hidden prevent double scrollbars
    <div className="flex h-screen overflow-hidden bg-[#f0f2f5] text-gray-900 font-sans selection:bg-red-500 selection:text-white">
      
      {/* SIDEBAR */}
      <div className="w-[300px] bg-[#111827] flex flex-col shrink-0 border-r border-gray-800 shadow-2xl">
        <div className="p-8 flex items-center gap-4 border-b border-gray-800/50">
          <img src="/images/logo_original.png" alt="Logo" className="w-10 h-10 bg-white rounded p-1" onError={(e) => {e.target.style.display='none'}} />
          <h2 className="text-2xl font-bold tracking-wide text-white">Pick2Print</h2>
        </div>
        
        <nav className="flex-1 px-6 space-y-2 mt-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-3 mb-4">Management</p>
          <NavButton tabId="overview" icon={<FiPieChart />} label="Dashboard" />
          <NavButton tabId="orders" icon={<FiBox />} label="Orders" badgeCount={orders.filter(o => o.status === 'Pending').length} />
          <NavButton tabId="customers" icon={<FiUsers />} label="Customers" />
          <NavButton tabId="settings" icon={<FiSettings />} label="Settings" />
        </nav>

        <div className="p-6 mt-auto bg-gray-900/50">
          <Link to="/" className="flex items-center justify-center gap-3 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl px-4 py-4 text-sm font-medium transition">
            <FiLogOut className="text-xl" /> Back to Store
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT (Scrolls independently) */}
      <div className="flex-1 overflow-y-auto p-10 lg:p-14">
        
        {/* --- TAB: OVERVIEW --- */}
        {activeTab === 'overview' && (
          // EXPANDED CONTAINER: max-w-[110rem] makes it massive and fills wide screens
          <div className="w-full max-w-[110rem] mx-auto space-y-10 animate-fade-in">
            
            {/* Header */}
            <div className="flex justify-between items-end pb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-gray-500 text-lg mt-2 font-light">Monitor your store's performance and recent activity.</p>
              </div>
              <button 
                onClick={fetchDashboardData} 
                disabled={isRefreshing} 
                className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 shadow-sm"
              >
                <FiRefreshCw className={`text-lg ${isRefreshing ? 'animate-spin text-gray-400' : ''}`} />
                {isRefreshing ? 'Syncing...' : 'Refresh Data'}
              </button>
            </div>
            
            {/* Revenue Cards - Made fatter and taller */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-red-600">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Daily Revenue</p>
                <h2 className="text-5xl font-black text-gray-900">₱4,250</h2>
              </div>
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-gray-800">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Weekly Revenue</p>
                <h2 className="text-5xl font-black text-gray-900">₱28,400</h2>
              </div>
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-gray-800">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Monthly Revenue</p>
                <h2 className="text-5xl font-black text-gray-900">₱112,000</h2>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* Trend Graph - Taller (h-[480px]) */}
              <div className="bg-white p-10 rounded-2xl xl:col-span-2 shadow-sm border border-gray-100 flex flex-col h-[480px]">
                <h3 className="text-xl font-bold text-gray-900 mb-8">Order Volume (Past 7 Days)</h3>
                <div className="flex-1 flex items-end justify-around gap-4 mt-auto">
                  {trendData.map((data, idx) => {
                    const height = (data.value / maxTrendValue) * 100;
                    return (
                      <div key={idx} className="flex flex-col items-center w-full max-w-[60px] h-full justify-end group">
                        <span className="text-xs font-bold text-gray-400 mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          {data.value}
                        </span>
                        <div className="w-full bg-[#fde8e8] group-hover:bg-red-500 rounded-t-md transition-all duration-300" style={{ height: `${height}%`, minHeight: '8px' }}></div>
                        <span className="text-xs font-bold text-gray-400 mt-4 uppercase tracking-widest">{data.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Most Requested Services - Taller (h-[480px]) */}
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[480px]">
                <h3 className="text-xl font-bold text-gray-900 mb-8">Top Services</h3>
                <div className="space-y-8 flex-1 flex flex-col justify-center">
                  {topServices.map((service, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-3">
                        <span className="font-semibold text-gray-700">{service.name}</span>
                        <span className="font-black text-gray-900">{service.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: `${service.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- TAB: ORDERS --- */}
        {activeTab === 'orders' && !selectedOrder && (
          // Expanded wrapper for Orders table
          <div className="w-full max-w-[110rem] mx-auto space-y-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Order Management</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-gray-50/80 border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-5 font-bold text-gray-500 uppercase tracking-widest text-xs">Service</th>
                    <th className="px-8 py-5 font-bold text-gray-500 uppercase tracking-widest text-xs">Order ID</th>
                    <th className="px-8 py-5 font-bold text-gray-500 uppercase tracking-widest text-xs">Customer Name</th>
                    <th className="px-8 py-5 font-bold text-gray-500 uppercase tracking-widest text-xs">Status</th>
                    <th className="px-8 py-5 font-bold text-gray-500 uppercase tracking-widest text-xs text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6 font-bold text-base text-gray-900">{order.service}</td>
                      <td className="px-8 py-6 text-base text-gray-500 font-mono">{order.id}</td>
                      <td className="px-8 py-6 font-medium text-base text-gray-700">{order.customer}</td>
                      <td className="px-8 py-6"><StatusBadge status={order.status} /></td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => { setSelectedOrder(order); setNoteInput(order.notes || ""); }} 
                          className="bg-white border-2 border-gray-200 hover:border-gray-900 hover:text-gray-900 text-gray-600 px-6 py-2.5 rounded-lg transition-colors font-bold text-sm shadow-sm"
                        >
                          Manage Order
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB: CUSTOMERS --- */}
        {activeTab === 'customers' && (
          // Expanded wrapper for Customers table
          <div className="w-full max-w-[110rem] mx-auto space-y-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Customer Directory</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-gray-50/80 border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-5 font-bold text-gray-500 uppercase tracking-widest text-xs">Customer Details</th>
                    <th className="px-8 py-5 font-bold text-gray-500 uppercase tracking-widest text-xs">Contact</th>
                    <th className="px-8 py-5 font-bold text-gray-500 uppercase tracking-widest text-xs">Total Orders</th>
                    <th className="px-8 py-5 font-bold text-gray-500 uppercase tracking-widest text-xs">Lifetime Spent</th>
                    <th className="px-8 py-5 font-bold text-gray-500 uppercase tracking-widest text-xs">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.map((cust) => (
                    <tr key={cust.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6">
                        <p className="font-bold text-base text-gray-900">{cust.name}</p>
                        <p className="text-xs text-gray-400 mt-1 font-mono">{cust.id}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-base font-medium text-gray-700">{cust.email}</p>
                        <p className="text-sm text-gray-500 mt-1">{cust.phone}</p>
                      </td>
                      <td className="px-8 py-6 text-xl font-black text-gray-900">{cust.orders}</td>
                      <td className="px-8 py-6 text-xl font-black text-green-600">₱{cust.spent.toLocaleString()}</td>
                      <td className="px-8 py-6 text-sm font-medium text-gray-500">{cust.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB: SETTINGS --- */}
        {activeTab === 'settings' && (
          <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Store Settings</h1>
            
            <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 space-y-10">
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">Store Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Store Name</label>
                    <input type="text" value={settings.storeName} onChange={(e) => setSettings({...settings, storeName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-base text-gray-900 font-semibold focus:outline-none focus:border-red-500 transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Contact Email</label>
                    <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-base text-gray-900 font-semibold focus:outline-none focus:border-red-500 transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Contact Phone</label>
                    <input type="tel" value={settings.contactPhone} onChange={(e) => setSettings({...settings, contactPhone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-base text-gray-900 font-semibold focus:outline-none focus:border-red-500 transition" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">Admin Notifications</h3>
                <div className="space-y-6">
                  <label className="flex items-center gap-4 cursor-pointer group w-fit">
                    <input type="checkbox" checked={settings.emailNotifications} onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})} className="w-5 h-5 accent-red-600 cursor-pointer" />
                    <span className="text-base text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Email me when a new order is placed</span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer group w-fit">
                    <input type="checkbox" checked={settings.smsNotifications} onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})} className="w-5 h-5 accent-red-600 cursor-pointer" />
                    <span className="text-base text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Send SMS text for Rush Orders</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <button type="submit" className="bg-gray-900 hover:bg-black text-white font-bold text-sm uppercase tracking-wider px-10 py-4 rounded-xl transition-colors shadow-lg">
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        )}

      </div>

      {/* --- ORDER MANAGEMENT MODAL --- */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="bg-white rounded-[2rem] p-10 max-w-3xl w-full shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Manage Order</p>
                <h2 className="text-3xl font-black text-gray-900">{selectedOrder.id}</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-red-600 text-4xl transition-colors">&times;</button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Customer</p>
                <p className="font-bold text-gray-900 text-xl">{selectedOrder.customer}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Service</p>
                <p className="font-bold text-gray-900 text-xl">{selectedOrder.service}</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Action 1 */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Customer Design File</label>
                <button 
                  onClick={() => alert(`Backend Trigger: Downloading -> ${selectedOrder.file}`)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-900 py-4 rounded-xl border-2 border-gray-200 flex items-center justify-center gap-3 transition-colors font-bold text-lg shadow-sm"
                >
                  <FiDownload className="text-xl text-red-500" /> Download {selectedOrder.file}
                </button>
              </div>

              {/* Action 2 */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Update Order Status</label>
                <div className="flex gap-4">
                  {['Pending', 'Processing', 'Completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedOrder.id, status)}
                      className={`flex-1 py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-all border-2 ${
                        selectedOrder.status === status 
                          ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-200' 
                          : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-900'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action 3 */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Internal Notes</label>
                <textarea 
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  rows="4"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-5 text-base text-gray-900 font-medium focus:outline-none focus:border-red-500 transition resize-none"
                  placeholder="Add internal notes for production team..."
                ></textarea>
              </div>
            </div>

            <button 
              onClick={() => { handleSaveNotes(selectedOrder.id); setSelectedOrder(null); }}
              className="w-full mt-10 bg-gray-900 hover:bg-black text-white font-bold text-lg py-5 rounded-xl transition-colors shadow-xl"
            >
              Save Changes & Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}