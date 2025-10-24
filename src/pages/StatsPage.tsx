import { useState } from 'react'
import { Card, CardContent } from '../components/ui/Card'
import { CheckSquare, Clock, TrendingUp, Calendar, BarChart, PieChart } from 'lucide-react'

interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  createdAt: string
}

function StatsPage() {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Terminer le rapport mensuel',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-15',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Préparer la présentation client',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-14',
      createdAt: '2024-01-09'
    },
    {
      id: '3',
      title: 'Réviser le code de l\'API',
      completed: true,
      priority: 'medium',
      dueDate: '2024-01-13',
      createdAt: '2024-01-08'
    },
    {
      id: '4',
      title: 'Organiser la réunion équipe',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-16',
      createdAt: '2024-01-11'
    },
    {
      id: '5',
      title: 'Mettre à jour la documentation',
      completed: false,
      priority: 'low',
      dueDate: '2024-01-20',
      createdAt: '2024-01-12'
    },
    {
      id: '6',
      title: 'Tester les nouvelles fonctionnalités',
      completed: true,
      priority: 'high',
      dueDate: '2024-01-12',
      createdAt: '2024-01-07'
    },
    {
      id: '7',
      title: 'Optimiser les performances',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-18',
      createdAt: '2024-01-10'
    },
    {
      id: '8',
      title: 'Backup des données',
      completed: true,
      priority: 'low',
      dueDate: '2024-01-11',
      createdAt: '2024-01-06'
    },
    {
      id: '9',
      title: 'Formation équipe',
      completed: true,
      priority: 'medium',
      dueDate: '2024-01-10',
      createdAt: '2024-01-05'
    },
    {
      id: '10',
      title: 'Analyse des métriques',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-17',
      createdAt: '2024-01-08'
    }
  ])

  // Calculs des statistiques
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Statistiques par priorité
  const highPriorityTasks = tasks.filter(task => task.priority === 'high')
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium')
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low')

  const highCompleted = highPriorityTasks.filter(task => task.completed).length
  const mediumCompleted = mediumPriorityTasks.filter(task => task.completed).length
  const lowCompleted = lowPriorityTasks.filter(task => task.completed).length

  // Tâches en retard
  const today = new Date().toISOString().split('T')[0]
  const overdueTasks = tasks.filter(task => !task.completed && task.dueDate < today)

  // Tâches cette semaine
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)
  const thisWeekTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate)
    return dueDate <= nextWeek && dueDate >= new Date()
  })

  // Statistiques mensuelles (simulation)
  const monthlyStats = [
    { month: 'Décembre', completed: 15, created: 20 },
    { month: 'Novembre', completed: 12, created: 18 },
    { month: 'Octobre', completed: 18, created: 22 },
    { month: 'Septembre', completed: 14, created: 16 },
    { month: 'Août', completed: 20, created: 25 },
    { month: 'Juillet', completed: 16, created: 19 }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Statistiques</h1>
        <p className="text-gray-600">Suivez vos performances et analysez vos habitudes de travail</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckSquare className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalTasks}</p>
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
                <p className="text-2xl font-bold">{completedTasks}</p>
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
                <p className="text-2xl font-bold">{pendingTasks}</p>
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

      {/* Statistiques par priorité */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <PieChart className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold">Répartition par priorité</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Haute priorité</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold">{highPriorityTasks.length}</span>
                  <span className="text-sm text-gray-500 ml-2">({highCompleted} terminées)</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Priorité moyenne</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold">{mediumPriorityTasks.length}</span>
                  <span className="text-sm text-gray-500 ml-2">({mediumCompleted} terminées)</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Basse priorité</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold">{lowPriorityTasks.length}</span>
                  <span className="text-sm text-gray-500 ml-2">({lowCompleted} terminées)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-bold">Échéances</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-red-800">En retard</p>
                  <p className="text-sm text-red-600">Tâches dépassées</p>
                </div>
                <span className="text-2xl font-bold text-red-600">{overdueTasks.length}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium text-orange-800">Cette semaine</p>
                  <p className="text-sm text-orange-600">À terminer sous 7 jours</p>
                </div>
                <span className="text-2xl font-bold text-orange-600">{thisWeekTasks.length}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-800">Terminées à temps</p>
                  <p className="text-sm text-blue-600">Respectant les délais</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">{completedTasks}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Évolution mensuelle */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-bold">Évolution mensuelle</h2>
          </div>
          
          <div className="space-y-4">
            {monthlyStats.map((stat, index) => {
              const completionRate = Math.round((stat.completed / stat.created) * 100)
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{stat.month}</span>
                    <div className="text-sm text-gray-600">
                      {stat.completed}/{stat.created} tâches ({completionRate}%)
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Insights et recommandations */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Insights et recommandations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-green-600">Points forts</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Taux de completion de {completionRate}% - Excellent travail !</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Bonne gestion des tâches de priorité moyenne</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Régularité dans la création de nouvelles tâches</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-orange-600">Axes d\'amélioration</h3>
              <ul className="space-y-2 text-sm">
                {overdueTasks.length > 0 && (
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-500">!</span>
                    <span>Attention aux {overdueTasks.length} tâche(s) en retard</span>
                  </li>
                )}
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500">!</span>
                  <span>Planifier plus de temps pour les tâches haute priorité</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500">!</span>
                  <span>Considérer diviser les tâches complexes en sous-tâches</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatsPage