import ModernSleekEditableText from "./ModernSleekEditableText"
import ModernSleekEditableImage from "./ModernSleekEditableImage"
import { Zap, ShieldCheck, Leaf } from "lucide-react"

const ModernSleekAboutPage = ({ storeSettings, editMode = false, sellerId }) => {
  return (
    <div className="modern-sleek-about py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold mb-6 uppercase tracking-wider" style={{ color: storeSettings.primaryTextColor }}>
            <ModernSleekEditableText settingKey="aboutTitle" editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} placeholder="Our Vision"/>
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: storeSettings.secondaryTextColor }}>
            <ModernSleekEditableText settingKey="aboutSubtitle" editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} placeholder="We believe in design that is intentional, functional, and timeless."/>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold mb-6" style={{ color: storeSettings.primaryTextColor }}>
               <ModernSleekEditableText settingKey="storyTitle" editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} placeholder="The Story"/>
            </h2>
            <div className="prose prose-xl text-gray-300" style={{ color: storeSettings.secondaryTextColor }}>
                <ModernSleekEditableText settingKey="brandStory" multiline={true} editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <ModernSleekEditableImage settingKey="aboutImage1" alt="Our story" className="w-full h-auto" editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} />
          </div>
        </div>
        
        <div className="py-20 border-t border-b border-gray-700/50">
          <h2 className="text-4xl font-bold mb-16 text-center" style={{ color: storeSettings.primaryTextColor }}>
             <ModernSleekEditableText settingKey="valuesTitle" editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} placeholder="Our Core Principles"/>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full" style={{ backgroundColor: storeSettings.themeColor + '20' }}>
                <ShieldCheck size={32} style={{ color: storeSettings.themeColor }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: storeSettings.primaryTextColor }}>
                <ModernSleekEditableText settingKey="value1Title" editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} placeholder="Uncompromising Quality"/>
              </h3>
              <p style={{ color: storeSettings.secondaryTextColor }}>
                <ModernSleekEditableText settingKey="value1Text" multiline={true} editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} placeholder="Every product is vetted for superior craftsmanship and durability."/>
              </p>
            </div>
            <div className="text-center">
               <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full" style={{ backgroundColor: storeSettings.themeColor + '20' }}>
                <Zap size={32} style={{ color: storeSettings.themeColor }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: storeSettings.primaryTextColor }}>
                <ModernSleekEditableText settingKey="value2Title" editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} placeholder="Functional Innovation"/>
              </h3>
              <p style={{ color: storeSettings.secondaryTextColor }}>
                <ModernSleekEditableText settingKey="value2Text" multiline={true} editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} placeholder="We seek out designs that solve problems and enhance daily life."/>
              </p>
            </div>
            <div className="text-center">
               <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full" style={{ backgroundColor: storeSettings.themeColor + '20' }}>
                <Leaf size={32} style={{ color: storeSettings.themeColor }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: storeSettings.primaryTextColor }}>
                <ModernSleekEditableText settingKey="value3Title" editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} placeholder="Sustainable Ethos"/>
              </h3>
              <p style={{ color: storeSettings.secondaryTextColor }}>
                <ModernSleekEditableText settingKey="value3Text" multiline={true} editMode={editMode} sellerId={sellerId} storeSettings={storeSettings} placeholder="We prioritize eco-conscious materials and responsible manufacturing."/>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModernSleekAboutPage