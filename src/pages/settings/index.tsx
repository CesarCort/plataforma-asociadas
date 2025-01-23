import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Header } from "../../components/layout/header"
import { Sidebar } from "../../components/layout/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { Download, Calendar, Gift, History, ArrowUpRight, Info, AlertTriangle } from "lucide-react"
import { ProfileSettings } from "./profile"
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { DocumentMeta } from "../../components/meta/DocumentMeta"

export default function SettingsPage() {
  const [isChangingEmail, setIsChangingEmail] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [showVerification, setShowVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const handleEmailChange = () => {
    if (!showVerification) {
      // Aquí iría la lógica para enviar el código de verificación
      setShowVerification(true)
    } else {
      // Aquí iría la lógica para verificar el código
      if (verificationCode.length === 6) {
        // Verificar código y actualizar email
        setIsChangingEmail(false)
        setShowVerification(false)
        setVerificationCode("")
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DocumentMeta title="Configuración" />
      <Header />

      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        <main className="flex-1 mt-16">
          <div className="pt-8 pb-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Configuración</h2>
                <p className="text-muted-foreground">
                  Administra tu cuenta y configura tus preferencias.
                </p>
              </div>

              <Separator className="my-6" />

              <Tabs defaultValue="perfil" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="perfil">Perfil</TabsTrigger>
                  <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
                  <TabsTrigger value="membresia">Membresía</TabsTrigger>
                  <TabsTrigger value="trayectoria">Mi trayectoria</TabsTrigger>
                </TabsList>

                <TabsContent value="perfil">
                  <ProfileSettings />
                </TabsContent>
                
                <TabsContent value="cuenta">
                  <div className="space-y-6">
                    {/* Email con verificación */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Correo electrónico</CardTitle>
                        <CardDescription>
                          Actualiza tu dirección de correo electrónico
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {!isChangingEmail ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Correo actual</Label>
                                <p className="text-sm text-muted-foreground">usuario@ejemplo.com</p>
                              </div>
                              <Button 
                                variant="outline"
                                onClick={() => setIsChangingEmail(true)}
                              >
                                Cambiar email
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {!showVerification ? (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Nuevo correo electrónico</Label>
                                  <Input 
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    placeholder="nuevo@ejemplo.com"
                                  />
                                </div>
                                <Alert>
                                  <Info className="h-4 w-4" />
                                  <AlertDescription>
                                    Se enviará un código de verificación a tu nuevo correo electrónico.
                                  </AlertDescription>
                                </Alert>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Código de verificación</Label>
                                  <Input 
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder="000000"
                                    maxLength={6}
                                  />
                                </div>
                                <Alert>
                                  <Info className="h-4 w-4" />
                                  <AlertDescription>
                                    Hemos enviado un código de 6 dígitos a {newEmail}
                                  </AlertDescription>
                                </Alert>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Button
                                onClick={handleEmailChange}
                              >
                                {showVerification ? 'Verificar código' : 'Enviar código'}
                              </Button>
                              <Button
                                variant="ghost"
                                onClick={() => {
                                  setIsChangingEmail(false)
                                  setShowVerification(false)
                                  setVerificationCode("")
                                }}
                              >
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Cambio de contraseña */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Cambiar contraseña</CardTitle>
                        <CardDescription>
                          Actualiza tu contraseña para mantener tu cuenta segura
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current">Contraseña Actual</Label>
                          <Input id="current" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new">Nueva Contraseña</Label>
                          <Input id="new" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm">Confirmar Contraseña</Label>
                          <Input id="confirm" type="password" />
                        </div>
                        <Button>Actualizar Contraseña</Button>
                      </CardContent>
                    </Card>

                    {/* Zona de peligro */}
                    <Card className="border-destructive">
                      <CardHeader>
                        <CardTitle className="text-destructive">Zona de peligro</CardTitle>
                        <CardDescription>
                          Acciones irreversibles para tu cuenta
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Desactivar cuenta</AlertTitle>
                            <AlertDescription>
                              Al desactivar tu cuenta, esta quedará inaccesible y tus datos no serán utilizados para fines comerciales ni de marketing. Esta acción no elimina tu cuenta, pero la deja en estado inactivo.
                            </AlertDescription>
                          </Alert>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="destructive">
                                Desactivar cuenta
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>¿Estás segura de que quieres desactivar tu cuenta?</DialogTitle>
                                <DialogDescription>
                                  Esta acción desactivará tu cuenta y todos los servicios asociados. Tus datos se mantendrán seguros y no serán utilizados para ningún fin.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="ghost">Cancelar</Button>
                                <Button variant="destructive">
                                  Sí, desactivar mi cuenta
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="membresia">
                  <Card>
                    <CardHeader>
                      <CardTitle>Membresía Actual</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">Membresía Profesional</Badge>
                        <Badge variant="outline" className="text-yellow-600 bg-yellow-50">
                          <span className="mr-1">⚠️</span>
                          Próxima a vencer
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="rounded-lg border p-4 bg-yellow-50/50">
                        <div className="flex items-center gap-2 text-yellow-600">
                          <span>⚠️</span>
                          <div>
                            <p className="font-medium">Tu membresía está próxima a vencer</p>
                            <p className="text-sm">Te quedan 25 días de membresía. Renueva ahora para mantener tus beneficios.</p>
                          </div>
                        </div>
                        <Button className="mt-4" variant="default">
                          Renovar Membresía →
                        </Button>
                      </div>

                      <div className="grid gap-4">
                        <div className="space-y-1">
                          <Label>Plan</Label>
                          <p className="text-lg font-medium">Profesional Anual</p>
                        </div>
                        <div className="space-y-1">
                          <Label>Monto</Label>
                          <p className="text-lg font-medium">S/. 180.00</p>
                        </div>
                        <div className="space-y-1">
                          <Label>Próxima renovación</Label>
                          <p className="text-lg font-medium">15 Feb 2024</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Historial de Facturas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { id: 'F001-00123', date: '15 Feb 2023', amount: 'S/. 180.00' },
                          { id: 'F001-00089', date: '15 Feb 2022', amount: 'S/. 180.00' },
                          { id: 'F001-00045', date: '15 Feb 2021', amount: 'S/. 160.00' },
                        ].map((factura) => (
                          <div key={factura.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <span className="text-xl">📄</span>
                              <div>
                                <p className="font-medium">Factura {factura.id}</p>
                                <p className="text-sm text-muted-foreground">{factura.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <p className="font-medium">{factura.amount}</p>
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                Pagado
                              </Badge>
                              <Button variant="ghost" size="icon">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="trayectoria">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mi Trayectoria en WIM</CardTitle>
                      <CardDescription>
                        Tu participación y crecimiento en la comunidad
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">
                                Eventos Asistidos
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span className="text-2xl font-bold">12</span>
                                <Badge variant="secondary">Últimos 360 días</Badge>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">
                                Beneficios Utilizados
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center gap-2">
                                <Gift className="w-4 h-4 text-primary" />
                                <span className="text-2xl font-bold">8</span>
                                <Badge variant="secondary">Últimos 360 días</Badge>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">
                                Tiempo como Miembro
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center gap-2">
                                <History className="w-4 h-4 text-primary" />
                                <span className="text-2xl font-bold">2.5</span>
                                <span className="text-muted-foreground">años</span>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-semibold">Línea de Tiempo</h3>
                          <div className="relative space-y-0 pl-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-border">
                            {[
                              {
                                date: '15 Ene 2024',
                                type: 'event',
                                title: 'Workshop: Liderazgo en Minería',
                                description: 'Participación como asistente',
                                icon: <Calendar className="w-4 h-4 text-primary" />,
                                badge: 'Evento'
                              },
                              {
                                date: '10 Ene 2024',
                                type: 'benefit',
                                title: 'Mentoría Individual',
                                description: 'Sesión con María Rodríguez, Gerente de Operaciones',
                                icon: <Gift className="w-4 h-4 text-primary" />,
                                badge: 'Beneficio'
                              },
                              {
                                date: '01 Ene 2024',
                                type: 'benefit',
                                title: 'Acceso a Curso Premium',
                                description: 'Curso de Gestión de Proyectos Mineros',
                                icon: <Gift className="w-4 h-4 text-primary" />,
                                badge: 'Beneficio'
                              },
                              {
                                date: '15 Dic 2023',
                                type: 'renewal',
                                title: 'Renovación de Membresía',
                                description: 'Membresía Profesional - 1 año',
                                icon: <ArrowUpRight className="w-4 h-4 text-primary" />,
                                badge: 'Renovación'
                              },
                              {
                                date: '10 Dic 2023',
                                type: 'event',
                                title: 'Networking: Mujeres en Tecnología Minera',
                                description: 'Participación como ponente',
                                icon: <Calendar className="w-4 h-4 text-primary" />,
                                badge: 'Evento'
                              },
                              {
                                date: '01 Dic 2023',
                                type: 'benefit',
                                title: 'Descuento Exclusivo',
                                description: 'Certificación en Seguridad Minera',
                                icon: <Gift className="w-4 h-4 text-primary" />,
                                badge: 'Beneficio'
                              },
                              {
                                date: '15 Nov 2023',
                                type: 'event',
                                title: 'Conferencia Anual WIM 2023',
                                description: 'Participación como asistente VIP',
                                icon: <Calendar className="w-4 h-4 text-primary" />,
                                badge: 'Evento'
                              }
                            ].map((item, index) => (
                              <div key={index} className="relative pb-10 last:pb-0">
                                <div className="flex gap-6 items-start">
                                  <div className="absolute -left-8 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center shrink-0">
                                    {item.icon}
                                  </div>
                                  <div className="flex-1 space-y-1.5">
                                    <div className="flex items-center gap-2">
                                      <Badge 
                                        variant="outline" 
                                        className={`rounded-full ${
                                          item.type === 'event' ? 'border-primary/50 text-primary' :
                                          item.type === 'benefit' ? 'border-green-500/50 text-green-600' :
                                          'border-blue-500/50 text-blue-600'
                                        }`}
                                      >
                                        {item.badge}
                                      </Badge>
                                      <span className="text-sm text-muted-foreground">
                                        {item.date}
                                      </span>
                                    </div>
                                    <p className="font-medium text-base">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 