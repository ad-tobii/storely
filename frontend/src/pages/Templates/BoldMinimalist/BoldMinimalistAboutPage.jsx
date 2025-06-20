import BoldMinimalistEditableText from "./BoldMinimalistEditableText"
import BoldMinimalistEditableImage from "./BoldMinimalistEditableImage"
import { Award, Target, Users } from "lucide-react"

const BoldMinimalistAboutPage = ({ storeSettings, editMode = false, navigate, sellerId }) => {
  return (
    <div className="bold-minimalist-about" style={{ backgroundColor: storeSettings.backgroundColor }}>
      {/* Hero Section */}
      <section className="py-24 px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h1
            className="text-6xl md:text-8xl font-black mb-8 uppercase tracking-widest"
            style={{ color: storeSettings.primaryTextColor }}
          >
            <BoldMinimalistEditableText
              settingKey="aboutTitle"
              editMode={editMode}
              className="text-6xl md:text-8xl font-black uppercase tracking-widest"
              sellerId={sellerId}
              storeSettings={storeSettings}
            />
          </h1>
          <div className="w-32 h-2 bg-black mx-auto mb-12"></div>
          <p className="text-xl font-bold uppercase tracking-wider" style={{ color: storeSettings.secondaryTextColor }}>
            <BoldMinimalistEditableText
              settingKey="aboutSubtitle"
              editMode={editMode}
              multiline={true}
              sellerId={sellerId}
              storeSettings={storeSettings}
            />
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-black mb-8 uppercase tracking-widest text-white">
                <BoldMinimalistEditableText
                  settingKey="missionTitle"
                  editMode={editMode}
                  className="text-5xl font-black uppercase tracking-widest"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h2>
              <div className="prose font-bold text-xl leading-relaxed text-gray-300">
                <BoldMinimalistEditableText
                  settingKey="missionText"
                  editMode={editMode}
                  multiline={true}
                  className="mb-8"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
                <BoldMinimalistEditableText
                  settingKey="missionText2"
                  editMode={editMode}
                  multiline={true}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </div>
            </div>
            <div>
              <BoldMinimalistEditableImage
                settingKey="missionImage"
                alt="Our mission"
                className="w-full h-auto border-4 border-white"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-8">
        <div className="container mx-auto">
          <h2
            className="text-5xl font-black mb-20 text-center uppercase tracking-widest"
            style={{ color: storeSettings.primaryTextColor }}
          >
            <BoldMinimalistEditableText
              settingKey="valuesTitle"
              editMode={editMode}
              className="text-5xl font-black uppercase tracking-widest"
              sellerId={sellerId}
              storeSettings={storeSettings}
            />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <div className="border-4 border-black p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-8 bg-black flex items-center justify-center">
                <Target size={32} className="text-white" />
              </div>
              <h3
                className="text-2xl font-black mb-6 uppercase tracking-widest"
                style={{ color: storeSettings.primaryTextColor }}
              >
                <BoldMinimalistEditableText
                  settingKey="value1Title"
                  editMode={editMode}
                  className="text-2xl font-black uppercase tracking-widest"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <p className="font-bold uppercase tracking-wider" style={{ color: storeSettings.secondaryTextColor }}>
                <BoldMinimalistEditableText
                  settingKey="value1Text"
                  editMode={editMode}
                  multiline={true}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </p>
            </div>

            <div className="border-4 border-black p-12 text-center bg-black">
              <div className="w-16 h-16 mx-auto mb-8 bg-white flex items-center justify-center">
                <Award size={32} className="text-black" />
              </div>
              <h3 className="text-2xl font-black mb-6 uppercase tracking-widest text-white">
                <BoldMinimalistEditableText
                  settingKey="value2Title"
                  editMode={editMode}
                  className="text-2xl font-black uppercase tracking-widest"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <p className="font-bold uppercase tracking-wider text-gray-300">
                <BoldMinimalistEditableText
                  settingKey="value2Text"
                  editMode={editMode}
                  multiline={true}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </p>
            </div>

            <div className="border-4 border-black p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-8 bg-black flex items-center justify-center">
                <Users size={32} className="text-white" />
              </div>
              <h3
                className="text-2xl font-black mb-6 uppercase tracking-widest"
                style={{ color: storeSettings.primaryTextColor }}
              >
                <BoldMinimalistEditableText
                  settingKey="value3Title"
                  editMode={editMode}
                  className="text-2xl font-black uppercase tracking-widest"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <p className="font-bold uppercase tracking-wider" style={{ color: storeSettings.secondaryTextColor }}>
                <BoldMinimalistEditableText
                  settingKey="value3Text"
                  editMode={editMode}
                  multiline={true}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24 px-8 bg-black">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-black mb-20 text-center text-white uppercase tracking-widest">
            <BoldMinimalistEditableText
              settingKey="awardsTitle"
              editMode={editMode}
              className="text-5xl font-black uppercase tracking-widest"
              sellerId={sellerId}
              storeSettings={storeSettings}
            />
          </h2>

          <div className="space-y-12">
            <div className="border-4 border-white p-8 text-center">
              <div className="text-3xl font-black mb-4 text-white">
                <BoldMinimalistEditableText
                  settingKey="award1Year"
                  editMode={editMode}
                  className="text-3xl font-black"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </div>
              <h3 className="text-2xl font-black mb-2 text-white uppercase tracking-widest">
                <BoldMinimalistEditableText
                  settingKey="award1Title"
                  editMode={editMode}
                  className="text-2xl font-black uppercase tracking-widest"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <p className="font-bold uppercase tracking-wider text-gray-300">
                <BoldMinimalistEditableText
                  settingKey="award1Description"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </p>
            </div>

            <div className="border-4 border-white p-8 text-center">
              <div className="text-3xl font-black mb-4 text-white">
                <BoldMinimalistEditableText
                  settingKey="award2Year"
                  editMode={editMode}
                  className="text-3xl font-black"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </div>
              <h3 className="text-2xl font-black mb-2 text-white uppercase tracking-widest">
                <BoldMinimalistEditableText
                  settingKey="award2Title"
                  editMode={editMode}
                  className="text-2xl font-black uppercase tracking-widest"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <p className="font-bold uppercase tracking-wider text-gray-300">
                <BoldMinimalistEditableText
                  settingKey="award2Description"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </p>
            </div>

            <div className="border-4 border-white p-8 text-center">
              <div className="text-3xl font-black mb-4 text-white">
                <BoldMinimalistEditableText
                  settingKey="award3Year"
                  editMode={editMode}
                  className="text-3xl font-black"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </div>
              <h3 className="text-2xl font-black mb-2 text-white uppercase tracking-widest">
                <BoldMinimalistEditableText
                  settingKey="award3Title"
                  editMode={editMode}
                  className="text-2xl font-black uppercase tracking-widest"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <p className="font-bold uppercase tracking-wider text-gray-300">
                <BoldMinimalistEditableText
                  settingKey="award3Description"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-8">
        <div className="container mx-auto max-w-6xl">
          <h2
            className="text-5xl font-black mb-20 text-center uppercase tracking-widest"
            style={{ color: storeSettings.primaryTextColor }}
          >
            <BoldMinimalistEditableText
              settingKey="teamTitle"
              editMode={editMode}
              className="text-5xl font-black uppercase tracking-widest"
              sellerId={sellerId}
              storeSettings={storeSettings}
            />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center border-4 border-black p-8">
              <BoldMinimalistEditableImage
                settingKey="founder1Image"
                alt="Founder"
                className="w-full h-64 object-cover mb-6"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
              <h3
                className="text-xl font-black mb-2 uppercase tracking-widest"
                style={{ color: storeSettings.primaryTextColor }}
              >
                <BoldMinimalistEditableText
                  settingKey="founder1Name"
                  editMode={editMode}
                  className="text-xl font-black uppercase tracking-widest"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <p className="font-bold uppercase tracking-wider" style={{ color: storeSettings.secondaryTextColor }}>
                <BoldMinimalistEditableText
                  settingKey="founder1Title"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </p>
            </div>

            <div className="text-center border-4 border-black p-8">
              <BoldMinimalistEditableImage
                settingKey="founder2Image"
                alt="Designer"
                className="w-full h-64 object-cover mb-6"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
              <h3
                className="text-xl font-black mb-2 uppercase tracking-widest"
                style={{ color: storeSettings.primaryTextColor }}
              >
                <BoldMinimalistEditableText
                  settingKey="founder2Name"
                  editMode={editMode}
                  className="text-xl font-black uppercase tracking-widest"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <p className="font-bold uppercase tracking-wider" style={{ color: storeSettings.secondaryTextColor }}>
                <BoldMinimalistEditableText
                  settingKey="founder2Title"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </p>
            </div>

            <div className="text-center border-4 border-black p-8">
              <BoldMinimalistEditableImage
                settingKey="founder3Image"
                alt="Strategist"
                className="w-full h-64 object-cover mb-6"
                editMode={editMode}
                sellerId={sellerId}
                storeSettings={storeSettings}
              />
              <h3
                className="text-xl font-black mb-2 uppercase tracking-widest"
                style={{ color: storeSettings.primaryTextColor }}
              >
                <BoldMinimalistEditableText
                  settingKey="founder3Name"
                  editMode={editMode}
                  className="text-xl font-black uppercase tracking-widest"
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </h3>
              <p className="font-bold uppercase tracking-wider" style={{ color: storeSettings.secondaryTextColor }}>
                <BoldMinimalistEditableText
                  settingKey="founder3Title"
                  editMode={editMode}
                  sellerId={sellerId}
                  storeSettings={storeSettings}
                />
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BoldMinimalistAboutPage
