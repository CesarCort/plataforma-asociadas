import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { QrScanner } from "./qr-scanner"
import { ClipboardCheck } from "lucide-react"

interface AttendanceModalProps {
  onClose: () => void
  onSubmit: (code: string) => void
}

export function AttendanceModal({ onClose, onSubmit }: AttendanceModalProps) {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!code) {
      setError("Por favor ingresa un código")
      return
    }
    onSubmit(code)
  }

  const handleQrCodeScanned = (result: string) => {
    onSubmit(result)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg max-w-sm w-full mx-4">
        <div className="text-center mb-6">
          <div className="mb-2 flex justify-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <ClipboardCheck className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-xl font-semibold">Registra tu asistencia</h3>
          <p className="text-sm text-muted-foreground mt-1">
            No te preocupes si no puedes escanear el código QR. Simplemente
            pega la URL proporcionada en el evento y confirma tu registro.
          </p>
        </div>

        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code">Código</TabsTrigger>
            <TabsTrigger value="qr">QR</TabsTrigger>
          </TabsList>
          
          <TabsContent value="code" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Ingresa el código"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                    setError("")
                  }}
                />
                {error && <p className="text-sm text-destructive mt-1 text-center">{error}</p>}
              </div>
              <Button type="submit" className="w-full">
                Confirmar asistencia
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="qr" className="mt-4">
            <div className="space-y-4">
              <QrScanner onResult={handleQrCodeScanned} />
              <p className="text-sm text-muted-foreground text-center">
                Apunta la cámara al código QR del evento
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <Button
          variant="ghost"
          className="w-full mt-4"
          onClick={onClose}
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
} 