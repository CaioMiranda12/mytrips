'use client'
import { Plane, Users, Wallet, Calendar, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  // useEffect(() => {
  //   router.push('/login')
  // }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-cyan-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Family Trip Planner</h1>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
          >
            Entrar
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Plane className="w-9 h-9 text-white" />
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Planeje viagens
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">
              em grupo
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Organize viagens com família e amigos de forma simples.
            Controle gastos, planeje passeios e mantenha todos informados.
          </p>

          <button
            onClick={() => router.push('/login')}
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-lg font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
          >
            <span>Fazer login</span>
            <ArrowRight className="w-5 h-5 text-white group-hover:animate-flight" />
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mb-5">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Organize em grupo</h3>
            <p className="text-gray-600">
              Convide amigos e familiares com um link simples. Todos podem ver e editar a viagem juntos.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center mb-5">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Controle gastos</h3>
            <p className="text-gray-600">
              Registre todos os gastos e veja quanto cada pessoa gastou. Evite confusões financeiras.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center mb-5">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Planeje passeios</h3>
            <p className="text-gray-600">
              Organize o roteiro dia a dia. Adicione passeios, confirme reservas e mantenha todos informados.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-cyan-100 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>{new Date().getFullYear()} Family Trip Planner - Simplifique suas viagens em grupo</p>
        </div>
      </footer>
    </div>
  )
}
