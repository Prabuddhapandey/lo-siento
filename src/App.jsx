import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { apology } from './content.js'

const SUNFLOWERS = [
  { x: 8, y: 14, size: 82, rotate: -12, stem: true, petal: '#c99535' },
  { x: 23, y: 8, size: 46, rotate: 14, petal: '#d3a13f' },
  { x: 85, y: 13, size: 67, rotate: 8, stem: true, petal: '#c68e2d' },
  { x: 93, y: 43, size: 44, rotate: -16, petal: '#d2a445' },
  { x: 7, y: 72, size: 64, rotate: 11, petal: '#c89533' },
  { x: 88, y: 80, size: 80, rotate: -8, stem: true, petal: '#d0a03a' },
  { x: 23, y: 90, size: 43, rotate: -7, petal: '#c58f32' },
  { x: 76, y: 92, size: 47, rotate: 13, petal: '#d5aa4d' },
]

const PETAL_ANGLES = [-3, 28, 59, 91, 121, 151, 182, 212, 243, 273, 304, 333]

function SketchSunflower({ flower, index, reduced, primary = false }) {
  const roughenId = `${primary ? 'primary-' : ''}flower-roughen-${index}`

  return (
    <motion.svg
      className={primary ? 'primary-sunflower' : 'sketch-sunflower'}
      viewBox="0 0 100 118"
      aria-hidden="true"
      focusable="false"
      style={primary ? undefined : { '--x': `${flower.x}%`, '--y': `${flower.y}%`, '--size': `${flower.size}px`, '--r': `${flower.rotate}deg`, '--phase': `${index * -0.47}s`, '--petal': flower.petal, x: '-50%', y: '-50%' }}
      initial={primary ? false : { opacity: 0, scale: reduced ? 1 : 0.45, rotate: flower.rotate - 7 }}
      animate={primary ? undefined : { opacity: 1, scale: 1, rotate: flower.rotate }}
      transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.1 + (index % 7) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <filter id={roughenId} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022 0.095" numOctaves="2" seed={index + 5} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.15" />
        </filter>
      </defs>
      {flower.stem && (
        <g className="flower-stem">
          <path d="M51 68 C48 83 55 98 49 116" />
          <path className="leaf" d="M51 91 C40 82 31 86 29 94 C38 97 45 96 51 91Z" />
        </g>
      )}
      <g className="petal-ring" filter={`url(#${roughenId})`}>
        {PETAL_ANGLES.map((angle, petalIndex) => (
          <ellipse key={angle} cx="50" cy={petalIndex % 3 === 0 ? 18.5 : 19.5} rx={petalIndex % 2 === 0 ? 8.2 : 7.5} ry={petalIndex % 4 === 0 ? 18.5 : 17} transform={`rotate(${angle} 50 51)`} />
        ))}
      </g>
      <g className="petal-contour" transform="translate(1.15 -.7)">
        {PETAL_ANGLES.map((angle, petalIndex) => (
          <ellipse key={angle} cx="50" cy={petalIndex % 3 === 0 ? 18.5 : 19.5} rx={petalIndex % 2 === 0 ? 8.2 : 7.5} ry={petalIndex % 4 === 0 ? 18.5 : 17} transform={`rotate(${angle} 50 51)`} />
        ))}
      </g>
      <g className="petal-scribbles">
        {PETAL_ANGLES.filter((_, petalIndex) => petalIndex % 2 === 0).map((angle) => (
          <path key={angle} d="M50 45 C48 37 49 29 50 21" transform={`rotate(${angle} 50 51)`} />
        ))}
      </g>
      <circle className="flower-center" cx="50" cy="51" r="15.5" />
      <circle className="center-edge" cx="50" cy="51" r="15.5" />
      <circle className="center-offset" cx="51.2" cy="50.2" r="14.7" />
      <g className="seed-marks">
        <path d="M39 46 q11 -9 22 0 M37 52 q13 -8 26 1 M40 58 q10 -6 21 0" />
        <path d="M44 38 q-5 13 0 25 M51 36 q-5 16 1 30 M58 39 q-5 13 0 24" />
      </g>
    </motion.svg>
  )
}

