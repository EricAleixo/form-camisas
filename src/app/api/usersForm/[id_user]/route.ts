import { PrismaClient, Prisma } from "@/generated/prisma"

const prisma = new PrismaClient()

export async function PUT(req: Request, { params,
}: {
    params: Promise<{ id_user: string }>
}) {
    // Aqui você pode acessar o parâmetro id_user
    const { id_user } = await params;
    try {
        const { nome, camisa, estilo, telefone, pagamento, tamanho, turma, status, valor } = await req.json()

        const userUpdate = await prisma.user_form.update({
            where: {
                id: id_user
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
    } catch (e) {
        return Response.json({
            message: e
        })
    }


}

export async function DELETE(req: Request, { params }: { params: Promise<{id_user:string}> }) {
    // Aqui você pode acessar o parâmetro id_user
    const { id_user } = await params;

    try {
        await prisma.user_form.delete({
            where: {
                id: id_user
            }
        })

        return Response.json({
            message: "Usuário deletado"
        })
    } catch (e) {
        return Response.json({
            message: e
        })
    }
}