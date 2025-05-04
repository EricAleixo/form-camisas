"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import axios from "axios"

import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Button } from "@/app/components/ui/button"
import Image from "next/image"
import { ModalPix } from "@/app/components/ModalPix"
import { ModalEspecie } from "@/app/components/ModalEspecie"

const cadastroSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  telefone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, "Telefone inválido"),
  camisa: z.enum(["BEGE", "PRETA"]),
  turma: z.enum(["INFOB3", "INFOA3", "PROFESSOR"]),
  tamanho: z.enum(["PP", "P", "M", "G", "GG", "XGG"]),
  estilo: z.enum(["NORMAL", "OVERSIZED", "BABY_LOCK"]),
  pagamento: z.enum(["PIX", "FISICO"]),
})

const turmas = [
  { value: "INFOA3", label: "3º Info A" },
  { value: "INFOB3", label: "3º Info B" },
  { value: "PROFESSOR", label: "Professor" }
];


type CadastroFormData = z.infer<typeof cadastroSchema>

export default function CadastroCamiseta() {
  const [openPix, setOpenPix] = useState(false);
  const [openEspecie, setOpenEspecie] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState<CadastroFormData["turma"]>();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      camisa: "BEGE",
      pagamento: "PIX",
    }
  })

  const camisaSelecionada = watch("camisa");

  const onSubmit = (data: CadastroFormData) => {
    axios.post("api/usersForm", data)

    if (data.pagamento === "PIX") {
      setOpenPix(true);
    } else {
      setOpenEspecie(true);
    }
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
        <RadioGroup defaultValue="BEGE">
          <div className="flex gap-2">
            {["BEGE", "PRETA"].map((color) => (
              <div
                key={color}
                className={`relative border-2 rounded-md overflow-hidden transition-all duration-300 ${camisaSelecionada === color ? "border-blue-600" : "border-transparent"}`}
              >
                <span className={`absolute right-0 p-1 text-sm font-bold border rounded-bl-md border-t-transparent border-r-transparent ${camisaSelecionada === color && "border-blue-600"}`}>
                  R$ 54,99
                </span>
                <div className={`absolute bottom-0 flex items-center gap-1 p-1 border rounded-tr-md border-b-transparent border-l-transparent ${camisaSelecionada === color && "border-blue-600"}`}>
                  <Label className={`${camisaSelecionada === color && "border-blue-600"}`} htmlFor={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</Label>
                  <RadioGroupItem
                    id={color}
                    value={color}
                    {...register("camisa")}
                    onClick={() => setValue("camisa", color as CadastroFormData["camisa"])}
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

      <div className="space-y-2">
        <Label htmlFor="telefone">Número de Contato</Label>
        <Input id="telefone" placeholder="(99) 99999-9999" {...register("telefone")} />
        {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Turma</Label>
        <div className="flex">
          {turmas.map((turma, index) => (
            <div
              key={turma.value}
              onClick={() => {
                setTurmaSelecionada(turma.value as CadastroFormData["turma"])
                setValue("turma", turma.value as CadastroFormData["turma"])
              }}
              className={`p-3 border w-fit cursor-pointer transition-all duration-300 ${turmaSelecionada === turma.value && "bg-[#07038C] text-white scale-105"
                } ${index === 0 && "rounded-l-md"} ${index === turmas.length - 1 && "rounded-r-md"}`}
            >
              {turma.label}
            </div>
          ))}
        </div>

        {errors.turma && <p className="text-red-500 text-sm">{errors.turma.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Tamanho</Label>
        <Select onValueChange={(value) => setValue("tamanho", value as CadastroFormData["tamanho"])}>
          <SelectTrigger id="tamanho">
            <SelectValue placeholder="Selecione o tamanho" />
          </SelectTrigger>
          <SelectContent>
            {["PP", "P", "M", "G", "GG", "XGG"].map((size) => (
              <SelectItem key={size} value={size}>
                {size.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.tamanho && <p className="text-red-500 text-sm">{errors.tamanho.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Estilo</Label>
        <Select onValueChange={(value) => setValue("estilo", value as CadastroFormData["estilo"])}>
          <SelectTrigger id="estilo">
            <SelectValue placeholder="Selecione o estilo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NORMAL">Normal</SelectItem>
            <SelectItem value="OVERSIZED">Oversized</SelectItem>
            <SelectItem value="BABY_LOCK">Baby Lock</SelectItem>
          </SelectContent>
        </Select>
        {errors.estilo && <p className="text-red-500 text-sm">{errors.estilo.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Forma de Pagamento</Label>
        <RadioGroup defaultValue="pix">
          {["PIX", "FISICO"].map((forma) => (
            <div key={forma} className="flex items-center space-x-2">
              <RadioGroupItem
                id={forma}
                value={forma}
                {...register("pagamento")}
                onClick={() => setValue("pagamento", forma as CadastroFormData["pagamento"])}
              />
              <Label htmlFor={forma}>
                {forma === "PIX" ? "PIX" : "Espécie (Físico)"}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.pagamento && <p className="text-red-500 text-sm">{errors.pagamento.message}</p>}
      </div>

      <Button type="submit" className="w-full cursor-pointer bg-[#07038C] hover:bg-[#24208C]">
        Enviar
      </Button>

      <ModalPix open={openPix} onClose={() => setOpenPix(false)} />
      <ModalEspecie open={openEspecie} onClose={() => setOpenEspecie(false)} />
    </form>
  )
}
