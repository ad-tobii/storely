// --- START OF FILE InventorySection.jsx ---

"use client"

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, Plus, Edit, Trash2, Filter, Loader2, X, Upload, Save, Image as ImageIcon } from "lucide-react";
import InventoryAnalytics from "./InventoryAnalytics";
import useDashboardStore from "../../../../../store/useDashboardStore";
import { axiosInstance } from "../../../../../lib/axios" // Import axiosInstance for direct upload

export default function InventorySection() {
  const { products, fetchProducts, isLoading, addProduct, updateProduct, deleteProduct } = useDashboardStore();

  const stableFetch = useCallback(() => { if (!products) fetchProducts(); }, [products, fetchProducts]);
  useEffect(() => { stableFetch(); }, [stableFetch]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // State for Inventory Analytics
  const [inventoryAnalytics, setInventoryAnalytics] = useState(null);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(true);

  const initialNewProductState = { name: "", description: "", price: "", stock: "", category: "", sku: "", images: [] };
  const [newProduct, setNewProduct] = useState(initialNewProductState);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Fetch inventory analytics on component mount
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsAnalyticsLoading(true);
        const response = await axiosInstance.get('/dashboard/inventory-analytics');
        setInventoryAnalytics(response.data);
      } catch (error) {
        console.error("Failed to fetch inventory analytics:", error);
      } finally {
        setIsAnalyticsLoading(false);
      }
    };
    fetchAnalytics();
  }, []); // Empty dependency array ensures this runs only once on mount


  const formatCurrency = (amount) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount || 0);
  const filteredProducts = (products || []).filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('productImage', file);
    setIsUploading(true);
    try {
        const res = await axiosInstance.post('/upload/product', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if(editingProduct){
            setEditingProduct(prev => ({...prev, images: [...(prev.images || []), res.data.imageUrl]}));
        } else {
            setNewProduct(prev => ({ ...prev, images: [...prev.images, res.data.imageUrl] }));
        }

    } catch (error) {
        console.error("Image upload failed", error);
        alert("Image upload failed. Please try again.");
    } finally {
        setIsUploading(false);
    }
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    await addProduct(newProduct);
    setShowAddModal(false);
    setNewProduct(initialNewProductState);
  };
  
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    const { _id, ...updateData } = editingProduct;
    await updateProduct(_id, updateData);
    setEditingProduct(null);
  };
  
  const handleDelete = async (productId) => { if (window.confirm("Delete this product?")) await deleteProduct(productId); };
  
  if (isLoading && products === null) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="w-6 h-6 animate-spin text-[#32cd32]" /></div>;
  }
  
  return (
    <div className="space-y-6">
      <InventoryAnalytics data={inventoryAnalytics} isLoading={isAnalyticsLoading} />
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
        <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold">Product Management</h2><button onClick={() => setShowAddModal(true)} className="bg-[#32cd32] text-black px-4 py-2 rounded-lg font-medium flex items-center gap-2"><Plus className="w-4 h-4" /> Add Product</button></div>
        <div className="relative mb-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" /><input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 p-2 bg-zinc-800 rounded-lg border border-zinc-700" /></div>
        <div className="overflow-x-auto"><table className="w-full text-left">
          <thead className="border-b border-zinc-700 text-sm text-zinc-400"><tr><th className="p-4">Product</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4">Actions</th></tr></thead>
          <tbody>
            {filteredProducts.map(p => (<tr key={p._id} className="border-b border-zinc-800">
              <td className="p-4 flex items-center gap-3"><img src={p.images?.[0] || '/placeholder.svg?h=40&w=40'} alt={p.name} className="w-10 h-10 rounded-md bg-zinc-700 object-cover" /><span className="font-medium text-white">{p.name}</span></td>
              <td className="p-4 text-white">{formatCurrency(p.price)}</td><td className="p-4 text-white">{p.stock}</td>
              <td className="p-4"><div className="flex gap-2"><button onClick={() => setEditingProduct(p)} className="text-blue-400 p-1"><Edit className="w-4 h-4" /></button><button onClick={() => handleDelete(p._id)} className="text-red-400 p-1"><Trash2 className="w-4 h-4" /></button></div></td>
            </tr>))}
          </tbody>
        </table></div>
      </div>
      
      {/* ADD MODAL */}
      {showAddModal && <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"><form onSubmit={handleAddSubmit} className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl space-y-4 border border-zinc-800"><h3 className="text-xl font-bold">Add Product</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label>Name*</label><input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full p-2 mt-1 bg-zinc-800 rounded" required/></div>
            <div><label>Price (NGN)*</label><input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full p-2 mt-1 bg-zinc-800 rounded" required/></div>
            <div><label>Stock Quantity*</label><input type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="w-full p-2 mt-1 bg-zinc-800 rounded" required/></div>
            <div><label>SKU</label><input type="text" value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} className="w-full p-2 mt-1 bg-zinc-800 rounded"/></div>
            <div className="md:col-span-2"><label>Description*</label><textarea value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} rows="3" className="w-full p-2 mt-1 bg-zinc-800 rounded" required/></div>
            <div className="md:col-span-2"><label>Images</label><div className="mt-1 p-4 border-2 border-dashed border-zinc-700 rounded-lg flex flex-col items-center">
                <div className="flex gap-2 mb-2">{newProduct.images.map((img, i) => <img key={i} src={img} className="w-16 h-16 rounded-md object-cover"/>)}</div>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                <button type="button" onClick={() => fileInputRef.current.click()} disabled={isUploading} className="bg-zinc-700 text-white px-3 py-2 text-sm rounded-md flex items-center gap-2 disabled:opacity-50">{isUploading ? <Loader2 className="w-4 h-4 animate-spin"/> : <ImageIcon className="w-4 h-4" />} Upload Image</button>
            </div></div>
        </div>
        <div className="flex gap-2 justify-end"><button type="button" onClick={() => setShowAddModal(false)} className="bg-zinc-700 px-4 py-2 rounded">Cancel</button><button type="submit" className="bg-[#32cd32] text-black px-4 py-2 rounded font-medium">Add Product</button></div></form></div>}

      {/* EDIT MODAL */}
      {editingProduct && <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"><form onSubmit={handleEditSubmit} className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl space-y-4 border border-zinc-800"><h3 className="text-xl font-bold">Edit Product: {editingProduct.name}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label>Name*</label><input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full p-2 mt-1 bg-zinc-800 rounded" required/></div>
            <div><label>Price (NGN)*</label><input type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full p-2 mt-1 bg-zinc-800 rounded" required/></div>
            <div><label>Stock Quantity*</label><input type="number" value={editingProduct.stock} onChange={e => setEditingProduct({...editingProduct, stock: e.target.value})} className="w-full p-2 mt-1 bg-zinc-800 rounded" required/></div>
            <div><label>SKU</label><input type="text" value={editingProduct.sku} onChange={e => setEditingProduct({...editingProduct, sku: e.target.value})} className="w-full p-2 mt-1 bg-zinc-800 rounded"/></div>
            <div className="md:col-span-2"><label>Description*</label><textarea value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} rows="3" className="w-full p-2 mt-1 bg-zinc-800 rounded" required/></div>
            <div className="md:col-span-2"><label>Images</label><div className="mt-1 p-4 border-2 border-dashed border-zinc-700 rounded-lg flex flex-col items-center">
                <div className="flex gap-2 mb-2">{(editingProduct.images || []).map((img, i) => <img key={i} src={img} className="w-16 h-16 rounded-md object-cover"/>)}</div>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                <button type="button" onClick={() => fileInputRef.current.click()} disabled={isUploading} className="bg-zinc-700 text-white px-3 py-2 text-sm rounded-md flex items-center gap-2 disabled:opacity-50">{isUploading ? <Loader2 className="w-4 h-4 animate-spin"/> : <ImageIcon className="w-4 h-4" />} Upload More Images</button>
            </div></div>
        </div>
        <div className="flex gap-2 justify-end"><button type="button" onClick={() => setEditingProduct(null)} className="bg-zinc-700 px-4 py-2 rounded">Cancel</button><button type="submit" className="bg-[#32cd32] text-black px-4 py-2 rounded font-medium">Save Changes</button></div></form></div>}
    </div>
  )
}