import { Ionicons } from '@expo/vector-icons';
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
  const [selectedView, setSelectedView] = useState('map');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [reward, setReward] = useState(false);

  const insets = useSafeAreaInsets();

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  const eventTitle = "Beach Cleanup Drive";
  const eventPoints = 50;
  const eventDate = "Tomorrow";
  const eventTime = "9:00 AM";
  const eventLocation = "Seaside Park";

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
      })
    ]).start();
  }, []);

  const handleViewDetails = () => {
    setReward(false);
  };

  const handleReturnHome = () => {
    setReward(false);
  };

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

        <TouchableOpacity style={styles.joinButton} onPress={() => goToReward()}>
          <Text style={styles.joinButtonText}>Join Event</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );

  const EventsReward = () => (
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
              { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
            ]}
          >
            <View style={styles2.iconContainer}>
              <View style={styles2.coinCircle}>
                <Ionicons name="leaf" size={40} color="#4CAF50" />
              </View>
            </View>

            <Text style={styles2.congratsText}>Thank you for joining!</Text>
            <Text style={styles2.eventTitle}>{eventTitle}</Text>

            <View style={styles2.rewardSection}>
              <View style={styles2.coinContainer}>
                <Text style={styles2.coinAmount}>+{eventPoints}</Text>
                <Text style={styles2.coinLabel}>Green Coins</Text>
              </View>
            </View>

            <View style={styles2.separator} />

            <View style={styles2.eventDetailsSection}>
              <Text style={styles2.detailsHeading}>Event Details:</Text>

              <View style={styles2.detailRow}>
                <Ionicons name="calendar" size={18} color="#22c55e" />
                <Text style={styles2.detailText}>{eventDate} at {eventTime}</Text>
              </View>

              <View style={styles2.detailRow}>
                <Ionicons name="location" size={18} color="#22c55e" />
                <Text style={styles2.detailText}>{eventLocation}</Text>
              </View>

              <View style={styles2.detailRow}>
                <Ionicons name="information-circle" size={18} color="#22c55e" />
                <Text style={styles2.detailText}>We will send you a reminder before the event</Text>
              </View>
            </View>

            <TouchableOpacity style={styles2.calendarButton}>
              <Ionicons name="calendar" size={18} color="white" style={styles2.buttonIcon} />
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

            <TouchableOpacity
              style={styles2.homeButton}
              onPress={handleReturnHome}
            >
              <Text style={styles2.homeButtonText}>Return to Events</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  const openEventDetail = (event: any) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeEventDetail = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const goToReward = () => {
    setModalVisible(false);
    setReward(true);
  }

  if (reward) {
    return (
      <EventsReward />
    );
  }

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

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  rewardCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    width: '100%',
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 200,
    height: 200,
    position: 'absolute',
  },
  coinCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 18,
    color: '#4b5563',
    marginTop: 8,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  rewardSection: {
    marginVertical: 16,
    alignItems: 'center',
  },
  coinContainer: {
    alignItems: 'center',
  },
  coinAmount: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  coinLabel: {
    fontSize: 16,
    color: '#4b5563',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    width: '100%',
    marginVertical: 16,
  },
  eventDetailsSection: {
    width: '100%',
  },
  detailsHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#4b5563',
  },
  calendarButton: {
    flexDirection: 'row',
    backgroundColor: '#22c55e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  calendarButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 20,
  },
  viewDetailsButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  viewDetailsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});