import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  BadgeIndianRupee,
  CloudSun,
  Droplets,
  HeartPulse,
  Languages,
  Mic,
  ShieldAlert,
  ShoppingBasket,
  Sprout,
  Truck,
  Users,
} from 'lucide-react'
import { img, useApp } from '@/lib/app-context'
import { categories } from '@/lib/fixtures'

export const Route = createFileRoute('/')({
  component: Landing,
})

function Landing() {
  const { t, openAuth } = useApp()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-16 lg:pb-24">
          <div>
            <p className="eyebrow">உழவர் பூமி · Farmer to family, directly</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-leaf-900 sm:text-5xl lg:text-6xl dark:text-white">
              {t('heroTitle')}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-leaf-700 dark:text-leaf-200">{t('heroSub')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => openAuth('register')} className="btn-primary !px-7 !py-3.5 !text-base">
                {t('register')} <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => openAuth('login')} className="btn-ghost !px-7 !py-3.5 !text-base">
                {t('signIn')}
              </button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6">
              {[
                ['0', 'middlemen'],
                ['100%', 'price to farmer'],
                ['23', 'languages'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl font-semibold text-leaf-700 dark:text-leaf-200">{v}</dt>
                  <dd className="mt-1 text-sm text-leaf-600 dark:text-leaf-300">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-leaf-900/5">
              <img
                src="/img/hero.jpg"
                alt="A smiling farmer holding a basket of fresh vegetables in a green paddy field"
                className="aspect-[11/9] w-full object-cover"
                fetchPriority="high"
              />
            </div>
            <div className="card absolute -bottom-6 left-4 flex items-center gap-3 px-4 py-3 shadow-lg sm:left-8">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-turmeric-400/20 text-turmeric-500">
                <BadgeIndianRupee className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-leaf-500">Tomato, today</p>
                <p className="text-sm font-bold">
                  ₹28/kg <span className="font-medium text-leaf-400 line-through">₹45</span>{' '}
                  <span className="text-leaf-600">farmer keeps it all</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-y border-leaf-100 bg-white py-20 dark:border-leaf-800 dark:bg-leaf-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="eyebrow">The problem</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Farmers grow the food. Middlemen keep the money.
            </h2>
            <p className="mt-4 text-leaf-700 dark:text-leaf-200">
              Intermediaries buy produce at unfairly low prices and sell it to families at high prices. The farmer goes
              into debt; the customer overpays. Uzhavar Bhoomi removes the chain in between.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <PriceChain
              title="Today, through middlemen"
              tone="bad"
              steps={[
                ['Farmer', '₹8'],
                ['Agent', '₹14'],
                ['Wholesaler', '₹22'],
                ['Retailer', '₹40'],
              ]}
              note="Farmer earns ₹8 of the ₹40 a family pays for 1 kg of tomatoes."
            />
            <PriceChain
              title="With Uzhavar Bhoomi"
              tone="good"
              steps={[
                ['Farmer', '₹28'],
                ['Your home', '₹28'],
              ]}
              note="Farmer earns 3.5× more. Family saves 30%. Same fresh tomatoes."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow text-center">How it works</p>
          <h2 className="mt-3 text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Three steps from field to family
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Sprout, title: 'Farmers list harvest', body: 'Farmers post fresh produce with their own fair price — from their phone, in their own language.' },
              { icon: ShoppingBasket, title: 'Families order direct', body: 'Customers browse 12 categories and buy straight from the farm, seeing exactly who grew it.' },
              { icon: Truck, title: 'Fresh to your door', body: 'Produce is picked to order and delivered fresh. Payment goes to the farmer in full.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="card p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-100 text-leaf-700 dark:bg-leaf-800 dark:text-leaf-100">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-display text-4xl font-semibold text-leaf-100 dark:text-leaf-800">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-leaf-600 dark:text-leaf-300">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two audiences */}
      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
          <Audience
            eyebrow="For customers"
            title="Honest food, honest prices"
            image="/img/vegetables.jpg"
            features={[
              { icon: ShoppingBasket, text: '100+ farm-fresh items across 12 categories' },
              { icon: HeartPulse, text: 'Agri-Buddy AI suggests foods for your health goals' },
              { icon: Mic, text: 'Ask by voice, in your own language' },
            ]}
            cta="Join as Customer"
            onCta={() => openAuth('register', 'customer')}
          />
          <Audience
            eyebrow="For farmers"
            title="A smart farm in your pocket"
            image="/img/farmer.jpg"
            features={[
              { icon: Droplets, text: 'Rainwater tank analytics & remote irrigation control' },
              { icon: CloudSun, text: 'Weather forecasts with farming advisories' },
              { icon: ShieldAlert, text: 'AI intrusion alerts when animals enter your land' },
            ]}
            cta="Join as Farmer"
            onCta={() => openAuth('register', 'farmer')}
          />
        </div>
      </section>

      {/* Categories teaser */}
      <section className="border-t border-leaf-100 bg-white py-20 dark:border-leaf-800 dark:bg-leaf-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">What's growing</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Twelve categories, one farm family</h2>
            </div>
            <button onClick={() => openAuth('login', 'customer')} className="btn-ghost">
              Sign in to shop <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => (
              <div key={c.id} className="group overflow-hidden rounded-2xl bg-leaf-50 dark:bg-leaf-800">
                <img src={c.image} alt={c.name} loading="lazy" className="aspect-[9/7] w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="px-3 py-2.5">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-leaf-500">{c.tamil}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-leaf-900 py-12 text-leaf-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-display text-xl font-semibold text-white">Uzhavar Bhoomi · உழவர் பூமி</p>
            <p className="mt-1 text-sm text-leaf-300">Land of the farmer. Fair for everyone.</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-leaf-300">
            <span className="flex items-center gap-2"><Users className="h-4 w-4" /> Direct trade</span>
            <span className="flex items-center gap-2"><Languages className="h-4 w-4" /> All Indian languages</span>
            <span className="flex items-center gap-2"><Mic className="h-4 w-4" /> Voice first</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function PriceChain({ title, steps, note, tone }: { title: string; steps: [string, string][]; note: string; tone: 'good' | 'bad' }) {
  const good = tone === 'good'
  return (
    <div className={`rounded-3xl p-7 ${good ? 'bg-leaf-600 text-white' : 'bg-soil-100 dark:bg-leaf-800'}`}>
      <h3 className="font-bold">{title}</h3>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {steps.map(([who, price], i) => (
          <div key={who} className="flex items-center gap-2">
            <div className={`rounded-2xl px-4 py-3 text-center ${good ? 'bg-white/15' : 'bg-white dark:bg-leaf-900'}`}>
              <p className={`text-xs ${good ? 'text-leaf-100' : 'text-leaf-500'}`}>{who}</p>
              <p className="font-display text-xl font-semibold">{price}</p>
            </div>
            {i < steps.length - 1 && <ArrowRight className={`h-4 w-4 ${good ? 'text-leaf-200' : 'text-leaf-400'}`} />}
          </div>
        ))}
      </div>
      <p className={`mt-6 text-sm ${good ? 'text-leaf-50' : 'text-leaf-700 dark:text-leaf-200'}`}>{note}</p>
    </div>
  )
}

function Audience({
  eyebrow,
  title,
  image,
  features,
  cta,
  onCta,
}: {
  eyebrow: string
  title: string
  image: string
  features: { icon: typeof Sprout; text: string }[]
  cta: string
  onCta: () => void
}) {
  return (
    <div className="card grid overflow-hidden sm:grid-cols-[1fr_1.1fr]">
      <img src={image} alt="" loading="lazy" className="h-56 w-full object-cover sm:h-full" />
            <div className="p-7">
        <p className="eyebrow">{eyebrow}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold">{title}</h3>
        <ul className="mt-5 space-y-3">
          {features.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3 text-sm text-leaf-700 dark:text-leaf-200">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-leaf-500" /> {text}
            </li>
          ))}
        </ul>
        <button onClick={onCta} className="btn-primary mt-7">
          {cta} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
