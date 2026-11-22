import { useTasks } from '../state/TaskContext.jsx';
import {
  CalendarIcon,
  OverviewGridIcon,
  SettingsTargetIcon,
  TasksListIcon,
} from './Icons.jsx';

const MOBILE_NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: OverviewGridIcon, isPlaceholder: false },
  { id: 'tasks', label: 'Tasks', icon: TasksListIcon, isPlaceholder: false },
  { id: 'calendar', label: 'Calendar', icon: CalendarIcon, isPlaceholder: true },
  { id: 'settings', label: 'Settings', icon: SettingsTargetIcon, isPlaceholder: true },
];

export default function MobileNav({ onPlaceholderSelect }) {
  const { activeView, setView } = useTasks();

  const handleSelect = (item) => {
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
    <nav className="mobile-nav" aria-label="Workspace navigation">
      <ul className="mobile-nav__list">
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <li key={item.id} className="mobile-nav__item">
              <button
                type="button"
                className={`mobile-nav__btn${
                  isActive ? ' mobile-nav__btn--active' : ''
                }`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleSelect(item)}
              >
                <span className="mobile-nav__icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <span className="mobile-nav__label">{item.label}</span>
                {isActive && (
                  <span className="mobile-nav__indicator" aria-hidden="true" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
