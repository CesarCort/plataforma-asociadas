import { Header } from "../../components/layout/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { Download, Calendar, Gift, History, ArrowUpRight } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Configuración</h2>
            <p className="text-muted-foreground">
              Administra tu cuenta y configura tus preferencias.
            </p>
          </div>

          <Separator className="my-6" />

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="account">Cuenta</TabsTrigger>
              <TabsTrigger value="membership">Membresía</TabsTrigger>
              <TabsTrigger value="journey">Mi Trayectoria</TabsTrigger>
            </TabsList>

            {/* Tab de Perfil */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Perfil Público</CardTitle>
                  <CardDescription>
                    Esta información será visible para otros miembros.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo</Label>
                      <Input id="name" placeholder="María García" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografía</Label>
                      <textarea 
                        id="bio" 
                        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Cuéntanos sobre ti..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Enlaces</Label>
                      <div className="space-y-2">
                        <Input placeholder="LinkedIn" />
                        <Input placeholder="Sitio Web" />
                      </div>
                      <Button variant="outline" size="sm">Agregar Enlace</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab de Cuenta */}
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Cuenta</CardTitle>
                  <CardDescription>
                    Actualiza tu email y contraseña.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="maria@ejemplo.com" />
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Cambiar Contraseña</h4>
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab de Membresía */}
            <TabsContent value="membership" className="space-y-6">
              {/* Información de Membresía Actual */}
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

              {/* Historial de Facturas */}
              <Card>
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

            {/* Tab de Trayectoria */}
            <TabsContent value="journey" className="space-y-6">
              {/* Resumen de Participación */}
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

                    {/* Línea de Tiempo */}
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
    </div>
  )
} 