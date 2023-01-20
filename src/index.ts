import App from "./app";
import { PORT } from "./config/index";

try{

  const server = new App().build();
  server.listen(Number(PORT) || 3000, () => {
  	console.log(`Server ready at http://localhost:${PORT}`);
  });

} catch(e){

  console.error(e);
  process.exit(1);

}