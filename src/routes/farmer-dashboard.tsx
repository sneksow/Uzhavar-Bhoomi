import { createFileRoute } from '@tanstack/react-router'
import {
  AlarmClock,
  BellRing,
  CalendarDays,
  Camera,
  CheckCheck,
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  Droplets,
  Gauge,
  Lightbulb,
  Plus,
  Power,
  ShieldAlert,
  Siren,
  Sprout,
  Sun,
  Thermometer,
  Trash2,
  Wind,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { PortalGate } from '@/components/PortalGate'
import { Toggle } from '@/components/TopBar'
import { img, useApp } from '@/lib/app-context'
import {
  cameras,
  irrigationZones,
  sampleAlerts,
  sampleCrops,
  sampleReminders,
  tank as tankFixture,
  weather,
  type Crop,
  type ForecastDay,
  type Reminder,
  type SecurityAlert,
} from '@/lib/fixtures'

export const Route = createFileRoute('/farmer-dashboard')({
  head: () => ({ meta: [{ title: 'Farmer Dashboard · Uzhavar Bhoomi' }] }),
  component: () => (
    <PortalGate role="farmer">
      <FarmerDashboard />
    </PortalGate>
  ),
})

const DAY = 86_400_000
const daysSince = (iso: string) => Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / DAY))
const fmtDate = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
const fmtL = (n: number) => `${Math.round(n).toLocaleString('en-IN')} L`

function FarmerDashboard() {
  const { t, session } = useApp()
  const [crops, setCrops] = useState<Crop[]>(sampleCrops)
  const [tankLitres, setTankLitres] = useState(tankFixture.currentLitres)
  const [alerts, setAlerts] = useState<SecurityAlert[]>(sampleAlerts)

  const dailyNeed = crops.reduce((n, c) => n + c.litresPerDay, 0)
  const tankDays = dailyNeed ? tankLitres / dailyNeed : 0
  const openAlerts = alerts.filter((a) => a.severity !== 'low').length

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 pb-20 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Farmer dashboard</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t('welcome')}, {session?.name}
          </h1>
          <p className="mt-1 text-sm text-leaf-600 dark:text-leaf-300">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} · {weather.location}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat icon={Sprout} label="Active crops" value={String(crops.length)} />
        <Stat icon={Droplets} label="Water lasts" value={`${Math.floor(tankDays)} days`} />
        <Stat icon={ShieldAlert} label="Open alerts" value={String(openAlerts)} tone={openAlerts ? 'alert' : undefined} />
        <Stat icon={Thermometer} label="Right now" value={`${weather.now.temp}°C`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <WeatherCard className="lg:col-span-3" />
        <CropTracker crops={crops} setCrops={setCrops} className="lg:col-span-2" />
        <TankCard litres={tankLitres} dailyNeed={dailyNeed} />
        <IrrigationCard setTankLitres={setTankLitres} className="lg:col-span-2" />
        <SecurityCard alerts={alerts} setAlerts={setAlerts} />
      </div>
    </div>
  )
}

