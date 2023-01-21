import App from "./app";
import { PORT } from "./config";
import connectDB from "./utils/connectDB";

try{

  const server = new App().build();
  server.listen(Number(PORT) || 3000, async () => {
    console.log(`Server ready at http://localhost:${PORT}`);
    await connectDB();
  });

} catch(e){

  console.error(e);
  process.exit(1);

}