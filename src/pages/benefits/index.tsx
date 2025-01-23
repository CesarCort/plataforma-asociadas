import { Header } from "../../components/layout/header"
import { Sidebar } from "../../components/layout/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { BenefitCard } from "../../components/benefits/benefit-card"
import { DetailModal, RedeemModal, ReportModal } from "../../components/benefits/benefit-modals"
import { useBenefits } from "../../hooks/useBenefits"

const BENEFIT_TYPES = ['Todos', 'Educativos', 'Capacitación', 'Trabajo', 'Networking']

export default function BenefitsPage() {
  const {
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
  } = useBenefits()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        <main className="flex-1 mt-16">
          <div className="pt-8 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Beneficios</h2>
                <p className="text-muted-foreground">
                  Aprovecha al máximo tu membresía con las oportunidades que tiene WIM para todas nuestras asociadas.
                </p>
              </div>

              <Tabs defaultValue="available" className="mt-6">
                <TabsList>
                  <TabsTrigger value="available">Beneficios Disponibles</TabsTrigger>
                  <TabsTrigger value="redeemed">Beneficios Canjeados</TabsTrigger>
                </TabsList>

                <div className="mt-6 flex flex-wrap gap-2">
                  {BENEFIT_TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type as any)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        selectedType === type
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <TabsContent value="available" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableBenefits.map(benefit => (
                      <BenefitCard
                        key={benefit.id}
                        benefit={benefit}
                        onRedeem={handleRedeemBenefit}
                        onClick={handleViewDetails}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="redeemed" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {redeemedBenefits.map(benefit => (
                      <BenefitCard
                        key={benefit.id}
                        benefit={benefit}
                        onReport={handleReportBenefit}
                        onClick={handleViewDetails}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      <RedeemModal
        benefit={selectedBenefit}
        open={showRedeemModal}
        onClose={() => setShowRedeemModal(false)}
      />

      <ReportModal
        benefit={selectedBenefit}
        open={showReportModal}
        onClose={() => setShowReportModal(false)}
      />

      <DetailModal
        benefit={selectedBenefit}
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  )
} 