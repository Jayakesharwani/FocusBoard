import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { SEED_TASKS } from '../data/seedTasks.js';
import { loadTasks, saveTasks } from './storage.js';
import {
  ACTION_TYPES,
  createInitialState,
  selectFilteredTasks,
  selectTaskStats,
  taskReducer,
} from './taskReducer.js';

const TaskContext = createContext(null);

function initializeAppState() {
  const initialTasks = loadTasks(SEED_TASKS);
  return createInitialState(initialTasks);
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, undefined, initializeAppState);

  // Persist only task data; keep filters, view, and carousel state ephemeral.
  useEffect(() => {
    saveTasks(state.tasks);
  }, [state.tasks]);

  const stats = useMemo(() => selectTaskStats(state.tasks), [state.tasks]);

  const filteredTasks = useMemo(
    () => selectFilteredTasks(state.tasks, state.filters),
    [state.tasks, state.filters]
  );

  const addTask = useCallback((taskData) => {
    dispatch({ type: ACTION_TYPES.ADD_TASK, payload: taskData });
  }, []);

  const updateTask = useCallback((taskData) => {
    dispatch({ type: ACTION_TYPES.UPDATE_TASK, payload: taskData });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: ACTION_TYPES.DELETE_TASK, payload: { id } });
  }, []);

  const setTaskStatus = useCallback((id, status) => {
    dispatch({ type: ACTION_TYPES.SET_STATUS, payload: { id, status } });
  }, []);

  const setSearch = useCallback((value) => {
    dispatch({ type: ACTION_TYPES.SET_SEARCH, payload: value });
  }, []);

  const setStatusFilter = useCallback((status) => {
    dispatch({ type: ACTION_TYPES.SET_STATUS_FILTER, payload: status });
  }, []);

  const setPriorityFilter = useCallback((priority) => {
    dispatch({ type: ACTION_TYPES.SET_PRIORITY_FILTER, payload: priority });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: ACTION_TYPES.RESET_FILTERS });
  }, []);

  const nextSlide = useCallback(() => {
    dispatch({ type: ACTION_TYPES.NEXT_SLIDE });
  }, []);

  const prevSlide = useCallback(() => {
    dispatch({ type: ACTION_TYPES.PREV_SLIDE });
  }, []);

  const goToSlide = useCallback((index) => {
    dispatch({ type: ACTION_TYPES.GO_TO_SLIDE, payload: index });
  }, []);

  const setView = useCallback((view) => {
    dispatch({ type: ACTION_TYPES.SET_VIEW, payload: view });
  }, []);

  const value = useMemo(
    () => ({
      tasks: state.tasks,
      filters: state.filters,
      activeSlide: state.activeSlide,
      activeView: state.activeView,
      stats,
      filteredTasks,
      addTask,
      updateTask,
      deleteTask,
      setTaskStatus,
      setSearch,
      setStatusFilter,
      setPriorityFilter,
      resetFilters,
      nextSlide,
      prevSlide,
      goToSlide,
      setView,
    }),
    [
      state.tasks,
      state.filters,
      state.activeSlide,
      state.activeView,
      stats,
      filteredTasks,
      addTask,
      updateTask,
      deleteTask,
      setTaskStatus,
      setSearch,
      setStatusFilter,
      setPriorityFilter,
      resetFilters,
      nextSlide,
      prevSlide,
      goToSlide,
      setView,
    ]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
