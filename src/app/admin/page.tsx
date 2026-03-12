"use client";

import { useState } from "react";
import { products as initialProducts, Product } from "@/lib/data";
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3,
  Plus, Pencil, Trash2, X, TrendingUp, TrendingDown, Eye,
  DollarSign, UserCheck, Clock, CheckCircle, XCircle, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Package, label: "Products", id: "products" },
  { icon: ShoppingCart, label: "Orders", id: "orders" },
  { icon: Users, label: "Users", id: "users" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
];

const stats = [
  { label: "Revenue", value: "$12,450", change: "+12%", icon: DollarSign, up: true },
  { label: "Orders", value: "156", change: "+8%", icon: ShoppingCart, up: true },
  { label: "Customers", value: "2,340", change: "+15%", icon: UserCheck, up: true },
  { label: "Avg. Order", value: "$79.80", change: "-3%", icon: TrendingUp, up: false },
];

const mockOrders = [
  { id: "ORD-001", customer: "Ahmet Yılmaz", email: "ahmet@email.com", total: 158, status: "delivered", date: "2026-03-08", items: 3 },
  { id: "ORD-002", customer: "Elif Kaya", email: "elif@email.com", total: 299, status: "shipped", date: "2026-03-07", items: 1 },
  { id: "ORD-003", customer: "Mehmet Demir", email: "mehmet@email.com", total: 94, status: "processing", date: "2026-03-07", items: 2 },
  { id: "ORD-004", customer: "Zeynep Çelik", email: "zeynep@email.com", total: 435, status: "delivered", date: "2026-03-06", items: 4 },
  { id: "ORD-005", customer: "Can Arslan", email: "can@email.com", total: 59, status: "cancelled", date: "2026-03-05", items: 1 },
  { id: "ORD-006", customer: "Selin Öz", email: "selin@email.com", total: 189, status: "processing", date: "2026-03-09", items: 2 },
];

const mockUsers = [
  { id: "USR-001", name: "Ahmet Yılmaz", email: "ahmet@email.com", orders: 12, spent: 1450, joined: "2025-11-12", status: "active" },
  { id: "USR-002", name: "Elif Kaya", email: "elif@email.com", orders: 8, spent: 2100, joined: "2025-12-01", status: "active" },
  { id: "USR-003", name: "Mehmet Demir", email: "mehmet@email.com", orders: 3, spent: 340, joined: "2026-01-15", status: "active" },
  { id: "USR-004", name: "Zeynep Çelik", email: "zeynep@email.com", orders: 15, spent: 3200, joined: "2025-10-20", status: "active" },
  { id: "USR-005", name: "Can Arslan", email: "can@email.com", orders: 1, spent: 59, joined: "2026-03-01", status: "inactive" },
];

const revenueData = [
  { month: "Oct", revenue: 8200 },
  { month: "Nov", revenue: 9800 },
  { month: "Dec", revenue: 14500 },
  { month: "Jan", revenue: 10200 },
  { month: "Feb", revenue: 11800 },
  { month: "Mar", revenue: 12450 },
];

const topProducts = [
  { name: "Leather Biker Jacket", sold: 42, revenue: 12558 },
  { name: "Cashmere Sweater", sold: 38, revenue: 7182 },
  { name: "Relaxed Fit Denim", sold: 35, revenue: 4200 },
  { name: "Oversized Hoodie", sold: 31, revenue: 1829 },
];

const orderStatusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
  delivered: { color: "text-emerald-600 bg-emerald-50", icon: CheckCircle },
  shipped: { color: "text-blue-600 bg-blue-50", icon: TrendingUp },
  processing: { color: "text-amber-600 bg-amber-50", icon: Clock },
  cancelled: { color: "text-red-600 bg-red-50", icon: XCircle },
};

interface ProductFormData {
  name: string;
  price: string;
  category: string;
  brand: string;
  description: string;
  sizes: string;
  colors: string;
}

