import { Link, useLocation } from 'react-router-dom'
import { CheckSquare, BarChart, Settings, Home } from 'lucide-react'

function Header() {
  const location = useLocation()

  const navigation = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Tâches', href: '/tasks', icon: CheckSquare },
    { name: 'Statistiques', href: '/stats', icon: BarChart },
    { name: 'Paramètres', href: '/settings', icon: Settings },
  ]

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <CheckSquare className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">TaskFlow</h1>
          </div>
          
          <nav className="flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header