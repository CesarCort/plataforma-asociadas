import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import confetti from 'canvas-confetti';

// Importamos las imágenes
import logoWhite from "@/assets/images/logo-white.png";
import signupImage from "@/assets/images/signup-1.png";

type Step = "selection" | "dni" | "data" | "payment" | "confirmation";

function StepIndicator({ currentStep, step }: { currentStep: Step; step: Step }) {
  const steps: { [key in Step]?: { number: number; label: string; shortLabel: string } } = {
    dni: { number: 1, label: "Ingresa tu DNI", shortLabel: "DNI" },
    data: { number: 2, label: "Ingresa tus datos", shortLabel: "Datos" },
    payment: { number: 3, label: "Realiza el pago", shortLabel: "Pago" },
    confirmation: { number: 4, label: "Confirmación", shortLabel: "Confirmación" }
  };

  const currentStepNumber = steps[currentStep]?.number || 0;
  const stepNumber = steps[step]?.number || 0;
  const isCompleted = stepNumber < currentStepNumber;
  const isCurrent = stepNumber === currentStepNumber;

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <div className={`h-3 w-3 rounded-full flex items-center justify-center ${
          isCompleted ? "bg-[#22C55E]" : 
          isCurrent ? "bg-[#EF4444]" : 
          "bg-gray-200"
        }`}>
          {isCompleted && (
            <CheckIcon className="h-2 w-2 text-white" />
          )}
        </div>
        <span className={`text-sm hidden md:inline ${
          stepNumber <= currentStepNumber ? "text-gray-600" : "text-gray-400"
        }`}>
          {steps[step]?.label}
        </span>
        <span className={`text-sm md:hidden ${
          stepNumber <= currentStepNumber ? "text-gray-600" : "text-gray-400"
        }`}>
          {steps[step]?.shortLabel}
        </span>
      </div>
    </div>
  );
}

function StepDivider() {
  return <div className="w-8 md:w-16 h-[1px] bg-gray-300" />;
}

