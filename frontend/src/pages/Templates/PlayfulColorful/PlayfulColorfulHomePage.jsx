// --- START OF FILE PlayfulColorfulHomePage.jsx ---

"use client"

import PlayfulColorfulEditableText from "./PlayfulColorfulEditableText"
import PlayfulColorfulEditableImage from "./PlayfulColorfulEditableImage"
import { Sparkles, Heart } from "lucide-react"

const PlayfulColorfulHomePage = ({
  storeSettings,
  seller,
  editMode,
  navigate,
  sellerId
}) => {
  return (
    <div className="playful-colorful-home">

      {/* HERO SECTION */}
      <section
        className="relative min-h-[80vh] flex items-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${seller.heroImageUrl || 'https://via.placeholder.com/1920x1080?text=Your+Colorful+Store'})`
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20" />
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="flex justify-center mb-6">
            <Sparkles size={48} style={{ color: storeSettings.themeColor }} />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            <PlayfulColorfulEditableText
              settingKey="heroTitle"
              editMode={editMode}
              sellerId={sellerId}
              storeSettings={storeSettings}
              placeholder="Fun & Colorful Creations"
            />
          </h1>

          <p className="text-xl md:text-3xl mb-8 max-w-3xl mx-auto text-white drop-shadow-md">
            <PlayfulColorfulEditableText
              settingKey="heroSubtitle"
              editMode={editMode}
              sellerId={sellerId}
              storeSettings={storeSettings}
              placeholder="Brighten your world with our playful designs!"
            />
          </p>

          <button
            onClick={() => navigate("shop")}
            className="px-8 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-110 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${storeSettings.themeColor}, ${storeSettings.secondaryColor})`
            }}
          >
            Shop Now! 🛍️
          </button>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: storeSettings.primaryTextColor }}
            >
              <PlayfulColorfulEditableText
                settingKey="featuredTitle"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
                placeholder="✨ Featured Favorites ✨"
              />
            </h2>
            <p
              className="text-xl"
              style={{ color: storeSettings.secondaryTextColor }}
            >
              Our most loved colorful creations!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            {(storeSettings.products || [])
              .slice(0, 4)
              .map((product, index) => (
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
                          : storeSettings.secondaryColor + "15"
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
                    ${product.price?.toFixed(2)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section
        className="py-20 px-4"
        style={{
          background: `linear-gradient(135deg, ${storeSettings.secondaryColor}10, ${storeSettings.themeColor}10)`
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Text Content */}
            <div className="order-2 md:order-1">
              <div className="flex items-center mb-6">
                <Heart
                  size={32}
                  style={{ color: storeSettings.themeColor }}
                  className="mr-3"
                />
                <h2
                  className="text-4xl font-bold"
                  style={{ color: storeSettings.primaryTextColor }}
                >
                  <PlayfulColorfulEditableText
                    settingKey="storyTitle"
                    editMode={editMode}
                    sellerId={sellerId}
                    storeSettings={storeSettings}
                    placeholder="Our Colorful Story"
                  />
                </h2>
              </div>

              <div
                className="prose text-lg"
                style={{ color: storeSettings.secondaryTextColor }}
              >
                <PlayfulColorfulEditableText
                  settingKey="brandStory"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  multiline={true}
                  className="leading-relaxed mb-6"
                />
              </div>

              <button
                onClick={() => navigate("about")}
                className="mt-8 px-6 py-3 rounded-full text-white font-bold transition-all duration-300 transform hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${storeSettings.themeColor}, ${storeSettings.secondaryColor})`
                }}
              >
                Learn More About Us! 💫
              </button>
            </div>

            {/* Image */}
            <div className="order-1 md:order-2">
              <PlayfulColorfulEditableImage
                settingKey="brandStoryImage"
                alt="Our colorful story"
                className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default PlayfulColorfulHomePage
