import connectToMongo from './config/db.js';
import express from 'express'
import cors from 'cors';
import userRoutes from './routes/user.js';

const app = express()
const port = 9000

connectToMongo();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());


app.use('/api/v1',userRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



