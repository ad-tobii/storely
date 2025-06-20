// --- START OF FILE BoldMinimalistShopPage.jsx ---

"use client"
const BoldMinimalistShopPage = ({ storeSettings, navigate }) => {
  const products = storeSettings.products || [];
  return <div className="bold-minimalist-shop py-16 px-8"><div className="container mx-auto"><div className="text-center mb-16"><h1 className="text-6xl font-black uppercase tracking-widest mb-8">SHOP</h1><div className="w-24 h-2 mx-auto bg-black"></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-4 border-black">{products.map((product) => <div key={product._id} className="group cursor-pointer p-8 border-r-4 border-b-4 border-black last:border-r-0" onClick={() => navigate("product", product._id)}><div className="w-full h-80 mb-8 overflow-hidden"><img src={product.images?.[0] || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" /></div><h3 className="text-2xl font-black uppercase tracking-wider mb-4">{product.name}</h3><p className="text-3xl font-black">${product.price.toFixed(2)}</p></div>)}</div></div></div>
}
export default BoldMinimalistShopPage