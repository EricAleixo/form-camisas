"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const cadastroSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  telefone: z.string().min(8, "Telefone é obrigatório"),
  camisa: z.enum(["bege", "preta"]),
  turma: z.enum(["3° info A", "3° info B", "professor"]),
  tamanho: z.enum(["pp", "p", "m", "g", "gg", "xgg"]),
  estilo: z.enum(["normal", "oversized", "baby-lock"]),
  pagamento: z.enum(["pix", "presencial"]),
})

type CadastroFormData = z.infer<typeof cadastroSchema>

export default function CadastroCamiseta() {
  const [activeCamisa, setActiveCamisa] = useState<"bege" | "preta">("bege");
  const [turmaSelecionada, setTurmaSelecionada] = useState<"3° info A" | "3° info B" | "professor">();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      camisa: "bege",
      pagamento: "pix",
    }
  })

  const onSubmit = (data: CadastroFormData) => {
    console.log("Dados enviados:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mt-8 mx-auto p-6 bg-white rounded-2xl shadow-2xl space-y-6 border-2">
      <h1 className="text-2xl font-bold text-center text-[#07038C]">Escolha sua Camisa</h1>

      <div className="space-y-2">
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" placeholder="Digite seu nome" {...register("nome")} />
        {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Camisa</Label>
        <RadioGroup defaultValue="bege">
          <div className="flex gap-2">
            {["bege", "preta"].map((color) => (
              <div
                key={color}
                className={`relative border-2 rounded-md overflow-hidden transition-all duration-300 ${watch("camisa") === color ? "border-blue-600" : "border-transparent"}`}
              >
                <span className={`absolute right-0 border p-1 rounded-bl-md border-t-transparent border-r-transparent font-bold text-sm ${watch("camisa") === color ? "border-blue-600" : "border-transparent"}`}>
                  R$ 54,99
                </span>
                <div className={`w-fit flex gap-1 items-center absolute bottom-0 border rounded-tr-md border-b-transparent border-l-transparent p-1 ${watch("camisa") === color ? "border-blue-600" : "border-transparent"}`}>
                  <Label htmlFor={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</Label>
                  <RadioGroupItem
                    id={color}
                    value={color}
                    {...register("camisa")}
                    onClick={() => {
                      setActiveCamisa(color as "bege" | "preta")
                      setValue("camisa", color as "bege" | "preta")
                    }}
                  />
                </div>
                <Image
                  src={`/camisas/camisa_${color}.jpg`}
                  alt={`Camisa ${color}`}
                  width={260}
                  height={260}
                />
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* NOVO CAMPO - TELEFONE */}
      <div className="space-y-2">
        <Label htmlFor="telefone">Número de Contato</Label>
        <Input id="telefone" placeholder="(99) 99999-9999" {...register("telefone")} />
        {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Turma</Label>
        <div className="flex">
          {["3° info A", "3° info B", "professor"].map((turma, index) => (
            <div
              key={turma}
              onClick={() => {
                setTurmaSelecionada(turma as "3° info A" | "3° info B" | "professor")
                setValue("turma", turma as "3° info A" | "3° info B" | "professor")
              }}
              className={`p-3 border w-fit cursor-pointer transition-all duration-300 ${
                turmaSelecionada === turma && "bg-[#07038C] text-white scale-105"
              } ${index === 0 && "rounded-l-md"}
              ${index === 2 && "rounded-r-md"}`}
            >
              {turma}
            </div>
          ))}
        </div>
        {errors.turma && <p className="text-red-500 text-sm">{errors.turma.message == "Required" && "Requirido"}</p>}
      </div>

      <div className="space-y-2">
        <Label>Tamanho</Label>
        <Select onValueChange={(value) => setValue("tamanho", value as CadastroFormData["tamanho"])}>
          <SelectTrigger id="tamanho">
            <SelectValue placeholder="Selecione o tamanho" />
          </SelectTrigger>
          <SelectContent>
            {["pp", "p", "m", "g", "gg", "xgg"].map((size) => (
              <SelectItem key={size} value={size}>{size.toUpperCase()}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.tamanho && <p className="text-red-500 text-sm">{errors.tamanho.message == "Required" && "Requirido"}</p>}
      </div>

      <div className="space-y-2">
        <Label>Estilo</Label>
        <Select onValueChange={(value) => setValue("estilo", value as CadastroFormData["estilo"])}>
          <SelectTrigger id="estilo">
            <SelectValue placeholder="Selecione o estilo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="oversized">Oversized</SelectItem>
            <SelectItem value="baby-lock">Baby Lock</SelectItem>
          </SelectContent>
        </Select>
        {errors.estilo && <p className="text-red-500 text-sm">{errors.estilo.message == "Required" && "Requirido"}</p>}
      </div>

      <div className="space-y-2">
        <Label>Forma de Pagamento</Label>
        <RadioGroup defaultValue="pix">
          {["pix", "presencial"].map((forma) => (
            <div key={forma} className="flex items-center space-x-2">
              <RadioGroupItem
                id={forma}
                value={forma}
                {...register("pagamento")}
                onClick={() => setValue("pagamento", forma as "pix" | "presencial")}
              />
              <Label htmlFor={forma}>
                {forma === "pix" ? "Pix" : "Espécie (Físico)"}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.pagamento && <p className="text-red-500 text-sm">{errors.pagamento.message == "Required" && "Requirido"}</p>}
      </div>

      <Button type="submit" className="w-full cursor-pointer bg-[#07038C] hover:bg-[#24208C]">
        Enviar
      </Button>
    </form>
  )
}
