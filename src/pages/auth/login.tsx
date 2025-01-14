import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold text-foreground">Plataforma WIM</h1>
          <p className="text-lg text-muted-foreground">
            Bienvenida a la plataforma de gestión WIM
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="documento" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="documento">Documento</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documento" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="docType">Tipo de Documento</Label>
                  <select 
                    id="docType" 
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="dni">DNI</option>
                    <option value="ce">CE</option>
                    <option value="pas">PAS</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="docNumber">Número de Documento</Label>
                  <Input id="docNumber" type="text" placeholder="Ingresa tu número de documento" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" />
                </div>
                <Button className="w-full" onClick={handleLogin}>
                  Iniciar Sesión
                </Button>
              </TabsContent>

              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="nombre@ejemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" />
                </div>
                <Button className="w-full" onClick={handleLogin}>
                  Iniciar Sesión
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              <a href="/recuperar" className="text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="text-sm text-muted-foreground text-center">
              ¿Aún no eres miembro? {" "}
              <a href="/registro" className="text-primary hover:underline">
                Únete a WIM Perú
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 