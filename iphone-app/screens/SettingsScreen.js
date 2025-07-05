import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: true,
    soundEnabled: true,
    vibrationEnabled: true,
    darkMode: false,
    autoSync: true,
    biometricAuth: false,
    locationServices: true,
    analyticsEnabled: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this awesome Task Manager app!',
        title: 'Task Manager App',
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share the app');
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive', 
          onPress: () => {
            setSettings({
              notifications: true,
              soundEnabled: true,
              vibrationEnabled: true,
              darkMode: false,
              autoSync: true,
              biometricAuth: false,
              locationServices: true,
              analyticsEnabled: true,
            });
            Alert.alert('Success', 'Settings have been reset to default');
          }
        }
      ]
    );
  };

  const handleFeedback = () => {
    Alert.alert(
      'Send Feedback',
      'Thank you for your interest in providing feedback! This feature will open your email client.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send Email', onPress: () => {} }
      ]
    );
  };

  const SettingItem = ({ icon, title, description, value, onToggle, type = 'switch' }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={22} color="#4A90E2" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      {type === 'switch' && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#E0E0E0', true: '#4A90E2' }}
          thumbColor={value ? '#fff' : '#f4f3f4'}
        />
      )}
      {type === 'arrow' && (
        <Ionicons name="chevron-forward" size={16} color="#BDC3C7" />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your app experience</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="notifications"
              title="Push Notifications"
              description="Receive notifications for new tasks and reminders"
              value={settings.notifications}
              onToggle={() => toggleSetting('notifications')}
            />
            <SettingItem
              icon="volume-high"
              title="Sound"
              description="Play sound for notifications"
              value={settings.soundEnabled}
              onToggle={() => toggleSetting('soundEnabled')}
            />
            <SettingItem
              icon="phone-portrait"
              title="Vibration"
              description="Vibrate for notifications"
              value={settings.vibrationEnabled}
              onToggle={() => toggleSetting('vibrationEnabled')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="moon"
              title="Dark Mode"
              description="Use dark theme throughout the app"
              value={settings.darkMode}
              onToggle={() => toggleSetting('darkMode')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Sync</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="sync"
              title="Auto Sync"
              description="Automatically sync data across devices"
              value={settings.autoSync}
              onToggle={() => toggleSetting('autoSync')}
            />
            <SettingItem
              icon="cloud-upload"
              title="Backup Settings"
              description="Backup your data to cloud storage"
              type="arrow"
            />
            <SettingItem
              icon="download"
              title="Download Data"
              description="Export your tasks and data"
              type="arrow"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="finger-print"
              title="Biometric Authentication"
              description="Use fingerprint or face ID to unlock"
              value={settings.biometricAuth}
              onToggle={() => toggleSetting('biometricAuth')}
            />
            <SettingItem
              icon="location"
              title="Location Services"
              description="Allow location-based task reminders"
              value={settings.locationServices}
              onToggle={() => toggleSetting('locationServices')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="analytics"
              title="Analytics"
              description="Help improve the app by sharing usage data"
              value={settings.analyticsEnabled}
              onToggle={() => toggleSetting('analyticsEnabled')}
            />
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Ionicons name="document-text" size={22} color="#4A90E2" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Privacy Policy</Text>
                <Text style={styles.settingDescription}>View our privacy policy</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#BDC3C7" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.settingItem} onPress={handleShare}>
              <View style={styles.settingIcon}>
                <Ionicons name="share" size={22} color="#4A90E2" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Share App</Text>
                <Text style={styles.settingDescription}>Tell friends about this app</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#BDC3C7" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleFeedback}>
              <View style={styles.settingIcon}>
                <Ionicons name="chatbubble" size={22} color="#4A90E2" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Send Feedback</Text>
                <Text style={styles.settingDescription}>Help us improve the app</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#BDC3C7" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Ionicons name="information-circle" size={22} color="#4A90E2" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Version</Text>
                <Text style={styles.settingDescription}>1.0.0 (Build 1)</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Ionicons name="refresh" size={20} color="#FF6B6B" />
            <Text style={styles.resetButtonText}>Reset Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Task Manager v1.0.0</Text>
          <Text style={styles.footerText}>Made with ❤️ for productivity</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8F4FD',
    textAlign: 'center',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  resetButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 4,
  },
});