import { Button } from "../ui/button"
import { Home, Gift, Calendar, Users, Settings, LogOut } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

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

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r min-h-[calc(100vh-4rem)] pt-8 px-4 sticky top-16">
      <nav className="space-y-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} to={item.href} className="block">
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

      <div className="mt-auto pb-8">
        <Button variant="ghost" className="w-full justify-start gap-2 text-destructive font-normal">
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </Button>
      </div>
    </aside>
  )
} 