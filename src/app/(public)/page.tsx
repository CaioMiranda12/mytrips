import { Plane, Users, Wallet, Calendar } from 'lucide-react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-cyan-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
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
            <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Plane className="w-9 h-9 text-white" />
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Planeje viagens
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-teal-500">
              em grupo
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Organize viagens com família e amigos de forma simples.
            Controle gastos, planeje passeios e mantenha todos informados.
          </p>

          <button
            onClick={() => router.push('/dashboard')}
            className="group px-8 py-4 bg-linear-to-r from-cyan-500 to-teal-500 text-white text-lg font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
          >
            <span>Entrar com Google</span>
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-linear-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mb-5">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Organize em grupo</h3>
            <p className="text-gray-600">
              Convide amigos e familiares com um link simples. Todos podem ver e editar a viagem juntos.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-linear-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center mb-5">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Controle gastos</h3>
            <p className="text-gray-600">
              Registre todos os gastos e veja quanto cada pessoa gastou. Evite confusões financeiras.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-linear-to-br from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center mb-5">
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
          <p>Family Trip Planner - Simplifique suas viagens em grupo</p>
        </div>
      </footer>
    </div>
  )
}
