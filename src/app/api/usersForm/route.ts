import { PrismaClient } from "@/generated/prisma"

const prisma = new PrismaClient()

export async function GET() {

    const data = await prisma.user_form.findMany()

    return Response.json({
        message: {
            data
        }
    })
}

export async function POST(req: Request) {

    const { nome, camisa, estilo, telefone , pagamento, tamanho, turma, status, valor } = await req.json()

    const userSave = await prisma.user_form.create({
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
        data: { userSave }
    })
}