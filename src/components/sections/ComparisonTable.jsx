// `comparison-table`: the hand-written raw-HTML table embeds (.w-embed). Their CSS is px-based on the
// original (it does not follow the fluid rem root), so the embed CSS is reproduced verbatim here in px,
// with class names re-scoped (nct-*). Variants:
//  - "platform"   (/lms, .platform-table): 2 columns, 11 rows, whole table nudged translateX(40px) on desktop.
//  - "enterprise" (/lms/enterprise, .table-attempt .enterprise-table): 2 columns, 7 rows, right column
//                 rendered as green-edged "chat card" evidence bubbles.
//  - "vendor"     (/nova, .vend-table inside the split-tabs block): 4 columns, 7 rows, evidence bubbles.
//                 On the original this embed is truncated mid-row (Webflow embed limit) so the following
//                 sections end up nested inside the last cell; here the table is closed normally.
// All three collapse to stacked rows at <=767px exactly like the original media queries.

const CSS_PLATFORM = `
  .nct-p-section {
    display: block;
    width: 100%;
  }
  .nct-p-header {
    text-align: center;
    max-width: 780px;
    margin: 0 auto 56px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .nct-p-header h2 {
    font-family: 'Instrument Serif', 'Instrumentserif', Georgia, serif;
    font-weight: 400;
    font-size: clamp(36px, 5vw, 56px);
    line-height: 1.1;
    color: #FFFFFF;
    margin: 0 0 16px;
  }
  .nct-p-header h2 em {
    font-style: italic;
  }
  .nct-p-header p {
    font-size: 18px;
    line-height: 1.5;
    color: #B1ADBE;
    margin: 0;
  }
  .nct-p-wrap {
    width: calc(100% - 160px);
    max-width: 1200px;
    margin: 0 auto;
    transform: translateX(40px);
    box-sizing: border-box;
  }
  .nct-p {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    font-size: 16px;
    line-height: 1.5;
  }

  .nct-p caption {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  .nct-p thead th {
    padding: 0 0 28px 0;
    text-align: left;
    vertical-align: bottom;
    font-size: 22px;
    line-height: 1.25;
    font-weight: 600;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
  .nct-p tbody th,
  .nct-p tbody td {
    padding: 22px 0;
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
    overflow-wrap: break-word;
  }
  .nct-p thead th:first-child,
  .nct-p tbody th {
    width: 32%;
    padding-right: 48px;
    font-weight: 600;
  }
  .nct-p thead th:last-child,
  .nct-p tbody td {
    width: 68%;
  }
  .nct-p tbody tr:last-child th,
  .nct-p tbody tr:last-child td {
    border-bottom: none;
  }
  .nct-p a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  @media (max-width: 767px) {
    .nct-p-header {
      margin-bottom: 36px;
    }
    .nct-p-header p {
      font-size: 16px;
    }
    .nct-p-wrap {
      width: 100%;
      max-width: none;
      margin: 0;
      padding: 0 20px;
      transform: none;
    }
    .nct-p thead {
      display: none;
    }
    .nct-p,
    .nct-p tbody,
    .nct-p tr,
    .nct-p tbody th,
    .nct-p tbody td {
      display: block;
      width: 100%;
    }
    .nct-p tr {
      padding: 20px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.14);
    }
    .nct-p tbody tr:last-child {
      border-bottom: none;
    }
    .nct-p tbody th,
    .nct-p tbody td {
      padding: 0;
      border: 0;
    }
    .nct-p tbody th {
      padding-right: 0;
      margin-bottom: 7px;
      font-size: 17px;
    }
  }`

