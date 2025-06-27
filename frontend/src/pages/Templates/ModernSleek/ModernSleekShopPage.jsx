"use client"

const ModernSleekShopPage = ({ storeSettings, navigate }) => {
  const products = storeSettings.products || []

  return (
    <div className="modern-sleek-shop py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 uppercase tracking-wider" style={{ color: storeSettings.primaryTextColor }}>The Collection</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: storeSettings.secondaryTextColor }}>Discover curated pieces that blend form and function seamlessly.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="group cursor-pointer" onClick={() => navigate("product", product._id)}>
              <div className="mb-4 overflow-hidden bg-gray-800">
                <img src={product.images?.[0] || "/placeholder.svg"} alt={product.name} className="w-full h-96 object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-80" />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: storeSettings.primaryTextColor }}>{product.name}</h3>
              <p className="font-medium text-lg" style={{ color: storeSettings.themeColor }}>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ModernSleekShopPage