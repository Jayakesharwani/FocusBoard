/**
 * Initial sample tasks seeded only when localStorage ('focusboard_tasks_v1')
 * has no valid saved data.
 *
 * Includes all three statuses ('To do', 'In progress', 'Completed') and
 * all three priorities ('High', 'Medium', 'Low'). The first three entries
 * mirror the reference dashboard rows.
 */
export const SEED_TASKS = [
  {
    id: 'task-1',
    title: 'Design landing page',
    description: 'Website redesign · Due soon',
    category: 'Design',
    status: 'To do',
    priority: 'High',
    dueDate: '2026-11-22',
  },
  {
    id: 'task-2',
    title: 'Fix mobile navigation',
    description: 'Frontend sprint · UI polish',
    category: 'Development',
    status: 'In progress',
    priority: 'Medium',
    dueDate: '2026-11-24',
  },
  {
    id: 'task-3',
    title: 'Review onboarding copy',
    description: 'Content updates · Approved',
    category: 'Content',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2026-11-18',
  },
  {
    id: 'task-4',
    title: 'Audit dashboard accessibility',
    description: 'Keyboard focus and ARIA labels',
    category: 'Development',
    status: 'In progress',
    priority: 'High',
    dueDate: '2026-11-25',
  },
  {
    id: 'task-5',
    title: 'Finalize Q4 design tokens',
    description: 'Palette, spacing, and card radii',
    category: 'Design',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-11-19',
  },
  {
    id: 'task-6',
    title: 'Draft release changelog',
    description: 'Product notes · Ready for review',
    category: 'Content',
    status: 'To do',
    priority: 'Low',
    dueDate: '2026-11-27',
  },
  {
    id: 'task-7',
    title: 'Optimize carousel controls',
    description: 'Responsive touch and keyboard support',
    category: 'Development',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-11-20',
  },
  {
    id: 'task-8',
    title: 'Prepare sprint retrospective',
    description: 'Team sync · Action items',
    category: 'General',
    status: 'To do',
    priority: 'High',
    dueDate: '2026-11-28',
  },
];
