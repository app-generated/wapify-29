import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { CheckSquare, Clock, TrendingUp, Plus } from 'lucide-react'

interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate: string
}

function HomePage() {
  const [recentTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Terminer le rapport mensuel',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Préparer la présentation client',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-14'
    },
    {
      id: '3',
      title: 'Réviser le code de l\'API',
      completed: true,
      priority: 'medium',
      dueDate: '2024-01-13'
    },
    {
      id: '4',
      title: 'Organiser la réunion équipe',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-16'
    }
  ])

  const stats = {
    totalTasks: recentTasks.length,
    completedTasks: recentTasks.filter(task => task.completed).length,
    pendingTasks: recentTasks.filter(task => !task.completed).length,
    highPriorityTasks: recentTasks.filter(task => task.priority === 'high' && !task.completed).length
  }

  const completionRate = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Bienvenue sur TaskFlow</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Organisez vos tâches, suivez vos progrès et boostez votre productivité avec notre gestionnaire de tâches intuitif.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/tasks">
            <Button size="lg" className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Créer une tâche</span>
            </Button>
          </Link>
          <Link to="/stats">
            <Button variant="outline" size="lg">
              Voir les statistiques
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckSquare className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalTasks}</p>
                <p className="text-sm text-gray-600">Tâches totales</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckSquare className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.completedTasks}</p>
                <p className="text-sm text-gray-600">Terminées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{stats.pendingTasks}</p>
                <p className="text-sm text-gray-600">En cours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{completionRate}%</p>
                <p className="text-sm text-gray-600">Taux de réussite</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tasks */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Tâches récentes</h2>
          <Link to="/tasks">
            <Button variant="outline">Voir toutes les tâches</Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {recentTasks.slice(0, 4).map((task) => (
            <Card key={task.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      task.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300'
                    }`} />
                    <div>
                      <h3 className={`font-medium ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'high' 
                        ? 'bg-red-100 text-red-800'
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/tasks" className="block">
              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <CheckSquare className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium">Gérer les tâches</h3>
                <p className="text-sm text-gray-600">Créer, modifier et organiser vos tâches</p>
              </div>
            </Link>
            
            <Link to="/stats" className="block">
              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <BarChart className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium">Voir les statistiques</h3>
                <p className="text-sm text-gray-600">Suivez vos performances et progrès</p>
              </div>
            </Link>
            
            <Link to="/settings" className="block">
              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-medium">Paramètres</h3>
                <p className="text-sm text-gray-600">Personnalisez votre expérience</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HomePage