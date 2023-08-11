import express, {Express} from 'express'
import productRoutes from './routes/products.routes.ts'
import providerRoutes from './routes/providers.routes.ts'
import cors from 'cors';


const port = 3000;
const app:Express = express();


app.use(express.json());
app.use(cors());

app.use('/api',productRoutes);
app.use('/api',providerRoutes);



app.listen(port);
console.log(`Server running on port ${port} : http://localhost:${port}/api`);


