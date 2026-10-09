// contact-form (.section > .component.grid_section.contact) on /contact-us, legacy "green" theme:
// 40% / 60% grid — left: 1.75rem heading, two grey paragraphs, three review badges (the homepage badge
// SVGs); right: the HubSpot form, rebuilt as a STATIC form in the embed's measured footprint (a fixed
// 300×1020px frame, px-based like the iframe). No submission or network: submit is prevented.
const THEME = { '--th-border': '#00251e' }

const BADGES = ['/assets/badge-capterra.svg', '/assets/badge-g2.svg', '/assets/badge-software-advice.svg']

const LABEL = 'mb-[6px] block text-[16px] font-bold leading-[20px] text-white font-[Helvetica,Arial,sans-serif]'
const INPUT = 'h-[40px] w-[220px] rounded-[3px] border border-[#cbd6e2] bg-[#f5f8fa] px-[10px] text-[16px] text-[#33475b] outline-none focus:border-[#1ee9b6] font-[Helvetica,Arial,sans-serif]'

export default function ContactForm({
  heading = 'Tell us about your platform needs',
  paragraphs = [
    'Share your platform requirements, questions or tender documents and our team will help you work out whether Nimbus is the right fit.',
    'We will reply with tailored information based on your goals and get back to you within one working day.',
  ],
  intro = 'Comparing learning platforms? Share your requirements or tender to get tailored information.',
  badges = BADGES,
}) {
  return (
    <section data-section="contact-form" style={THEME}>
      <div className="padding-global">
        <div className="container-large">
          <div className="relative flex flex-col border-b border-l border-r border-[var(--th-border)]">
            <div className="grid grid-cols-[40%_1fr] mob:grid-cols-1 mob:gap-[2rem]">
              <div className="flex w-full flex-col items-start justify-between gap-[1.25rem]">
                <div className="p-[2.5rem] tab:p-[2rem] mob:p-[1.5rem] xs:p-[1rem]">
                  <div className="flex w-full flex-col items-start justify-between leading-[1.4]">
                    <div className="flex flex-col items-start justify-start gap-[0.5rem]">
                      <h3 className="mb-[1rem] text-[1.75rem] font-normal leading-[1.1] xs:text-[1.5rem]">{heading}</h3>
                    </div>
                    <p className="mb-[1.25rem] mt-[1rem] text-[1rem] leading-[1.4] text-grey">
                      {paragraphs.map((p, i) => (
                        <span key={i}>
                          {i > 0 && (
                            <>
                              <br />
                              <br />
                            </>
                          )}
                          {p}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="mt-[1.5rem] flex w-full items-center justify-start gap-[2rem] xs:justify-center xs:gap-y-[1rem]">
                    {badges.map((b) => (
                      <img key={b} src={b} alt="Review badge" loading="lazy" className="mx-auto h-[4.3rem] max-h-[5rem] object-contain xs:h-[3rem]" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col">
                <div className="padding-global">
                  <div className="container-large">
                    <div className="py-[2.5rem] mob:py-[1.25rem]">
                      <div className="mx-[0.5rem] flex w-full max-w-[42rem] flex-col items-center justify-center mob:mx-0 mob:block">
                        <form onSubmit={(e) => e.preventDefault()} className="h-[1020px] w-[300px] px-[40px] pt-[26px] text-white">
                          <p className="mb-[60px] text-[16px] font-medium leading-[18px] font-[Helvetica,Arial,sans-serif]">{intro}</p>
                          {[
                            ['First name', false],
                            ['Last name', false],
                            ['Work email', true],
                            ['Company name', true],
                          ].map(([l, req]) => (
                            <div key={l} className="mb-[24px]">
                              <label className={LABEL}>
                                {l}
                                {req && <span className="text-[#f2545b]">*</span>}
                                <input className={`${INPUT} mt-[6px]`} type={l === 'Work email' ? 'email' : 'text'} />
                              </label>
                            </div>
                          ))}
                          <div className="mb-[24px]">
                            <label className={LABEL}>
                              Number of employees<span className="text-[#f2545b]">*</span>
                              <select className={`${INPUT} mt-[6px] text-[#7c98b6]`} defaultValue="">
                                <option value="" disabled>
                                  Please select
                                </option>
                                {['1-249', '250-999', '1,000-4,999', '5,000+'].map((o) => (
                                  <option key={o}>{o}</option>
                                ))}
                              </select>
                            </label>
                          </div>
                          <div className="mb-[24px]">
                            <span className={LABEL}>Attachments</span>
                            <input type="file" className="w-[220px] text-[16px] text-[#33475b]" />
                          </div>
                          <div className="mb-[24px]">
                            <label className={`${LABEL} font-normal`}>
                              Tell us about your requirements
                              <textarea
                                rows={2}
                                placeholder="Describe your requirements, goals, timeline or upload your tender"
                                className={`${INPUT} mt-[6px] h-[58px] py-[8px] placeholder:text-[#7c98b6]`}
                              />
                            </label>
                          </div>
                          <div className="mb-[38px] h-[62px] w-[258px] rounded-[3px] border border-[#555] shadow-[0_0_4px_rgba(255,255,255,0.2)]" aria-hidden />
                          <button type="submit" className="h-[42px] w-[220px] rounded-[3px] bg-surface-3 text-[16px] font-bold text-white hover:bg-hover font-[Helvetica,Arial,sans-serif]">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
