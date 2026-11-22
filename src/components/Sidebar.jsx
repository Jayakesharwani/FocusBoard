import { useTasks } from '../state/TaskContext.jsx';
import {
  BrandLogoIcon,
  CalendarIcon,
  OverviewGridIcon,
  SettingsTargetIcon,
  TasksListIcon,
} from './Icons.jsx';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: OverviewGridIcon, isPlaceholder: false },
  { id: 'tasks', label: 'My tasks', icon: TasksListIcon, isPlaceholder: false },
  { id: 'calendar', label: 'Calendar', icon: CalendarIcon, isPlaceholder: true },
  { id: 'settings', label: 'Settings', icon: SettingsTargetIcon, isPlaceholder: true },
];

export default function Sidebar({ onPlaceholderSelect }) {
  const { activeView, setView } = useTasks();

  const handleNavClick = (item) => {
    if (item.isPlaceholder) {
      onPlaceholderSelect?.(
        `${item.label} is a visual navigation placeholder outside the assessment scope.`
      );
      return;
    }
    onPlaceholderSelect?.('');
    setView(item.id);
  };

  return (
    <aside className="sidebar" aria-label="Workspace navigation">
      <div className="sidebar__brand">
        <BrandLogoIcon className="sidebar__logo-mark" />
        <span className="sidebar__brand-name">FocusBoard</span>
      </div>

      <nav className="sidebar__nav" aria-label="Primary">
        <p className="sidebar__section-label" id="workspace-nav-heading">
          WORKSPACE
        </p>

        <ul className="sidebar__list" aria-labelledby="workspace-nav-heading">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  title={item.isPlaceholder ? `${item.label} (placeholder)` : undefined}
                  onClick={() => handleNavClick(item)}
                >
                  <span className="sidebar__link-icon">
                    <Icon size={18} />
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
