import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function TaskDetailScreen({ route, navigation }) {
  const { task } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [notes, setNotes] = useState('This is a sample task with detailed information. You can add notes, set due dates, and track progress.');

  const handleSave = () => {
    // In a real app, you would save to a database
    setIsEditing(false);
    Alert.alert('Success', 'Task updated successfully!');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            navigation.goBack();
            Alert.alert('Success', 'Task deleted successfully!');
          }
        }
      ]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#FF6B6B';
      case 'medium': return '#4ECDC4';
      case 'low': return '#45B7D1';
      default: return '#95A5A6';
    }
  };

  const PrioritySelector = () => (
    <View style={styles.prioritySelector}>
      {['high', 'medium', 'low'].map(priority => (
        <TouchableOpacity
          key={priority}
          style={[
            styles.priorityOption,
            { backgroundColor: getPriorityColor(priority) },
            editedPriority === priority && styles.selectedPriority
          ]}
          onPress={() => setEditedPriority(priority)}
        >
          <Text style={styles.priorityText}>{priority}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Ionicons name={isEditing ? 'close' : 'create'} size={24} color="#4A90E2" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDelete}
            >
              <Ionicons name="trash" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <View style={styles.taskStatus}>
              <Ionicons
                name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
                size={32}
                color={task.completed ? '#4ECDC4' : '#BDC3C7'}
              />
            </View>
            <View style={styles.taskInfo}>
              {isEditing ? (
                <TextInput
                  style={styles.titleInput}
                  value={editedTitle}
                  onChangeText={setEditedTitle}
                  placeholder="Task title"
                  multiline
                />
              ) : (
                <Text style={styles.taskTitle}>{editedTitle}</Text>
              )}
              <View style={styles.taskMeta}>
                <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(editedPriority) }]}>
                  <Text style={styles.priorityBadgeText}>{editedPriority}</Text>
                </View>
                <Text style={styles.taskDate}>Created: Today</Text>
              </View>
            </View>
          </View>

          {isEditing && (
            <View style={styles.editSection}>
              <Text style={styles.sectionTitle}>Priority</Text>
              <PrioritySelector />
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              multiline
              placeholder="Add notes..."
              editable={isEditing}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Task Details</Text>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar" size={20} color="#4A90E2" />
                <Text style={styles.detailText}>Due Date</Text>
              </View>
              <Text style={styles.detailValue}>No due date</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Ionicons name="time" size={20} color="#4A90E2" />
                <Text style={styles.detailText}>Time Estimate</Text>
              </View>
              <Text style={styles.detailValue}>30 minutes</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Ionicons name="folder" size={20} color="#4A90E2" />
                <Text style={styles.detailText}>Category</Text>
              </View>
              <Text style={styles.detailValue}>Work</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activity</Text>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="add" size={16} color="#4A90E2" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Task created</Text>
                <Text style={styles.activityTime}>Today at 2:30 PM</Text>
              </View>
            </View>
            {task.completed && (
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name="checkmark" size={16} color="#4ECDC4" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>Task completed</Text>
                  <Text style={styles.activityTime}>Today at 3:15 PM</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {isEditing && (
          <View style={styles.saveSection}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  taskStatus: {
    marginRight: 15,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  priorityBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  taskDate: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  editSection: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  prioritySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedPriority: {
    borderWidth: 2,
    borderColor: '#2C3E50',
  },
  priorityText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  notesInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 10,
  },
  detailValue: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  saveSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});