import { useMemo, useState } from 'react'
import './App.css'

const personas = {
  student: {
    label: 'Student',
    summary:
      'A busy student who wants a clean, low stress page that quickly turns broad tasks into a short action plan.',
    needs: ['clear priorities', 'simple language', 'quick planning', 'low visual clutter'],
  },
  professional: {
    label: 'Working professional',
    summary:
      'A working user who needs a compact dashboard that helps organise study around limited time and energy.',
    needs: ['time awareness', 'fast scanning', 'strong contrast', 'short reminders'],
  },
  beginner: {
    label: 'Beginner coder',
    summary:
      'A new web learner who needs guidance, reassurance, and a page that explains what to do next without overload.',
    needs: ['guided steps', 'visual clarity', 'short examples', 'encouragement'],
  },
}

const tips = {
  focus: [
    'Start with the smallest useful task and finish that before opening anything new.',
    'Keep only one main goal visible on screen so your attention is not split.',
    'Use a short timer block and review progress at the end instead of multitasking.',
  ],
  accessibility: [
    'Increase contrast and spacing so the content feels easier to read for longer sessions.',
    'Use headings and grouped sections so screen readers and human readers both benefit.',
    'Keep interactions simple and predictable so nothing feels hidden or confusing.',
  ],
  productivity: [
    'Turn big goals into one next action, one checkpoint, and one finish point.',
    'Use a short personalised message so the page feels relevant rather than generic.',
    'Show today’s plan first, then keep extra notes below for later reading.',
  ],
}

function App() {
  const [name, setName] = useState('Simran')
  const [persona, setPersona] = useState('student')
  const [goal, setGoal] = useState('focus')
  const [showHypothesis, setShowHypothesis] = useState(false)

  const selectedPersona = personas[persona]
  const selectedTips = tips[goal]

  const personalisedMessage = useMemo(() => {
    const firstName = name.trim() || 'there'
    if (persona === 'professional') {
      return `${firstName}, this version of the page keeps your study plan short and practical so it works around a busy schedule.`
    }
    if (persona === 'beginner') {
      return `${firstName}, this version keeps things simple and supportive so you can move through one step at a time.`
    }
    return `${firstName}, this version is designed to reduce overload and help you focus on the most important next action.`
  }, [name, persona])

  return (
    <div className="page-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Coding Web Technologies Sprint 2</p>
          <h1>Personalised Study Focus Dashboard</h1>
          <p className="lead">
            This React web app demonstrates a simple personalised interface. It changes
            content based on the selected user type and goal, then gives a short plan that
            feels clearer and more relevant to that user.
          </p>
        </div>
        <div className="hero-card">
          <h2>Design idea</h2>
          <p>
            A small amount of personalisation can make a study interface feel more useful,
            more readable, and less overwhelming.
          </p>
        </div>
      </header>

      <main className="main-grid">
        <section className="panel controls-panel" aria-labelledby="controls-heading">
          <h2 id="controls-heading">Try the personalisation</h2>

          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter a name"
            />
          </label>

          <label>
            User type
            <select value={persona} onChange={(event) => setPersona(event.target.value)}>
              {Object.entries(personas).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <fieldset>
            <legend>Main goal</legend>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="goal"
                  value="focus"
                  checked={goal === 'focus'}
                  onChange={(event) => setGoal(event.target.value)}
                />
                Focus
              </label>
              <label>
                <input
                  type="radio"
                  name="goal"
                  value="accessibility"
                  checked={goal === 'accessibility'}
                  onChange={(event) => setGoal(event.target.value)}
                />
                Accessibility
              </label>
              <label>
                <input
                  type="radio"
                  name="goal"
                  value="productivity"
                  checked={goal === 'productivity'}
                  onChange={(event) => setGoal(event.target.value)}
                />
                Productivity
              </label>
            </div>
          </fieldset>
        </section>

        <section className="panel preview-panel" aria-labelledby="preview-heading">
          <h2 id="preview-heading">Personalised preview</h2>
          <p className="message">{personalisedMessage}</p>

          <div className="persona-card">
            <h3>{selectedPersona.label} persona</h3>
            <p>{selectedPersona.summary}</p>
            <h4>Key needs</h4>
            <ul>
              {selectedPersona.needs.map((need) => (
                <li key={need}>{need}</li>
              ))}
            </ul>
          </div>

          <div className="plan-card">
            <h3>Suggested design response</h3>
            <ol>
              {selectedTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="panel report-panel" aria-labelledby="report-heading">
          <h2 id="report-heading">Brief project report</h2>
          <p>
            The purpose of this site personalisation is to present study support in a way that
            feels more relevant to different users. Instead of showing one fixed layout for
            everyone, the app adjusts the message, persona view, and suggested actions based on
            the selected profile and goal.
          </p>
          <p>
            This example is aimed at students, working users, and beginner coders who may all
            need the same core information but not in exactly the same form. A student may need
            calm prioritisation, a working user may need speed and clarity, and a beginner may
            need guidance and reassurance.
          </p>
          <button
            className="secondary-button"
            onClick={() => setShowHypothesis((value) => !value)}
          >
            {showHypothesis ? 'Hide hypothesis' : 'Show hypothesis'}
          </button>
          {showHypothesis && (
            <div className="hypothesis-card">
              <p>
                <strong>Assumption:</strong> users engage better when the page reflects their
                current needs and level of confidence.
              </p>
              <p>
                <strong>Hypothesis:</strong> if a study dashboard personalises language,
                priorities, and support style for the selected user type, then users will feel
                less overloaded and will identify their next action faster.
              </p>
              <p>
                <strong>How the example works:</strong> the app collects a name, a user type,
                and a goal. It then updates the interface in real time to show a more suitable
                message, user summary, and design response.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
