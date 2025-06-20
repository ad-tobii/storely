"use client"
import PlayfulColorfulEditableText from "./PlayfulColorfulEditableText"
import PlayfulColorfulEditableImage from "./PlayfulColorfulEditableImage"
import { Heart, Star, Instagram, Facebook, Twitter } from "lucide-react"

const PlayfulColorfulAboutPage = ({ storeSettings, editMode = false, navigate, sellerId }) => {
  return (
    <div className="playful-colorful-about py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <Heart size={48} style={{ color: storeSettings.themeColor }} />
          </div>
          <h1 className="text-5xl font-bold mb-6" style={{ color: storeSettings.primaryTextColor }}>
            <PlayfulColorfulEditableText
              settingKey="aboutTitle"
              editMode={editMode}
              sellerId={sellerId}
              storeSettings={storeSettings}
              placeholder="🌈 Our Colorful Story 🌈"
            />
          </h1>
          <div className="max-w-3xl mx-auto text-xl" style={{ color: storeSettings.secondaryTextColor }}>
            <PlayfulColorfulEditableText
              settingKey="aboutSubtitle"
              editMode={editMode}
              sellerId={sellerId}
              storeSettings={storeSettings}
              multiline={true}
              placeholder="We're on a mission to make the world a brighter, happier place - one colorful creation at a time!"
            />
          </div>
        </div>

        {/* Brand Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 md:order-1">
            <div className="flex items-center mb-6">
              <Star size={32} style={{ color: storeSettings.themeColor }} className="mr-3" />
              <h2 className="text-4xl font-bold" style={{ color: storeSettings.primaryTextColor }}>
                How It All Started
              </h2>
            </div>
            <div className="prose text-lg space-y-4" style={{ color: storeSettings.secondaryTextColor }}>
              <PlayfulColorfulEditableText
                settingKey="brandStory"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
                multiline={true}
                className="leading-relaxed"
                placeholder="We believe life should be full of color and joy! Our vibrant creations are designed to bring smiles and spark creativity in everyday moments."
              />
              <PlayfulColorfulEditableText
                settingKey="brandOrigin"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
                multiline={true}
                className="leading-relaxed"
                placeholder="It all began with a simple belief: life is too short for boring colors! We started in a tiny studio filled with paint splatters, glitter, and endless creativity. Today, we're proud to bring joy and color to thousands of homes around the world! 🎨✨"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <PlayfulColorfulEditableImage
              settingKey="aboutImage1"
              alt="Our colorful beginning"
              className="rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              editMode={editMode}
              sellerId={sellerId}
              storeSettings={storeSettings}
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold mb-16 text-center" style={{ color: storeSettings.primaryTextColor }}>
            ✨ What We Believe In ✨
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="text-center p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${storeSettings.themeColor}15, ${storeSettings.themeColor}25)`,
              }}
            >
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: storeSettings.primaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="value1Title"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Creativity First"
                />
              </h3>
              <div style={{ color: storeSettings.secondaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="value1Text"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  multiline={true}
                  placeholder="We believe everyone deserves to express their unique style and personality through vibrant, creative designs that spark joy and inspiration!"
                />
              </div>
            </div>

            <div
              className="text-center p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${storeSettings.secondaryColor}15, ${storeSettings.secondaryColor}25)`,
              }}
            >
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: storeSettings.primaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="value2Title"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Planet Friendly"
                />
              </h3>
              <div style={{ color: storeSettings.secondaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="value2Text"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  multiline={true}
                  placeholder="We're committed to protecting our beautiful, colorful planet! All our products are made with eco-friendly materials and sustainable practices."
                />
              </div>
            </div>

            <div
              className="text-center p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${storeSettings.themeColor}15, ${storeSettings.secondaryColor}15)`,
              }}
            >
              <div className="text-6xl mb-4">💖</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: storeSettings.primaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="value3Title"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Spreading Joy"
                />
              </h3>
              <div style={{ color: storeSettings.secondaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="value3Text"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  multiline={true}
                  placeholder="Our ultimate goal is simple: to make people smile! Every product we create is designed to bring happiness and positive vibes into your daily life."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold mb-16 text-center" style={{ color: storeSettings.primaryTextColor }}>
            <PlayfulColorfulEditableText
              settingKey="teamTitle"
              editMode={editMode}
              sellerId={sellerId}
              storeSettings={storeSettings}
              placeholder="🌟 Meet Our Colorful Team 🌟"
            />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <PlayfulColorfulEditableImage
                settingKey="founderImage"
                alt="Founder"
                className="w-56 h-72 mx-auto mb-6 rounded-2xl object-cover shadow-lg transform hover:rotate-3 transition-transform duration-300"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
              <h3 className="text-2xl font-bold mb-2" style={{ color: storeSettings.primaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="founderName"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Luna Rainbow 🌈"
                />
              </h3>
              <p className="font-bold mb-3 text-lg" style={{ color: storeSettings.themeColor }}>
                <PlayfulColorfulEditableText
                  settingKey="founderTitle"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Chief Color Officer & Founder"
                />
              </p>
              <div style={{ color: storeSettings.secondaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="founderBio"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  multiline={true}
                  placeholder="Luna's superpower is seeing the world in infinite colors! With 10+ years of design experience and an endless supply of glitter, she leads our team in creating magical, colorful experiences."
                />
              </div>
            </div>

            <div className="text-center">
              <PlayfulColorfulEditableImage
                settingKey="designer1Image"
                alt="Designer"
                className="w-56 h-72 mx-auto mb-6 rounded-2xl object-cover shadow-lg transform hover:-rotate-3 transition-transform duration-300"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
              <h3 className="text-2xl font-bold mb-2" style={{ color: storeSettings.primaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="designer1Name"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Sunny Bright ☀️"
                />
              </h3>
              <p className="font-bold mb-3 text-lg" style={{ color: storeSettings.themeColor }}>
                <PlayfulColorfulEditableText
                  settingKey="designer1Title"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Head of Happy Designs"
                />
              </p>
              <div style={{ color: storeSettings.secondaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="designer1Bio"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  multiline={true}
                  placeholder="Sunny brings sunshine to everything she touches! Her infectious enthusiasm and brilliant design skills help create products that make people smile from ear to ear."
                />
              </div>
            </div>

            <div className="text-center">
              <PlayfulColorfulEditableImage
                settingKey="artist1Image"
                alt="Artist"
                className="w-56 h-72 mx-auto mb-6 rounded-2xl object-cover shadow-lg transform hover:rotate-2 transition-transform duration-300"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
              <h3 className="text-2xl font-bold mb-2" style={{ color: storeSettings.primaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="artist1Name"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Ziggy Stardust ⭐"
                />
              </h3>
              <p className="font-bold mb-3 text-lg" style={{ color: storeSettings.themeColor }}>
                <PlayfulColorfulEditableText
                  settingKey="artist1Title"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Master of Color Magic"
                />
              </p>
              <div style={{ color: storeSettings.secondaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="artist1Bio"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  multiline={true}
                  placeholder="Ziggy is our resident color wizard! With paintbrush in hand and imagination running wild, they create the most amazing color combinations that make our products truly special."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fun Facts */}
        <div
          className="py-16 px-8 rounded-2xl mb-24"
          style={{
            background: `linear-gradient(135deg, ${storeSettings.themeColor}20, ${storeSettings.secondaryColor}20)`,
          }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: storeSettings.primaryTextColor }}>
            🎉 Fun Facts About Us 🎉
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎨</div>
              <div className="text-3xl font-bold mb-2" style={{ color: storeSettings.themeColor }}>
                <PlayfulColorfulEditableText
                  settingKey="funFact1Number"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="10,000+"
                />
              </div>
              <p className="font-bold" style={{ color: storeSettings.primaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="funFact1Title"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Colors Used"
                />
              </p>
              <p className="text-sm" style={{ color: storeSettings.secondaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="funFact1Subtitle"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="And counting!"
                />
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">😊</div>
              <div className="text-3xl font-bold mb-2" style={{ color: storeSettings.themeColor }}>
                <PlayfulColorfulEditableText
                  settingKey="funFact2Number"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="50,000+"
                />
              </div>
              <p className="font-bold" style={{ color: storeSettings.primaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="funFact2Title"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Smiles Created"
                />
              </p>
              <p className="text-sm" style={{ color: storeSettings.secondaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="funFact2Subtitle"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Our favorite metric!"
                />
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">☕</div>
              <div className="text-3xl font-bold mb-2" style={{ color: storeSettings.themeColor }}>
                <PlayfulColorfulEditableText
                  settingKey="funFact3Number"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="2,847"
                />
              </div>
              <p className="font-bold" style={{ color: storeSettings.primaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="funFact3Title"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Cups of Coffee"
                />
              </p>
              <p className="text-sm" style={{ color: storeSettings.secondaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="funFact3Subtitle"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Fuel for creativity!"
                />
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🌈</div>
              <div className="text-3xl font-bold mb-2" style={{ color: storeSettings.themeColor }}>
                <PlayfulColorfulEditableText
                  settingKey="funFact4Number"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="365"
                />
              </div>
              <p className="font-bold" style={{ color: storeSettings.primaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="funFact4Title"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Days of Color"
                />
              </p>
              <p className="text-sm" style={{ color: storeSettings.secondaryTextColor }}>
                <PlayfulColorfulEditableText
                  settingKey="funFact4Subtitle"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                  placeholder="Every single day!"
                />
              </p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: storeSettings.primaryTextColor }}>
            <PlayfulColorfulEditableText
              settingKey="socialTitle"
              editMode={editMode}
              sellerId={sellerId}
              storeSettings={storeSettings}
              placeholder="🌈 Follow Our Colorful Journey 🌈"
            />
          </h2>
          <div className="mb-8 text-lg" style={{ color: storeSettings.secondaryTextColor }}>
            <PlayfulColorfulEditableText
              settingKey="socialText"
              editMode={editMode}
              sellerId={sellerId}
              storeSettings={storeSettings}
              multiline={true}
              placeholder="Join our colorful community for daily inspiration, behind-the-scenes fun, and exclusive sneak peeks of new products!"
            />
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${storeSettings.themeColor}, ${storeSettings.secondaryColor})`,
              }}
            >
              <Instagram size={28} className="text-white" />
            </a>
            <a
              href="#"
              className="p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${storeSettings.secondaryColor}, ${storeSettings.themeColor})`,
              }}
            >
              <Facebook size={28} className="text-white" />
            </a>
            <a
              href="#"
              className="p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${storeSettings.themeColor}, ${storeSettings.secondaryColor})`,
              }}
            >
              <Twitter size={28} className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayfulColorfulAboutPage
