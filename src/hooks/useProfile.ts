import { useState, useEffect } from 'react'

interface ProfileFormData {
  nombres: string
  apellidos: string
  frase_inspiradora: string
  email: string
  departamento: string
  fecha_nacimiento: string
  whatsapp: string
  tipo_miembro: 'estudiante' | 'profesional'
  identificacion: 'estudiante' | 'profesional'
  foto_perfil?: string
  // Campos para estudiantes
  carrera?: string
  ciclo?: string
  universidad?: string
  // Campos para profesionales
  anos_experiencia?: number
  empresa?: string
  puesto?: string
  estudios_adicionales?: {
    doctorado?: string
    maestria?: string
    diplomados?: string[]
  }
  certificado_matricula?: File
  enlaces_sociales?: {
    linkedin?: string
    [key: string]: string | undefined
  }
  // Permitir acceso dinámico a los campos
  [key: string]: any
}

interface ProfileProgress {
  total: number
  sections: {
    name: string
    completed: number
    total: number
    fields: string[]
  }[]
}

export function useProfile() {
  const [formData, setFormData] = useState<ProfileFormData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [progress, setProgress] = useState<ProfileProgress>({
    total: 0,
    sections: []
  })
  const [isSaving, setIsSaving] = useState(false)
  const [pendingFields, setPendingFields] = useState<string[]>([])

  const calculateProgress = (data: ProfileFormData) => {
    const sections = [
      {
        name: 'Información Personal',
        fields: ['foto_perfil', 'whatsapp', 'frase_inspiradora'],
        completed: 0,
        total: 3
      },
      {
        name: 'Información Académica',
        fields: ['certificado_matricula'],
        completed: 0,
        total: 1
      },
      {
        name: 'Enlaces Profesionales',
        fields: ['enlaces_sociales'],
        completed: 0,
        total: 1
      }
    ]

    let totalCompleted = 0
    const updatedSections = sections.map(section => {
      const completedFields = section.fields.filter(field => {
        if (field === 'enlaces_sociales') {
          return data.enlaces_sociales && Object.keys(data.enlaces_sociales).length > 0
        }
        return !!data[field]
      })
      const completed = completedFields.length
      totalCompleted += completed
      return {
        ...section,
        completed
      }
    })

    const totalFields = sections.reduce((acc, section) => acc + section.total, 0)
    const totalProgress = Math.round((totalCompleted / totalFields) * 100)

    setProgress({
      total: totalProgress,
      sections: updatedSections
    })

    // Actualizar campos pendientes
    const pending = sections
      .flatMap(section => section.fields.filter(field => !data[field]))
    setPendingFields(pending)
  }

  const fetchProfile = async () => {
    try {
      setIsLoading(true)
      // TODO: Integrar con el endpoint
      // const response = await api.get('/profile')
      // const data = response.data
      
      // Mock data por ahora
      const mockData: ProfileFormData = {
        nombres: "Adriana",
        apellidos: "Gonzales Rodriguez",
        email: "adriana.go@gmail.com",
        departamento: "Amazonas",
        fecha_nacimiento: "2000-09-23",
        whatsapp: "999000888",
        tipo_miembro: "profesional",
        carrera: "Ing. Minas",
        ciclo: "2",
        universidad: "Ing. Minas",
        identificacion: "profesional",
        frase_inspiradora: "",
        enlaces_sociales: {
          linkedin: "https://linkedin.com/in/adriana-gonzales"
        }
      }

      setFormData(mockData)
      calculateProgress(mockData)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (data: Partial<ProfileFormData>) => {
    try {
      setIsSaving(true)
      // TODO: Integrar con el endpoint
      // await api.put('/profile', data)
      
      // Actualizar estado local
      setFormData(prev => {
        if (!prev) return null
        const updated = { ...prev, ...data }
        calculateProgress(updated)
        return updated
      })
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setIsSaving(false)
    }
  }

  const updateProfilePhoto = async (file: File) => {
    try {
      setIsSaving(true)
      // TODO: Integrar con el endpoint
      // const formData = new FormData()
      // formData.append('photo', file)
      // await api.put('/profile/photo', formData)
      
      // Mock update
      setFormData(prev => {
        if (!prev) return null
        const updated = { 
          ...prev, 
          foto_perfil: URL.createObjectURL(file)
        }
        calculateProgress(updated)
        return updated
      })
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return {
    formData,
    isLoading,
    error,
    progress,
    isSaving,
    pendingFields,
    updateProfile,
    updateProfilePhoto,
    fetchProfile
  }
} 