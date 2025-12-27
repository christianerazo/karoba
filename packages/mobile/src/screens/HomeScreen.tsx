import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Función temporal para formatear moneda
const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

const { width } = Dimensions.get('window');

// Mock data
const featuredDestinations = [
  {
    id: '1',
    name: 'Hotel Paradise Barcelona',
    city: 'Barcelona',
    country: 'España',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
    rating: 4.8,
    price: 150,
    currency: 'EUR'
  },
  {
    id: '2',
    name: 'Resort Tropical Cancún',
    city: 'Cancún',
    country: 'México',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
    rating: 4.6,
    price: 200,
    currency: 'USD'
  }
];

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>¡Hola!</Text>
            <Text style={styles.subtitle}>¿A dónde quieres viajar?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={32} color="#3b82f6" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6b7280" />
          <Text style={styles.searchText}>Buscar destinos...</Text>
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {[
                { name: 'Hoteles', icon: 'bed-outline' },
                { name: 'Restaurantes', icon: 'restaurant-outline' },
                { name: 'Atracciones', icon: 'camera-outline' },
                { name: 'Actividades', icon: 'bicycle-outline' },
              ].map((category, index) => (
                <TouchableOpacity key={index} style={styles.categoryItem}>
                  <View style={styles.categoryIcon}>
                    <Ionicons name={category.icon as any} size={24} color="#3b82f6" />
                  </View>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Featured Destinations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Destinos Destacados</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.destinationsContainer}>
              {featuredDestinations.map((destination) => (
                <TouchableOpacity
                  key={destination.id}
                  style={styles.destinationCard}
                  onPress={() => navigation.navigate('DestinationDetail', { id: destination.id })}
                >
                  <Image source={{ uri: destination.image }} style={styles.destinationImage} />
                  <View style={styles.destinationInfo}>
                    <Text style={styles.destinationName} numberOfLines={1}>
                      {destination.name}
                    </Text>
                    <Text style={styles.destinationLocation}>
                      {destination.city}, {destination.country}
                    </Text>
                    <View style={styles.destinationFooter}>
                      <View style={styles.rating}>
                        <Ionicons name="star" size={14} color="#fbbf24" />
                        <Text style={styles.ratingText}>{destination.rating}</Text>
                      </View>
                      <Text style={styles.price}>
                        {formatCurrency(destination.price, destination.currency)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#eff6ff',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  destinationsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  destinationCard: {
    width: width * 0.7,
    backgroundColor: 'white',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  destinationImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  destinationInfo: {
    padding: 16,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  destinationLocation: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  destinationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
});