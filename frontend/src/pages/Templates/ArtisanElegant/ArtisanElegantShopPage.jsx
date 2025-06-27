// --- START OF FILE ArtisanElegantShopPage.jsx ---

"use client"
import { useState } from "react"
import { SlidersHorizontal } from "lucide-react"

const ArtisanElegantShopPage = ({ storeSettings, navigate }) => {
  const [sortOrder, setSortOrder] = useState("default")

  const sortedProducts = [...(storeSettings.products || [])].sort((a, b) => {
    switch (sortOrder) {
      case "price-asc": return a.price - b.price
      case "price-desc": return b.price - a.price
      case "name-asc": return a.name.localeCompare(b.name)
      default: return 0
    }
  })

  return (
    <div className="artisan-elegant-shop py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: storeSettings.primaryTextColor }}>Our Collection</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: storeSettings.secondaryTextColor }}>Browse our curated selection of handcrafted goods.</p>
        </div>
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-2">
            <label htmlFor="sort-order" className="text-sm font-medium" style={{ color: storeSettings.secondaryTextColor }}>Sort by:</label>
            <select id="sort-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="p-2 rounded-md border text-sm focus:outline-none" style={{ borderColor: storeSettings.secondaryColor, backgroundColor: storeSettings.backgroundColor }}>
              <option value="default">Featured</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="name-asc">Alphabetically</option>
            </select>
          </div>
        </div>
        <dzziv className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <div key={product._id} className="group cursor-pointer" onClick={() => navigate("product", product._id)}>
              <div className="mb-4 overflow-hidden rounded-lg"><img src={product.images?.[0] || "/placeholder.svg"} alt={product.name} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: storeSettings.primaryTextColor }}>{product.name}</h3>
              <p className="font-medium" style={{ color: storeSettings.themeColor }}>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </dzziv>
      </div>
    </div>
  )
}

export default ArtisanElegantShopPage