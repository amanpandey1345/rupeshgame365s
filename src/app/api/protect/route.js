export const POST = async (request) => {
    const { name } = await request.json();
    console.log(name);

    

  
    try {

      return new NextResponse(
        JSON.stringify({
          success: true,
          name,
          message: "Protect been created",
        }),
        {
          status: 201,
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
  