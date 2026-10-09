// pricing-pro-legacy: /lms/impact `.section > .component.no-border-top` (legacy Relume pricing, purple theme).
// Centred H2 header (5.5rem 2.5rem 4rem padding) over a shrink-to-fit 2-plan grid (second plan on #3b041d)
// and a centred 36rem feature list (rows with top/left hairlines). Hairlines #570039. Stacks <=479.
// Plan names / prices are placeholders (the original's values are not reproduced).
const BORDER = 'border-[#570039]'

function Plan({ plan, alt }) {
  return (
    <div className={`flex flex-col gap-[3rem] border-b border-t ${BORDER} p-[2.5rem] tab:p-[1.5rem] mob:h-full ${alt ? 'bg-[#3b041d]' : ''}`}>
      <div className="mb-[1.5rem] flex items-center justify-between text-[1.25rem] font-semibold leading-[1.4] text-ink tab:flex-col tab:items-start tab:gap-[1rem] xs:text-[1.125rem]">
        <div>{plan.name}</div>
      </div>
      <div className="flex flex-col gap-[1rem]">
        <div className="font-['Source_Serif_4','Sourceserif_4_18_Pt',Georgia,serif] text-[3rem] font-semibold leading-[1.1] text-white mob:text-[2.5rem]">{plan.price}</div>
        <div className="grid grid-cols-[1fr_max-content] gap-[0.5rem]">
          <div className="text-[1rem] font-bold leading-[1.5] text-grey mob:text-[0.75rem]">{plan.period}</div>
        </div>
      </div>
      <div className="flex items-end justify-between gap-[5rem] tab:gap-[1rem]">
        <div>
          <div className="text-body text-ink xs:text-body-xs">{plan.countLabel}</div>
          {plan.note && <div className="text-[1rem] font-bold leading-[1.5] text-grey mob:text-[0.75rem]">{plan.note}</div>}
        </div>
        <div className="text-[3rem] leading-none text-ink xs:text-[2rem]">{plan.count}</div>
      </div>
    </div>
  )
}

const DEFAULTS = {
  heading: 'Pricing for Nimbus Results',
  plans: [
    { name: 'Standard', price: '$18,500', period: 'Per year', countLabel: 'Projects included', count: '1' },
    { name: 'Standard+', price: '$23,500', period: 'Per year', countLabel: 'Projects included', note: 'Adds extra support and launch help', count: '2' },
  ],
  listLead: 'Every plan includes:',
  features: [
    'Workshops built around your goals',
    'A specialist on hand to plan your reports with your leaders',
    'Live dashboards your team can share',
    'Quarterly reviews with a named specialist',
    'Ready-made reports for your board',
  ],
}

export default function PricingProLegacy(props) {
  const p = { ...DEFAULTS, ...props }
  return (
    <section data-section="pricing-pro-legacy">
      <div className="padding-global">
        <div className="container-large">
          <div className={`relative flex flex-col border-b border-l border-r ${BORDER}`}>
            <div className={`flex flex-col items-start border-b ${BORDER} px-[2.5rem] pb-[4rem] pt-[5.5rem] [text-wrap:pretty] tab:px-[2rem] tab:pt-[4rem] mob:px-[1.5rem] xs:px-[1rem]`}>
              <div className="flex w-full flex-col items-center justify-between text-center leading-[1.4]">
                <div className="flex flex-col items-center gap-[0.5rem]">
                  <h2 className="mb-[1.25rem] mt-[0.25rem] font-serif text-[4rem] font-normal leading-[1.1] text-ink">{p.heading}</h2>
                </div>
              </div>
            </div>
            <div className={`mx-auto grid max-w-[72rem] grid-cols-2 border-l border-r ${BORDER} tab:mx-0 tab:border-x-0 xs:grid-cols-1`}>
              {p.plans.map((pl, i) => (
                <Plan key={pl.name} plan={pl} alt={i === 1} />
              ))}
              <div className={`col-span-2 grid w-full max-w-[36rem] grid-cols-[100%] justify-self-center border-l border-r ${BORDER} xs:col-span-1`}>
                <div className="p-[1.5rem]">
                  <div className="text-small text-grey">{p.listLead}</div>
                </div>
                {p.features.map((f) => (
                  <div key={f} className={`flex items-center justify-between border-l border-t ${BORDER} p-[1.125rem] tab:gap-[1rem] mob:border-r mob:p-[1rem] xs:p-[0.875rem]`}>
                    <div className="flex items-center justify-start gap-[1rem]">
                      <div className="text-[1rem] font-semibold leading-[1.4rem] text-ink">{f}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
