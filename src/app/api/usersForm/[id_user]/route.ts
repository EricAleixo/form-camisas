import { PrismaClient, Prisma } from "@/generated/prisma"

const prisma = new PrismaClient()

export async function PUT(req: Request, context: { params: { id_user: string } }) {

    const id = context.params.id_user
    try{
        const { nome, camisa, estilo, telefone , pagamento, tamanho, turma, status, valor } = await req.json()

    const userUpdate = await prisma.user_form.update({
        where: {
            id: id
        },
        data: {
            nome: nome,
            camisa: camisa,
            estilo: estilo,
            telefone: telefone,
            pagamento: pagamento,
            tamanho: tamanho,
            turma: turma,
            status: status,
            valor: valor
        }
    })
    
        return Response.json({
            data: userUpdate
        })
    } catch(e){
        return Response.json({
            message: e
        })
    }


}

export async function DELETE(req: Request, context: {params: {id_user: string}}) {
    const id = context.params.id_user
    
    try{
        await prisma.user_form.delete({
            where: {
                id: id
            }
        })

        return Response.json({
            message: "Usuário deletado"
        })
    } catch(e){
        return Response.json({
            message: e
        })
    }
}