const emptyForm: ProductFormData = { name: "", price: "", category: "Men", brand: "SENORA", description: "", sizes: "S,M,L,XL", colors: "Black" };

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [productList, setProductList] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormData>(emptyForm);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderFilter, setOrderFilter] = useState("all");

  const openAddForm = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: String(product.price),
      category: product.category,
      brand: product.brand,
      description: product.description,
      sizes: product.sizes.join(","),
      colors: product.colors.join(","),
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    const productData: Product = {
      id: editingProduct?.id || String(Date.now()),
      name: form.name,
      price: Number(form.price),
      image: editingProduct?.image || initialProducts[0].image,
      category: form.category,
      sizes: form.sizes.split(",").map((s) => s.trim()),
      colors: form.colors.split(",").map((c) => c.trim()),
      description: form.description,
      brand: form.brand,
      inStock: true,
    };
    if (editingProduct) {
      setProductList((prev) => prev.map((p) => (p.id === editingProduct.id ? productData : p)));
    } else {
      setProductList((prev) => [...prev, productData]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredOrders = orderFilter === "all" ? mockOrders : mockOrders.filter((o) => o.status === orderFilter);
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-secondary/30 p-5 hidden md:flex flex-col">
        <h2 className="font-display text-xl font-bold tracking-wider mb-8 px-2">Admin Panel</h2>
        <nav className="space-y-1 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeTab === item.id
                  ? "bg-foreground text-background font-medium shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground px-2">SENORA Admin v1.0</p>
        </div>
      </aside>

      {/* Mobile tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border flex">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] transition-colors ${
              activeTab === item.id ? "text-foreground font-medium" : "text-muted-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="flex-1 p-5 sm:p-8 pb-20 md:pb-8 overflow-auto">
        <AnimatePresence mode="wait">
          {/* ─── DASHBOARD ─── */}
          {activeTab === "dashboard" && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h1 className="text-2xl font-display font-bold mb-6">Dashboard</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-secondary/50 border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <stat.icon className="h-5 w-5 text-muted-foreground" />
                      <span className={`text-xs font-medium flex items-center gap-1 ${stat.up ? "text-emerald-600" : "text-red-500"}`}>
                        {stat.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Mini chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-secondary/50 border border-border rounded-xl p-6">
                  <h3 className="text-sm font-semibold mb-4">Revenue Overview</h3>
                  <div className="flex items-end gap-2 h-40">
                    {revenueData.map((d) => (
                      <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-foreground rounded-t-md transition-all hover:bg-foreground/80"
                          style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                        />
                        <span className="text-[10px] text-muted-foreground">{d.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-secondary/50 border border-border rounded-xl p-6">
                  <h3 className="text-sm font-semibold mb-4">Top Products</h3>
                  <div className="space-y-4">
                    {topProducts.map((p, i) => (
                      <div key={p.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-muted-foreground w-5">#{i + 1}</span>
                          <span className="text-sm font-medium">{p.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">${p.revenue.toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground">{p.sold} sold</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent orders */}
              <div className="mt-6 bg-secondary/50 border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {mockOrders.slice(0, 4).map((order) => {
                    const config = orderStatusConfig[order.status];
                    return (
                      <div key={order.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono text-muted-foreground">{order.id}</span>
                          <span className="text-sm font-medium">{order.customer}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-semibold">${order.total}</span>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${config.color}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── PRODUCTS ─── */}
          {activeTab === "products" && (
            <motion.div key="products" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-display font-bold">Products</h1>
                <Button size="sm" className="rounded-lg gap-2" onClick={openAddForm}>
                  <Plus className="h-4 w-4" /> Add Product
                </Button>
              </div>

              <div className="border border-border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/70">
                    <tr>
                      <th className="text-left p-4 font-medium">Product</th>
                      <th className="text-left p-4 font-medium hidden sm:table-cell">Price</th>
                      <th className="text-left p-4 font-medium hidden md:table-cell">Category</th>
                      <th className="text-left p-4 font-medium hidden lg:table-cell">Stock</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((product) => (
                      <tr key={product.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md object-cover bg-secondary" />
                            <div>
                              <span className="font-medium block">{product.name}</span>
                              <span className="text-xs text-muted-foreground sm:hidden">${product.price}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground hidden sm:table-cell">${product.price}</td>
                        <td className="p-4 text-muted-foreground hidden md:table-cell">{product.category}</td>
                        <td className="p-4 hidden lg:table-cell">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${product.inStock ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => openEditForm(product)} className="p-2 hover:bg-accent rounded-md transition-colors">
                              <Pencil className="h-4 w-4 text-muted-foreground" />
                            </button>
                            <button onClick={() => handleDelete(product.id)} className="p-2 hover:bg-red-50 rounded-md transition-colors">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ─── ORDERS ─── */}
          {activeTab === "orders" && (
            <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-display font-bold">Orders</h1>
                <div className="flex gap-2">
                  {["all", "processing", "shipped", "delivered", "cancelled"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setOrderFilter(f)}
                      className={`text-xs px-3 py-1.5 rounded-full capitalize transition-colors ${
                        orderFilter === f ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/70">
                    <tr>
                      <th className="text-left p-4 font-medium">Order</th>
                      <th className="text-left p-4 font-medium hidden sm:table-cell">Customer</th>
                      <th className="text-left p-4 font-medium hidden md:table-cell">Date</th>
                      <th className="text-left p-4 font-medium">Total</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => {
                      const config = orderStatusConfig[order.status];
                      return (
                        <tr key={order.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                          <td className="p-4">
                            <span className="font-mono font-medium">{order.id}</span>
                            <span className="text-xs text-muted-foreground ml-2">({order.items} items)</span>
                          </td>
                          <td className="p-4 hidden sm:table-cell">
                            <div>
                              <span className="font-medium block">{order.customer}</span>
                              <span className="text-xs text-muted-foreground">{order.email}</span>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground hidden md:table-cell">{order.date}</td>
                          <td className="p-4 font-semibold">${order.total}</td>
                          <td className="p-4">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize inline-flex items-center gap-1 ${config.color}`}>
                              <config.icon className="h-3 w-3" />
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button className="p-2 hover:bg-accent rounded-md transition-colors">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ─── USERS ─── */}
          {activeTab === "users" && (
            <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-display font-bold">Users</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
                  />
                </div>
              </div>

              <div className="border border-border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/70">
                    <tr>
                      <th className="text-left p-4 font-medium">User</th>
                      <th className="text-left p-4 font-medium hidden md:table-cell">Orders</th>
                      <th className="text-left p-4 font-medium hidden lg:table-cell">Total Spent</th>
                      <th className="text-left p-4 font-medium hidden sm:table-cell">Joined</th>
                      <th className="text-left p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers
                      .filter((u) => !searchQuery || u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((user) => (
                        <tr key={user.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">
                                {user.name.split(" ").map((n) => n[0]).join("")}
                              </div>
                              <div>
                                <span className="font-medium block">{user.name}</span>
                                <span className="text-xs text-muted-foreground">{user.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground hidden md:table-cell">{user.orders}</td>
                          <td className="p-4 font-semibold hidden lg:table-cell">${user.spent.toLocaleString()}</td>
                          <td className="p-4 text-muted-foreground hidden sm:table-cell">{user.joined}</td>
                          <td className="p-4">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                              user.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-secondary text-muted-foreground"
                            }`}>
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ─── ANALYTICS ─── */}
          {activeTab === "analytics" && (
            <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h1 className="text-2xl font-display font-bold mb-6">Analytics</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-secondary/50 border border-border rounded-xl p-5">
                  <p className="text-xs text-muted-foreground mb-1">Conversion Rate</p>
                  <p className="text-3xl font-bold">3.2%</p>
                  <p className="text-xs text-emerald-600 mt-1">+0.5% vs last month</p>
                </div>
                <div className="bg-secondary/50 border border-border rounded-xl p-5">
                  <p className="text-xs text-muted-foreground mb-1">Page Views</p>
                  <p className="text-3xl font-bold">24.5K</p>
                  <p className="text-xs text-emerald-600 mt-1">+18% vs last month</p>
                </div>
                <div className="bg-secondary/50 border border-border rounded-xl p-5">
                  <p className="text-xs text-muted-foreground mb-1">Bounce Rate</p>
                  <p className="text-3xl font-bold">42%</p>
                  <p className="text-xs text-red-500 mt-1">+2% vs last month</p>
                </div>
              </div>

              {/* Revenue chart */}
              <div className="bg-secondary/50 border border-border rounded-xl p-6 mb-6">
                <h3 className="text-sm font-semibold mb-6">Monthly Revenue</h3>
                <div className="flex items-end gap-3 h-48">
                  {revenueData.map((d) => (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[10px] font-medium text-muted-foreground">${(d.revenue / 1000).toFixed(1)}K</span>
                      <div
                        className="w-full bg-foreground rounded-t-lg transition-all hover:bg-foreground/80 cursor-pointer"
                        style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground font-medium">{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-secondary/50 border border-border rounded-xl p-6">
                  <h3 className="text-sm font-semibold mb-4">Sales by Category</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Men", pct: 42 },
                      { name: "Women", pct: 38 },
                      { name: "Accessories", pct: 12 },
                      { name: "Shoes", pct: 8 },
                    ].map((cat) => (
                      <div key={cat.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{cat.name}</span>
                          <span className="font-medium">{cat.pct}%</span>
                        </div>
                        <div className="h-2 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-foreground rounded-full transition-all" style={{ width: `${cat.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-secondary/50 border border-border rounded-xl p-6">
                  <h3 className="text-sm font-semibold mb-4">Traffic Sources</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Organic Search", pct: 45 },
                      { name: "Social Media", pct: 28 },
                      { name: "Direct", pct: 18 },
                      { name: "Referral", pct: 9 },
                    ].map((src) => (
                      <div key={src.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{src.name}</span>
                          <span className="font-medium">{src.pct}%</span>
                        </div>
                        <div className="h-2 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-foreground/60 rounded-full transition-all" style={{ width: `${src.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Product Form Modal ─── */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background rounded-2xl w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-display font-bold">{editingProduct ? "Edit Product" : "Add Product"}</h2>
                  <button onClick={() => setShowForm(false)} className="p-2 hover:bg-accent rounded-lg">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Product Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
                      placeholder="e.g. Oversized Hoodie"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Price ($)</label>
                      <input
                        type="number"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
                        placeholder="59"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Category</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
                      >
                        <option>Men</option>
                        <option>Women</option>
                        <option>Accessories</option>
                        <option>Shoes</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Brand</label>
                    <input
                      type="text"
                      value={form.brand}
                      onChange={(e) => setForm({ ...form, brand: e.target.value })}
                      className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
                      placeholder="SENORA"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20 min-h-[80px] resize-none"
                      placeholder="Product description..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Sizes (comma separated)</label>
                      <input
                        type="text"
                        value={form.sizes}
                        onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                        className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
                        placeholder="S,M,L,XL"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Colors (comma separated)</label>
                      <input
                        type="text"
                        value={form.colors}
                        onChange={(e) => setForm({ ...form, colors: e.target.value })}
                        className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
                        placeholder="Black,White"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="flex-1 rounded-lg" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 rounded-lg" onClick={handleSave}>
                    {editingProduct ? "Save Changes" : "Add Product"}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
