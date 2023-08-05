import mongoose from "mongoose";
const { Schema } = mongoose;
const betactiveSchema = new Schema(
  {


    Status:{
        type: Boolean,
        default:true
    }, 
   
  },
  { timestamps: true }
);
export default mongoose.models.BetActive || mongoose.model("BetActive", betactiveSchema);