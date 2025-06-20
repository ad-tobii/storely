"use client"
import ModernSleekEditableText from "./ModernSleekEditableText"
import ModernSleekEditableImage from "./ModernSleekEditableImage"
import { ArrowRight } from "lucide-react"

const ModernSleekHomePage = ({ storeSettings, seller, editMode, navigate, sellerId }) => {
  return (
    <div className="modern-sleek-home">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: `url(${seller.heroImageUrl || 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2670&auto=format&fit=crop'})`}}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white uppercase tracking-wider">
            <ModernSleekEditableText settingKey="heroTitle" editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} placeholder="Design Reimagined" />
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
             <ModernSleekEditableText settingKey="heroSubtitle" editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} placeholder="Elevate your space with curated modern essentials." />
          </p>
          <button onClick={() => navigate("shop")} className="px-10 py-4 font-semibold rounded-sm text-white transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: storeSettings.themeColor }}>
            EXPLORE COLLECTION
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4" style={{ backgroundColor: storeSettings.secondaryColor }}>
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: storeSettings.primaryTextColor }}>
            <ModernSleekEditableText settingKey="featuredTitle" editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} placeholder="Featured Products" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(storeSettings.products || []).slice(0, 4).map((product) => (
              <div key={product._id} className="group cursor-pointer" onClick={() => navigate("product", product._id)}>
                <div className="mb-4 overflow-hidden bg-gray-800">
                  <img src={product.images?.[0] || "/placeholder.svg"} alt={product.name} className="w-full h-80 object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"/>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: storeSettings.primaryTextColor }}>{product.name}</h3>
                <p className="font-medium text-lg" style={{ color: storeSettings.themeColor }}>${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigate("shop")} className="inline-flex items-center px-8 py-3 border-2 rounded-sm transition-colors duration-300" style={{ borderColor: storeSettings.themeColor, color: storeSettings.themeColor }} >
              View All <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4" style={{ backgroundColor: storeSettings.backgroundColor }}>
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <ModernSleekEditableImage settingKey="philosophyImage" alt="Our philosophy" className="w-full h-auto" editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ color: storeSettings.primaryTextColor }}>
                <ModernSleekEditableText settingKey="philosophyTitle" editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} placeholder="Our Philosophy"/>
              </h2>
              <div className="prose prose-xl text-gray-300" style={{ color: storeSettings.secondaryTextColor }}>
                <ModernSleekEditableText settingKey="brandStory" multiline={true} editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} />
              </div>
              <button onClick={() => navigate("about")} className="mt-8 inline-flex items-center px-8 py-3 rounded-sm text-white transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: storeSettings.themeColor }} >
                Learn More <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ModernSleekHomePage