// --- START OF FILE ArtisanElegantHomePage.jsx ---

"use client"
import ArtisanElegantEditableText from "./ArtisanElegantEditableText"
import ArtisanElegantEditableImage from "./ArtisanElegantEditableImage"
import { ArrowRight } from "lucide-react"

const ArtisanElegantHomePage = ({ storeSettings, seller, editMode, navigate, sellerId }) => {
  return (
    <div className="artisan-elegant-home">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${seller.heroImageUrl || 'https://via.placeholder.com/1920x1080?text=Artisan+Store'})`
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            <ArtisanElegantEditableText
              settingKey="heroTitle"
              editMode={editMode}
              sellerId={sellerId}
              storeSettings={storeSettings}
              placeholder="Artisan Crafted Goods"
            />
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
            <ArtisanElegantEditableText
              settingKey="heroSubtitle"
              editMode={editMode}
              sellerId={sellerId}
              storeSettings={storeSettings}
              placeholder="Handmade with love and attention to detail"
            />
          </p>
          <button
            onClick={() => navigate("shop")}
            className="px-8 py-3 rounded-md text-white transition-transform duration-300 transform hover:scale-105"
            style={{ backgroundColor: storeSettings.themeColor }}
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2
            className="text-3xl font-bold mb-12 text-center"
            style={{ color: storeSettings.primaryTextColor }}
          >
            <ArtisanElegantEditableText
              settingKey="featuredTitle"
              editMode={editMode}
              sellerId={sellerId}
              storeSettings={storeSettings}
              placeholder="Featured Collection"
            />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            {(storeSettings.products || []).slice(0, 4).map((product) => (
              <div
                key={product._id}
                className="group cursor-pointer"
                onClick={() => navigate("product", product._id)}
              >
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: storeSettings.primaryTextColor }}
                >
                  {product.name}
                </h3>
                <p className="font-medium" style={{ color: storeSettings.themeColor }}>
                  ${product.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("shop")}
              className="inline-flex items-center px-6 py-3 border rounded-md transition-colors duration-300"
              style={{
                borderColor: storeSettings.themeColor,
                color: storeSettings.themeColor
              }}
            >
              View All Products <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: storeSettings.secondaryColor + "20" }}
      >
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <ArtisanElegantEditableImage
                settingKey="brandStoryImage"
                alt="Brand story"
                className="rounded-lg shadow-lg"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
            </div>
            <div>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: storeSettings.primaryTextColor }}
              >
                <ArtisanElegantEditableText
                  settingKey="brandStoryTitle"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Our Story"
                />
              </h2>
              <div className="prose" style={{ color: storeSettings.secondaryTextColor }}>
                <ArtisanElegantEditableText
                  settingKey="brandStory"
                  editMode={editMode}
                  multiline={true}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </div>
              <button
                onClick={() => navigate("about")}
                className="mt-6 inline-flex items-center px-6 py-2 rounded-md text-white transition-transform duration-300 transform hover:scale-105"
                style={{ backgroundColor: storeSettings.themeColor }}
              >
                Learn More <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ArtisanElegantHomePage
