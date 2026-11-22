import { FOCUS_SLIDES } from '../data/focusSlides.js';

export const TASK_STATUSES = ['To do', 'In progress', 'Completed'];
export const TASK_PRIORITIES = ['High', 'Medium', 'Low'];
export const STATUS_FILTER_TABS = ['All', 'In progress', 'Completed'];
export const PRIORITY_FILTERS = ['All', 'High', 'Medium', 'Low'];
export const DEFAULT_CATEGORY = 'General';

export const ACTION_TYPES = {
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  SET_STATUS: 'SET_STATUS',
  SET_SEARCH: 'SET_SEARCH',
  SET_STATUS_FILTER: 'SET_STATUS_FILTER',
  SET_PRIORITY_FILTER: 'SET_PRIORITY_FILTER',
  RESET_FILTERS: 'RESET_FILTERS',
  NEXT_SLIDE: 'NEXT_SLIDE',
  PREV_SLIDE: 'PREV_SLIDE',
  GO_TO_SLIDE: 'GO_TO_SLIDE',
  SET_VIEW: 'SET_VIEW',
};

const VALID_STATUS_SET = new Set(TASK_STATUSES);
const VALID_PRIORITY_SET = new Set(TASK_PRIORITIES);
const VALID_STATUS_FILTER_SET = new Set(STATUS_FILTER_TABS);
const VALID_PRIORITY_FILTER_SET = new Set(PRIORITY_FILTERS);
const SLIDE_COUNT = FOCUS_SLIDES.length;

function generateTaskId() {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.randomUUID) {
    return `task-${globalThis.crypto.randomUUID()}`;
  }
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createInitialState(initialTasks = []) {
  return {
    tasks: Array.isArray(initialTasks)
      ? initialTasks.map((task) => ({ ...task }))
      : [],
    filters: {
      search: '',
      status: 'All',
      priority: 'All',
    },
    activeSlide: 0,
    activeView: 'overview',
  };
}

