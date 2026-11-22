import { useTasks } from '../state/TaskContext.jsx';
import { BrandLogoIcon, ChevronDownIcon } from './Icons.jsx';

const VIEW_LABELS = {
  overview: 'Overview',
  tasks: 'My tasks',
  calendar: 'Calendar',
  settings: 'Settings',
};

export default function Topbar({ onPlaceholderSelect }) {
  const { activeView } = useTasks();
  const currentLabel = VIEW_LABELS[activeView] || 'Overview';

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <div className="topbar__left">
          <div className="topbar__mobile-brand">
            <BrandLogoIcon className="topbar__mobile-logo" />
            <span className="topbar__mobile-brand-name">FocusBoard</span>
          </div>

          <nav className="topbar__breadcrumb" aria-label="Breadcrumb">
            <span className="topbar__breadcrumb-root">Workspace</span>
            <span className="topbar__breadcrumb-sep" aria-hidden="true">
              /
            </span>
            <span className="topbar__breadcrumb-current" aria-current="page">
              {currentLabel}
            </span>
          </nav>
        </div>

        <button
          type="button"
          className="topbar__profile"
          aria-label="Profile menu for JD (visual placeholder)"
          title="Profile menu (placeholder)"
          onClick={() =>
            onPlaceholderSelect?.(
              'Account profile menu is a visual placeholder in this single-user assessment.'
            )
          }
        >
          <span className="topbar__avatar" aria-hidden="true">
            JD
          </span>
          <span className="topbar__chevron" aria-hidden="true">
            <ChevronDownIcon size={15} />
          </span>
        </button>
      </div>
    </header>
  );
}
