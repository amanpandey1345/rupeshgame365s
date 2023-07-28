import mongoose from "mongoose";
const { Schema } = mongoose;
const betSchema = new Schema(
  {

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
   
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },


  },
  { timestamps: true }
);
export default mongoose.models.Bet || mongoose.model("Bet", betSchema);
