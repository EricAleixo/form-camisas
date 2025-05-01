import { PrismaClient, Prisma } from "@/generated/prisma"

const prisma = new PrismaClient()

export async function PUT(req: Request, { params }: { params: { id_user: string } }) {

    const id = params.id_user
    try{
        const { nome, camisa, estilo, numero, pagamento, tamanho, turma } = await req.json()
    
        const userUpdate = await prisma.user_form.update({
            where:{
                id: id
            },
            data: {
                nome: nome,
                camisa: camisa,
                estilo: estilo,
                numero: numero,
                pagamento: pagamento,
                tamanho: tamanho,
                turma: turma
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

export async function DELETE(req: Request, {params}: {params: {id_user: string}}) {
    const id = params.id_user
    
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