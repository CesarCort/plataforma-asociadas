import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Info } from "lucide-react"
import { Badge } from "../../components/ui/badge"
import { Label } from "../../components/ui/label"
import { useProfile } from "../../hooks/useProfile"
import { ImageEditor } from "../../components/profile/image-editor"

export function ProfileSettings() {
  const { 
    formData, 
    isLoading, 
    error, 
    progress, 
    isSaving,
    pendingFields,
    updateProfile,
    updateProfilePhoto
  } = useProfile()

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error al cargar el perfil: {error.message}
        </AlertDescription>
      </Alert>
    )
  }

  if (!formData) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Barra de progreso mejorada */}
      <Card className="border-none bg-gradient-to-r from-pink-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold tracking-tight">Completa tu perfil</h3>
                <p className="text-sm text-muted-foreground">
                  Completa tu información para aprovechar al máximo tu membresía
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">{progress.total}%</span>
              </div>
            </div>
            <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress.total}%` }}
              />
            </div>
            {pendingFields.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Campos pendientes por completar:
                </p>
                <div className="flex flex-wrap gap-2">
                  {pendingFields.map((field) => (
                    <Badge 
                      key={field} 
                      variant="outline"
                      className="bg-background"
                    >
                      {field === 'foto_perfil' ? 'Foto de perfil' : 
                       field === 'certificado_matricula' ? 'Certificado de matrícula' : 
                       'Enlaces sociales'}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Información Personal */}
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>
            Esta información será visible para otros miembros de la comunidad.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Foto de perfil */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-32 h-32 sm:w-24 sm:h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
                {formData.foto_perfil ? (
                  <img 
                    src={formData.foto_perfil} 
                    alt="Foto de perfil" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-5xl sm:text-4xl text-muted-foreground">👤</div>
                )}
              </div>
              <div className="space-y-2 text-center sm:text-left w-full sm:w-auto">
                <ImageEditor onImageSave={updateProfilePhoto} />
                <p className="text-sm text-muted-foreground">
                  Formato JPG o PNG. Deberá tener un corte profesional que muestre tu rostro completo. (No tipo selfie)
                </p>
              </div>
            </div>
          </div>

          {/* Campos bloqueados */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombres">Nombres*</Label>
              <Input 
                id="nombres"
                value={formData.nombres} 
                disabled 
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos*</Label>
              <Input 
                id="apellidos"
                value={formData.apellidos} 
                disabled 
                className="bg-muted"
              />
            </div>
          </div>

          {/* Frase inspiradora */}
          <div className="space-y-2">
            <Label htmlFor="frase">Tu frase inspiradora</Label>
            <Textarea 
              id="frase"
              placeholder="Comparte una frase que te inspire..."
              value={formData.frase_inspiradora}
              onChange={(e) => updateProfile({ frase_inspiradora: e.target.value })}
              className="min-h-[100px]"
            />
          </div>

          {/* Identificación */}
          <div className="space-y-2">
            <Label>¿Con qué te identificas?*</Label>
            <Input 
              value={formData.tipo_miembro === 'estudiante' ? 'Estudiante' : 'Profesional'} 
              disabled 
              className="bg-muted"
            />
          </div>

          {/* WhatsApp ahora editable */}
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp*</Label>
            <Input 
              id="whatsapp"
              value={formData.whatsapp} 
              onChange={(e) => updateProfile({ whatsapp: e.target.value })}
              placeholder="+51 999 999 999"
            />
          </div>
        </CardContent>
      </Card>

      {/* Información Académica/Profesional */}
      <Card>
        <CardHeader>
          <CardTitle>Información {formData.tipo_miembro === 'estudiante' ? 'Académica' : 'Profesional'}</CardTitle>
          <CardDescription>
            {formData.tipo_miembro === 'estudiante' 
              ? 'Detalles sobre tus estudios actuales'
              : 'Detalles sobre tu experiencia profesional'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.tipo_miembro === 'estudiante' ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>¿Qué carrera estudias?*</Label>
                  <Input 
                    value={formData.carrera} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label>¿Cuál es tu ciclo?*</Label>
                  <Input 
                    value={formData.ciclo} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>¿Dónde estudias?*</Label>
                <Input 
                  value={formData.universidad} 
                  disabled 
                  className="bg-muted"
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Años de experiencia*</Label>
                  <Input 
                    value={formData.anos_experiencia} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Empresa actual*</Label>
                  <Input 
                    value={formData.empresa} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Puesto actual*</Label>
                <Input 
                  value={formData.puesto} 
                  disabled 
                  className="bg-muted"
                />
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Estudios adicionales</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input 
                    placeholder="Doctorado"
                    value={formData.estudios_adicionales?.doctorado} 
                    disabled 
                    className="bg-muted"
                  />
                  <Input 
                    placeholder="Maestría"
                    value={formData.estudios_adicionales?.maestria} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
              </div>
            </>
          )}

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Los campos bloqueados solo pueden ser modificados durante la renovación de tu membresía.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Enlaces sociales */}
      <Card>
        <CardHeader>
          <CardTitle>Enlaces Profesionales</CardTitle>
          <CardDescription>
            Comparte tus perfiles profesionales con la comunidad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>LinkedIn</Label>
              <Input 
                placeholder="https://linkedin.com/in/tu-perfil"
                value={formData.enlaces_sociales?.linkedin}
                onChange={(e) => updateProfile({ 
                  enlaces_sociales: { 
                    ...formData.enlaces_sociales,
                    linkedin: e.target.value 
                  }
                })}
              />
            </div>
            <Button variant="outline" size="sm">
              Agregar otro enlace
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          size="lg"
          disabled={isSaving}
        >
          {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </div>
  )
} 