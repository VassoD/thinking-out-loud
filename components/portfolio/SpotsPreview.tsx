'use client'

import { useState, type CSSProperties } from 'react'
import styles from './SpotsPreview.module.css'

// Fictional places keep the portfolio preview independent of saved account data.
// Paper tones and category colours come from the Spots interface.
const places = [
  { id: 1, name: 'Café du Passage', category: 'Coffee', detail: 'Cafe / Coffee', color: '#b45309', x: 43, y: 43 },
  { id: 2, name: 'Maison du Café', category: 'Coffee', detail: 'Cafe / Coffee', color: '#b45309', x: 69, y: 28 },
  { id: 3, name: 'Jardin tranquille', category: 'Sights', detail: 'Sights / Attractions', color: '#059669', x: 29, y: 73 },
  { id: 4, name: 'Galerie du Coin', category: 'Sights', detail: 'Sights / Attractions', color: '#059669', x: 75, y: 66 },
] as const
const filters = ['All', 'Coffee', 'Sights'] as const
type Filter = typeof filters[number]

function StreetMap() {
  return (
    <svg className={styles.streetMap} viewBox="0 0 440 320" preserveAspectRatio="none" aria-hidden="true">
      <rect width="440" height="320" fill="#e9e4d9" />
      <g fill="#ded8ca" stroke="#d3cbbb" strokeWidth="0.7">
        <path d="M 18 12 H 100 L 89 65 H 7 Z M 119 12 H 185 L 180 65 H 109 Z M 204 12 H 275 L 278 65 H 199 Z M 295 12 H 376 L 395 65 H 298 Z M 397 12 H 440 V 65 H 417 Z" />
        <path d="M 5 85 H 86 L 74 138 H 0 Z M 106 85 H 178 L 173 138 H 94 Z M 199 85 H 279 L 282 138 H 193 Z M 300 85 H 402 L 422 138 H 303 Z" />
        <path d="M 0 158 H 70 L 58 216 H 0 Z M 92 158 H 171 L 165 216 H 80 Z M 192 158 H 282 L 285 216 H 187 Z M 305 158 H 431 L 440 198 L 308 216 Z" />
        <path d="M 0 238 H 53 L 39 305 H 0 Z M 182 238 H 285 L 285 267 L 210 286 H 177 Z M 312 235 L 440 216 V 247 L 313 267 Z" />
      </g>
      <path d="M 78 238 H 164 L 158 302 H 65 Z" fill="#cdd7bb" stroke="#bac8a5" />
      <path d="M 85 287 L 151 252 M 82 253 L 146 286" stroke="#e9ecde" strokeWidth="5" />
      <g stroke="#f7f3ea" fill="none" strokeWidth="9">
        <path d="M -10 76 H 460 M -10 148 H 460 M -10 227 H 300 M 110 -10 L 42 330 M 192 -10 L 164 330 M 287 -10 L 301 330 M 386 -10 L 448 174" />
        <path d="M -20 197 L 460 20" strokeWidth="13" />
      </g>
      <path d="M 190 345 C 245 300 288 307 346 290 S 416 268 474 284" stroke="#f7f3ea" strokeWidth="51" fill="none" />
      <path d="M 190 345 C 245 300 288 307 346 290 S 416 268 474 284" stroke="#b8cece" strokeWidth="33" fill="none" />
      <path d="M 330 276 L 343 307" stroke="#f7f3ea" strokeWidth="11" />
      <g fill="#8a7d69" fontFamily="sans-serif" fontSize="8" letterSpacing="1.4">
        <text x="38" y="37">TEMPLE</text>
        <text x="244" y="186">LE MARAIS</text>
        <text x="111" y="153" fontSize="6" letterSpacing="0.8">RUE DES ARCHIVES</text>
        <text x="369" y="299" fill="#617e80" fontStyle="italic" fontSize="8">la Seine</text>
      </g>
    </svg>
  )
}

