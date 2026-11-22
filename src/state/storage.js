export const TASKS_STORAGE_KEY = 'focusboard_tasks_v1';

const VALID_STATUSES = new Set(['To do', 'In progress', 'Completed']);
const VALID_PRIORITIES = new Set(['High', 'Medium', 'Low']);
const DEFAULT_CATEGORY = 'General';

function cloneTasks(tasks) {
  return tasks.map((task) => ({ ...task }));
}

function normalizeTask(item) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    return null;
  }

  const id = typeof item.id === 'string' ? item.id.trim() : '';
  const title = typeof item.title === 'string' ? item.title.trim() : '';

  if (!id || !title) {
    return null;
  }

  if (!VALID_STATUSES.has(item.status) || !VALID_PRIORITIES.has(item.priority)) {
    return null;
  }

  const category =
    typeof item.category === 'string' && item.category.trim().length > 0
      ? item.category.trim()
      : DEFAULT_CATEGORY;

  return {
    id,
    title,
    description: typeof item.description === 'string' ? item.description : '',
    category,
    status: item.status,
    priority: item.priority,
    dueDate: typeof item.dueDate === 'string' ? item.dueDate : '',
  };
}

function getDefaultStorage() {
  try {
    return typeof globalThis !== 'undefined' ? globalThis.localStorage : null;
  } catch {
    return null;
  }
}

/**
 * Safely loads persisted tasks from localStorage.
 * - Seeds fallbackTasks only when no saved key exists or stored JSON is invalid.
 * - Preserves an intentionally empty array ('[]') without reseeding.
 */
export function loadTasks(fallbackTasks, storage = getDefaultStorage()) {
  if (!storage) {
    return cloneTasks(fallbackTasks);
  }

  try {
    const raw = storage.getItem(TASKS_STORAGE_KEY);
    if (raw === null) {
      return cloneTasks(fallbackTasks);
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return cloneTasks(fallbackTasks);
    }

    // Explicitly preserve an intentionally empty saved list.
    if (parsed.length === 0) {
      return [];
    }

    const normalized = parsed.map(normalizeTask).filter(Boolean);

    // If a non-empty stored array had zero valid task entries, treat as corrupt.
    if (normalized.length === 0) {
      return cloneTasks(fallbackTasks);
    }

    return normalized;
  } catch {
    return cloneTasks(fallbackTasks);
  }
}

/**
 * Safely persists only the task list array to localStorage.
 */
export function saveTasks(tasks, storage = getDefaultStorage()) {
  if (!storage || !Array.isArray(tasks)) {
    return false;
  }

  try {
    storage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch {
    return false;
  }
}
