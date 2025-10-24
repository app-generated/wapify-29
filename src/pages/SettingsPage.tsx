import { useState } from 'react'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { User, Bell, Shield, Database, Download, Upload } from 'lucide-react'

interface UserSettings {
  name: string
  email: string
  avatar: string
  timezone: string
  language: string
}

interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  taskReminders: boolean
  weeklyReport: boolean
  dueDateAlerts: boolean
}

interface AppSettings {
  theme: 'light' | 'dark' | 'system'
  defaultPriority: 'low' | 'medium' | 'high'
  autoArchive: boolean
  showCompletedTasks: boolean
  taskSortOrder: 'dueDate' | 'priority' | 'created' | 'alphabetical'
}

function SettingsPage() {
  const [userSettings, setUserSettings] = useState<UserSettings>({
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    avatar: '',
    timezone: 'Europe/Paris',
    language: 'fr'
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    weeklyReport: true,
    dueDateAlerts: true
  })

  const [appSettings, setAppSettings] = useState<AppSettings>({
    theme: 'light',
    defaultPriority: 'medium',
    autoArchive: false,
    showCompletedTasks: true,
    taskSortOrder: 'dueDate'
  })

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'preferences' | 'data'>('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulation d'une sauvegarde
    setTimeout(() => {
      setIsLoading(false)
      setMessage('Profil mis à jour avec succès !')
      setTimeout(() => setMessage(''), 3000)
    }, 1000)
  }

  const handleSaveNotifications = () => {
    setMessage('Paramètres de notifications sauvegardés !')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleSavePreferences = () => {
    setMessage('Préférences mises à jour !')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleExportData = () => {
    // Simulation d'export de données
    const data = {
      userSettings,
      notificationSettings,
      appSettings,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'taskflow-settings.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setMessage('Données exportées avec succès !')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        if (data.userSettings) setUserSettings(data.userSettings)
        if (data.notificationSettings) setNotificationSettings(data.notificationSettings)
        if (data.appSettings) setAppSettings(data.appSettings)
        
        setMessage('Données importées avec succès !')
        setTimeout(() => setMessage(''), 3000)
      } catch (error) {
        setMessage('Erreur lors de l\'importation des données')
        setTimeout(() => setMessage(''), 3000)
      }
    }
    reader.readAsText(file)
  }

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'preferences', name: 'Préférences', icon: Shield },
    { id: 'data', name: 'Données', icon: Database }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres</h1>
        <p className="text-gray-600">Personnalisez votre expérience TaskFlow</p>
      </div>

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {message}
        </div>
      )}

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          )
        })}
      </div>

      {activeTab === 'profile' && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Informations du profil</h2>
            
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <Input
                    type="text"
                    value={userSettings.name}
                    onChange={(e) => setUserSettings({ ...userSettings, name: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fuseau horaire
                  </label>
                  <select
                    value={userSettings.timezone}
                    onChange={(e) => setUserSettings({ ...userSettings, timezone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                    <option value="Europe/London">Europe/London (GMT+0)</option>
                    <option value="America/New_York">America/New_York (GMT-5)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Langue
                  </label>
                  <select
                    value={userSettings.language}
                    onChange={(e) => setUserSettings({ ...userSettings, language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              </div>
              
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Sauvegarde...' : 'Sauvegarder le profil'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === 'notifications' && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Paramètres de notifications</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notifications par email</h3>
                  <p className="text-sm text-gray-600">Recevoir des emails pour les mises à jour importantes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => setNotificationSettings({ 
                      ...notificationSettings, 
                      emailNotifications: e.target.checked 
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notifications push</h3>
                  <p className="text-sm text-gray-600">Recevoir des notifications sur votre navigateur</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) => setNotificationSettings({ 
                      ...notificationSettings, 
                      pushNotifications: e.target.checked 
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Rappels de tâches</h3>
                  <p className="text-sm text-gray-600">Être rappelé des tâches importantes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.taskReminders}
                    onChange={(e) => setNotificationSettings({ 
                      ...notificationSettings, 
                      taskReminders: e.target.checked 
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Rapport hebdomadaire</h3>
                  <p className="text-sm text-gray-600">Recevoir un résumé de votre productivité chaque semaine</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.weeklyReport}
                    onChange={(e) => setNotificationSettings({ 
                      ...notificationSettings, 
                      weeklyReport: e.target.checked 
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Alertes d\'échéance</h3>
                  <p className="text-sm text-gray-600">Être alerté quand une tâche approche de sa date limite</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.dueDateAlerts}
                    onChange={(e) => setNotificationSettings({ 
                      ...notificationSettings, 
                      dueDateAlerts: e.target.checked 
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <Button onClick={handleSaveNotifications} className="mt-6">
              Sauvegarder les notifications
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'preferences' && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Préférences de l\'application</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thème de l\'interface
                </label>
                <select
                  value={appSettings.theme}
                  onChange={(e) => setAppSettings({ 
                    ...appSettings, 
                    theme: e.target.value as 'light' | 'dark' | 'system' 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">Clair</option>
                  <option value="dark">Sombre</option>
                  <option value="system">Automatique (système)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priorité par défaut des nouvelles tâches
                </label>
                <select
                  value={appSettings.defaultPriority}
                  onChange={(e) => setAppSettings({ 
                    ...appSettings, 
                    defaultPriority: e.target.value as 'low' | 'medium' | 'high' 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Basse</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordre de tri des tâches
                </label>
                <select
                  value={appSettings.taskSortOrder}
                  onChange={(e) => setAppSettings({ 
                    ...appSettings, 
                    taskSortOrder: e.target.value as any 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="dueDate">Par date d\'échéance</option>
                  <option value="priority">Par priorité</option>
                  <option value="created">Par date de création</option>
                  <option value="alphabetical">Par ordre alphabétique</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Archivage automatique</h3>
                  <p className="text-sm text-gray-600">Archiver automatiquement les tâches terminées après 30 jours</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={appSettings.autoArchive}
                    onChange={(e) => setAppSettings({ 
                      ...appSettings, 
                      autoArchive: e.target.checked 
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Afficher les tâches terminées</h3>
                  <p className="text-sm text-gray-600">Continuer à afficher les tâches terminées dans la liste</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={appSettings.showCompletedTasks}
                    onChange={(e) => setAppSettings({ 
                      ...appSettings, 
                      showCompletedTasks: e.target.checked 
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <Button onClick={handleSavePreferences} className="mt-6">
              Sauvegarder les préférences
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'data' && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Gestion des données</h2>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Exporter mes données</span>
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Téléchargez toutes vos données TaskFlow dans un fichier JSON pour sauvegarde ou migration.
                </p>
                <Button onClick={handleExportData} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter les données
                </Button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Importer des données</span>
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Restaurez vos paramètres depuis un fichier de sauvegarde TaskFlow.
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                    id="import-file"
                  />
                  <label htmlFor="import-file">
                    <Button variant="outline" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Choisir un fichier
                    </Button>
                  </label>
                </div>
              </div>
              
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h3 className="font-semibold mb-2 text-red-800">Zone de danger</h3>
                <p className="text-sm text-red-600 mb-3">
                  Ces actions sont irréversibles. Assurez-vous d\'avoir une sauvegarde avant de continuer.
                </p>
                <div className="space-y-2">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes vos tâches ? Cette action est irréversible.')) {
                        setMessage('Toutes les tâches ont été supprimées.')
                        setTimeout(() => setMessage(''), 3000)
                      }
                    }}
                  >
                    Supprimer toutes les tâches
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      if (window.confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ? Cette action est irréversible.')) {
                        setUserSettings({
                          name: 'Jean Dupont',
                          email: 'jean.dupont@email.com',
                          avatar: '',
                          timezone: 'Europe/Paris',
                          language: 'fr'
                        })
                        setNotificationSettings({
                          emailNotifications: true,
                          pushNotifications: false,
                          taskReminders: true,
                          weeklyReport: true,
                          dueDateAlerts: true
                        })
                        setAppSettings({
                          theme: 'light',
                          defaultPriority: 'medium',
                          autoArchive: false,
                          showCompletedTasks: true,
                          taskSortOrder: 'dueDate'
                        })
                        setMessage('Tous les paramètres ont été réinitialisés.')
                        setTimeout(() => setMessage(''), 3000)
                      }
                    }}
                  >
                    Réinitialiser tous les paramètres
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default SettingsPage