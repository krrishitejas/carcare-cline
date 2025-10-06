import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {Garage} from '../types';

const {width, height} = Dimensions.get('window');

const LocatorScreen = ({navigation}: any) => {
  const [garages, setGarages] = useState<Garage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [region, setRegion] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    loadGarages();
  }, []);

  const loadGarages = async () => {
    // Mock data for demonstration
    const mockGarages: Garage[] = [
      {
        id: '1',
        name: 'AutoShine Center',
        address: '123 Main St, New York, NY',
        latitude: 40.7128,
        longitude: -74.0060,
        rating: 4.8,
        totalReviews: 125,
        services: ['car_wash', 'detailing'],
        distance: '0.8 miles',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Premium Auto Care',
        address: '456 Broadway, New York, NY',
        latitude: 40.7138,
        longitude: -74.0070,
        rating: 4.6,
        totalReviews: 89,
        services: ['oil_change', 'maintenance', 'repairs'],
        distance: '1.2 miles',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        name: 'Quick Lube Express',
        address: '789 Park Ave, New York, NY',
        latitude: 40.7148,
        longitude: -74.0080,
        rating: 4.3,
        totalReviews: 156,
        services: ['oil_change', 'quick_service'],
        distance: '1.5 miles',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    setGarages(mockGarages);
  };

  const filterGarages = () => {
    let filtered = garages;
    
    if (selectedFilter !== 'all') {
      filtered = garages.filter(garage =>
        garage.services.some(service => service.includes(selectedFilter))
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(garage =>
        garage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        garage.services.some(service =>
          service.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    return filtered;
  };

  const handleMarkerPress = (garage: Garage) => {
    Alert.alert(
      garage.name,
      `Rating: ${garage.rating} ⭐\nDistance: ${garage.distance}\nServices: ${garage.services.join(', ')}`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Get Directions', onPress: () => getDirections(garage)},
        {text: 'View Details', onPress: () => viewGarageDetails(garage)},
      ]
    );
  };

  const getDirections = (garage: Garage) => {
    // In a real app, this would open the native maps app
    Alert.alert('Directions', `Opening directions to ${garage.name}`);
  };

  const viewGarageDetails = (garage: Garage) => {
    navigation.navigate('GarageDetails', {garageId: garage.id});
  };

  const filters = [
    {key: 'all', label: 'All'},
    {key: 'car_wash', label: 'Car Wash'},
    {key: 'oil_change', label: 'Oil Change'},
    {key: 'repairs', label: 'Repairs'},
    {key: 'maintenance', label: 'Maintenance'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Garage Locator</Text>
        <TouchableOpacity onPress={() => setRegion({...region})}>
          <Text style={styles.locationButton}>📍</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for services or dealers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterChip,
              selectedFilter === filter.key && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(filter.key)}>
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.key && styles.filterTextActive,
              ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}>
          {filterGarages().map(garage => (
            <Marker
              key={garage.id}
              coordinate={{
                latitude: garage.latitude,
                longitude: garage.longitude,
              }}
              title={garage.name}
              description={`${garage.rating} ⭐ • ${garage.distance}`}
              onPress={() => handleMarkerPress(garage)}
            />
          ))}
        </MapView>
      </View>

      {/* Garage List */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Nearby Garages</Text>
          <Text style={styles.listCount}>
            {filterGarages().length} found
          </Text>
        </View>
        
        <ScrollView style={styles.garageList}>
          {filterGarages().map(garage => (
            <TouchableOpacity
              key={garage.id}
              style={styles.garageCard}
              onPress={() => viewGarageDetails(garage)}>
              <View style={styles.garageInfo}>
                <Text style={styles.garageName}>{garage.name}</Text>
                <Text style={styles.garageAddress}>{garage.address}</Text>
                <View style={styles.garageDetails}>
                  <Text style={styles.garageRating}>
                    {garage.rating} ⭐ ({garage.totalReviews} reviews)
                  </Text>
                  <Text style={styles.garageDistance}>{garage.distance}</Text>
                </View>
                <View style={styles.servicesTags}>
                  {garage.services.slice(0, 3).map(service => (
                    <View key={service} style={styles.serviceTag}>
                      <Text style={styles.serviceTagText}>
                        {service.replace('_', ' ')}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => viewGarageDetails(garage)}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#0A2342',
  },
  backButton: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationButton: {
    fontSize: 24,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchInput: {
    height: 44,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  filterChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#D72638',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  mapContainer: {
    height: height * 0.35,
  },
  map: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  listCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  garageList: {
    flex: 1,
  },
  garageCard: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  garageInfo: {
    flex: 1,
  },
  garageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  garageAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  garageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  garageRating: {
    fontSize: 14,
    color: '#374151',
  },
  garageDistance: {
    fontSize: 14,
    color: '#6B7280',
  },
  servicesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceTag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  serviceTagText: {
    fontSize: 12,
    color: '#1D4ED8',
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: '#D72638',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'center',
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LocatorScreen;