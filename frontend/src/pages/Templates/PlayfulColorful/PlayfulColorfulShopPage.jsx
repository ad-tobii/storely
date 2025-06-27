// --- START OF FILE PlayfulColorfulShopPage.jsx ---

"use client"

const PlayfulColorfulShopPage = ({ storeSettings, navigate }) => {
  const products = storeSettings.products || []

  return (
    <div className="playful-colorful-shop py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">🛍️ Our Awesome Shop 🛍️</h1>
          <p className="text-xl text-zinc-600">Find your next favorite thing!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => navigate("product", product._id)}
            >
              <div
                className="p-4 rounded-2xl shadow-lg mb-4"
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? storeSettings.themeColor + "15"
                      : storeSettings.secondaryColor + "15",
                }}
              >
                <img
                  src={product.images?.[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-xl transition-transform duration-500 group-hover:rotate-2"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                {product.name}
              </h3>
              <p
                className="font-bold text-center text-2xl"
                style={{ color: storeSettings.themeColor }}
              >
                ${product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlayfulColorfulShopPage
