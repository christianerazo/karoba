import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  UsersIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

// Configuración de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate?: string;
  interests: string[];
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  birthDate?: string;
  interests: string[];
}

export default function AdminDashboard() {
  const { user, token, isAuthenticated, isLoading: authLoading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  
  // Estado para WhatsApp
  const [isTestingWhatsApp, setIsTestingWhatsApp] = useState(false);
  const [whatsappTestResult, setWhatsappTestResult] = useState<string>('');
  
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    birthDate: '',
    interests: []
  });

  // Verificar permisos de admin
  useEffect(() => {
    // Esperar a que termine la carga de autenticación
    if (authLoading) return;
    
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (user?.email !== 'admin@karoba.com') {
      router.push('/');
      return;
    }
    
    fetchUsers();
  }, [isAuthenticated, user, router, currentPage, authLoading]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(''); // Limpiar errores previos
      
      console.log('🔍 Obteniendo usuarios...', { API_URL, token: token ? 'presente' : 'ausente' });
      
      const response = await fetch(`${API_URL}/api/users?page=${currentPage}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 Respuesta del servidor:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Datos recibidos:', data);
        
        if (data.success && data.data) {
          setUsers(data.data.users || []);
          setTotalPages(data.data.pagination?.totalPages || 1);
          setTotalUsers(data.data.pagination?.total || 0);
        } else {
          setError('Formato de respuesta inválido del servidor');
          console.error('❌ Formato de respuesta inválido:', data);
        }
      } else {
        const errorText = await response.text();
        console.error('❌ Error del servidor:', response.status, errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          setError(errorData.error || errorData.message || `Error del servidor: ${response.status}`);
        } catch (e) {
          setError(`Error del servidor: ${response.status} - ${response.statusText}`);
        }
      }
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      setError(`Error de conexión: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowModal(false);
        resetForm();
        fetchUsers();
      } else {
        const data = await response.json();
        setError(data.error || t('admin.error.create'));
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser) return;
    
    try {
      const updateData: any = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }
      
      const response = await fetch(`${API_URL}/api/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        setShowModal(false);
        resetForm();
        fetchUsers();
      } else {
        const data = await response.json();
        setError(data.error || 'Error al actualizar usuario');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        fetchUsers();
      } else {
        const data = await response.json();
        setError(data.error || t('admin.error.delete'));
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const openModal = (mode: 'create' | 'edit' | 'view', user?: User) => {
    setModalMode(mode);
    setSelectedUser(user || null);
    
    if (user && (mode === 'edit' || mode === 'view')) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: '',
        birthDate: user.birthDate || '',
        interests: user.interests || []
      });
    } else {
      resetForm();
    }
    
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      birthDate: '',
      interests: []
    });
  };

  // Función para probar WhatsApp
  const testWhatsApp = async () => {
    try {
      setIsTestingWhatsApp(true);
      setWhatsappTestResult('');
      
      const response = await fetch(`${API_URL}/api/notifications/test-whatsapp`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setWhatsappTestResult('✅ Mensaje de prueba enviado exitosamente a WhatsApp');
      } else {
        setWhatsappTestResult(`❌ Error: ${data.error || 'No se pudo enviar el mensaje'}`);
      }
    } catch (error) {
      setWhatsappTestResult('❌ Error de conexión al probar WhatsApp');
    } finally {
      setIsTestingWhatsApp(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mostrar loading mientras se verifica la autenticación
  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gold-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Verificando permisos...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Verificar si es admin después de que termine la carga
  if (!isAuthenticated || user?.email !== 'admin@karoba.com') {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gold-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
            <p className="text-gray-600 mb-4">No tienes permisos para acceder a esta página.</p>
            <button 
              onClick={() => router.push('/')}
              className="btn-primary"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Panel de Administración - Karoba Wellness Travel</title>
        <meta name="description" content="Panel de administración para gestionar usuarios" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gold-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-dark-900 mb-2">
                    👑 Panel de Administración
                  </h1>
                  <p className="text-gray-600">
                    Gestiona usuarios de Karoba Wellness Travel
                  </p>
                </div>
                
                <button
                  onClick={() => openModal('create')}
                  className="btn-primary flex items-center space-x-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Nuevo Usuario</span>
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gold-200/50">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <UsersIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                      <p className="text-2xl font-bold text-dark-900">{totalUsers}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gold-200/50">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Usuarios Activos</p>
                      <p className="text-2xl font-bold text-dark-900">
                        {users.filter(u => u.isActive).length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gold-200/50">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                      <span className="text-gold-600 font-bold">👑</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Administradores</p>
                      <p className="text-2xl font-bold text-dark-900">1</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Test Section */}
              <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">Notificaciones WhatsApp</h3>
                      <p className="text-sm text-green-600">Probar el servicio de notificaciones automáticas</p>
                    </div>
                  </div>
                  <button
                    onClick={testWhatsApp}
                    disabled={isTestingWhatsApp}
                    className="btn-primary bg-green-600 hover:bg-green-700 flex items-center space-x-2"
                  >
                    {isTestingWhatsApp ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <span>📱</span>
                        <span>Probar WhatsApp</span>
                      </>
                    )}
                  </button>
                </div>
                
                {whatsappTestResult && (
                  <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                    <p className="text-sm text-gray-700">{whatsappTestResult}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      📞 Número de destino: +57 314 621 8506
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-red-500 text-xl">⚠️</span>
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-red-800">Error en el Panel de Administración</h3>
                    <p className="text-red-600 mt-1">{error}</p>
                    <div className="mt-3 text-xs text-red-500">
                      <p>💡 Posibles soluciones:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Verifica que el servidor API esté funcionando (puerto 3001)</li>
                        <li>Asegúrate de estar logueado como admin@karoba.com</li>
                        <li>Revisa que MySQL esté funcionando</li>
                        <li>Ejecuta: node setup-crud.js si es necesario</li>
                      </ul>
                    </div>
                  </div>
                  <button 
                    onClick={() => setError('')}
                    className="flex-shrink-0 text-red-500 hover:text-red-700 ml-4"
                  >
                    <span className="sr-only">{t('modal.close')}</span>
                    <span className="text-lg">×</span>
                  </button>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={fetchUsers}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    🔄 Reintentar
                  </button>
                  <button 
                    onClick={() => window.open('/api/health', '_blank')}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    🔍 Verificar API
                  </button>
                </div>
              </div>
            )}

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gold-200/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Teléfono
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registro
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          </div>
                        </td>
                      </tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          No se encontraron usuarios
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-gold-500 rounded-full flex items-center justify-center text-white font-bold">
                                {user.firstName.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.firstName} {user.lastName}
                                </div>
                                {user.email === 'admin@karoba.com' && (
                                  <div className="text-xs text-gold-600 font-semibold">
                                    👑 Administrador
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.isActive ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => openModal('view', user)}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                title="Ver detalles"
                              >
                                <EyeIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => openModal('edit', user)}
                                className="text-gold-600 hover:text-gold-900 p-1 rounded"
                                title="Editar"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              {user.email !== 'admin@karoba.com' && (
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-600 hover:text-red-900 p-1 rounded"
                                  title="Eliminar"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      {t('modal.previous')}
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      {t('modal.next')}
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Mostrando página <span className="font-medium">{currentPage}</span> de{' '}
                        <span className="font-medium">{totalPages}</span>
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          <ChevronLeftIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          <ChevronRightIcon className="h-5 w-5" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-dark-900">
                    {modalMode === 'create' && t('admin.user.create.new')}
                    {modalMode === 'edit' && t('admin.user.edit')}
                    {modalMode === 'view' && t('admin.user.details')}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={modalMode === 'create' ? handleCreateUser : handleUpdateUser}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="input"
                          required
                          disabled={modalMode === 'view'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Apellido *
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="input"
                          required
                          disabled={modalMode === 'view'}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="input"
                        required
                        disabled={modalMode === 'view'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="input"
                        required
                        disabled={modalMode === 'view'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña {modalMode === 'create' ? '*' : '(dejar vacío para no cambiar)'}
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="input"
                        required={modalMode === 'create'}
                        disabled={modalMode === 'view'}
                        placeholder={modalMode === 'edit' ? 'Nueva contraseña (opcional)' : ''}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de Nacimiento
                      </label>
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                        className="input"
                        disabled={modalMode === 'view'}
                      />
                    </div>

                    {modalMode === 'view' && selectedUser && (
                      <div className="space-y-2 pt-4 border-t border-gray-200">
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Estado:</span>
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            selectedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {selectedUser.isActive ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Registrado:</span>
                          <span className="ml-2 text-gray-600">
                            {new Date(selectedUser.createdAt).toLocaleString()}
                          </span>
                        </div>
                        {selectedUser.lastLogin && (
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Último acceso:</span>
                            <span className="ml-2 text-gray-600">
                              {new Date(selectedUser.lastLogin).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {modalMode !== 'view' && (
                    <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="btn-primary px-6 py-2 text-sm"
                      >
                        {modalMode === 'create' ? t('admin.user.create') : t('admin.user.update')}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}