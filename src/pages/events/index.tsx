import { useState, useEffect } from "react"
import { Header } from "../../components/layout/header"
import { Sidebar } from "../../components/layout/sidebar"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Calendar as  Clock, Star, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarView } from "../../components/events/calendar-view"
import { useEvents } from "../../hooks/useEvents"
import { AttendanceModal } from "../../components/events/attendance-modal"
import { EventDetailsModal } from "../../components/events/event-details-modal"
import { DocumentMeta } from "../../components/meta/DocumentMeta"

interface Event {
  id: number
  title: string
  time: string
  type: "Virtual" | "Presencial"
  date: string
  isInterested?: boolean
  isRegistered?: boolean
  description?: string
}

export default function EventsPage() {
  const [view, setView] = useState<"list" | "calendar">("list")
  const [showRegisteredModal, setShowRegisteredModal] = useState(false)
  const [showAttendanceModal, setShowAttendanceModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [isUserEventsExpanded, setIsUserEventsExpanded] = useState(true)
  
  const {
    events,
    userEvents,
    interestedEvents,
    handleInterested,
    handleRegister,
    handleAttendance,
    fetchEvents,
    fetchUserEvents
  } = useEvents()

  useEffect(() => {
    fetchEvents()
    fetchUserEvents()
  }, [])

  useEffect(() => {
    // Colapsar automáticamente si hay más de 2 eventos
    if (userEvents.length > 2) {
      setIsUserEventsExpanded(false)
    }
  }, [userEvents])

  const handleEventRegister = (event: Event) => {
    handleRegister(event)
    setShowRegisteredModal(true)
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setShowEventDetails(true)
  }

  const handleAttendanceClick = (event: Event) => {
    setSelectedEvent(event)
    setShowAttendanceModal(true)
  }

  const handleAttendanceSubmit = (code: string) => {
    console.log(`Procesando código de asistencia: ${code}`);
    if (selectedEvent) {
      handleAttendance(selectedEvent.id)
      setShowAttendanceModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DocumentMeta 
        title="Eventos" 
        description="Descubre y participa en los eventos exclusivos para asociadas de WIM PERÚ"
      />
      <Header />

      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        <main className="flex-1 px-4 py-8 lg:px-8 mt-16">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Header de la página */}
            <div className="space-y-2">
              <h1 className="text-2xl lg:text-3xl font-bold">Eventos</h1>
              <p className="text-muted-foreground">
                Aprovecha al máximo tu membresía con las oportunidades que tiene WIM para todas nuestras asociadas.
              </p>
            </div>

            {/* Tus eventos */}
            <section className="space-y-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsUserEventsExpanded(!isUserEventsExpanded)}
              >
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">Tus eventos</h2>
                  {userEvents.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      ({userEvents.length})
                    </span>
                  )}
                </div>
                {userEvents.length > 2 && (
                  <Button variant="ghost" size="icon">
                    {isUserEventsExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
              
              {userEvents.length === 0 ? (
                <p className="text-muted-foreground">No tienes eventos</p>
              ) : (
                <div className={`space-y-4 ${!isUserEventsExpanded ? 'hidden' : ''}`}>
                  {userEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1 h-8 bg-pink-500 rounded-full" />
                          <h3 className="font-medium">{event.title}</h3>
                        </div>
                        <div className="ml-3 flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {format(new Date(event.date), "d 'de' MMMM", { locale: es })} - {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.type}
                          </div>
                        </div>
                      </div>
                      <Button 
                        className="w-full sm:w-auto"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAttendanceClick(event)
                        }}
                      >
                        Marcar asistencia
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Selector de vista */}
            <Tabs defaultValue="list" className="w-full" onValueChange={(value) => setView(value as "list" | "calendar")}>
              <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                <TabsTrigger value="list">Lista</TabsTrigger>
                <TabsTrigger value="calendar">Calendario</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Vista de lista */}
            {view === "list" && (
              <div className="space-y-8">
                {/* Eventos de interés */}
                {interestedEvents.length > 0 && (
                  <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Eventos de interés</h2>
                    <div className="space-y-4">
                      {interestedEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-1 h-8 bg-yellow-500 rounded-full" />
                              <h3 className="font-medium">{event.title}</h3>
                            </div>
                            <div className="ml-3 flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {format(new Date(event.date), "d 'de' MMMM", { locale: es })} - {event.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.type}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto" onClick={e => e.stopPropagation()}>
                            <Button 
                              onClick={() => handleEventRegister(event)}
                              className="flex-1 sm:flex-none"
                            >
                              Inscribirme
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleInterested(event)}
                            >
                              <Star className="w-4 h-4 fill-current" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Lista de eventos */}
                <section className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1 h-8 bg-blue-500 rounded-full" />
                          <h3 className="font-medium">{event.title}</h3>
                        </div>
                        <div className="ml-3 flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {format(new Date(event.date), "d 'de' MMMM", { locale: es })} - {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto" onClick={e => e.stopPropagation()}>
                        <Button 
                          onClick={() => handleEventRegister(event)}
                          className="flex-1 sm:flex-none"
                        >
                          Inscribirme
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleInterested(event)}
                        >
                          <Star className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            )}

            {/* Vista de calendario */}
            {view === "calendar" && (
              <div className="mt-4">
                <CalendarView 
                  events={events} 
                  onEventClick={handleEventClick}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal de registro exitoso */}
      {showRegisteredModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">¡Estás inscrita!</h3>
            <p className="text-muted-foreground mb-4">
              Tu inscripción ha sido confirmada. Podrás ver el evento en la sección "Tus eventos".
            </p>
            <Button
              className="w-full"
              onClick={() => setShowRegisteredModal(false)}
            >
              Entendido
            </Button>
          </div>
        </div>
      )}

      {/* Modal de asistencia */}
      {showAttendanceModal && selectedEvent && (
        <AttendanceModal
          onClose={() => setShowAttendanceModal(false)}
          onSubmit={handleAttendanceSubmit}
        />
      )}

      {/* Modal de detalles del evento */}
      {showEventDetails && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => {
            setShowEventDetails(false)
            setSelectedEvent(null)
          }}
        />
      )}
    </div>
  )
} 