function Stat({ icon: Icon, label, value, tone }: { icon: typeof Sun; label: string; value: string; tone?: 'alert' }) {
  return (
    <div className="card flex items-center gap-3 p-4">
      <span className={`grid h-11 w-11 place-items-center rounded-xl ${tone ? 'bg-red-50 text-chilli-500 dark:bg-red-950/40' : 'bg-leaf-50 text-leaf-600 dark:bg-leaf-800 dark:text-leaf-200'}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs text-leaf-500">{label}</p>
        <p className="text-xl font-extrabold">{value}</p>
      </div>
    </div>
  )
}

function Panel({ title, icon: Icon, action, className = '', children }: { title: string; icon: typeof Sun; action?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <section className={`card p-5 sm:p-6 ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 text-base font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-leaf-50 text-leaf-600 dark:bg-leaf-800 dark:text-leaf-200">
            <Icon className="h-4 w-4" />
          </span>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}

/* ---------------- Weather ---------------- */

const weatherIcons: Record<ForecastDay['icon'], typeof Sun> = {
  sun: Sun,
  'cloud-sun': CloudSun,
  cloud: Cloud,
  rain: CloudRain,
  storm: CloudLightning,
}

function WeatherCard({ className }: { className?: string }) {
  const NowIcon = weatherIcons[weather.now.icon]
  const maxRain = Math.max(...weather.forecast.map((d) => d.rainMm), 1)
  return (
    <Panel title="Smart weather" icon={CloudSun} className={className} action={<span className="text-xs text-leaf-500">{weather.location}</span>}>
      <div className="grid gap-6 lg:grid-cols-[16rem_1fr_20rem]">
        <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-leaf-500 p-5 text-white">
          <div className="flex items-start justify-between">
            <p className="font-display text-5xl font-semibold">{weather.now.temp}°</p>
            <NowIcon className="h-10 w-10" />
          </div>
          <p className="mt-1 font-semibold">{weather.now.condition}</p>
          <p className="text-sm text-white/80">Feels like {weather.now.feelsLike}°</p>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="flex items-center gap-1"><Droplets className="h-4 w-4" />{weather.now.humidity}%</span>
            <span className="flex items-center gap-1"><Wind className="h-4 w-4" />{weather.now.windKmh} km/h</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {weather.forecast.map((d) => {
            const Icon = weatherIcons[d.icon]
            return (
              <div key={d.day} className="flex flex-col items-center rounded-xl bg-leaf-50/70 px-1 py-3 text-center dark:bg-leaf-800/60">
                <p className="text-xs font-semibold">{d.day}</p>
                <Icon className="my-2 h-6 w-6 text-leaf-600 dark:text-leaf-200" />
                <p className="text-sm font-bold">{d.high}°</p>
                <p className="text-xs text-leaf-500">{d.low}°</p>
                <div className="mt-2 flex h-12 w-3 items-end overflow-hidden rounded-full bg-sky-100 dark:bg-leaf-950" title={`${d.rainMm} mm rain`}>
                  <div className="w-full rounded-full bg-sky-500" style={{ height: `${(d.rainMm / maxRain) * 100}%` }} />
                </div>
                <p className="mt-1 text-[10px] text-leaf-500">{d.rainMm} mm</p>
              </div>
            )
          })}
        </div>

        <div className="space-y-2">
          <p className="eyebrow">Farming advisories</p>
          {weather.advisories.map((a) => (
            <p key={a} className="flex gap-2 rounded-xl bg-turmeric-400/10 p-3 text-sm text-leaf-800 dark:text-leaf-100">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-turmeric-500" /> {a}
            </p>
          ))}
        </div>
      </div>
    </Panel>
  )
}

/* ---------------- Crop sowing tracker ---------------- */

function CropTracker({ crops, setCrops, className }: { crops: Crop[]; setCrops: React.Dispatch<React.SetStateAction<Crop[]>>; className?: string }) {
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', field: '', sownOn: new Date().toISOString().slice(0, 10), durationDays: 90 })

  const addCrop = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setCrops((c) => [
      ...c,
      { id: crypto.randomUUID(), name: form.name.trim(), emoji: '🌱', field: form.field.trim() || 'New plot', acres: 0.5, sownOn: form.sownOn, durationDays: Number(form.durationDays) || 90, litresPerDay: 300 },
    ])
    setForm({ ...form, name: '', field: '' })
    setAdding(false)
  }

  return (
    <Panel
      title="Crop sowing tracker"
      icon={Sprout}
      className={className}
      action={
        <button onClick={() => setAdding((a) => !a)} className="btn-ghost !px-3 !py-1.5 !text-xs">
          <Plus className="h-3.5 w-3.5" /> Add crop
        </button>
      }
    >
      {adding && (
        <form onSubmit={addCrop} className="mb-5 grid gap-2 rounded-2xl bg-leaf-50 p-3 sm:grid-cols-[1fr_1fr_auto_auto_auto] dark:bg-leaf-800">
          <input className="input !py-2" placeholder="Crop name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input !py-2" placeholder="Field / plot" value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} />
          <input className="input !py-2" type="date" value={form.sownOn} onChange={(e) => setForm({ ...form, sownOn: e.target.value })} aria-label="Sown on" />
          <input className="input !w-28 !py-2" type="number" min={10} value={form.durationDays} onChange={(e) => setForm({ ...form, durationDays: Number(e.target.value) })} aria-label="Days to harvest" />
          <button className="btn-primary !py-2">Save</button>
        </form>
      )}
      <ul className="space-y-4">
        {crops.map((c) => {
          const elapsed = daysSince(c.sownOn)
          const pct = Math.min(100, (elapsed / c.durationDays) * 100)
          const left = Math.max(0, c.durationDays - elapsed)
          const harvest = new Date(new Date(c.sownOn).getTime() + c.durationDays * DAY)
          const stage = pct >= 100 ? 'Ready to harvest' : pct > 75 ? 'Maturing' : pct > 40 ? 'Flowering' : pct > 15 ? 'Vegetative' : 'Germination'
          return (
            <li key={c.id} className="rounded-2xl border border-leaf-100 p-4 dark:border-leaf-800">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-leaf-50 text-2xl dark:bg-leaf-800">{c.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{c.name}</p>
                  <p className="text-xs text-leaf-500">
                    {c.field} · sown {fmtDate(new Date(c.sownOn))}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">Day {elapsed}<span className="font-medium text-leaf-400"> / {c.durationDays}</span></p>
                  <p className="flex items-center justify-end gap-1 text-xs text-leaf-500">
                    <CalendarDays className="h-3 w-3" /> Harvest ~{fmtDate(harvest)}
                  </p>
                </div>
                <button onClick={() => setCrops((all) => all.filter((x) => x.id !== c.id))} className="p-1 text-leaf-300 hover:text-chilli-500" aria-label={`Remove ${c.name}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-leaf-100 dark:bg-leaf-800">
                <div className={`h-full rounded-full ${pct >= 100 ? 'bg-turmeric-500' : 'bg-leaf-500'}`} style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-1.5 flex justify-between text-xs">
                <span className="font-semibold text-leaf-600 dark:text-leaf-300">{stage}</span>
                <span className="text-leaf-500">{left ? `${left} days to harvest` : 'Harvest now'}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}

/* ---------------- Rainwater tank ---------------- */

function TankCard({ litres, dailyNeed }: { litres: number; dailyNeed: number }) {
  const [usage, setUsage] = useState(dailyNeed)
  useEffect(() => setUsage(dailyNeed), [dailyNeed])
  const pct = (litres / tankFixture.capacityLitres) * 100
  const days = usage ? litres / usage : 0
  const history = [...tankFixture.history.slice(0, -1), litres]
  const maxH = tankFixture.capacityLitres

  return (
    <Panel title="Rainwater tank" icon={Droplets}>
      <div className="flex items-center gap-5">
        <div className="relative h-40 w-28 shrink-0 overflow-hidden rounded-[1.25rem] border-4 border-sky-100 bg-sky-50 dark:border-leaf-800 dark:bg-leaf-950">
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sky-600 to-sky-400 transition-all duration-700" style={{ height: `${pct}%` }}>
            <div className="h-1.5 w-full bg-sky-300/70" />
          </div>
          <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-lg font-extrabold text-white drop-shadow">{Math.round(pct)}%</p>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-leaf-500">Stored now</p>
            <p className="text-2xl font-extrabold">{fmtL(litres)}</p>
            <p className="text-xs text-leaf-500">of {fmtL(tankFixture.capacityLitres)}</p>
          </div>
          <div className="rounded-xl bg-leaf-50 px-3 py-2 dark:bg-leaf-800">
            <p className="text-xs text-leaf-500">Sustains irrigation for</p>
            <p className="text-xl font-extrabold text-leaf-700 dark:text-leaf-100">{days.toFixed(1)} days</p>
          </div>
        </div>
      </div>

      <label className="mt-5 block">
        <span className="flex justify-between text-xs">
          <span className="font-medium">Daily irrigation use</span>
          <span className="font-bold">{fmtL(usage)}/day</span>
        </span>
        <input type="range" min={500} max={8000} step={50} value={usage} onChange={(e) => setUsage(Number(e.target.value))} className="mt-2 w-full accent-leaf-600" />
      </label>

      <div className="mt-5">
        <p className="mb-2 text-xs font-medium text-leaf-500">Stored volume · last 7 days</p>
        <div className="flex h-20 items-end gap-1.5">
          {history.map((v, i) => (
            <div key={i} className="group relative flex-1">
              <div className={`rounded-t-md ${i === history.length - 1 ? 'bg-sky-500' : 'bg-sky-200 dark:bg-sky-900'}`} style={{ height: `${(v / maxH) * 80}px` }} />
              <span className="pointer-events-none absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded bg-leaf-900 px-1.5 py-0.5 text-[10px] whitespace-nowrap text-white group-hover:block">
                {fmtL(v)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}

/* ---------------- Irrigation ---------------- */

function IrrigationCard({ setTankLitres, className }: { setTankLitres: React.Dispatch<React.SetStateAction<number>>; className?: string }) {
  const [running, setRunning] = useState<Record<string, boolean>>({})
  const [delivered, setDelivered] = useState<Record<string, number>>({})
  const [auto, setAuto] = useState(true)
  const [reminders, setReminders] = useState<Reminder[]>(sampleReminders)
  const [newReminder, setNewReminder] = useState({ zone: irrigationZones[0].name, time: '06:30', repeat: 'Daily' })

  const flowing = useMemo(() => irrigationZones.filter((z) => running[z.id]), [running])

  // Simulated flow: one tick = one minute of watering, run every second for the demo.
  useEffect(() => {
    if (!flowing.length) return
    const id = setInterval(() => {
      setDelivered((d) => {
        const next = { ...d }
        flowing.forEach((z) => (next[z.id] = (next[z.id] ?? 0) + z.flowLpm))
        return next
      })
      setTankLitres((l) => Math.max(0, l - flowing.reduce((n, z) => n + z.flowLpm, 0)))
    }, 1000)
    return () => clearInterval(id)
  }, [flowing, setTankLitres])

  return (
    <Panel
      title="Remote irrigation control"
      icon={Power}
      className={className}
      action={
        <label className="flex items-center gap-2 text-xs font-medium">
          AI auto-schedule <Toggle checked={auto} onChange={setAuto} label="AI auto-schedule" />
        </label>
      }
    >
      <div className="grid gap-3 md:grid-cols-3">
        {irrigationZones.map((z) => {
          const on = !!running[z.id]
          return (
            <div key={z.id} className={`rounded-2xl border p-4 transition ${on ? 'border-sky-300 bg-sky-50 dark:border-sky-700 dark:bg-sky-950/30' : 'border-leaf-100 dark:border-leaf-800'}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold">{z.name}</p>
                  <p className="text-xs text-leaf-500">{z.crop} · {z.flowLpm} L/min</p>
                </div>
                <button
                  onClick={() => setRunning((r) => ({ ...r, [z.id]: !on }))}
                  className={`grid h-10 w-10 place-items-center rounded-full transition ${on ? 'bg-sky-500 text-white shadow-md' : 'bg-leaf-100 text-leaf-600 dark:bg-leaf-800 dark:text-leaf-200'}`}
                  aria-label={on ? `Stop ${z.name}` : `Start ${z.name}`}
                  aria-pressed={on}
                >
                  <Power className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-leaf-100 dark:bg-leaf-800">
                {on && <div className="water-flow h-full w-full" />}
              </div>
              <div className="mt-3 flex justify-between text-xs">
                <span className="flex items-center gap-1 text-leaf-600 dark:text-leaf-300">
                  <Gauge className="h-3.5 w-3.5" /> Soil moisture {z.moisture}%
                </span>
                <span className="font-semibold">{on ? 'Valve open' : 'Valve closed'}</span>
              </div>
              {(delivered[z.id] ?? 0) > 0 && <p className="mt-1 text-xs text-sky-600">{fmtL(delivered[z.id])} delivered</p>}
              {auto && z.moisture < 40 && !on && <p className="mt-2 rounded-lg bg-turmeric-400/15 px-2 py-1 text-[11px] font-medium text-leaf-800 dark:text-leaf-100">AI suggests watering — moisture is low</p>}
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold">
          <AlarmClock className="h-4 w-4 text-leaf-500" /> Watering reminders
        </p>
        <ul className="space-y-2">
          {reminders.map((r) => (
            <li key={r.id} className="flex items-center gap-3 rounded-xl bg-leaf-50 px-4 py-2.5 text-sm dark:bg-leaf-800">
              <span className="font-bold">{r.time}</span>
              <span className="flex-1 truncate text-leaf-700 dark:text-leaf-200">{r.zone}</span>
              <span className="text-xs text-leaf-500">{r.repeat}</span>
              <button onClick={() => setReminders((all) => all.filter((x) => x.id !== r.id))} className="text-leaf-300 hover:text-chilli-500" aria-label="Delete reminder">
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setReminders((all) => [...all, { id: crypto.randomUUID(), ...newReminder }].sort((a, b) => a.time.localeCompare(b.time)))
          }}
          className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto_auto_auto]"
        >
          <select className="input !py-2" value={newReminder.zone} onChange={(e) => setNewReminder({ ...newReminder, zone: e.target.value })}>
            {irrigationZones.map((z) => (
              <option key={z.id}>{z.name}</option>
            ))}
          </select>
          <input type="time" className="input !py-2" value={newReminder.time} onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })} aria-label="Time" />
          <select className="input !py-2" value={newReminder.repeat} onChange={(e) => setNewReminder({ ...newReminder, repeat: e.target.value })}>
            <option>Daily</option>
            <option>Alternate days</option>
            <option>Weekly</option>
          </select>
          <button className="btn-primary !py-2">
            <Plus className="h-4 w-4" /> Add
          </button>
        </form>
      </div>
    </Panel>
  )
}

/* ---------------- Security ---------------- */

const intrusions = [
  { kind: 'Wild elephant near east fence', camera: 'Cam 2 · East fence' },
  { kind: 'Cattle entering paddy field', camera: 'Cam 1 · Main gate' },
  { kind: 'Unknown person in Plot B at night', camera: 'Cam 3 · Plot B' },
]

function SecurityCard({ alerts, setAlerts }: { alerts: SecurityAlert[]; setAlerts: React.Dispatch<React.SetStateAction<SecurityAlert[]>> }) {
  const [live, setLive] = useState<SecurityAlert | null>(null)

  const simulate = () => {
    const pick = intrusions[Math.floor(Math.random() * intrusions.length)]
    const alert: SecurityAlert = { id: crypto.randomUUID(), ...pick, severity: 'high', minutesAgo: 0, confidence: 90 + Math.floor(Math.random() * 9) }
    setAlerts((a) => [alert, ...a])
    setLive(alert)
    if ('vibrate' in navigator) navigator.vibrate?.([200, 100, 200])
  }

  const sev = {
    high: 'bg-red-50 text-chilli-500 dark:bg-red-950/40',
    medium: 'bg-turmeric-400/15 text-turmeric-500',
    low: 'bg-leaf-50 text-leaf-600 dark:bg-leaf-800 dark:text-leaf-200',
  }

  return (
    <Panel
      title="AI farm security"
      icon={ShieldAlert}
      action={
        <button onClick={simulate} className="btn-ghost !px-3 !py-1.5 !text-xs">
          <Siren className="h-3.5 w-3.5" /> Test alert
        </button>
      }
    >
      {live && (
        <div className="pulse-alert mb-4 flex items-start gap-3 rounded-2xl bg-chilli-500 p-4 text-white">
          <BellRing className="mt-0.5 h-5 w-5 shrink-0 animate-bounce" />
          <div className="flex-1">
            <p className="text-sm font-bold">Intrusion detected!</p>
            <p className="text-sm text-white/90">{live.kind}</p>
            <p className="text-xs text-white/75">{live.camera} · {live.confidence}% confidence</p>
          </div>
          <button onClick={() => setLive(null)} className="rounded-lg bg-white/20 px-2 py-1 text-xs font-semibold hover:bg-white/30">
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {cameras.map((c) => {
          const hot = live?.camera === c.name
          return (
            <div key={c.id} className={`relative aspect-square overflow-hidden rounded-xl ${hot ? 'ring-2 ring-chilli-500' : ''}`}>
              <img src={img(c.image, 240)} alt={c.name} loading="lazy" className={`h-full w-full scale-150 object-cover grayscale-[35%] ${c.position}`} />
              <span className="absolute top-1.5 left-1.5 flex items-center gap-1 rounded bg-black/55 px-1.5 py-0.5 text-[9px] font-bold text-white">
                <span className={`h-1.5 w-1.5 rounded-full ${hot ? 'bg-chilli-500' : 'bg-red-500'} animate-pulse`} /> LIVE
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-1.5 pt-4 pb-1 text-[10px] font-medium text-white">
                <Camera className="mr-1 inline h-2.5 w-2.5" />
                {c.name.split(' · ')[1]}
              </span>
            </div>
          )
        })}
      </div>

      <ul className="mt-4 space-y-2">
        {alerts.slice(0, 5).map((a) => (
          <li key={a.id} className="flex items-start gap-3 rounded-xl border border-leaf-100 p-3 dark:border-leaf-800">
            <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase ${sev[a.severity]}`}>{a.severity}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{a.kind}</p>
              <p className="text-xs text-leaf-500">
                {a.camera} · {a.minutesAgo === 0 ? 'just now' : a.minutesAgo < 60 ? `${a.minutesAgo} min ago` : `${Math.round(a.minutesAgo / 60)} h ago`}
              </p>
            </div>
            <button onClick={() => setAlerts((all) => all.filter((x) => x.id !== a.id))} className="text-leaf-300 hover:text-leaf-600" aria-label="Acknowledge alert" title="Acknowledge">
              <CheckCheck className="h-4 w-4" />
            </button>
          </li>
        ))}
        {alerts.length === 0 && <li className="rounded-xl bg-leaf-50 p-3 text-center text-sm text-leaf-600 dark:bg-leaf-800">All clear — no threats detected.</li>}
      </ul>
    </Panel>
  )
}