const CSS_ENTERPRISE = `
  .nct-e-section {
    display: block;
    width: 100%;
  }
  .nct-e-header {
    text-align: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto 56px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .nct-e-header h2 {
    font-family: 'Instrument Serif', 'Instrumentserif', Georgia, serif;
    font-weight: 400;
    font-size: clamp(34px, 4.2vw, 52px);
    line-height: 1.1;
    color: #FFFFFF;
    margin: 0 0 16px;
  }
  .nct-e-header h2 em {
    font-style: italic;
  }
  .nct-e-header p {
    max-width: 760px;
    margin: 0 auto;
    font-size: 18px;
    line-height: 1.5;
    color: #B1ADBE;
  }
  .nct-e-wrap {
    width: calc(100% - 160px);
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .nct-e {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    font-size: 16px;
    line-height: 1.5;
  }

  .nct-e caption {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  .nct-e thead th {
    padding: 0 0 24px 0;
    text-align: left;
    vertical-align: bottom;
    font-size: 22px;
    line-height: 1.25;
    font-weight: 600;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
  .nct-e thead th span {
    display: block;
    margin-top: 6px;
    font-size: 15px;
    font-weight: 400;
    color: #B1ADBE;
  }

  .nct-e thead th:last-child {
    color: #1DE9B6;
  }
  .nct-e tbody th,
  .nct-e tbody td {
    padding: 14px 0;
    text-align: left;
    vertical-align: top;
    overflow-wrap: break-word;
  }
  .nct-e tbody tr:first-child th,
  .nct-e tbody tr:first-child td {
    padding-top: 28px;
  }
  .nct-e thead th:first-child,
  .nct-e tbody th {
    width: 30%;
    padding-right: 40px;
    font-weight: 600;
    font-size: 18px;
  }
  .nct-e tbody th {
    padding-top: 26px;
  }
  .nct-e tbody tr:first-child th {
    padding-top: 40px;
  }
  .nct-e thead th:last-child,
  .nct-e tbody td {
    width: 70%;
  }
  .nct-e a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .nct-e-evidence {
    margin: 0;
    padding: 14px 18px;
    background: #282830;
    border-radius: 18px 18px 18px 4px;
    border-left: 3px solid #1DE9B6;
    color: #FFFFFF;
  }
  @media (max-width: 767px) {
    .nct-e-header {
      margin-bottom: 36px;
    }
    .nct-e-header p {
      font-size: 16px;
    }
    .nct-e-wrap {
      width: 100%;
      max-width: none;
      margin: 0;
      padding: 0 20px;
    }
    .nct-e thead {
      display: none;
    }
    .nct-e,
    .nct-e tbody,
    .nct-e tr,
    .nct-e tbody th,
    .nct-e tbody td {
      display: block;
      width: 100% !important;
    }
    .nct-e tr {
      padding: 18px 0;
    }
    .nct-e tbody th,
    .nct-e tbody td {
      padding: 0 !important;
      border: 0;
    }
    .nct-e tbody th {
      margin-bottom: 10px;
      font-size: 17px;
    }
  }`

const CSS_VENDOR = `
  .nct-v-table-section {
    display: block;
    width: 100%;
  }
  .nct-v-table-header {
    text-align: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto 56px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .nct-v-table-header h2 {
    font-family: 'Instrument Serif', 'Instrumentserif', Georgia, serif;
    font-weight: 400;
    font-size: clamp(34px, 4.2vw, 52px);
    line-height: 1.1;
    color: #FFFFFF;
    margin: 0 0 16px;
  }
  .nct-v-table-header h2 em {
    font-style: italic;
  }
  .nct-v-table-header p {
    max-width: 760px;
    margin: 0 auto;
    font-size: 18px;
    line-height: 1.5;
    color: #B1ADBE;
  }
  .nct-v-table-wrap {
    width: calc(100% - 160px);
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .nct-v-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    font-size: 16px;
    line-height: 1.5;
  }

  .nct-v-table caption {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  .nct-v-table thead th {
    padding: 0 0 28px 0;
    text-align: left;
    vertical-align: bottom;
    font-size: 20px;
    line-height: 1.25;
    font-weight: 600;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
  .nct-v-table thead th span {
    display: block;
    margin-top: 6px;
    font-size: 15px;
    font-weight: 400;
    color: #B1ADBE;
  }

  .nct-v-table thead th:last-child {
    color: #1DE9B6;
  }
  .nct-v-table tbody th,
  .nct-v-table tbody td {
    padding: 24px 0;
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
    overflow-wrap: break-word;
  }
  .nct-v-table thead th:first-child,
  .nct-v-table tbody th {
    width: 17%;
    padding-right: 32px;
    font-weight: 600;
    font-size: 18px;
  }
  .nct-v-table thead th:nth-child(2),
  .nct-v-table tbody td.nct-v-ask {
    width: 28%;
    padding-right: 32px;
  }
  .nct-v-table thead th:nth-child(3),
  .nct-v-table tbody td.nct-v-good {
    width: 23%;
    padding-right: 32px;
    color: #B1ADBE;
  }
  .nct-v-table thead th:last-child,
  .nct-v-table tbody td.nct-v-thrive {
    width: 32%;
  }
  .nct-v-table tbody tr:last-child th,
  .nct-v-table tbody tr:last-child td {
    border-bottom: none;
  }
  .nct-v-table a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .nct-v-evidence {
    margin: 0;
    padding: 14px 18px;
    background: #282830;
    border-radius: 18px 18px 18px 4px;
    border-left: 3px solid #1DE9B6;
    color: #FFFFFF;
  }
  .nct-v-evidence span {
    display: block;
    margin-bottom: 4px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #1DE9B6;
  }
  @media (max-width: 991px) {
    .nct-v-table-wrap {
      width: calc(100% - 40px);
    }
  }
  @media (max-width: 767px) {
    .nct-v-table-header {
      margin-bottom: 36px;
    }
    .nct-v-table-header p {
      font-size: 16px;
    }
    .nct-v-table-wrap {
      width: 100%;
      max-width: none;
      margin: 0;
      padding: 0 20px;
    }
    .nct-v-table thead {
      display: none;
    }
    .nct-v-table,
    .nct-v-table tbody,
    .nct-v-table tr,
    .nct-v-table tbody th,
    .nct-v-table tbody td {
      display: block;
      width: 100% !important;
    }
    .nct-v-table tr {
      padding: 24px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.14);
    }
    .nct-v-table tbody tr:last-child {
      border-bottom: none;
    }
    .nct-v-table tbody th,
    .nct-v-table tbody td {
      padding: 0 !important;
      border: 0;
    }
    .nct-v-table tbody th {
      margin-bottom: 10px;
      font-size: 18px;
    }
    .nct-v-table tbody td {
      margin-bottom: 12px;
    }
    .nct-v-table tbody td.nct-v-ask::before,
    .nct-v-table tbody td.nct-v-good::before {
      content: attr(data-label);
      display: block;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #B1ADBE;
      margin-bottom: 2px;
    }
  }`

