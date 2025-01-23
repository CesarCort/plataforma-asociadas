import { useEffect, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

interface QrScannerProps {
  onResult: (result: string) => void
}

export function QrScanner({ onResult }: QrScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)

  useEffect(() => {
    // Inicializar el escáner
    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
        aspectRatio: 1,
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
      },
      false
    )

    // Iniciar el escaneo
    scannerRef.current.render(
      (decodedText) => {
        // Detener el escaneo después de un resultado exitoso
        if (scannerRef.current) {
          scannerRef.current.clear()
        }
        onResult(decodedText)
      },
      (errorMessage) => {
        // Solo loguear errores que no sean de "no se encontró código QR"
        if (!errorMessage.includes("No MultiFormat Readers were able to detect the code")) {
          console.error("Error al escanear:", errorMessage)
        }
      }
    )

    // Limpiar el escáner al desmontar
    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.clear()
        } catch (error) {
          // Ignorar errores al limpiar el escáner
        }
      }
    }
  }, [onResult])

  return (
    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
      <div id="qr-reader" />
    </div>
  )
} 