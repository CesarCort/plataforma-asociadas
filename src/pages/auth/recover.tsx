import AuthLayout from "@/layouts/auth-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RecoverPage() {
  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle>Recuperar Contraseña</CardTitle>
          <CardDescription>Te ayudaremos a recuperar tu acceso</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Contenido del formulario de recuperación irá aquí */}
          <div className="text-center text-muted-foreground">
            Página en construcción
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
} 