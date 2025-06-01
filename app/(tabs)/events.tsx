import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EcoEventsScreen() {
  const [selectedView, setSelectedView] = useState<'map' | 'list'>('map');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [rewardVisible, setRewardVisible] = useState(false);

  const insets = useSafeAreaInsets();

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  const fileUri = FileSystem.documentDirectory + 'globux.json'
  const [globux, setGlobux] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (fileInfo.exists) {
          const content = await FileSystem.readAsStringAsync(fileUri);
          const parsed = JSON.parse(content);
          if (typeof parsed.globux === 'number') {
            setGlobux(parsed.globux);
          }
        }
      } catch (error) {
        console.error('Error loading currency:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    load();
  }, []);

  // Now just update the state when gaining globux; no file read here!
  const gainGlobux = (value : number) => {
    setGlobux(prev => prev + value);
  };

  // Save whenever globux changes, but only after initial load
  useEffect(() => {
    if (!isLoaded) return;

    const save = async () => {
      try {
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify({ globux }));
      } catch (error) {
        console.error('Error saving currency:', error);
      }
    };

    save();
  }, [globux, isLoaded]);



  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Beach Cleanup Drive',
      location: 'Seaside Park',
      date: 'Tomorrow',
      time: '9:00 AM',
      participants: 24,
      maxParticipants: 30,
      points: 50,
      difficulty: 'Easy',
      category: 'cleanup',
      description:
        'Join us for a morning beach cleanup to protect marine life and keep our shores beautiful.',
      requirements: ['Bring gloves', 'Water bottle', 'Sun protection'],
      latitude: 50.0614,
      longitude: 19.938,
    },
    {
      id: 2,
      title: 'Community Tree Planting',
      location: 'Central Park',
      date: 'This Weekend',
      time: '8:00 AM',
      participants: 15,
      maxParticipants: 20,
      points: 75,
      difficulty: 'Medium',
      category: 'planting',
      description:
        'Help us plant native trees to improve air quality and create green spaces for wildlife.',
      requirements: ['Comfortable clothes', 'Work gloves provided', 'Breakfast included'],
      latitude: 50.0647,
      longitude: 19.945,
    },
    {
      id: 3,
      title: 'Recycling Workshop',
      location: 'Community Center',
      date: 'Next Week',
      time: '2:00 PM',
      participants: 8,
      maxParticipants: 15,
      points: 30,
      difficulty: 'Easy',
      category: 'education',
      description: 'Learn creative ways to upcycle everyday items and reduce household waste.',
      requirements: ['Bring old items to upcycle', 'Notebook'],
      latitude: 50.058,
      longitude: 19.932,
    },
    {
      id: 4,
      title: 'Urban Gardening Meetup',
      location: 'City Rooftop',
      date: 'Next Month',
      time: '10:00 AM',
      participants: 12,
      maxParticipants: 20,
      points: 40,
      difficulty: 'Medium',
      category: 'gardening',
      description:
        'Connect with fellow urban gardeners and share tips on growing food in small spaces.',
      requirements: ['Notebook', 'Gardening gloves'],
      latitude: 50.0611,
      longitude: 19.9375,
    },
  ]);

  function deleteEvent(eventId: number) {
    setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
  }

  // Event Card Component
  const EventCard = ({ event, onPress }: { event: any; onPress: (event: any) => void }) => (
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
            <Text style={styles.eventDateText}>
              {event.date} • {event.time}
            </Text>
          </View>
        </View>
        <View style={styles.eventMeta}>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>+{event.points} pts</Text>
          </View>
          <View
            style={[
              styles.difficultyBadge,
              event.difficulty === 'Easy'
                ? styles.difficultyEasy
                : event.difficulty === 'Medium'
                  ? styles.difficultyMedium
                  : styles.difficultyHard,
            ]}
          >
            <Text
              style={[
                styles.difficultyText,
                event.difficulty === 'Easy'
                  ? styles.difficultyEasyText
                  : event.difficulty === 'Medium'
                    ? styles.difficultyMediumText
                    : styles.difficultyHardText,
              ]}
            >
              {event.difficulty}
            </Text>
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
            { width: `${(event.participants / event.maxParticipants) * 100}%` },
          ]}
        />
      </View>
    </TouchableOpacity>
  );

  // Map View placeholder
  const MapView = () => (
    <View style={styles.mapContainer}>
      <View style={styles.mapBackground}>
        <View style={styles.mapContent}>
          <Ionicons name="map-outline" size={48} color="#22c55e" />
          <Text style={styles.mapTitle}>Interactive Map</Text>
          <Text style={styles.mapSubtitle}>Tap markers to view events</Text>
        </View>

        <TouchableOpacity style={[styles.mapMarker, { top: 48, left: 64 }]} />
        <TouchableOpacity style={[styles.mapMarker, { top: 80, right: 80 }]} />
        <TouchableOpacity style={[styles.mapMarker, { bottom: 64, left: 48 }]} />
      </View>
    </View>
  );

  // Event Detail Modal
  const EventDetailModal = ({
    event,
    visible,
    onClose,
  }: {
    event: any;
    visible: boolean;
    onClose: () => void;
  }) => (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
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
              <Text style={styles.detailText}>
                {event?.date} at {event?.time}
              </Text>
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
            {event?.requirements.map((req: any, index: number) => (
              <Text key={index} style={styles.requirementText}>
                • {req}
              </Text>
            ))}
          </View>

          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => {
              onClose();
              goToReward(event);
            }}
          >
            <Ionicons name="leaf" size={20} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.joinButtonText}>Join Event</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  // Reward Screen
  const EventsReward = ({ event }: { event: any }) => {
    const handleReturnHome = () => {
      setRewardVisible(false);
      setSelectedEvent(null);
    };

    const handleViewDetails = () => {
      setRewardVisible(false);
      setSelectedEvent(event);
      setModalVisible(true);
    };

    return (
      <LinearGradient colors={['#66BB6A', '#4CAF50']} style={styles2.container}>
        <SafeAreaView style={styles2.safeArea}>
          <View style={styles2.header}>
            <Text style={styles2.headerTitle}>Event Joined!</Text>
            <TouchableOpacity style={styles2.closeButton} onPress={handleReturnHome}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles2.content}>
            <Animated.View
              style={[
                styles2.rewardCard,
                { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
              ]}
            >
              <View style={styles2.iconContainer}>
                <View style={styles2.coinCircle}>
                  <Ionicons name="leaf" size={40} color="#4CAF50" />
                </View>
              </View>

              <Text style={styles2.congratsText}>Thank you for joining!</Text>
              <Text style={styles2.eventTitle}>{event.title}</Text>

              <View style={styles2.rewardSection}>
                <View style={styles2.coinContainer}>
                  <Text style={styles2.coinAmount}>+{event.points}</Text>
                  <Text style={styles2.coinLabel}>Green Coins</Text>
                </View>
              </View>

              <View style={styles2.separator} />

              <View style={styles2.eventDetailsSection}>
                <Text style={styles2.detailsHeading}>Event Details:</Text>

                <View style={styles2.detailRow}>
                  <Ionicons name="calendar" size={18} color="#22c55e" />
                  <Text style={styles2.detailText}>
                    {event.date} at {event.time}
                  </Text>
                </View>

                <View style={styles2.detailRow}>
                  <Ionicons name="location" size={18} color="#22c55e" />
                  <Text style={styles2.detailText}>{event.location}</Text>
                </View>

                <View style={styles2.detailRow}>
                  <Ionicons name="information-circle" size={18} color="#22c55e" />
                  <Text style={styles2.detailText}>
                    We will send you a reminder before the event
                  </Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => { gainGlobux(event.points); deleteEvent(event.id); handleReturnHome() }} style={styles2.calendarButton}>
                <Ionicons
                  name="calendar"
                  size={18}
                  color="white"
                  style={styles2.buttonIcon}
                />
                <Text style={styles2.calendarButtonText}>Add to Calendar</Text>
              </TouchableOpacity>
            </Animated.View>

            <View style={styles2.buttonsContainer}>
              <TouchableOpacity
                style={styles2.viewDetailsButton}
                onPress={handleViewDetails}
              >
                <Text style={styles2.viewDetailsText}>View Event Details</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles2.homeButton} onPress={handleReturnHome}>
                <Text style={styles2.homeButtonText}>Return to Events</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  };

  const goToReward = (event: any) => {
    setSelectedEvent(event);
    setModalVisible(false);
    setRewardVisible(true);
  };

  // Main return logic
  if (rewardVisible && selectedEvent) {
    return <EventsReward event={selectedEvent} />;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>EcoEvents</Text>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedView === 'map' && styles.toggleButtonActive,
              ]}
              onPress={() => setSelectedView('map')}
            >
              <Ionicons
                name="map-outline"
                size={20}
                color={selectedView === 'map' ? 'white' : '#4CAF50'}
              />
              <Text
                style={[
                  styles.toggleText,
                  selectedView === 'map' && styles.toggleTextActive,
                ]}
              >
                Map View
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedView === 'list' && styles.toggleButtonActive,
              ]}
              onPress={() => setSelectedView('list')}
            >
              <Ionicons
                name="list-outline"
                size={20}
                color={selectedView === 'list' ? 'white' : '#4CAF50'}
              />
              <Text
                style={[
                  styles.toggleText,
                  selectedView === 'list' && styles.toggleTextActive,
                ]}
              >
                List View
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {selectedView === 'map' ? (
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            <MapView />

            <Text style={styles.upcomingEventsLabel}>Upcoming Events</Text>

            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onPress={event => {
                  setSelectedEvent(event);
                  setModalVisible(true);
                }}
              />
            ))}
          </ScrollView>
        ) : (
          <ScrollView
            style={styles.listContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onPress={event => {
                  setSelectedEvent(event);
                  setModalVisible(true);
                }}
              />
            ))}
          </ScrollView>
        )}


        {/* Event Details Modal */}
        {selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  upcomingEventsLabel: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#e6f4ea',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  viewToggle: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#c8e6c9',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  toggleButtonActive: {
    backgroundColor: '#4caf50',
  },
  toggleText: {
    marginLeft: 6,
    color: '#4caf50',
    fontWeight: '600',
  },
  toggleTextActive: {
    color: 'white',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#e6f4ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBackground: {
    width: '90%',
    height: '75%',
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mapTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#22c55e',
  },
  mapSubtitle: {
    fontSize: 14,
    color: '#4caf50',
    marginTop: 4,
  },
  mapMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4caf50',
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  eventCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  eventLocationText: {
    marginLeft: 4,
    color: '#666',
  },
  eventDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  eventDateText: {
    marginLeft: 4,
    color: '#666',
  },
  eventMeta: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  pointsBadge: {
    backgroundColor: '#a5d6a7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },
  pointsText: {
    color: '#2e7d32',
    fontWeight: '700',
    fontSize: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyEasy: {
    backgroundColor: '#c8e6c9',
  },
  difficultyMedium: {
    backgroundColor: '#ffe082',
  },
  difficultyHard: {
    backgroundColor: '#ef9a9a',
  },
  difficultyText: {
    fontWeight: '600',
    fontSize: 12,
  },
  difficultyEasyText: {
    color: '#2e7d32',
  },
  difficultyMediumText: {
    color: '#ef6c00',
  },
  difficultyHardText: {
    color: '#b71c1c',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    alignItems: 'center',
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 12,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#c8e6c9',
    borderRadius: 4,
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#4caf50',
    borderRadius: 4,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2e7d32',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  eventDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    color: '#4caf50',
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  requirementText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 12,
    marginBottom: 4,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

// Styles for the reward screen
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4caf50',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 16,
  },
  coinCircle: {
    backgroundColor: '#a5d6a7',
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4caf50',
    marginBottom: 8,
    textAlign: 'center',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  rewardSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  coinContainer: {
    alignItems: 'center',
  },
  coinAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#4caf50',
  },
  coinLabel: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    marginVertical: 20,
    width: '100%',
  },
  eventDetailsSection: {
    width: '100%',
  },
  detailsHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4caf50',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
    flexShrink: 1,
  },
  calendarButton: {
    marginTop: 24,
    backgroundColor: '#4caf50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  calendarButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '700',
  },
  buttonIcon: {
    marginLeft: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    width: '100%',
    maxWidth: 360,
  },
  viewDetailsButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#4caf50',
    fontWeight: '700',
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  homeButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
