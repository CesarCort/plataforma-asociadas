import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

interface Profile {
  id: string
  name: string
  role: "estudiante" | "profesional"
  imageUrl: string
  createdAt: string
}

export function RecentMembers() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRecentProfiles()
  }, [])

  const fetchRecentProfiles = async () => {
    try {
      // TODO: Reemplazar con llamada real al endpoint
      const response = await fetch('/api/profiles/recent')
      const data = await response.json()
      setProfiles(data.slice(0, 5)) // Limitamos a 5 perfiles
    } catch (error) {
      console.error('Error fetching profiles:', error)
      // Por ahora usamos datos de ejemplo
      setProfiles([
        {
          id: "1",
          name: "María Quispe",
          role: "estudiante",
          imageUrl: "/profiles/maria.jpg",
          createdAt: new Date().toISOString()
        },
        {
          id: "2",
          name: "Ana Pérez",
          role: "profesional",
          imageUrl: "/profiles/ana.jpg",
          createdAt: new Date().toISOString()
        },
        {
          id: "3",
          name: "Laura Torres",
          role: "estudiante",
          imageUrl: "/profiles/laura.jpg",
          createdAt: new Date().toISOString()
        },
        {
          id: "4",
          name: "Carmen Ruiz",
          role: "profesional",
          imageUrl: "/profiles/carmen.jpg",
          createdAt: new Date().toISOString()
        },
        {
          id: "5",
          name: "Diana López",
          role: "estudiante",
          imageUrl: "/profiles/diana.jpg",
          createdAt: new Date().toISOString()
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="w-full">
              <CardContent className="p-4">
                <div className="aspect-[4/3] bg-muted animate-pulse rounded-lg mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Miembros Recientes</h2>
        <Button variant="link" className="text-primary">
          Ver todos →
        </Button>
      </div>

      {/* Contenedor con scroll horizontal en móvil */}
      <div className="relative">
        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-x-visible">
          <div className="flex space-x-4 w-max sm:w-auto sm:grid sm:grid-cols-5 sm:gap-4">
            {profiles.map((profile) => (
              <Card key={profile.id} className="w-[250px] sm:w-auto flex-shrink-0">
                <CardContent className="p-4">
                  <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-3">
                    <img
                      src={profile.imageUrl}
                      alt={profile.name}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/400x300?text=Foto+de+Perfil";
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{profile.name}</h3>
                    <Badge variant="secondary" className="font-normal">
                      {profile.role === "estudiante" ? "Estudiante" : "Profesional"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Indicador de scroll en móvil */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-background to-transparent w-12 h-full sm:hidden" />
      </div>
    </div>
  )
} 