function DoodleLines({ reduced }) {
  const draw = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }
  return (
    <svg className="doodle-lines" viewBox="0 0 1440 1000" preserveAspectRatio="none" aria-hidden="true">
      <motion.g variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : 0.08 } } }} initial="hidden" animate="visible">
        <motion.path variants={draw} d="M93 282 C169 219 229 227 302 311 M273 287 l30 24 -35 8" />
        <motion.path variants={draw} d="M1148 302 C1240 219 1322 241 1374 315 M1166 285 l-20 27 35 -5" />
        <motion.path variants={draw} d="M104 657 C193 707 237 677 311 637 M283 625 l30 12 -24 20" />
        <motion.path variants={draw} d="M1160 660 C1242 724 1331 690 1380 625 M1174 651 l-26 6 14 22" />
        <motion.path className="dashed" variants={draw} d="M28 495 C174 431 221 525 337 492" />
        <motion.path className="dashed" variants={draw} d="M1095 493 C1201 452 1300 514 1422 452" />
        <motion.path className="pencil" variants={draw} d="M159 89 q28 27 58 0 q-28 54 -58 0 M1240 852 q35 -32 69 4 q-40 52 -69 -4" />
        <motion.path className="pencil" variants={draw} d="M357 906 c34 -34 62 34 95 0 c32 -32 59 29 90 -3" />
        <motion.path className="pencil" variants={draw} d="M945 80 c34 28 64 -25 96 4 c27 23 52 -20 80 3" />
      </motion.g>
      <g className="crosshatch">
        {[0, 1, 2, 3, 4].map((i) => <path key={`a${i}`} d={`M${86 + i * 11} 842 l62 48`} />)}
        {[0, 1, 2, 3, 4].map((i) => <path key={`b${i}`} d={`M${116 + i * 11} 829 l-48 65`} />)}
        {[0, 1, 2, 3].map((i) => <path key={`c${i}`} d={`M${1270 + i * 12} 105 l55 44`} />)}
        {[0, 1, 2, 3].map((i) => <path key={`d${i}`} d={`M${1293 + i * 12} 97 l-37 56`} />)}
      </g>
      <g className="scribble-stars">
        <path d="M183 373 l7 17 18 2 -14 11 5 19 -16 -10 -15 10 5 -18 -14 -12 18 -1Z" />
        <path d="M1261 449 l5 12 14 1 -11 9 4 13 -12 -7 -12 7 4 -13 -10 -9 13 -1Z" />
        <path d="M1084 807 l6 15 16 1 -13 10 4 16 -13 -9 -14 9 5 -16 -13 -10 16 -1Z" />
        <path d="M357 159 l5 12 13 1 -10 8 3 14 -11 -8 -12 8 4 -13 -11 -9 14 -1Z" />
      </g>
    </svg>
  )
}

function SmallMarks({ reduced }) {
  const marks = [
    ['', 'mark-a'], ['', 'mark-b'], ['', 'mark-c'], ['×', 'mark-d'], ['＋', 'mark-e'], ['', 'mark-f'],
    ['···', 'mark-g'], ['////', 'mark-h'], ['', 'mark-i'], ['×', 'mark-j'],
  ]
  return (
    <motion.div className="small-marks" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .8, delay: reduced ? 0 : .45 }}>
      {marks.map(([mark, className]) => <span className={className} key={className}>{mark}</span>)}
    </motion.div>
  )
}

function CenterPiece({ reduced }) {
  const [noteOpen, setNoteOpen] = useState(false)

  return (
    <motion.section className="center-piece" aria-labelledby="apology-title" initial={{ opacity: 0, scale: reduced ? 1 : .91, rotate: reduced ? 0 : -2 }} animate={{ opacity: 1, scale: 1, rotate: -.45 }} transition={{ duration: reduced ? 0 : .72, delay: reduced ? 0 : .82, ease: [0.22, 1, 0.36, 1] }}>
      <div className="title-lockup">
        <span className="emphasis" aria-hidden="true"><i /><i /><i /></span>
        <h1 id="apology-title" data-title={apology.title} aria-label={apology.title}>{apology.title}</h1>
        <SketchSunflower flower={{ rotate: 9, petal: '#cf9732' }} index={9} reduced={reduced} primary />
        <button
          className="note-trigger"
          type="button"
          aria-expanded={noteOpen}
          aria-controls="apology-note"
          onClick={() => setNoteOpen((open) => !open)}
        >
          {noteOpen ? 'Click here to hide the note' : 'Click here'}
        </button>
        <AnimatePresence initial={false}>
          {noteOpen && (
            <motion.p
              className="revealed-note"
              id="apology-note"
              aria-live="polite"
              initial={{ opacity: 0, y: reduced ? 0 : -9, scale: reduced ? 1 : .96, rotate: reduced ? 0 : -1.5 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: .7 }}
              exit={{ opacity: 0, y: reduced ? 0 : -5, scale: reduced ? 1 : .98 }}
              transition={{ duration: reduced ? 0 : .26, ease: [0.22, 1, 0.36, 1] }}
            >
              {apology.supportingLine}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default function App() {
  const reduced = useReducedMotion()
  return (
    <main className="sketch-page">
      <div className="paper-patches" aria-hidden="true" />
      <DoodleLines reduced={reduced} />
      <motion.div className="sunflower-field" aria-hidden="true" initial="hidden" animate="visible">
        {SUNFLOWERS.map((flower, index) => <SketchSunflower key={`${flower.x}-${flower.y}`} flower={flower} index={index} reduced={reduced} />)}
      </motion.div>
      <SmallMarks reduced={reduced} />
      <CenterPiece reduced={reduced} />
    </main>
  )
}
