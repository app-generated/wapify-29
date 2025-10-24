import { useState } from 'react'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Plus, Search, Filter, Edit, Trash, Check, X } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  createdAt: string
}

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Terminer le rapport mensuel',
      description: 'Finaliser le rapport de performance du mois de décembre avec les métriques clés',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-15',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Préparer la présentation client',
      description: 'Créer les slides pour la présentation du nouveau produit au client ABC',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-14',
      createdAt: '2024-01-09'
    },
    {
      id: '3',
      title: 'Réviser le code de l\'API',
      description: 'Code review des nouvelles fonctionnalités de l\'API utilisateur',
      completed: true,
      priority: 'medium',
      dueDate: '2024-01-13',
      createdAt: '2024-01-08'
    },
    {
      id: '4',
      title: 'Organiser la réunion équipe',
      description: 'Planifier et organiser la réunion hebdomadaire de l\'équipe développement',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-16',
      createdAt: '2024-01-11'
    },
    {
      id: '5',
      title: 'Mettre à jour la documentation',
      description: 'Actualiser la documentation technique du projet avec les dernières modifications',
      completed: false,
      priority: 'low',
      dueDate: '2024-01-20',
      createdAt: '2024-01-12'
    },
    {
      id: '6',
      title: 'Tester les nouvelles fonctionnalités',
      description: 'Tests complets des fonctionnalités développées cette semaine',
      completed: true,
      priority: 'high',
      dueDate: '2024-01-12',
      createdAt: '2024-01-07'
    },
    {
      id: '7',
      title: 'Optimiser les performances',
      description: 'Analyser et améliorer les performances de l\'application web',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-18',
      createdAt: '2024-01-10'
    },
    {
      id: '8',
      title: 'Backup des données',
      description: 'Effectuer la sauvegarde mensuelle de toutes les données critiques',
      completed: true,
      priority: 'low',
      dueDate: '2024-01-11',
      createdAt: '2024-01-06'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: ''
  })

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'pending' && !task.completed)
    
    return matchesSearch && matchesPriority && matchesStatus
  })

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.title.trim()) return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      createdAt: new Date().toISOString().split('T')[0]
    }

    setTasks([task, ...tasks])
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' })
    setShowAddForm(false)
  }

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  const handleEditTask = (id: string) => {
    setEditingTask(id)
  }

  const handleSaveEdit = (id: string, updatedData: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedData } : task
    ))
    setEditingTask(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Mes Tâches</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nouvelle tâche</span>
        </Button>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre de la tâche
                </label>
                <Input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Entrez le titre de la tâche"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Description de la tâche (optionnelle)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priorité
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date d\'échéance
                  </label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit">Créer la tâche</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>Annuler</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher des tâches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les priorités</option>
              <option value="high">Haute priorité</option>
              <option value="medium">Priorité moyenne</option>
              <option value="low">Basse priorité</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En cours</option>
              <option value="completed">Terminées</option>
            </select>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              <span>{filteredTasks.length} tâche(s) trouvée(s)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-6">
              {editingTask === task.id ? (
                <TaskEditForm 
                  task={task} 
                  onSave={(updatedData) => handleSaveEdit(task.id, updatedData)}
                  onCancel={() => setEditingTask(null)}
                />
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <button
                      onClick={() => handleToggleComplete(task.id)}
                      className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        task.completed 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {task.completed && <Check className="h-3 w-3" />}
                    </button>
                    
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-2 ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </h3>
                      
                      {task.description && (
                        <p className={`text-gray-600 mb-3 ${
                          task.completed ? 'line-through' : ''
                        }`}>
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`px-2 py-1 rounded-full ${
                          task.priority === 'high' 
                            ? 'bg-red-100 text-red-800'
                            : task.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                        </span>
                        
                        {task.dueDate && (
                          <span className="text-gray-500">
                            Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                          </span>
                        )}
                        
                        <span className="text-gray-400">
                          Créée le {new Date(task.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditTask(task.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {filteredTasks.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">Aucune tâche trouvée avec les filtres actuels.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

interface TaskEditFormProps {
  task: Task
  onSave: (updatedData: Partial<Task>) => void
  onCancel: () => void
}

function TaskEditForm({ task, onSave, onCancel }: TaskEditFormProps) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Titre de la tâche"
          required
        />
      </div>
      
      <div>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Basse</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
        </select>
        
        <Input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
      </div>
      
      <div className="flex space-x-2">
        <Button type="submit" size="sm">
          <Check className="h-4 w-4 mr-1" />
          Sauvegarder
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          <X className="h-4 w-4 mr-1" />
          Annuler
        </Button>
      </div>
    </form>
  )
}

export default TasksPage