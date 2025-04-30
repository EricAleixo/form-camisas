"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ModalEspecieProps {
  open: boolean
  onClose: () => void
}

export const ModalEspecie = ({ open, onClose }: ModalEspecieProps) => {
  const contatoTelefone = "(11) 91234-5678"

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pagamento em Espécie</DialogTitle>
          <DialogDescription>
            Entregue o valor em dinheiro para o responsável.
          </DialogDescription>
        </DialogHeader>

        <div className="text-center space-y-4 mt-4">
          <p className="text-lg font-semibold text-[#07038C]">Contato: {contatoTelefone}</p>
          <a 
            href="https://wa.me/5511912345678" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-600 underline text-sm"
          >
            Chamar no WhatsApp
          </a>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="bg-[#07038C] cursor-pointer hover:bg-[#24208C]">Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
