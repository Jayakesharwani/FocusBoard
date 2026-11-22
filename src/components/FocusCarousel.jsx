import { FOCUS_SLIDES } from '../data/focusSlides.js';
import { useTasks } from '../state/TaskContext.jsx';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons.jsx';

export default function FocusCarousel() {
  const { activeSlide, nextSlide, prevSlide, goToSlide } = useTasks();
  const currentSlide = FOCUS_SLIDES[activeSlide] || FOCUS_SLIDES[0];

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextSlide();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prevSlide();
    }
  };

  return (
    <section
      className="focus-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Focus Notes"
      onKeyDown={handleKeyDown}
    >
      <div className="focus-carousel__body">
        <div aria-live="polite" aria-atomic="true">
          <div className="focus-carousel__meta">
            <span className="focus-carousel__eyebrow focus-carousel__desktop-only">
              {currentSlide.eyebrow}
            </span>
            <span className="focus-carousel__eyebrow focus-carousel__mobile-only">
              {currentSlide.mobileEyebrow || currentSlide.eyebrow}
            </span>
            <span className="focus-carousel__counter">{currentSlide.counter}</span>
          </div>

          <h2 className="focus-carousel__headline">
            <span className="focus-carousel__desktop-only">{currentSlide.headline}</span>
            <span className="focus-carousel__mobile-only">
              {currentSlide.mobileHeadline || currentSlide.headline}
            </span>
          </h2>
          <p className="focus-carousel__subtitle">
            <span className="focus-carousel__desktop-only">{currentSlide.subtitle}</span>
            <span className="focus-carousel__mobile-only">
              {currentSlide.mobileSubtitle || currentSlide.subtitle}
            </span>
          </p>
        </div>

        <div className="focus-carousel__mobile-progress">
          <div
            className="focus-carousel__mobile-track"
            role="progressbar"
            aria-label={`${currentSlide.cardTitle} progress`}
            aria-valuenow={currentSlide.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="focus-carousel__mobile-fill"
              style={{ width: `${currentSlide.progress}%` }}
            />
          </div>
          <span className="focus-carousel__mobile-pct">
            {currentSlide.progress}%
          </span>
        </div>

        <div className="focus-carousel__indicators" role="tablist" aria-label="Focus Notes slides">
          {FOCUS_SLIDES.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                className={`focus-carousel__indicator${
                  isActive ? ' focus-carousel__indicator--active' : ''
                }`}
                aria-selected={isActive}
                aria-label={`Show slide ${index + 1} of ${FOCUS_SLIDES.length}: ${slide.headline}`}
                onClick={() => goToSlide(index)}
              >
                <span className="focus-carousel__indicator-bar" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="focus-carousel__visual" aria-hidden="false">
        <div className="focus-preview">
          <div className="focus-preview__ghost" aria-hidden="true" />
          <div className="focus-preview__card">
            <div className="focus-preview__top">
              <span className="focus-preview__check-badge" aria-hidden="true">
                <CheckIcon size={15} />
              </span>
              <div className="focus-preview__text">
                <span className="focus-preview__eyebrow">{currentSlide.cardEyebrow}</span>
                <span className="focus-preview__title">{currentSlide.cardTitle}</span>
              </div>
            </div>

            <div className="focus-preview__progress-row">
              <div
                className="focus-preview__progress-track"
                role="progressbar"
                aria-label={`${currentSlide.cardTitle} visual progress`}
                aria-valuenow={currentSlide.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="focus-preview__progress-fill"
                  style={{ width: `${currentSlide.progress}%` }}
                />
              </div>
              <span className="focus-preview__progress-value">
                {currentSlide.progress}%
              </span>
            </div>
          </div>
        </div>

        <div className="focus-carousel__controls">
          <button
            type="button"
            className="focus-carousel__nav-btn focus-carousel__nav-btn--prev"
            aria-label="Previous focus note"
            onClick={prevSlide}
          >
            <ChevronLeftIcon size={16} />
          </button>
          <button
            type="button"
            className="focus-carousel__nav-btn focus-carousel__nav-btn--next"
            aria-label="Next focus note"
            onClick={nextSlide}
          >
            <ChevronRightIcon size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