const L = ({ children }) => <a href="#">{children}</a>

const PLATFORM_ROWS = [
  ['Learning management', <>Create <L>pathways</L>, quizzes, live events and compliance courses with full support for standard course packages</>],
  ['AI assistant', <>Use <L>Nova, the built-in AI assistant</L>, for coaching, authoring, insight, admin and knowledge</>],
  ['Course creation', <>Build courses, videos, quizzes and microlearning in minutes with <L>AI</L></>],
  ['Home feed', <>Bring courses, news and conversations together in <L>one personal home feed</L> for everyone</>],
  ['Search and knowledge', <>Find learning, documents and answers from connected tools using <L>Connected search</L></>],
  ['Skills and growth', <>Set goals, <L>grow skills</L>, run reviews and plan careers in one connected place</>],
  ['Mentoring', <><L>Pair mentors with mentees</L> and run programmes that scale</>],
  ['Spaces and social learning', <>Bring teams together, share know-how and celebrate wins in <L>Spaces</L></>],
  ['Insight and reporting', <>Follow compliance, engagement, skills and impact with <L>live dashboards</L> anyone can read</>],
  ['Integrations', <>Connect Nimbus with your HR, chat, calendar and identity tools across <L>60+ systems</L></>],
  ['Mobile and global teams', <>Give people learning wherever they are through a <L>branded mobile app</L>, offline access, automatic translation and support for more than forty languages worldwide</>],
]

const ENTERPRISE_ROWS = [
  ['Security and control', <><L>Independent security and quality certifications in place</L>, cloud hosting, encryption, role-based access and full audit logs</>],
  ['Global rollout', <>Automatic translation of the platform and all learning content into <L>40+ languages</L>, with regional hosting and data residency choices</>],
  ['Multi-brand management', <>Central oversight of separate brands, each with its own look, content, access and reporting, through <L>multi-brand setup</L></>],
  ['AI, search and automation', <><L>Nova, the built-in assistant</L>, connected search across business systems, AI-assisted authoring and <L>assistant access</L> from the AI tools your teams already use every single day</>],
  ['Integrations', <>HR, chat, CRM, identity and productivity tools plus <L>60+ systems</L></>],
  ['Launch and support', <><L>Guided launch</L>, <L>smooth migration</L>, single sign-on setup, onboarding, global rollout and <L>round-the-clock enterprise help</L></>],
  ['Measurement', <>Compliance, engagement, skills and <L>learning impact</L> reporting</>],
]

