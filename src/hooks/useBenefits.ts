import { useState } from 'react'

export type BenefitType = 'Educativos' | 'Capacitación' | 'Trabajo' | 'Networking'

export interface Benefit {
  id: string
  title: string
  description: string
  type: BenefitType
  imageUrl: string
  instructions?: string
  status: 'available' | 'redeemed' | 'reported'
  redeemedAt?: string
}

// Datos de ejemplo
const dummyBenefits: Benefit[] = [
  {
    id: '1',
    title: 'Curso de liderazgo',
    description: 'Acceso gratuito al curso "Liderazgo en Minería"',
    type: 'Educativos',
    imageUrl: '/images/course-leadership.jpg',
    instructions: 'Para acceder al curso, ingresa a la plataforma usando el siguiente código: LEAD2024',
    status: 'available'
  },
  {
    id: '2', 
    title: 'Curso de liderazgo',
    description: 'Acceso gratuito al curso "Liderazgo en Minería"',
    type: 'Capacitación',
    imageUrl: '/images/course-leadership.jpg',
    status: 'redeemed',
    redeemedAt: '2024-01-15'
  },
  {
    id: '3',
    title: 'Curso de liderazgo',
    description: 'Acceso gratuito al curso "Liderazgo en Minería"',
    type: 'Networking',
    imageUrl: '/images/course-leadership.jpg',
    status: 'reported'
  }
]

export function useBenefits() {
  const [benefits] = useState<Benefit[]>(dummyBenefits)
  const [selectedType, setSelectedType] = useState<BenefitType | 'Todos'>('Todos')
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null)
  const [showRedeemModal, setShowRedeemModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const filteredBenefits = selectedType === 'Todos' 
    ? benefits
    : benefits.filter(benefit => benefit.type === selectedType)

  const availableBenefits = filteredBenefits.filter(b => b.status === 'available')
  const redeemedBenefits = filteredBenefits.filter(b => b.status === 'redeemed' || b.status === 'reported')

  const handleRedeemBenefit = (benefit: Benefit) => {
    setSelectedBenefit(benefit)
    setShowRedeemModal(true)
  }

  const handleReportBenefit = (benefit: Benefit) => {
    setSelectedBenefit(benefit)
    setShowReportModal(true)
  }

  const handleViewDetails = (benefit: Benefit) => {
    setSelectedBenefit(benefit)
    setShowDetailModal(true)
  }

  return {
    benefits,
    availableBenefits,
    redeemedBenefits,
    selectedType,
    setSelectedType,
    selectedBenefit,
    showRedeemModal,
    setShowRedeemModal,
    showReportModal,
    setShowReportModal,
    showDetailModal,
    setShowDetailModal,
    handleRedeemBenefit,
    handleReportBenefit,
    handleViewDetails
  }
} 