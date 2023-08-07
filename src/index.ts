import express, {Express} from 'express'
import productRoutes from './routes/products.routes.ts'
import providerRoutes from './routes/providers.routes.ts'


const port = 3000;
const app:Express = express();


app.use(express.json());

app.use('/api',productRoutes);
app.use('/api',providerRoutes);



app.listen(port);
console.log(`Server running on port ${port} : http://localhost:${port}/api`);


