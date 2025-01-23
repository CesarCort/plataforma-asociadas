import { useState } from "react"
import { Button } from "../ui/button"
import { Home, Gift, Calendar, Users, Settings, LogOut, Menu, X, QrCode } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import { AttendanceModal } from "../events/attendance-modal"

const menuItems = [
  {
    icon: Home,
    label: "Inicio",
    href: "/home"
  },
  {
    icon: Gift,
    label: "Beneficios",
    href: "/benefits"
  },
  {
    icon: Calendar,
    label: "Eventos",
    href: "/events"
  },
  {
    icon: Users,
    label: "Comunidad",
    href: "/community"
  },
  {
    icon: Settings,
    label: "Configuración",
    href: "/settings"
  }
]

export function Sidebar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [showQrScanner, setShowQrScanner] = useState(false)

  const handleQrCodeScanned = (code: string) => {
    console.log('QR Code escaneado:', code)
    setShowQrScanner(false)
    // Aquí puedes agregar la lógica para procesar el código QR
  }

  return (
    <>
      {/* Botón de menú móvil */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r bg-background pt-20 lg:sticky transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <nav className="space-y-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href
            const Icon = item.icon

            return (
              <Link 
                key={item.href} 
                to={item.href} 
                className="block"
                onClick={() => setIsOpen(false)}
              >
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start gap-2 font-normal ${
                    isActive 
                      ? "bg-primary/10 text-primary hover:bg-primary/20" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pb-8 space-y-2">
          <Button 
            variant="default" 
            className="w-full justify-start gap-2 font-normal bg-black hover:bg-black/90"
            onClick={() => setShowQrScanner(true)}
          >
            <QrCode className="w-5 h-5" />
            Escanear QR
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-destructive font-normal"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Modal de escaneo QR */}
      {showQrScanner && (
        <AttendanceModal
          onClose={() => setShowQrScanner(false)}
          onSubmit={handleQrCodeScanned}
        />
      )}
    </>
  )
} 