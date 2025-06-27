import { Palette, Layout, Brush } from "lucide-react"

export default function StoreEditor() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Store Editor</h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-12 text-center">
        <div className="flex justify-center space-x-4 mb-6">
          <Palette className="w-12 h-12 text-[#32cd32]" />
          <Layout className="w-12 h-12 text-blue-400" />
          <Brush className="w-12 h-12 text-purple-400" />
        </div>

        <h3 className="text-xl font-semibold text-white mb-4">Store Customization Coming Soon</h3>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Customize your store layout, colors, and template here. This feature will allow you to personalize your
          store's appearance and create a unique shopping experience for your customers.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-zinc-800 p-6 rounded-lg">
            <Palette className="w-8 h-8 text-[#32cd32] mb-3" />
            <h4 className="text-white font-medium mb-2">Color Themes</h4>
            <p className="text-zinc-400 text-sm">
              Choose from pre-built color schemes or create your own custom palette
            </p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-lg">
            <Layout className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="text-white font-medium mb-2">Layout Options</h4>
            <p className="text-zinc-400 text-sm">Select from various layout templates to showcase your products</p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-lg">
            <Brush className="w-8 h-8 text-purple-400 mb-3" />
            <h4 className="text-white font-medium mb-2">Custom Styling</h4>
            <p className="text-zinc-400 text-sm">Add custom CSS and branding elements to make your store unique</p>
          </div>
        </div>
      </div>
    </div>
  )
}
