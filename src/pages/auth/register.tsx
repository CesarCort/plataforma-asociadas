import AuthLayout from "@/layouts/auth-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle>Registro</CardTitle>
          <CardDescription>Únete a WIM Perú</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Contenido del formulario de registro irá aquí */}
          <div className="text-center text-muted-foreground">
            Página en construcción
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
} 