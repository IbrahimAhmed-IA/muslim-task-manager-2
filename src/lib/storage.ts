import type { Task, Note } from './types';

// Tasks Storage
const TASKS_STORAGE_KEY = 'muslim_task_manager_tasks';

export const getTasks = (): Task[] => {
  if (typeof window === 'undefined') return [];

  const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
  if (!tasksJson) return [];

  try {
    return JSON.parse(tasksJson);
  } catch (error) {
    console.error('Failed to parse tasks from localStorage', error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

// Notes Storage
const NOTES_STORAGE_KEY = 'muslim_task_manager_notes';

interface RawNote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const getNotes = (): Note[] => {
  if (typeof window === 'undefined') return [];

  const notesJson = localStorage.getItem(NOTES_STORAGE_KEY);
  if (!notesJson) return [];

  try {
    const parsed = JSON.parse(notesJson) as RawNote[];
    // Convert string dates to Date objects
    return parsed.map((note: RawNote) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt)
    }));
  } catch (error) {
    console.error('Failed to parse notes from localStorage', error);
    return [];
  }
};

export const saveNotes = (notes: Note[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
};

// Pomodoro Settings Storage
export interface PomodoroSettings {
  workDuration: number; // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  longBreakInterval: number; // after how many pomodoros
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: true,
  autoStartPomodoros: false,
};

const POMODORO_SETTINGS_KEY = 'muslim_task_manager_pomodoro_settings';

export const getPomodoroSettings = (): PomodoroSettings => {
  if (typeof window === 'undefined') return DEFAULT_POMODORO_SETTINGS;

  const settingsJson = localStorage.getItem(POMODORO_SETTINGS_KEY);
  if (!settingsJson) return DEFAULT_POMODORO_SETTINGS;

  try {
    return { ...DEFAULT_POMODORO_SETTINGS, ...JSON.parse(settingsJson) };
  } catch (error) {
    console.error('Failed to parse pomodoro settings from localStorage', error);
    return DEFAULT_POMODORO_SETTINGS;
  }
};

export const savePomodoroSettings = (settings: PomodoroSettings): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(POMODORO_SETTINGS_KEY, JSON.stringify(settings));
};
