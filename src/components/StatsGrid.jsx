import { useTasks } from '../state/TaskContext.jsx';
import { CheckIcon, ClockIcon, TasksListIcon } from './Icons.jsx';

export default function StatsGrid() {
  const { stats } = useTasks();

  const cards = [
    {
      id: 'total',
      label: 'Total tasks',
      value: stats.total,
      caption: 'Across all projects',
      icon: TasksListIcon,
      variant: 'total',
      hideOnMobile: false,
    },
    {
      id: 'in-progress',
      label: 'In progress',
      value: stats.inProgress,
      caption: 'Keep the momentum',
      icon: ClockIcon,
      variant: 'progress',
      hideOnMobile: true,
    },
    {
      id: 'completed',
      label: 'Completed',
      value: stats.completed,
      caption: `Great work this week · ${stats.completionPercentage}%`,
      icon: CheckIcon,
      variant: 'completed',
      hideOnMobile: false,
    },
  ];

  return (
    <section className="stats-section" aria-label="Overview statistics">
      <h2 className="stats-section__mobile-heading">Overview</h2>
      <div className="stats-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.id}
              className={`stat-card${card.hideOnMobile ? ' stat-card--hide-mobile' : ''}`}
            >
              <div
                className={`stat-card__icon stat-card__icon--${card.variant}`}
                aria-hidden="true"
              >
                <Icon size={20} />
              </div>

              <h3 className="stat-card__label">{card.label}</h3>

              <p className="stat-card__value">{card.value}</p>

              <p className="stat-card__caption">{card.caption}</p>
            </article>
          );
        })}
      </div>

      <div className="stats-mobile-meta" aria-label="Additional task statistics">
        <div className="stats-mobile-meta__item">
          <span
            className="stats-mobile-meta__dot stats-mobile-meta__dot--progress"
            aria-hidden="true"
          />
          <span className="stats-mobile-meta__label">In progress</span>
          <strong className="stats-mobile-meta__value">{stats.inProgress}</strong>
        </div>

        <span className="stats-mobile-meta__sep" aria-hidden="true" />

        <div className="stats-mobile-meta__item">
          <span
            className="stats-mobile-meta__dot stats-mobile-meta__dot--completed"
            aria-hidden="true"
          />
          <span className="stats-mobile-meta__label">Completed</span>
          <strong className="stats-mobile-meta__value">
            {stats.completionPercentage}%
          </strong>
        </div>
      </div>
    </section>
  );
}
