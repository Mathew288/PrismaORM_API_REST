import { Router } from 'express'
import { prisma } from "../db";

const router = Router();


/**
 * ? ************************************************
 * ?                GET PRODUCTS
 * ? *************************************************
 */
router.get('/products', async (req, res) => {
    const products = await prisma.product.findMany({include:{provider:true}});
    res.json(products);
});

router.get('/products/:id', async (req, res) => {
    const products = await prisma.product.findFirst({
        where: {
            id: parseInt(req.params.id)
        }
    });

    if (!products) {
        res.json({ error: "Product not found" });
        return;
    }

    res.send(products);
});



/**
 * ? ************************************************
 * ?                CREATE PRODUCTS
 * ? *************************************************
 */
router.post('/products', async (req, res) => {
    const newProduct = await prisma.product.create({
        data: req.body
    });

    res.json(newProduct);
})


/**
 * ? ************************************************
 * ?                DELETE PRODUCTS
 * ? *************************************************
 */
router.delete('/products/:id', async (req, res) => {

    const deletedProduct = await prisma.product.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    if (!deletedProduct)
        res.status(404).json({ message: "Product not found" });


    return res.json(deletedProduct);
});

/**
 * ? ************************************************
 * ?                UPDATE PRODUCTS
 * ? *************************************************
 */

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