const VENDOR_ROWS = [
  ['Security and compliance', 'Which independent certifications do you hold, and can you share proof early in the buying process?', 'Current, independently checked security and quality certifications', <><L>Independent security and quality certifications</L> with a public trust centre for every customer</>],
  ['Global reach', 'Can the platform support our languages, regions, brands and separate business units?', 'Translation, multi-region hosting and separately branded spaces', <><L>40+ languages</L>, regional hosting and <L>multi-brand setup</L> as standard for all</>],
  ['AI capability', 'Does the AI only answer questions, or can it also create, coach and take action?', 'Governed AI that supports learners, authors and admins in context', <><L>Nova</L> supports insight, authoring, coaching, admin and knowledge, with <L>assistant access</L> from the AI tools your teams use</>],
  ['Integrations', 'Which HR, chat and identity systems do you connect with today?', 'Proven integrations with the tools your teams already use daily', <><L>Integrations</L> include HR, chat, CRM, identity and productivity tools, with more each quarter</>],
  ['Support after launch', 'What support is included once we are live, and how fast do you respond?', 'Clear ongoing support, enablement and a named point of contact', <><L>Round-the-clock support</L>, a named success manager and a <L>help centre</L> with guides</>],
  ['Product momentum', 'How often do you release meaningful new features for customers?', 'A visible and reliable release rhythm', <><L>40 new features shipped</L> across the last two quarters</>],
  ['Migration', 'What happens to our users, content, learning records and integrations when we switch platforms?', 'A documented migration plan with testing and continuity checks', <><L>Guided migration</L> from your current platform, fully tested before launch day</>],
]

export default function ComparisonTable({ variant = 'platform', title, intro, rows }) {
  if (variant === 'enterprise') {
    const R = rows || ENTERPRISE_ROWS
    return (
      <div data-section="comparison-table" data-variant="enterprise" className="table-attempt flex">
        <style>{CSS_ENTERPRISE}</style>
        <div className="nct-e-section">
          <div className="nct-e-header">
            <h2>{title || <>Enterprise learning, built for <em>scale</em></>}</h2>
            <p>{intro || 'Nimbus is built for the security, governance and global reach that large organisations expect.'}</p>
          </div>
          <div className="nct-e-wrap">
            <table className="nct-e">
              <caption>How Nimbus meets enterprise learning requirements</caption>
              <thead>
                <tr>
                  <th scope="col">Enterprise requirement<span>What you need</span></th>
                  <th scope="col">What Nimbus provides<span>How we deliver it</span></th>
                </tr>
              </thead>
              <tbody>
                {R.map(([h, d], i) => (
                  <tr key={i}>
                    <th scope="row">{h}</th>
                    <td><p className="nct-e-evidence">{d}</p></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'vendor') {
    const R = rows || VENDOR_ROWS
    return (
      <div data-section="comparison-table" data-variant="vendor" className="flex">
        <style>{CSS_VENDOR}</style>
        <div className="nct-v-table-section">
          <div className="nct-v-table-header">
            <h2>{title || <>How to compare <em>learning platforms</em></>}</h2>
            <p>{intro || 'Bring these questions into every vendor conversation. Here is what good looks like, and how Nimbus measures up.'}</p>
          </div>
          <div className="nct-v-table-wrap">
            <table className="nct-v-table">
              <caption>Learning platform evaluation checklist: what to ask, what good looks like and the Nimbus evidence</caption>
              <thead>
                <tr>
                  <th scope="col">Evaluation area<span>What to assess</span></th>
                  <th scope="col">What to ask<span>Every platform provider</span></th>
                  <th scope="col">What good looks like<span>The standard to expect</span></th>
                  <th scope="col">Nimbus evidence<span>How we measure up</span></th>
                </tr>
              </thead>
              <tbody>
                {R.map(([h, ask, good, ev], i) => (
                  <tr key={i}>
                    <th scope="row">{h}</th>
                    <td className="nct-v-ask" data-label="What to ask">{ask}</td>
                    <td className="nct-v-good" data-label="What good looks like">{good}</td>
                    <td className="nct-v-thrive">
                      <p className="nct-v-evidence">
                        <span>Nimbus</span>
                        {ev}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const R = rows || PLATFORM_ROWS
  return (
    <div data-section="comparison-table" data-variant="platform" className="flex">
      <style>{CSS_PLATFORM}</style>
      <div className="nct-p-section">
        <div className="nct-p-header">
          <h2>{title || <>Learning tools, done <em>beautifully</em></>}</h2>
          <p>{intro || 'Nimbus brings learning, knowledge, AI and analytics into one platform.'}</p>
        </div>
        <div className="nct-p-wrap">
          <table className="nct-p">
            <caption>Nimbus platform capabilities at a glance</caption>
            <thead>
              <tr>
                <th scope="col">Platform capability</th>
                <th scope="col">What you can do with Nimbus</th>
              </tr>
            </thead>
            <tbody>
              {R.map(([h, d], i) => (
                <tr key={i}>
                  <th scope="row">{h}</th>
                  <td>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
