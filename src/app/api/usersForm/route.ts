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

    const { nome, camisa, estilo, numero, pagamento, tamanho, turma } = await req.json()

    const userSave = await prisma.user_form.create({
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
        data: { userSave }
    })
}