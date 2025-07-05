import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review quarterly goals', completed: false, priority: 'high' },
    { id: 2, title: 'Update project timeline', completed: true, priority: 'medium' },
    { id: 3, title: 'Team meeting preparation', completed: false, priority: 'low' },
    { id: 4, title: 'Client presentation', completed: false, priority: 'high' },
  ]);
  
  const [newTask, setNewTask] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      const newId = Math.max(...tasks.map(t => t.id), 0) + 1;
      setTasks([...tasks, {
        id: newId,
        title: newTask,
        completed: false,
        priority: 'medium'
      }]);
      setNewTask('');
      setShowAddTask(false);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          setTasks(tasks.filter(task => task.id !== id));
        }}
      ]
    );
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#FF6B6B';
      case 'medium': return '#4ECDC4';
      case 'low': return '#45B7D1';
      default: return '#95A5A6';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Task Manager</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddTask(true)}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completedTasks}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalTasks - completedTasks}</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalTasks}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {showAddTask && (
        <View style={styles.addTaskContainer}>
          <TextInput
            style={styles.taskInput}
            value={newTask}
            onChangeText={setNewTask}
            placeholder="Enter new task..."
            autoFocus
          />
          <View style={styles.addTaskButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                setShowAddTask(false);
                setNewTask('');
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={addTask}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false}>
        {tasks.map(task => (
          <TouchableOpacity
            key={task.id}
            style={[styles.taskCard, task.completed && styles.completedTask]}
            onPress={() => navigation.navigate('TaskDetail', { task })}
          >
            <View style={styles.taskContent}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleTask(task.id)}
              >
                <Ionicons
                  name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
                  size={24}
                  color={task.completed ? '#4ECDC4' : '#BDC3C7'}
                />
              </TouchableOpacity>
              
              <View style={styles.taskInfo}>
                <Text style={[styles.taskTitle, task.completed && styles.completedText]}>
                  {task.title}
                </Text>
                <View style={styles.taskMeta}>
                  <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
                    <Text style={styles.priorityText}>{task.priority}</Text>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(task.id)}
              >
                <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#4A90E2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#357ABD',
    borderRadius: 20,
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  statLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  addTaskContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  addTaskButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#95A5A6',
  },
  confirmButton: {
    backgroundColor: '#4ECDC4',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedTask: {
    backgroundColor: '#F8F9FA',
    opacity: 0.7,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#7F8C8D',
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  priorityText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  deleteButton: {
    padding: 8,
  },
});