export default function SpotsPreview({ compact = false }: { compact?: boolean }) {
  const [filter, setFilter] = useState<Filter>('All')
  const [selectedId, setSelectedId] = useState<number>(1)
  const visible = places.filter((place) => filter === 'All' || place.category === filter)
  const selected = visible.find((place) => place.id === selectedId) ?? visible[0]

  function changeFilter(next: Filter) {
    setFilter(next)
    const nextPlaces = places.filter((place) => next === 'All' || place.category === next)
    if (!nextPlaces.some((place) => place.id === selectedId)) setSelectedId(nextPlaces[0].id)
  }

  return (
    <figure className={`${styles.preview} ${compact ? styles.compact : ''}`} aria-hidden={compact || undefined} aria-label={compact ? undefined : 'Spots interface preview with sample places'}>
      <header className={styles.header}>
        <div><span className={styles.wordmark}>Spots</span><p>4 places · 1 city · 2 accounts</p></div>
        <span className={styles.city}>Paris, FR <span aria-hidden="true">↗</span></span>
      </header>
      <div className={styles.toolbar}>
        <div className={styles.filters} role={compact ? undefined : 'group'} aria-label={compact ? undefined : 'Filter sample places'}>
          {filters.map((option) => {
            const content = <>{option}<span>{option === 'All' ? 4 : 2}</span></>
            return compact
              ? <span key={option} className={styles.filter} data-active={filter === option}>{content}</span>
              : <button key={option} type="button" className={styles.filter} aria-pressed={filter === option} data-active={filter === option} onClick={() => changeFilter(option)}>{content}</button>
          })}
        </div>
        <span className={styles.count} aria-live={compact ? undefined : 'polite'}>{visible.length} on the map</span>
      </div>
      <div className={styles.body}>
        <div className={styles.list}>
          <p className={styles.listLabel}>Your places <span>↘</span></p>
          {visible.map((place) => {
            const content = <><span className={styles.number}>{String(place.id).padStart(2, '0')}</span><span className={styles.placeCopy}><strong>{place.name}</strong><span>{place.detail}</span></span><span className={styles.rowArrow} aria-hidden="true">↗</span></>
            const style = { '--pin-color': place.color } as CSSProperties
            return compact
              ? <div key={place.id} className={styles.place} data-selected={selected.id === place.id} style={style}>{content}</div>
              : <button key={place.id} type="button" className={styles.place} data-selected={selected.id === place.id} style={style} aria-label={`Select ${place.name}`} aria-pressed={selected.id === place.id} onClick={() => setSelectedId(place.id)}>{content}</button>
          })}
        </div>
        <div className={styles.map} role={compact ? undefined : 'group'} aria-label={compact ? undefined : 'Map of sample places'}>
          <StreetMap />
          <span className={styles.north} aria-hidden="true">↑<span>N</span></span>
          {visible.map((place) => {
            const style = { left: `${place.x}%`, top: `${place.y}%`, '--pin-color': place.color } as CSSProperties
            const content = <span className={styles.pinShape}><span>{place.id}</span></span>
            return compact
              ? <span key={place.id} className={styles.pin} data-selected={selected.id === place.id} style={style}>{content}</span>
              : <button key={place.id} type="button" className={styles.pin} data-selected={selected.id === place.id} style={style} aria-label={`Show ${place.name} on map`} aria-pressed={selected.id === place.id} onClick={() => setSelectedId(place.id)}>{content}</button>
          })}
          <div className={styles.popup} style={{ left: `${selected.x}%`, top: `${selected.y}%` }} aria-live={compact ? undefined : 'polite'}><strong>{selected.name}</strong><span>{selected.detail}</span></div>
          <span className={styles.mapLabel}>One list. One map.</span>
        </div>
      </div>
      <figcaption className={styles.caption}><span>Sample places · simplified map</span><span>{compact ? 'Interface preview' : 'Select a place. Follow its pin.'}</span></figcaption>
    </figure>
  )
}
