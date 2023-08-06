import mongoose from "mongoose";
const { Schema } = mongoose;
const bethistorySchema = new Schema(
  {

    BetWin:{
        type: String,
        
    }, 
   
  },
  { timestamps: true }
);
export default mongoose.models.BetHistory || mongoose.model("BetHistory", bethistorySchema);
