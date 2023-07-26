import mongoose from "mongoose";
const { Schema } = mongoose;
const depositSchema = new Schema(
  {
    DMobile:{
        type:Number,
        required: [true,"Please Enter bet number"],

    },
    DPaymentMethod:{
        type:String,
        required: [true,"Please Enter bet PaymentMethod"],
        trim: true,
    },
    DAmount:{
        type:Number,
        default:0,
    },
    DStatus:{
        type: String,
        default:"Pending"
    }, 
    DTranscationDateTime:{
        type: String,

    }, 

    DUTRid:{
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
export default mongoose.models.Deposite || mongoose.model("Deposite", depositSchema);