export function taskReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_TASK: {
      const payload = action.payload ?? {};
      const title = typeof payload.title === 'string' ? payload.title.trim() : '';

      if (!title) {
        return state;
      }

      const category =
        typeof payload.category === 'string' && payload.category.trim().length > 0
          ? payload.category.trim()
          : DEFAULT_CATEGORY;

      const status = VALID_STATUS_SET.has(payload.status)
        ? payload.status
        : 'To do';

      const priority = VALID_PRIORITY_SET.has(payload.priority)
        ? payload.priority
        : 'Medium';

      const newTask = {
        id:
          typeof payload.id === 'string' && payload.id.trim().length > 0
            ? payload.id.trim()
            : generateTaskId(),
        title,
        description:
          typeof payload.description === 'string' ? payload.description.trim() : '',
        category,
        status,
        priority,
        dueDate: typeof payload.dueDate === 'string' ? payload.dueDate.trim() : '',
      };

      return {
        ...state,
        tasks: [newTask, ...state.tasks],
      };
    }

    case ACTION_TYPES.UPDATE_TASK: {
      const payload = action.payload ?? {};
      const targetId = payload.id;

      if (!targetId) {
        return state;
      }

      let didUpdate = false;
      const nextTasks = state.tasks.map((task) => {
        if (task.id !== targetId) {
          return task;
        }

        const nextTitle =
          typeof payload.title === 'string' ? payload.title.trim() : task.title;
        if (!nextTitle) {
          return task;
        }

        didUpdate = true;
        return {
          ...task,
          title: nextTitle,
          description:
            typeof payload.description === 'string'
              ? payload.description.trim()
              : task.description,
          // Preserve existing task category when editing from the Figma form.
          category:
            typeof payload.category === 'string' && payload.category.trim().length > 0
              ? payload.category.trim()
              : task.category || DEFAULT_CATEGORY,
          status: VALID_STATUS_SET.has(payload.status)
            ? payload.status
            : task.status,
          priority: VALID_PRIORITY_SET.has(payload.priority)
            ? payload.priority
            : task.priority,
          dueDate:
            typeof payload.dueDate === 'string'
              ? payload.dueDate.trim()
              : task.dueDate,
        };
      });

      return didUpdate ? { ...state, tasks: nextTasks } : state;
    }

    case ACTION_TYPES.DELETE_TASK: {
      const targetId =
        typeof action.payload === 'string' ? action.payload : action.payload?.id;

      if (!targetId) {
        return state;
      }

      const nextTasks = state.tasks.filter((task) => task.id !== targetId);
      if (nextTasks.length === state.tasks.length) {
        return state;
      }

      return {
        ...state,
        tasks: nextTasks,
      };
    }

    case ACTION_TYPES.SET_STATUS: {
      const { id, status } = action.payload ?? {};

      if (!id || !VALID_STATUS_SET.has(status)) {
        return state;
      }

      let didChange = false;
      const nextTasks = state.tasks.map((task) => {
        if (task.id !== id || task.status === status) {
          return task;
        }
        didChange = true;
        return { ...task, status };
      });

      return didChange ? { ...state, tasks: nextTasks } : state;
    }

    case ACTION_TYPES.SET_SEARCH: {
      const search = typeof action.payload === 'string' ? action.payload : '';
      if (search === state.filters.search) {
        return state;
      }
      return {
        ...state,
        filters: {
          ...state.filters,
          search,
        },
      };
    }

    case ACTION_TYPES.SET_STATUS_FILTER: {
      const status = VALID_STATUS_FILTER_SET.has(action.payload)
        ? action.payload
        : 'All';
      if (status === state.filters.status) {
        return state;
      }
      return {
        ...state,
        filters: {
          ...state.filters,
          status,
        },
      };
    }

    case ACTION_TYPES.SET_PRIORITY_FILTER: {
      const priority = VALID_PRIORITY_FILTER_SET.has(action.payload)
        ? action.payload
        : 'All';
      if (priority === state.filters.priority) {
        return state;
      }
      return {
        ...state,
        filters: {
          ...state.filters,
          priority,
        },
      };
    }

    case ACTION_TYPES.RESET_FILTERS: {
      return {
        ...state,
        filters: {
          search: '',
          status: 'All',
          priority: 'All',
        },
      };
    }

    case ACTION_TYPES.NEXT_SLIDE: {
      return {
        ...state,
        activeSlide: (state.activeSlide + 1) % SLIDE_COUNT,
      };
    }

    case ACTION_TYPES.PREV_SLIDE: {
      return {
        ...state,
        activeSlide: (state.activeSlide - 1 + SLIDE_COUNT) % SLIDE_COUNT,
      };
    }

    case ACTION_TYPES.GO_TO_SLIDE: {
      const index = Number(action.payload);
      if (!Number.isInteger(index) || index < 0 || index >= SLIDE_COUNT) {
        return state;
      }
      if (index === state.activeSlide) {
        return state;
      }
      return {
        ...state,
        activeSlide: index,
      };
    }

    case ACTION_TYPES.SET_VIEW: {
      const allowedViews = new Set(['overview', 'tasks', 'calendar', 'settings']);
      if (!allowedViews.has(action.payload) || action.payload === state.activeView) {
        return state;
      }
      return {
        ...state,
        activeView: action.payload,
      };
    }

    default:
      return state;
  }
}

/**
 * Derives live dashboard statistics directly from current task state.
 */
export function selectTaskStats(tasks) {
  const list = Array.isArray(tasks) ? tasks : [];
  let todo = 0;
  let inProgress = 0;
  let completed = 0;

  for (const task of list) {
    if (task.status === 'To do') {
      todo += 1;
    } else if (task.status === 'In progress') {
      inProgress += 1;
    } else if (task.status === 'Completed') {
      completed += 1;
    }
  }

  const total = list.length;
  const completionPercentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    todo,
    inProgress,
    completed,
    completionPercentage,
  };
}

/**
 * Applies title search, status tab filter, and priority filter together
 * using strict AND logic.
 *
 * Status tab 'All' includes 'To do', 'In progress', and 'Completed'.
 */
export function selectFilteredTasks(tasks, filters = {}) {
  const list = Array.isArray(tasks) ? tasks : [];
  const searchQuery =
    typeof filters.search === 'string' ? filters.search.trim().toLowerCase() : '';
  const statusFilter = filters.status || 'All';
  const priorityFilter = filters.priority || 'All';

  return list.filter((task) => {
    const matchesSearch =
      searchQuery === '' || task.title.toLowerCase().includes(searchQuery);

    const matchesStatus =
      statusFilter === 'All' || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'All' || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}
