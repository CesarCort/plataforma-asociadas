import { useState } from 'react'
import { upcomingEvents } from '../data/dashboard'
import { parse } from 'date-fns'
import { es } from 'date-fns/locale'

export interface Event {
  id: number
  title: string
  time: string
  type: "Virtual" | "Presencial"
  date: string
  isInterested?: boolean
  isRegistered?: boolean
}

interface UseEventsReturn {
  events: Event[]
  userEvents: Event[]
  interestedEvents: Event[]
  isLoading: boolean
  error: Error | null
  handleInterested: (event: Event) => void
  handleRegister: (event: Event) => void
  handleAttendance: (eventId: number) => void
  fetchEvents: () => Promise<void>
  fetchUserEvents: () => Promise<void>
}

// Función auxiliar para validar y parsear fechas
const parseDateSafely = (dateString: string): string => {
  try {
    // Si ya es ISO, lo retornamos tal cual
    if (dateString.includes('T')) {
      const date = new Date(dateString)
      if (!isNaN(date.getTime())) {
        return dateString
      }
    }

    // Intentamos parsear el formato "DD MMM, YYYY"
    const parsedDate = parse(dateString, 'd MMM, yyyy', new Date(), { locale: es })
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString()
    }

    // Si no funciona, intentamos el formato "DD/MM/YYYY"
    const [day, month, year] = dateString.split('/')
    if (day && month && year) {
      const date = new Date(Number(year), Number(month) - 1, Number(day))
      if (!isNaN(date.getTime())) {
        return date.toISOString()
      }
    }

    // Si nada funciona, retornamos la fecha actual
    console.warn(`No se pudo parsear la fecha: ${dateString}, usando fecha actual`)
    return new Date().toISOString()
  } catch (error) {
    console.error('Error parseando fecha:', dateString, error)
    return new Date().toISOString()
  }
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>(() => {
    try {
      return upcomingEvents.map(event => ({
        ...event,
        date: parseDateSafely(event.date)
      }))
    } catch (error) {
      console.error('Error inicializando eventos:', error)
      return []
    }
  })
  const [userEvents, setUserEvents] = useState<Event[]>([])
  const [interestedEvents, setInterestedEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handleInterested = async (event: Event) => {
    try {
      // TODO: Integrar con el endpoint
      // await api.post('/events/interested', { eventId: event.id })
      
      if (interestedEvents.some(e => e.id === event.id)) {
        setInterestedEvents(interestedEvents.filter(e => e.id !== event.id))
      } else {
        setInterestedEvents([...interestedEvents, { ...event, isInterested: true }])
      }
    } catch (err) {
      setError(err as Error)
    }
  }

  const handleRegister = async (event: Event) => {
    try {
      setIsLoading(true)
      // TODO: Integrar con el endpoint
      // await api.post('/events/register', { eventId: event.id })
      
      setUserEvents([...userEvents, { ...event, isRegistered: true }])
      // Remover de eventos interesados si estaba ahí
      setInterestedEvents(interestedEvents.filter(e => e.id !== event.id))
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAttendance = async (eventId: number) => {
    try {
      setIsLoading(true)
      // TODO: Integrar con el endpoint
      // await api.post('/events/attendance', { eventId })
      
      // Actualizar el estado del evento en userEvents
      setUserEvents(userEvents.map(event => 
        event.id === eventId 
          ? { ...event, hasAttended: true }
          : event
      ))
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      // TODO: Integrar con el endpoint
      // const response = await api.get('/events')
      // setEvents(response.data)
      
      setEvents(upcomingEvents.map(event => ({
        ...event,
        date: parseDateSafely(event.date)
      })))
    } catch (err) {
      console.error('Error fetching events:', err)
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserEvents = async () => {
    try {
      setIsLoading(true)
      // TODO: Integrar con el endpoint
      // const response = await api.get('/events/user')
      // setUserEvents(response.data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    events,
    userEvents,
    interestedEvents,
    isLoading,
    error,
    handleInterested,
    handleRegister,
    handleAttendance,
    fetchEvents,
    fetchUserEvents
  }
} 