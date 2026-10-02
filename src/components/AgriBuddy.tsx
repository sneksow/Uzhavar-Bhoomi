import { Bot, Mic, MicOff, Plus, Send, Sparkles, Volume2, VolumeX, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useApp } from '@/lib/app-context'
import { buddySuggestions, products, sampleBuddyAnswer, type Product } from '@/lib/fixtures'

interface Message {
  role: 'user' | 'buddy'
  text: string
  products?: Product[]
}

// Minimal typing for the Web Speech recognition API (prefixed in Chrome/Safari).
interface Recognition {
  lang: string
  interimResults: boolean
  continuous: boolean
  start: () => void
  stop: () => void
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
}

function getRecognition(): Recognition | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as Record<string, new () => Recognition>
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition
  return Ctor ? new Ctor() : null
}

export function AgriBuddy({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (p: Product) => void }) {
  const { t, settings, speechLang, session } = useApp()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'buddy',
      text: `Vanakkam ${session?.name ?? ''}! I'm Agri-Buddy. Tell me a health goal or ask about today's fair rates, and I'll suggest fresh farm produce for you.`,
    },
  ])
  const [input, setInput] = useState('')
  const [listening, setListening] = useState(false)
  const [thinking, setThinking] = useState(false)
  const [speakReplies, setSpeakReplies] = useState(true)
  const recognition = useRef<Recognition | null>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const [voiceSupported, setVoiceSupported] = useState(false)

  useEffect(() => {
    setVoiceSupported(!!getRecognition())
  }, [])

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  useEffect(() => {
    if (!open) {
      recognition.current?.stop()
      window.speechSynthesis?.cancel()
    }
  }, [open])

  const speak = (text: string) => {
    if (!settings.voice || !speakReplies || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = speechLang
    u.rate = 1
    window.speechSynthesis.speak(u)
  }

  const ask = (question: string) => {
    const q = question.trim()
    if (!q) return
    setMessages((m) => [...m, { role: 'user', text: q }])
    setInput('')
    setThinking(true)
    // Sample answers for now — Gemini-powered responses arrive in a later milestone.
    setTimeout(() => {
      const answer = sampleBuddyAnswer(q)
      const picks = answer.productIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => !!p)
        .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
        .slice(0, 4)
      setMessages((m) => [...m, { role: 'buddy', text: answer.text, products: picks }])
      setThinking(false)
      speak(answer.text)
    }, 700)
  }

  const toggleMic = () => {
    if (listening) {
      recognition.current?.stop()
      return
    }
    const rec = getRecognition()
    if (!rec) return
    rec.lang = speechLang
    rec.interimResults = true
    rec.continuous = false
    let finalText = ''
    rec.onresult = (e) => {
      finalText = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join('')
      setInput(finalText)
    }
    rec.onend = () => {
      setListening(false)
      if (finalText) ask(finalText)
    }
    rec.onerror = () => setListening(false)
    recognition.current = rec
    setListening(true)
    rec.start()
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-leaf-950/30 transition-opacity lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <aside
        className={`fixed right-0 bottom-0 z-50 flex h-[85vh] w-full flex-col rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 sm:right-4 sm:bottom-4 sm:h-[38rem] sm:w-[25rem] sm:rounded-3xl dark:bg-leaf-900 ${open ? 'translate-y-0' : 'pointer-events-none translate-y-[110%]'}`}
        aria-label={t('agriBuddy')}
      >
        <header className="flex items-center gap-3 rounded-t-3xl bg-leaf-600 px-5 py-4 text-white">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
            <Bot className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="font-bold">{t('agriBuddy')}</p>
            <p className="text-xs text-leaf-100">AI diet & market assistant</p>
          </div>
          {settings.voice && (
            <button
              onClick={() => {
                setSpeakReplies((s) => !s)
                window.speechSynthesis?.cancel()
              }}
              className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/15"
              aria-label={speakReplies ? 'Mute spoken replies' : 'Speak replies aloud'}
              title={speakReplies ? 'Mute spoken replies' : 'Speak replies aloud'}
            >
              {speakReplies ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          )}
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/15" aria-label="Close assistant">
            <X className="h-4 w-4" />
          </button>
        </header>

        <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[88%] ${m.role === 'user' ? 'rounded-2xl rounded-br-md bg-leaf-600 px-4 py-2.5 text-sm text-white' : ''}`}>
                {m.role === 'buddy' ? (
                  <div className="rounded-2xl rounded-bl-md bg-leaf-50 px-4 py-3 text-sm leading-relaxed text-leaf-900 dark:bg-leaf-800 dark:text-leaf-50">
                    {m.text}
                  </div>
                ) : (
                  m.text
                )}
                {m.products && m.products.length > 0 && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {m.products.map((p) => (
                      <div key={p.id} className="flex items-center gap-2 rounded-xl border border-leaf-100 bg-white p-2 dark:border-leaf-700 dark:bg-leaf-900">
                        <span className="text-xl">{p.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold">{p.name}</p>
                          <p className="text-[11px] text-leaf-500">₹{p.price} · {p.unit}</p>
                        </div>
                        <button
                          onClick={() => onAdd(p)}
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-leaf-600 text-white hover:bg-leaf-700"
                          aria-label={`Add ${p.name} to cart`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex items-center gap-2 text-sm text-leaf-500">
              <Sparkles className="h-4 w-4 animate-pulse" /> Agri-Buddy is thinking…
            </div>
          )}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {buddySuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="rounded-full border border-leaf-200 px-3 py-1.5 text-xs font-medium text-leaf-700 hover:bg-leaf-50 dark:border-leaf-700 dark:text-leaf-200 dark:hover:bg-leaf-800"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            ask(input)
          }}
          className="flex items-center gap-2 border-t border-leaf-100 p-3 dark:border-leaf-800"
        >
          {settings.voice && voiceSupported && (
            <button
              type="button"
              onClick={toggleMic}
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition ${listening ? 'pulse-alert bg-chilli-500 text-white' : 'bg-leaf-50 text-leaf-700 hover:bg-leaf-100 dark:bg-leaf-800 dark:text-leaf-100'}`}
              aria-label={listening ? 'Stop listening' : 'Speak your question'}
            >
              {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          )}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={listening ? 'Listening…' : t('askPlaceholder')}
            className="input !py-2.5"
          />
          <button type="submit" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-leaf-600 text-white hover:bg-leaf-700" aria-label="Send">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </aside>
    </>
  )
}
