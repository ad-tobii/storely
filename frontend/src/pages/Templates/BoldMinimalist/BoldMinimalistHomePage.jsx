// --- START OF FILE BoldMinimalistHomepage.jsx ---

"use client"

import BoldMinimalistEditableText from "./BoldMinimalistEditableText"
import BoldMinimalistEditableImage from "./BoldMinimalistEditableImage"
import { ArrowRight } from "lucide-react"

const BoldMinimalistHomePage = ({
  storeSettings,
  seller,
  editMode,
  navigate,
  sellerId,
}) => {
  return (
    <div
      className="bold-minimalist-home"
      style={{ backgroundColor: storeSettings.backgroundColor }}
    >
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={
              seller.heroImageUrl ||
              "https://via.placeholder.com/1920x1080?text=BOLD+MINIMAL"
            }
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "black",
              opacity: storeSettings.overlayOpacity || 0.3,
            }}
          ></div>
        </div>

        {/* Hero Text Content */}
        <div className="container mx-auto px-8 z-10 text-center">
          <h1
            className="text-6xl md:text-9xl font-black mb-8 leading-none"
            style={{ color: storeSettings.primaryTextColor }}
          >
            <BoldMinimalistEditableText
              settingKey="heroTitle"
              editMode={editMode}
              sellerId={sellerId}
              storeSettings={storeSettings}
              placeholder="BOLD. MINIMAL. ESSENTIAL."
            />
          </h1>

          <p
            className="text-xl md:text-3xl font-bold uppercase tracking-widest mb-12"
            style={{ color: storeSettings.secondaryTextColor }}
          >
            <BoldMinimalistEditableText
              settingKey="heroSubtitle"
              editMode={editMode}
              sellerId={sellerId}
              storeSettings={storeSettings}
              placeholder="UNCOMPROMISING DESIGN FOR THE MODERN WORLD"
            />
          </p>

          <button
            onClick={() => navigate("shop")}
            className="px-12 py-6 font-black text-xl uppercase tracking-widest transition-all duration-300 border-4 hover:opacity-80"
            style={{
              backgroundColor: storeSettings.themeColor,
              color: storeSettings.backgroundColor,
              borderColor: storeSettings.themeColor,
            }}
          >
            SHOP NOW
          </button>
        </div>
      </section>

      {/* COLLECTION PREVIEW SECTION */}
      <section
        className="py-24 px-8"
        style={{ backgroundColor: storeSettings.themeColor }}
      >
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2
              className="text-5xl font-black mb-8 uppercase tracking-widest"
              style={{ color: storeSettings.backgroundColor }}
            >
              <BoldMinimalistEditableText
                settingKey="collectionTitle"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
                placeholder="ESSENTIAL COLLECTION"
              />
            </h2>
            <div
              className="w-32 h-1 mx-auto"
              style={{ backgroundColor: storeSettings.backgroundColor }}
            ></div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-4 justify-center"
            style={{ borderColor: storeSettings.backgroundColor }}
          >
            {(storeSettings.products || [])
              .slice(0, 4)
              .map((product) => (
                <div
                  key={product._id}
                  className="group cursor-pointer border-r-4 border-b-4 last:border-r-0"
                  style={{
                    backgroundColor: storeSettings.backgroundColor,
                    borderColor: storeSettings.themeColor,
                  }}
                  onClick={() => navigate("product", product._id)}
                >
                  <div className="p-8">
                    <div className="w-full h-64 mb-6 overflow-hidden">
                      <img
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3
                      className="text-xl font-black mb-4 uppercase tracking-wider"
                      style={{ color: storeSettings.primaryTextColor }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-2xl font-black"
                      style={{ color: storeSettings.primaryTextColor }}
                    >
                      ${product.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => navigate("shop")}
              className="inline-flex items-center text-xl font-black uppercase tracking-widest border-b-4 pb-2 transition-all duration-300 hover:opacity-70"
              style={{
                color: storeSettings.backgroundColor,
                borderColor: storeSettings.backgroundColor,
              }}
            >
              VIEW ALL PRODUCTS <ArrowRight size={24} className="ml-4" />
            </button>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section
        className="py-24 px-8"
        style={{ backgroundColor: storeSettings.backgroundColor }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div className="order-2 md:order-1">
              <h2
                className="text-5xl font-black mb-8 uppercase tracking-widest"
                style={{ color: storeSettings.primaryTextColor }}
              >
                <BoldMinimalistEditableText
                  settingKey="philosophySectionTitle"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="PHILOSOPHY"
                />
              </h2>

              <div
                className="prose font-bold text-xl leading-relaxed"
                style={{ color: storeSettings.secondaryTextColor }}
              >
                <div className="mb-8">
                  <BoldMinimalistEditableText
                    settingKey="brandStory"
                    editMode={editMode}
                    sellerId={sellerId}
                    storeSettings={storeSettings}
                    multiline={true}
                  />
                </div>
                <BoldMinimalistEditableText
                  settingKey="philosophyExtra"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  multiline={true}
                />
              </div>

              <button
                onClick={() => navigate("about")}
                className="mt-12 px-8 py-4 font-black uppercase tracking-widest transition-all duration-300 hover:opacity-80 border-4"
                style={{
                  backgroundColor: storeSettings.themeColor,
                  color: storeSettings.backgroundColor,
                  borderColor: storeSettings.themeColor,
                }}
              >
                LEARN MORE
              </button>
            </div>

            {/* Image */}
            <div className="order-1 md:order-2">
              <BoldMinimalistEditableImage
                settingKey="philosophyImage"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
                alt="Our philosophy"
                className="w-full h-auto border-4"
                style={{ borderColor: storeSettings.themeColor }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BoldMinimalistHomePage
