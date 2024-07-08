const { PrismaClient } = require("@prisma/client");
const httpStatus = require("http-status")

const prisma = new PrismaClient()

async function getAll(req, res) {
    try {

        const activities = await prisma.activity.findMany({
            include: {
                user: true,
                category: true,
            }
        })

        return res.status(httpStatus.OK).send(activities);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }
}

const create = async (req, res) => {
    try {
        const activity = await prisma.activity.create({
            data: {
                description: req.body.description,
                userId: req.body.userId,
                categoryId: req.body.categoryId,
            }
        })

        res.send(activity)
    } catch (e) {
        console.log(e)
    }

    console.log(req.params.description);
}

async function update(req, res) {

    try {

        const activity = await prisma.activity.update({
            data: req.body,
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.CREATED).send(activity);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não atualizado!");
    }

}

async function deleteEntity(req, res) {
    try {
        const cat = await prisma.activity.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.OK).send("Atividade removida com sucesso!")

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não removido!");
    }
}

module.exports = {  getAll, create, update, deleteEntity }