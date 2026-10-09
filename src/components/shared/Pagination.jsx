// §6 / §10 swiper controls: pagination pill + play/pause button.
// Mirrors the original's animateBullet(): the active bullet widens (activeWidth) only while
// autoplay is running and its [data-progress] bar runs `bulletProgress <progressDuration>s linear forwards`.
// `progressKey` changes whenever the original would restart the bar (remount restarts the CSS animation).
// Bullets are clickable only when `onBulletClick` is given (3-col slider); highlight bullets are pointer-events:none.
export default function Pagination({
  count,
  active,
  playing,
  onTogglePlay,
  activeWidth,
  bulletTransition,
  progressDuration,
  progressKey,
  onBulletClick,
}) {
  return (
    <div className="flex items-center gap-[0.75rem]">
      <div className="flex h-[2.5rem] items-center gap-[0.5rem] rounded-pill bg-surface-1 px-[1.25rem] py-[0.5rem]">
        {Array.from({ length: count }).map((_, i) => {
          const on = i === active
          return (
            <span
              key={i}
              data-bullet
              data-active={on}
              onClick={onBulletClick ? () => onBulletClick(i) : undefined}
              className={`${onBulletClick ? '' : 'pointer-events-none'} relative h-[0.625rem] overflow-hidden rounded-pill bg-track transition-[width] ease-[ease] ${bulletTransition}`}
              style={{ width: on && playing ? activeWidth : 24 }}
            >
              {on && (
                <span
                  key={progressKey}
                  data-progress
                  className="absolute left-0 top-0 h-full w-0 bg-progress"
                  style={playing ? { animation: `bulletProgress ${progressDuration}s linear forwards` } : undefined}
                />
              )}
            </span>
          )
        })}
      </div>
      <button
        type="button"
        aria-label={playing ? 'Pause' : 'Play'}
        onClick={onTogglePlay}
        className="flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-full bg-playbtn text-[1rem] leading-none text-white"
      >
        {playing ? '⏸' : '▶'}
      </button>
    </div>
  )
}
