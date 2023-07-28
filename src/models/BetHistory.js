import mongoose from "mongoose";
const { Schema } = mongoose;
const bethistorySchema = new Schema(
  {

    BetStatus:{
        type: Boolean,
        default:false
    }, 
   
  },
  { timestamps: true }
);
export default mongoose.models.BetHistory || mongoose.model("BetHistory", bethistorySchema);
