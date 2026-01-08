import { Plane } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
            <Plane className="w-12 h-12 text-white animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Family Trip Planner</h2>
        <p className="text-gray-600 animate-pulse">Carregando sua viagem...</p>
      </div>
    </div>
  )
}
