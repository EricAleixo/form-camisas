"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"

interface ModalPixProps {
  open: boolean
  onClose: () => void
}

export const ModalPix = ({ open, onClose }: ModalPixProps) => {
  const [copied, setCopied] = useState(false)

  const chavePix = "chavepix@email.com"
  const contatoTelefone = "(11) 91234-5678"

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(chavePix)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // volta ao normal depois de 2 segundos
    } catch (err) {
      console.error("Erro ao copiar Pix:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pagamento via Pix</DialogTitle>
          <DialogDescription>
            Escaneie o QR Code ou copie a chave Pix abaixo para finalizar o pagamento.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          <img src="/qrcode.png" alt="QR Code Pix" className="w-48 h-48" />

          <div className="text-center space-y-2">
            <p className="font-semibold break-all">{chavePix}</p>
            <Button 
              size="sm" 
              className="bg-[#07038C] hover:bg-[#24208C] cursor-pointer text-white"
              onClick={handleCopyPix}
            >
              {copied ? "✅ Copiado!" : "Copiar chave Pix"}
            </Button>
          </div>

          <div className="text-center space-y-1">
            <p className="font-semibold text-lg text-[#07038C]">Contato: {contatoTelefone}</p>
            <a 
              href="https://wa.me/5511912345678" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 underline text-sm"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="bg-[#07038C] cursor-pointer hover:bg-[#24208C]">Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
