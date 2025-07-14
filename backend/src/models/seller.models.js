import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const sellerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    storename: { // Keeping this as `storename` as per your sample object
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    role:{
type:String,
required:[true, "Role must be entered to sign up"]
    },
    storeLogoUrl: {
      type: String,
      default: "",
    },
    heroImageUrl: {
      type: String,
      default: "",
    },
    otp: {
      type: String,
      default: '',
    },
    otpExpiry: {
      type: Date,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactInfo: {
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      address: { type: String, default: "" },
    },
    password: { type: String, required: true },
    template: { type: String },
    storeSettingsRef: { type: mongoose.Schema.Types.ObjectId, refPath: "storeSettingsModel" },
    storeSettingsModel: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    customers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
    isVerified: { type: Boolean, default: false },
    onboardingCompleted: { type: Boolean, default: false },
    storeDescription: { type: String, default: ""},
    storeCategories: [String],
    shippingDestinations: [String],
    returnPolicy: { type: String, default: "" },
    shippingRates: { standard: Number, express: Number },
    bankDetails: {
      bankName: String,
      accountNumber: String,
      payoutFrequency: String
    },
    storePolicy: { type: String, default: "" },
    socialLinks: { instagram: String, facebook: String },
  },
  { timestamps: true },
)

// sellerSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next()
//   this.password = await bcrypt.hash(this.password, 10)
//   next()
// })

// sellerSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password)
// }

export default mongoose.models.Seller || mongoose.model("Seller", sellerSchema)