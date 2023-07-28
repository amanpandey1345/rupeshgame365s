import mongoose from "mongoose";
const { Schema } = mongoose;
const betactiveSchema = new Schema(
  {


    Status:{
        type: ,
        default:"Pending"
    }, 
   
  },
  { timestamps: true }
);
export default mongoose.models.BetActive || mongoose.model("BetActive", betactiveSchema);