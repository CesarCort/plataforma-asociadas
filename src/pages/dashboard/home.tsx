import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Header } from "../../components/layout/header"
import { Sidebar } from "../../components/layout/sidebar"
import { WelcomeDialog } from "../../components/WelcomeDialog"
import { 
  Crown, 
  Clock, 
  Star,
  Calendar,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { recentMembers, upcomingEvents, highlightedBenefits } from "../../data/dashboard"
import { useState, useEffect } from "react"

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

export default function HomePage() {
  const isMobile = useIsMobile()
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);

  const nextEvents = () => {
    setCurrentEventIndex(prev => Math.min(prev + 1, upcomingEvents.length - 3));
  };

  const prevEvents = () => {
    setCurrentEventIndex(prev => Math.max(prev - 1, 0));
  };

  const nextBenefits = () => {
    setCurrentBenefitIndex(prev => Math.min(prev + 1, highlightedBenefits.length - 3));
  };

  const prevBenefits = () => {
    setCurrentBenefitIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WelcomeDialog />

      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        <main className="flex-1">
          {/* Header con información del usuario */}
          <header className="pt-16 lg:pt-24 pb-8 bg-gradient-to-b from-[#FFF5E9] to-background px-4">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center space-y-3">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#FF9B3F]">¡Bienvenida, María! 🌟</h1>
                <div className="flex flex-wrap gap-2 justify-center text-sm">
                  <Badge variant="secondary" className="px-4 py-1 flex items-center">
                    <Crown className="w-4 h-4 mr-1" />
                    Miembro estudiante
                  </Badge>
                  <Badge variant="outline" className="px-4 py-1 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Membresía válida hasta: 15 Feb 2024
                  </Badge>
                </div>
              </div>
            </div>
          </header>

          <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
            {/* Asociadas que se han unido últimamente */}
            <section className="space-y-4">
              <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">¡Asociadas que se han unido últimamente!</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {recentMembers.map((member) => (
                  <div key={member.id} className="flex flex-col items-center space-y-2">
                    <Avatar className="w-16 lg:w-24 h-16 lg:h-24">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="font-medium text-sm lg:text-base">{member.name}</p>
                      <p className="text-xs lg:text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Próximos Eventos */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">Próximos eventos</h2>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={prevEvents}
                    disabled={currentEventIndex === 0}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={nextEvents}
                    disabled={currentEventIndex >= upcomingEvents.length - 3}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost">Ver todos</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {upcomingEvents.slice(currentEventIndex, currentEventIndex + (isMobile ? 1 : 3)).map((event) => (
                  <Card key={event.id} className="flex flex-col">
                    <CardHeader className="flex-1">
                      <Badge className="w-fit">{event.type}</Badge>
                      <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {event.date} - {event.time}
                      </CardDescription>
                      <p className="text-sm line-clamp-4">{event.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex gap-2 w-full">
                        <Button className="flex-1">Inscribirme</Button>
                        <Button variant="ghost" size="icon">
                          <Star className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Beneficios destacados */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">Beneficios destacados</h2>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={prevBenefits}
                    disabled={currentBenefitIndex === 0}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={nextBenefits}
                    disabled={currentBenefitIndex >= highlightedBenefits.length - 3}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost">Ver todos</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {highlightedBenefits.slice(currentBenefitIndex, currentBenefitIndex + (isMobile ? 1 : 3)).map((benefit) => (
                  <Card key={benefit.id} className="flex flex-col">
                    <CardHeader>
                      <div className="h-6">
                        {benefit.isNew && <Badge variant="secondary" className="w-fit">Nuevo</Badge>}
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{benefit.title}</CardTitle>
                      <CardDescription className="line-clamp-4">
                        {benefit.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <img 
                        src={benefit.image} 
                        alt={benefit.title} 
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <Button className="w-full">Solicitar</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recursos de aprendizaje */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">Recursos de aprendizaje</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <Card key={i} className="flex-shrink-0">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <img 
                          src="/images/learning-resource.jpg" 
                          alt="Recurso de aprendizaje" 
                          className="w-full md:w-32 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">9 Historias de perseverancia</h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            Con nuestro objetivo de visibilizar a trayectoria de mujeres mineras te traemos estas historias y logros...
                          </p>
                          <Button variant="outline">Ver más</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
} 