import ArtisanElegantEditableText from "./ArtisanElegantEditableText"
import ArtisanElegantEditableImage from "./ArtisanElegantEditableImage"
import { Instagram, Facebook, Twitter } from "lucide-react"

const ArtisanElegantAboutPage = ({ storeSettings, editMode = false, navigate, sellerId }) => {
  return (
    <div className="artisan-elegant-about py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6" style={{ color: storeSettings.primaryTextColor }}>
            <ArtisanElegantEditableText
              settingKey="aboutTitle"
              editMode={editMode}
              className="text-4xl font-bold"
              sellerId={sellerId}
              storeSettings={storeSettings}
            />
          </h1>
          <div className="max-w-3xl mx-auto" style={{ color: storeSettings.secondaryTextColor }}>
            <ArtisanElegantEditableText
              settingKey="aboutSubtitle"
              editMode={editMode}
              multiline={true}
              className="text-xl"
              sellerId={sellerId}
              storeSettings={storeSettings}
            />
          </div>
        </div>

        {/* Brand Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <ArtisanElegantEditableImage
              settingKey="aboutImage1"
              alt="Our workshop"
              className="rounded-lg shadow-lg"
              editMode={editMode}
              sellerId={sellerId}
              storeSettings={storeSettings}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: storeSettings.primaryTextColor }}>
              <ArtisanElegantEditableText
                settingKey="journeyTitle"
                editMode={editMode}
                className="text-3xl font-bold"
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
            </h2>
            <div className="prose" style={{ color: storeSettings.secondaryTextColor }}>
              <ArtisanElegantEditableText
                settingKey="brandStory"
                editMode={editMode}
                multiline={true}
                className="mb-4"
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
              <ArtisanElegantEditableText
                settingKey="brandMission"
                editMode={editMode}
                multiline={true}
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: storeSettings.primaryTextColor }}>
            <ArtisanElegantEditableText
              settingKey="valuesTitle"
              editMode={editMode}
              className="text-3xl font-bold"
              sellerId={sellerId}
              storeSettings={storeSettings}
            />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="text-center p-6 rounded-lg"
              style={{ backgroundColor: storeSettings.secondaryColor + "15" }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full"
                style={{ backgroundColor: storeSettings.themeColor + "30" }}
              >
                <span className="text-2xl" style={{ color: storeSettings.themeColor }}>
                  ✦
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: storeSettings.primaryTextColor }}>
                <ArtisanElegantEditableText
                  settingKey="value1Title"
                  editMode={editMode}
                  className="text-xl font-bold"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <div style={{ color: storeSettings.secondaryTextColor }}>
                <ArtisanElegantEditableText
                  settingKey="value1Text"
                  editMode={editMode}
                  multiline={true}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </div>
            </div>

            <div
              className="text-center p-6 rounded-lg"
              style={{ backgroundColor: storeSettings.secondaryColor + "15" }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full"
                style={{ backgroundColor: storeSettings.themeColor + "30" }}
              >
                <span className="text-2xl" style={{ color: storeSettings.themeColor }}>
                  ♲
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: storeSettings.primaryTextColor }}>
                <ArtisanElegantEditableText
                  settingKey="value2Title"
                  editMode={editMode}
                  className="text-xl font-bold"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <div style={{ color: storeSettings.secondaryTextColor }}>
                <ArtisanElegantEditableText
                  settingKey="value2Text"
                  editMode={editMode}
                  multiline={true}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </div>
            </div>

            <div
              className="text-center p-6 rounded-lg"
              style={{ backgroundColor: storeSettings.secondaryColor + "15" }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full"
                style={{ backgroundColor: storeSettings.themeColor + "30" }}
              >
                <span className="text-2xl" style={{ color: storeSettings.themeColor }}>
                  ❤
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: storeSettings.primaryTextColor }}>
                <ArtisanElegantEditableText
                  settingKey="value3Title"
                  editMode={editMode}
                  className="text-xl font-bold"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <div style={{ color: storeSettings.secondaryTextColor }}>
                <ArtisanElegantEditableText
                  settingKey="value3Text"
                  editMode={editMode}
                  multiline={true}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: storeSettings.primaryTextColor }}>
            <ArtisanElegantEditableText
              settingKey="teamTitle"
              editMode={editMode}
              className="text-3xl font-bold"
              sellerId={sellerId}
              storeSettings={storeSettings}
            />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <ArtisanElegantEditableImage
                settingKey="founderImage"
                alt="Founder"
                className="w-48 h-64 mx-auto mb-4 rounded-lg object-cover"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
              <h3 className="text-xl font-bold mb-2" style={{ color: storeSettings.primaryTextColor }}>
                <ArtisanElegantEditableText
                  settingKey="founderName"
                  editMode={editMode}
                  className="text-xl font-bold"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <p className="font-medium mb-3" style={{ color: storeSettings.themeColor }}>
                <ArtisanElegantEditableText
                  settingKey="founderTitle"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </p>
              <div style={{ color: storeSettings.secondaryTextColor }}>
                <ArtisanElegantEditableText
                  settingKey="founderBio"
                  editMode={editMode}
                  multiline={true}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </div>
            </div>

            <div className="text-center">
              <ArtisanElegantEditableImage
                settingKey="artisan1Image"
                alt="Master Artisan"
                className="w-48 h-64 mx-auto mb-4 rounded-lg object-cover"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
              <h3 className="text-xl font-bold mb-2" style={{ color: storeSettings.primaryTextColor }}>
                <ArtisanElegantEditableText
                  settingKey="artisan1Name"
                  editMode={editMode}
                  className="text-xl font-bold"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <p className="font-medium mb-3" style={{ color: storeSettings.themeColor }}>
                <ArtisanElegantEditableText
                  settingKey="artisan1Title"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </p>
              <div style={{ color: storeSettings.secondaryTextColor }}>
                <ArtisanElegantEditableText
                  settingKey="artisan1Bio"
                  editMode={editMode}
                  multiline={true}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </div>
            </div>

            <div className="text-center">
              <ArtisanElegantEditableImage
                settingKey="designer1Image"
                alt="Designer"
                className="w-48 h-64 mx-auto mb-4 rounded-lg object-cover"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
              <h3 className="text-xl font-bold mb-2" style={{ color: storeSettings.primaryTextColor }}>
                <ArtisanElegantEditableText
                  settingKey="designer1Name"
                  editMode={editMode}
                  className="text-xl font-bold"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <p className="font-medium mb-3" style={{ color: storeSettings.themeColor }}>
                <ArtisanElegantEditableText
                  settingKey="designer1Title"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </p>
              <div style={{ color: storeSettings.secondaryTextColor }}>
                <ArtisanElegantEditableText
                  settingKey="designer1Bio"
                  editMode={editMode}
                  multiline={true}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: storeSettings.primaryTextColor }}>
            <ArtisanElegantEditableText
              settingKey="socialTitle"
              editMode={editMode}
              className="text-3xl font-bold"
              sellerId={sellerId}
              storeSettings={storeSettings}
            />
          </h2>
          <div className="mb-8" style={{ color: storeSettings.secondaryTextColor }}>
            <ArtisanElegantEditableText
              settingKey="socialText"
              editMode={editMode}
              multiline={true}
              sellerId={sellerId}
              storeSettings={storeSettings}
            />
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="p-3 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: storeSettings.themeColor + "20",
                color: storeSettings.themeColor,
              }}
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="p-3 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: storeSettings.themeColor + "20",
                color: storeSettings.themeColor,
              }}
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="p-3 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: storeSettings.themeColor + "20",
                color: storeSettings.themeColor,
              }}
            >
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtisanElegantAboutPage