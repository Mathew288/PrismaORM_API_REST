import { Router } from 'express'
import { prisma } from "../db";

const router = Router();


router.get('/products', async (req, res) => {

    const products = await prisma.product.findMany();
    res.json(products);
});

router.get('/products/:id', async (req, res) => {
    const products = await prisma.product.findFirst({
        where: {
            id: parseInt(req.params.id)
        }
    });

    if (!products) {
        res.json({ error:"Product not found"});
        return;
    }

    res.send(products);
});

router.post('/products', async (req, res) => {
    const newProduct = await prisma.product.create({
        data: req.body
    });

    res.json(newProduct);
})


router.delete('/products/:id', async (req, res) => {

    const deletedProduct = await prisma.product.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    if (!deletedProduct)
        res.status(404).json({ message: "Product not found" });


    return res.json(deletedProduct);
})

router.put('/products/:id', async (req, res) => {
    const updatedProduct = await prisma.product.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: req.body
    });

    return res.json(updatedProduct);
})


export default router