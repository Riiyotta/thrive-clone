// Centred 32px customer quote with a stacked 5rem round avatar + name/role (`.wowtestimonial_data.align-center`
// as it appears inside the results blocks of /lms and /lms/enterprise and after the enterprise service tabs).
import Placeholder from '../../components/shared/Placeholder.jsx'

// `align='left'` keeps the quote text left-aligned (`.kiki-quote.enterprise` on /lms/small-business); `avatarClassName`
// overrides the 5rem avatar (3rem there).
export default function CentredQuote({ quote, name, role, org, className = '', roleClassName = 'text-body', align = 'center', avatarClassName = 'h-[5rem] w-[5rem]' }) {
  return (
    <div className={`mx-auto flex max-w-[60rem] flex-col items-center gap-[1rem] ${className}`}>
      <p className={`mb-[1.25rem] ${align === 'left' ? 'self-stretch text-left' : 'text-center'} text-[2rem] font-medium leading-[1.2] text-ink tab:text-[1.75rem] mob:text-[1.5rem]`}>{quote}</p>
      <div className="flex flex-col items-center gap-[0.75rem]">
        <Placeholder tone={3} label="" className={`${avatarClassName} rounded-[0.375rem_0] wide:rounded-avatar`} />
        <div className="flex flex-col items-center text-center">
          <div className="text-para text-ink xs:text-body-xs">{name}</div>
          <div className={`${roleClassName} text-grey`}>
            {role}
            {org && (
              <>
                {' '}
                <a href="#" className="inline-link">
                  {org}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