function StepsProgress({ currentStep }: { currentStep: Step }) {
  return (
    <div className="flex justify-center items-center gap-2 md:gap-3">
      <StepIndicator currentStep={currentStep} step="dni" />
      <StepDivider />
      <StepIndicator currentStep={currentStep} step="data" />
      <StepDivider />
      <StepIndicator currentStep={currentStep} step="payment" />
      <StepDivider />
      <StepIndicator currentStep={currentStep} step="confirmation" />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4 md:px-0">
          <Link to="/login">
            <img src={logoWhite} alt="WIM Perú" className="h-8" />
          </Link>
          <Link to="/login">
            <Button variant="outline" className="font-normal">
              Iniciar sesión
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState<Step>("selection");
  const [membershipType, setMembershipType] = useState<"personal" | "business" | null>(null);

  const handleContinueAsPersonal = () => {
    setMembershipType("personal");
    setCurrentStep("dni");
  };

  const handleContinueAsBusiness = () => {
    setMembershipType("business");
    setCurrentStep("dni");
  };

  if (currentStep === "dni" && membershipType === "personal") {
    return (
      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center p-4">
        <Header />
        <div className="w-full max-w-[1000px] space-y-8 pt-20">
          {/* Progress Steps */}
          <StepsProgress currentStep={currentStep} />

          {/* Form Card */}
          <Card className="max-w-md mx-auto border-0 shadow-lg">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto">
                <UserIcon className="h-12 w-12 text-gray-400" />
              </div>
              <CardTitle className="text-2xl">Membresía Personal</CardTitle>
              <CardDescription>
                Ingresa tu DNI para comenzar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Input 
                  type="text" 
                  placeholder="Ingresa tu número de DNI"
                  className="h-12"
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setCurrentStep("selection")}
                >
                  Regresar
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => setCurrentStep("data")}
                >
                  Continuar
                </Button>
              </div>
              <div className="text-center text-sm text-gray-500">
                ¿Necesitas ayuda? Contáctanos vía{" "}
                <Link to="#" className="text-black font-medium">
                  Whatsapp
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === "data" && membershipType === "personal") {
    return (
      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center p-4">
        <Header />
        <div className="w-full max-w-[1000px] space-y-8 pt-20">
          {/* Progress Steps */}
          <StepsProgress currentStep={currentStep} />

          {/* Form Card */}
          <Card className="max-w-2xl mx-auto border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">Membresía Personal</span>
              </div>
              <CardTitle className="text-2xl">Datos personales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Nombres y Apellidos */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombres</Label>
                  <Input type="text" />
                </div>
                <div className="space-y-2">
                  <Label>Apellidos</Label>
                  <Input type="text" />
                </div>
              </div>

              {/* Cómo te identificas */}
              <div className="space-y-2">
                <Label>Cómo te identificas</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="estudiante">Estudiante</SelectItem>
                    <SelectItem value="profesional">Profesional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Correo electrónico */}
              <div className="space-y-2">
                <Label>Correo electrónico</Label>
                <Input type="email" />
              </div>

              {/* Código País y WhatsApp */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Código País</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pe">Perú (+51)</SelectItem>
                      <SelectItem value="cl">Chile (+56)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp</Label>
                  <Input type="tel" />
                </div>
              </div>

              {/* Fecha de Nacimiento y Departamento */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fecha de Nacimiento</Label>
                  <Input type="text" placeholder="dd/mm/aaaa" />
                </div>
                <div className="space-y-2">
                  <Label>Departamento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lima">Lima</SelectItem>
                      <SelectItem value="arequipa">Arequipa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setCurrentStep("dni")}
                >
                  Regresar
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => setCurrentStep("payment")}
                >
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === "payment" && membershipType === "personal") {
    return (
      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center p-4">
        <Header />
        <div className="w-full max-w-[1000px] space-y-8 pt-20">
          {/* Progress Steps */}
          <StepsProgress currentStep={currentStep} />

          {/* Form Card */}
          <Card className="max-w-md mx-auto border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">Membresía Personal</span>
              </div>
              <CardTitle className="text-2xl">Pago de Membresía</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Resumen de pago */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="text-sm font-medium">Tu suscripción</div>
                <div className="flex justify-between items-center">
                  <span>Asociada Profesional</span>
                  <span>S/200.00</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>S/200.00</span>
                  </div>
                  <div className="flex justify-between items-center font-medium">
                    <span>Total</span>
                    <span>S/200.00</span>
                  </div>
                </div>
              </div>

              {/* Tipo de comprobante */}
              <div className="space-y-3">
                <Label>Tipo de comprobante</Label>
                <RadioGroup defaultValue="boleta">
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="boleta" id="boleta" />
                    <Label htmlFor="boleta" className="flex-1">
                      <div>Boleta</div>
                      <span className="text-sm text-gray-500">Para uso personal</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="factura" id="factura" />
                    <Label htmlFor="factura" className="flex-1">
                      <div>Factura</div>
                      <span className="text-sm text-gray-500">Para empresas</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Checkbox para usar datos registrados */}
              <div className="flex items-center space-x-2">
                <Checkbox id="use-data" />
                <label
                  htmlFor="use-data"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Usar mis datos registrados
                </label>
              </div>

              {/* Alerta */}
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-sm text-yellow-800">
                  Los datos proporcionados serán validados posteriormente. WIM Perú se reserva el
                  derecho de admisión en caso la información no sea verídica.{" "}
                  <Link to="#" className="font-medium underline">
                    Ver más detalles
                  </Link>
                </AlertDescription>
              </Alert>

              {/* Checkbox de política de privacidad */}
              <div className="flex items-center space-x-2">
                <Checkbox id="privacy" />
                <label
                  htmlFor="privacy"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  He leído y acepto la política de privacidad de WIM Perú
                </label>
              </div>

              {/* Total y botón de pago */}
              <div className="space-y-4">
                <div className="flex justify-between items-center font-medium">
                  <span>Total a pagar:</span>
                  <span>S/200.00</span>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setCurrentStep("data")}
                  >
                    Regresar
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      setCurrentStep("confirmation");
                      // Lanzar efecto de confeti
                      confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.3 }
                      });
                    }}
                  >
                    Pagar
                  </Button>
                </div>
                <p className="text-center text-sm text-gray-500">
                  Se acepta pagos con tarjetas de débito o crédito, Yape, Cuotealo BCP y PagoEfectivo
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === "confirmation" && membershipType === "personal") {
    return (
      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center p-4">
        <Header />
        <div className="w-full max-w-[1000px] space-y-8 pt-20">
          {/* Progress Steps */}
          <StepsProgress currentStep={currentStep} />

          {/* Confirmation Card */}
          <Card className="max-w-md mx-auto border-0 shadow-lg">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-2xl">¡Bienvenida a WIM PERÚ Asociadas!</CardTitle>
              <CardDescription>
                Tu registro ha sido completado exitosamente.
              </CardDescription>
              <div className="flex justify-center gap-3">
                <Button variant="outline">
                  Descargar factura
                </Button>
                <Button>
                  Ir a mi Dashboard →
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Detalles de Membresía Desplegable */}
              <div className="space-y-4">
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium hover:text-gray-500">
                    <span className="text-lg">Detalles de tu Membresía</span>
                    <ChevronDown className="h-5 w-5" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <div className="space-y-2">
                      <h4 className="font-medium">Tu membresía Profesional incluye:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckIcon className="h-4 w-4 text-green-500" />
                          <span>Acceso a eventos exclusivos</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckIcon className="h-4 w-4 text-green-500" />
                          <span>Networking con profesionales del sector</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckIcon className="h-4 w-4 text-green-500" />
                          <span>Oportunidades de desarrollo profesional</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckIcon className="h-4 w-4 text-green-500" />
                          <span>Recursos y materiales exclusivos</span>
                        </li>
                      </ul>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Próximos pasos (siempre visible) */}
              <div className="space-y-2">
                <h4 className="font-medium">Próximos pasos:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Revisa tu correo electrónico para más información</li>
                  <li>Únete a nuestro grupo de WhatsApp</li>
                  <li>Completa tu perfil en la plataforma</li>
                  <li>Explora tus próximos eventos</li>
                </ol>
              </div>

              {/* Footer en una línea */}
              <div className="text-center text-sm text-gray-500">
                ¿Necesitas ayuda? Contáctanos vía <Link to="#" className="text-black font-medium">WhatsApp</Link> o <Link to="#" className="text-black font-medium">Contactar Soporte</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center p-4">
      <Header />
      <div className="w-full max-w-[1000px] space-y-8 pt-20">
        {/* Imagen de referencia */}
        <div className="flex justify-center items-center mb-2">
          <div className="relative">
            <img 
              src={signupImage} 
              alt="WIM Asociadas" 
              className="w-[235px] md:w-[400px] h-auto object-contain" 
            />
          </div>
        </div>

        {/* Título y descripción */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">¡Únete a WIM!</h1>
          <p className="text-gray-600 text-base max-w-[600px] mx-auto">
            WIM Asociadas es una plataforma para gestionar membresías, eventos,
            beneficios y comunicaciones de forma personalizada.
          </p>
        </div>

        {/* Tarjetas de membresía */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Membresía Personal */}
          <Card className="border-0 shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <UserIcon className="h-5 w-5 text-gray-400" />
                <CardTitle className="text-xl">Membresía Personal</CardTitle>
              </div>
              <CardDescription className="text-sm text-gray-500">
                Para profesionales y estudiantes del sector minero
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Acceso a eventos exclusivos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Networking profesional</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Desarrollo de carrera</span>
                </li>
              </ul>
              <Button 
                className="w-full" 
                variant="step"
                onClick={handleContinueAsPersonal}
              >
                Continuar como Personal
              </Button>
            </CardContent>
          </Card>

          {/* Membresía Empresarial */}
          <Card className="border-0 shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <BuildingIcon className="h-5 w-5 text-gray-400" />
                <CardTitle className="text-xl">Membresía Empresarial</CardTitle>
              </div>
              <CardDescription className="text-sm text-gray-500">
                Para empresas comprometidas con la diversidad en minería
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Visibilidad corporativa</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Participación en iniciativas WIM</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Beneficios para colaboradores</span>
                </li>
              </ul>
              <Button 
                className="w-full" 
                variant="step"
                onClick={handleContinueAsBusiness}
              >
                Continuar como Empresa
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
} 