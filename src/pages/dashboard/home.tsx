import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Header } from "../../components/layout/header"
import { WelcomeDialog } from "../../components/WelcomeDialog"
import { 
  Crown, 
  Clock, 
  Star,
  Calendar,
  BookOpen,
  Users,
  ChevronRight,
  Download
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WelcomeDialog />

      {/* Header con información del usuario */}
      <header className="pt-24 pb-8 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h1 className="text-3xl font-bold tracking-tight">¡Bienvenida, María!</h1>
            <div className="flex flex-wrap gap-2 justify-center text-sm">
              <Badge variant="secondary" className="px-4 py-1 flex items-center">
                <Crown className="w-4 h-4 mr-1" />
                Miembro Profesional WIM
              </Badge>
              <Badge variant="outline" className="px-4 py-1 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Membresía válida hasta: 15 Feb 2024
              </Badge>
              <Badge variant="outline" className="px-4 py-1 flex items-center">
                <Star className="w-4 h-4 mr-1" />
                2 años en WIM
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Próximos Eventos */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Próximos Eventos</h2>
                <p className="text-sm text-muted-foreground">Mantente al día con nuestras actividades</p>
              </div>
              <Button variant="ghost" className="gap-2">
                Ver todos <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="group hover:shadow-md transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Virtual</Badge>
                      <CardTitle className="leading-tight group-hover:text-primary transition-colors">
                        Workshop: Innovación en Minería
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> 15 Feb 2024 - 14:00
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Inscribirme</Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <Badge className="bg-secondary/80 text-secondary-foreground hover:bg-secondary transition-colors">Lima</Badge>
                      <CardTitle className="leading-tight group-hover:text-primary transition-colors">
                        Networking: Mujeres en Tecnología Minera
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> 28 Feb 2024 - 18:00
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Inscribirme</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Beneficios Destacados */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Beneficios Destacados</h2>
                <p className="text-sm text-muted-foreground">Aprovecha al máximo tu membresía</p>
              </div>
              <Button variant="ghost" className="gap-2">
                Ver todos <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="group hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="destructive" className="px-3">Nuevo</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    Curso de Liderazgo
                  </CardTitle>
                  <CardDescription>
                    Acceso gratuito al curso "Liderazgo en Minería"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full">Solicitar Acceso</Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    Mentoría Individual
                  </CardTitle>
                  <CardDescription>
                    1 sesión personalizada con mentoras expertas del sector
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full">Solicitar Mentoría</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Últimas Noticias */}
            <section className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Últimas Noticias</h2>
                <p className="text-sm text-muted-foreground">Mantente informada</p>
              </div>
              
              <Card className="hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <ul className="space-y-6">
                    <li className="group">
                      <a href="#" className="flex gap-4 items-start">
                        <span className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <BookOpen className="w-6 h-6" />
                        </span>
                        <div className="space-y-1">
                          <h3 className="font-medium group-hover:text-primary transition-colors">
                            Nueva guía de desarrollo profesional
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Descarga la guía actualizada con consejos para tu carrera
                          </p>
                        </div>
                      </a>
                    </li>
                    <li className="group">
                      <a href="#" className="flex gap-4 items-start">
                        <span className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Users className="w-6 h-6" />
                        </span>
                        <div className="space-y-1">
                          <h3 className="font-medium group-hover:text-primary transition-colors">
                            Convocatoria para mentoras
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Únete al programa de mentorías WIM 2024
                          </p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Recursos de Aprendizaje */}
            <section className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Recursos de Aprendizaje</h2>
                <p className="text-sm text-muted-foreground">Mejora tus habilidades</p>
              </div>
              
              <Card className="group hover:shadow-md transition-all cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <span className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <BookOpen className="w-6 h-6" />
                      </span>
                      <div className="space-y-1">
                        <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                          Biblioteca Digital
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Accede a +100 recursos especializados
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
} 