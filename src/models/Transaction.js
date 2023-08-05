import mongoose from "mongoose";
const { Schema } = mongoose;
const transactionSchema = new Schema(
  {

    Ttype:{
        type: String,

    }, 
    DMobile:{
        type:Number,


    },
    DPaymentMethod:{
        type:String,

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
    WMobile:{
        type:Number,


    },
    
    WPaymentMethod:{
        type:String,

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
    BetOn:{
        type:String,
        trim: true,
    },
    BetAmount:{
        type:Number,
        default:0,
    },
    BetStatus:{
        type: String,
        default:"Pending"
    }, 
    BetWOn:{
        type:String,
        trim: true,
    },
    WBetWAmount:{
        type:Number,
        default:0,
    },
    BetWStatus:{
        type: String,
        default:"Pending"
    }, 

   



  },
  { timestamps: true }
);
export default mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
