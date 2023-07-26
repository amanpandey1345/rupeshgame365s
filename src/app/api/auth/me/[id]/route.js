
import User from "@/models/User";
import dataBase from "@/utils/dataBase";

export const GET = async (request,{params}) => {

    const {id} = params
    await dataBase();
    const me = await User.findById(id);
    console.log(me);
    
  
    
  
    try {
      return new NextResponse(
        JSON.stringify({
          success: true,
          me,
          message: " me  get successfully",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: err.message,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  };
