import express,{Request,Response} from 'express';
import mongoose from "mongoose";

const app = express();

const DB = 'mongodb+srv://Shemil:3cq0aQgIPkYw4nNK@myprojectscluster.pxortas.mongodb.net/?retryWrites=true&w=majority'

mongoose.set('strictQuery',false);
mongoose.connect(DB)
.then(() => console.log('DB connection successful'));


app.get('/',(req : Request,res: Response ) => {
  res.send("Hello Shemil...");
});

const port = 3000;
app.listen(port, ()=>{
    // tslint:disable-next-line:no-console
  console.log('Server running on port : 3000');
})