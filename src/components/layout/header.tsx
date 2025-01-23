import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { 
  User, 
  Settings, 
  Sparkles, 
  Calendar, 
  LogOut
} from "lucide-react"
import logoWhite from "../../assets/images/logo-white.png"

export function Header() {
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo centrado en móvil, alineado a la izquierda en desktop */}
          <div className="flex-1 lg:flex-initial">
            <div className="text-center lg:text-left">
              <img 
                src={logoWhite}
                alt="WIM PERÚ"
                className="h-8 cursor-pointer inline-block" 
                onClick={() => navigate('/home')}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  console.error('Error al cargar el logo')
                }}
              />
            </div>
          </div>

          {/* Menú de perfil - solo visible en desktop */}
          <div className="hidden lg:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Mi Perfil y Config</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/benefits')}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span>Beneficios</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/events')}>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Eventos</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive" 
                  onClick={() => navigate('/login')}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
} 