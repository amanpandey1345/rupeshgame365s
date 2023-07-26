import mongoose from "mongoose";
const { Schema } = mongoose;
const withdrawSchema = new Schema(
  {
    WMobile:{
        type:Number,
        required: [true,"Please Enter bet number"],

    },
    
    WPaymentMethod:{
        type:String,
        required: [true,"Please Enter bet PaymentMethod"],
        trim: true,
    },
    WTranscationDateTime:{
        type: String,

    }, 
    WAmount:{
        type:Number,
        default:0,
    },
    WStatus:{
        type: String,
        default:"Pending"
    },
    WUTRid:{
        type: Number,

    },
   
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

  },
  { timestamps: true }
);
export default mongoose.models.Withdraw || mongoose.model("Withdraw", withdrawSchema);
