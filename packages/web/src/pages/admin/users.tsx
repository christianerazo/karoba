import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { TrashIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline';

// Configuración de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  country: string;
  city: string;
  interests: string[];
  newsletter: boolean;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== id));
        alert('Usuario eliminado exitosamente');
      } else {
        alert('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error al eliminar usuario');
    }
  };

  const viewUser = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando usuarios...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Administración de Usuarios - Karoba</title>
        <meta name="description" content="Panel de administración de usuarios registrados en Karoba Wellness Travel Colombia" />
        <link rel="icon" href="/images/karoba-logo.jpeg" />
      </Head>
      
      <Layout>
        <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-gold-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="mb-8 fade-in-up">
              <h1 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                Administración de Usuarios
              </h1>
              <p className="text-gray-600">
                Gestiona los usuarios registrados en la plataforma Karoba
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                  <span className="text-sm text-gray-600">Total de usuarios:</span>
                  <span className="ml-2 font-bold text-gold-600">{users.length}</span>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                  <span className="text-sm text-gray-600">Activos:</span>
                  <span className="ml-2 font-bold text-blue-600">
                    {users.filter(user => user.isActive).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabla de Usuarios */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden fade-in-up">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gold-500 to-gold-600">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Contacto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Ubicación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Registro
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-bold">
                              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {user.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.city}</div>
                          <div className="text-sm text-gray-500">{user.country}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(user.createdAt)}
                          </div>
                          <div className="flex items-center mt-1">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.isActive 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.isActive ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => viewUser(user)}
                              className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                              title="Ver detalles"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-dark-600 hover:text-dark-900 p-2 rounded-lg hover:bg-dark-50 transition-colors"
                              title="Eliminar usuario"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {users.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">No hay usuarios registrados</div>
                  <p className="text-gray-400 mt-2">Los nuevos registros aparecerán aquí</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Modal de Detalles */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-dark-900">Detalles del Usuario</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                      <p className="text-gray-900">{selectedUser.firstName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Apellido</label>
                      <p className="text-gray-900">{selectedUser.lastName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{selectedUser.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                      <p className="text-gray-900">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Nacimiento</label>
                      <p className="text-gray-900">{new Date(selectedUser.birthDate).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">País</label>
                      <p className="text-gray-900">{selectedUser.country}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Ciudad</label>
                      <p className="text-gray-900">{selectedUser.city}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Newsletter</label>
                      <p className="text-gray-900">{selectedUser.newsletter ? 'Sí' : 'No'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Intereses</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gold-100 text-gold-800 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Registro</label>
                      <p className="text-gray-900">{formatDate(selectedUser.createdAt)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Última Actualización</label>
                      <p className="text-gray-900">{formatDate(selectedUser.updatedAt)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn-secondary px-6 py-2"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}