import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EcoEventsScreen() {
  const [selectedView, setSelectedView] = useState('map');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  console.log('Safe Area Insets:', insets);

  const events = [
    {
      id: 1,
      title: "Beach Cleanup Drive",
      location: "Seaside Park",
      date: "Tomorrow",
      time: "9:00 AM",
      participants: 24,
      maxParticipants: 30,
      points: 50,
      difficulty: "Easy",
      category: "cleanup",
      description: "Join us for a morning beach cleanup to protect marine life and keep our shores beautiful.",
      requirements: ["Bring gloves", "Water bottle", "Sun protection"],
      latitude: 50.0614,
      longitude: 19.9380
    },
    {
      id: 2,
      title: "Community Tree Planting",
      location: "Central Park",
      date: "This Weekend",
      time: "8:00 AM",
      participants: 15,
      maxParticipants: 20,
      points: 75,
      difficulty: "Medium",
      category: "planting",
      description: "Help us plant native trees to improve air quality and create green spaces for wildlife.",
      requirements: ["Comfortable clothes", "Work gloves provided", "Breakfast included"],
      latitude: 50.0647,
      longitude: 19.9450
    },
    {
      id: 3,
      title: "Recycling Workshop",
      location: "Community Center",
      date: "Next Week",
      time: "2:00 PM",
      participants: 8,
      maxParticipants: 15,
      points: 30,
      difficulty: "Easy",
      category: "education",
      description: "Learn creative ways to upcycle everyday items and reduce household waste.",
      requirements: ["Bring old items to upcycle", "Notebook"],
      latitude: 50.0580,
      longitude: 19.9320
    },
    {
      id: 4,
      title: "Urban Gardening Meetup",
      location: "City Rooftop",
      date: "Next Month",
      time: "10:00 AM",
      participants: 12,
      maxParticipants: 20,
      points: 40,
      difficulty: "Medium",
      category: "gardening",
      description: "Connect with fellow urban gardeners and share tips on growing food in small spaces.",
      requirements: ["Notebook", "Gardening gloves"],
      latitude: 50.0611,
      longitude: 19.9375
    }
  ];

  const EventCard = ({ event, onPress }: any) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => onPress(event)}
      activeOpacity={0.8}
    >
      <View style={styles.eventCardHeader}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <View style={styles.eventLocation}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.eventLocationText}>{event.location}</Text>
          </View>
          <View style={styles.eventDate}>
            <Ionicons name="calendar-outline" size={14} color="#666" />
            <Text style={styles.eventDateText}>{event.date} • {event.time}</Text>
          </View>
        </View>
        <View style={styles.eventMeta}>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>+{event.points} pts</Text>
          </View>
          <View style={[
            styles.difficultyBadge,
            event.difficulty === 'Easy' ? styles.difficultyEasy :
              event.difficulty === 'Medium' ? styles.difficultyMedium :
                styles.difficultyHard
          ]}>
            <Text style={[
              styles.difficultyText,
              event.difficulty === 'Easy' ? styles.difficultyEasyText :
                event.difficulty === 'Medium' ? styles.difficultyMediumText :
                  styles.difficultyHardText
            ]}>{event.difficulty}</Text>
          </View>
        </View>
      </View>

      <View style={styles.eventFooter}>
        <View style={styles.participants}>
          <Ionicons name="people-outline" size={14} color="#666" />
          <Text style={styles.participantsText}>
            {event.participants}/{event.maxParticipants} joined
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#ccc" />
      </View>

      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${(event.participants / event.maxParticipants) * 100}%` }
          ]}
        />
      </View>
    </TouchableOpacity>
  );

  const MapView = () => (
    <View style={styles.mapContainer}>
      <View style={styles.mapBackground}>
        <View style={styles.mapContent}>
          <Ionicons name="map-outline" size={48} color="#22c55e" />
          <Text style={styles.mapTitle}>Interactive Map</Text>
          <Text style={styles.mapSubtitle}>Tap markers to view events</Text>
        </View>

        <TouchableOpacity style={[styles.mapMarker, { top: 48, left: 64 }]}>
          <View style={styles.markerInner} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.mapMarker, { top: 80, right: 80 }]}>
          <View style={styles.markerInner} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.mapMarker, { bottom: 64, left: 48 }]}>
          <View style={styles.markerInner} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const EventDetailModal = ({ event, visible, onClose }: any) => (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{event?.title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          <View style={styles.eventDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="location" size={18} color="#22c55e" />
              <Text style={styles.detailText}>{event?.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="calendar" size={18} color="#22c55e" />
              <Text style={styles.detailText}>{event?.date} at {event?.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="people" size={18} color="#22c55e" />
              <Text style={styles.detailText}>
                {event?.participants} of {event?.maxParticipants} participants
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="trophy" size={18} color="#22c55e" />
              <Text style={styles.detailText}>Earn {event?.points} eco points</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this event</Text>
            <Text style={styles.sectionText}>{event?.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What to bring</Text>
            {event?.requirements.map((req: any, index: any) => (
              <Text key={index} style={styles.requirementText}>• {req}</Text>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Event</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );

  const openEventDetail = (event: any) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeEventDetail = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <LinearGradient colors={['#66BB6A', '#4CAF50']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#22c55e" />

        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Local Events</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="search" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="filter" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedView === 'map' && styles.activeTab]}
              onPress={() => setSelectedView('map')}
            >
              <Text style={[styles.tabText, selectedView === 'map' && styles.activeTabText]}>
                Map View
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedView === 'list' && styles.activeTab]}
              onPress={() => setSelectedView('list')}
            >
              <Text style={[styles.tabText, selectedView === 'list' && styles.activeTabText]}>
                List View
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={[styles.content, { marginBottom: insets.bottom + 16 }]} showsVerticalScrollIndicator={false}>
          {selectedView === 'map' && <MapView />}

          <View style={styles.eventsSection}>
            <Text style={styles.sectionHeader}>Upcoming Events</Text>
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onPress={openEventDetail}
              />
            ))}
          </View>
        </ScrollView>

        <EventDetailModal
          event={selectedEvent}
          visible={modalVisible}
          onClose={closeEventDetail}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#22c55e',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  mapContainer: {
    marginBottom: 16,
  },
  mapBackground: {
    backgroundColor: '#dcfce7',
    borderRadius: 16,
    height: 200,
    position: 'relative',
    overflow: 'hidden',
  },
  mapContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapTitle: {
    color: '#15803d',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 8,
  },
  mapSubtitle: {
    color: '#22c55e',
    fontSize: 14,
    marginTop: 4,
  },
  mapMarker: {
    position: 'absolute',
    width: 24,
    height: 24,
    backgroundColor: '#22c55e',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerInner: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  eventsSection: {
    marginTop: 8,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  eventLocationText: {
    color: '#6b7280',
    fontSize: 14,
    marginLeft: 4,
  },
  eventDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDateText: {
    color: '#6b7280',
    fontSize: 14,
    marginLeft: 4,
  },
  eventMeta: {
    alignItems: 'flex-end',
  },
  pointsBadge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  pointsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  difficultyEasy: {
    backgroundColor: '#dcfce7',
  },
  difficultyMedium: {
    backgroundColor: '#fef3c7',
  },
  difficultyHard: {
    backgroundColor: '#fee2e2',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyEasyText: {
    color: '#15803d',
  },
  difficultyMediumText: {
    color: '#d97706',
  },
  difficultyHardText: {
    color: '#dc2626',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    color: '#6b7280',
    fontSize: 14,
    marginLeft: 4,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  eventDetails: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    color: '#4b5563',
    fontSize: 16,
    marginLeft: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  sectionText: {
    color: '#6b7280',
    fontSize: 16,
    lineHeight: 24,
  },
  requirementText: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 4,
  },
  joinButton: {
    backgroundColor: '#22c55e',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});