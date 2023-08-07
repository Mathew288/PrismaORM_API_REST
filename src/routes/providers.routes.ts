import { Router } from 'express'
import { prisma } from "../db";


const router = Router();

router.get('/providers', async (req, res) => {
    const providers = await prisma.provider.findMany();
    res.json(providers);
});
router.get('/providers/:id', async (req,res)=>{
    const selectedProvider = await prisma.provider.findFirst({
        where:{
            id: parseInt(req.params.id)
        }
    });
    if (!selectedProvider) 
        res.status(404).json({ error:"Provider not found"});
    res.json(selectedProvider);
});

router.put('/providers', async (req, res) => {
    const newProvider = await prisma.provider.create({
        data: req.body
    })
    res.json(newProvider);
});

router.delete('/providers/:id', async (req, res) => {
    const deletedProvider = await prisma.provider.delete({
        where:{
            id: parseInt(req.params.id)
        }
    });
    if(!deletedProvider)
        res.status(404).json({ error:"Provider not found" });

    res.json(deletedProvider);
});

router.put('/providers/:id', async (req, res) => {
    const updatedProduct = await prisma.provider.update({
        where:{
            id: parseInt(req.params.id)
        },
        data: req.body
    });

    if(!updatedProduct)
        res.status(404).json({ error:"Provider not found" });

    res.json(updatedProduct);
});

export default router