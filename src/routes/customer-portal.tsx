import { createFileRoute } from '@tanstack/react-router'
import { Bot, CheckCircle2, LayoutGrid, MapPin, Minus, Plus, Search, ShoppingBag, Trash2, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AgriBuddy } from '@/components/AgriBuddy'
import { PortalGate } from '@/components/PortalGate'
import { img, useApp } from '@/lib/app-context'
import { categories, categoryById, products, type CategoryId, type Product } from '@/lib/fixtures'

export const Route = createFileRoute('/customer-portal')({
  head: () => ({ meta: [{ title: 'Customer Portal · Uzhavar Bhoomi' }] }),
  component: () => (
    <PortalGate role="customer">
      <CustomerPortal />
    </PortalGate>
  ),
})

// Vary the crop of each category photo so neighbouring cards don't look identical.
const positions = ['object-center', 'object-left', 'object-right', 'object-top', 'object-bottom']

function CustomerPortal() {
  const { t, session } = useApp()
  const [active, setActive] = useState<CategoryId | 'all'>('all')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [buddyOpen, setBuddyOpen] = useState(false)
  const [ordered, setOrdered] = useState(false)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter(
      (p) =>
        (active === 'all' || p.category === active) &&
        (!q || p.name.toLowerCase().includes(q) || p.local.includes(q) || p.tags.some((tag) => tag.toLowerCase().includes(q))),
    )
  }, [active, query])

  const add = (p: Product, delta = 1) =>
    setCart((c) => {
      const next = { ...c, [p.id]: Math.max(0, (c[p.id] ?? 0) + delta) }
      if (!next[p.id]) delete next[p.id]
      return next
    })

  const lines = Object.entries(cart).map(([id, qty]) => ({ product: products.find((p) => p.id === id)!, qty }))
  const count = lines.reduce((n, l) => n + l.qty, 0)
  const total = lines.reduce((n, l) => n + l.qty * l.product.price, 0)
  const saved = lines.reduce((n, l) => n + l.qty * (l.product.marketPrice - l.product.price), 0)

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 pb-28 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Customer portal</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t('welcome')}, {session?.name}
          </h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-leaf-600 dark:text-leaf-300">
            <MapPin className="h-4 w-4" /> Delivering fresh from farms near Chennai
          </p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-leaf-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ragi, moringa, iron…"
            className="input !rounded-full !pl-11"
          />
        </div>
      </div>

      {/* Agri-Buddy prompt card */}
      <button
        onClick={() => setBuddyOpen(true)}
        className="mt-6 flex w-full items-center gap-4 rounded-2xl bg-gradient-to-r from-leaf-600 to-leaf-500 p-5 text-left text-white shadow-sm transition hover:shadow-md"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15">
          <Bot className="h-6 w-6" />
        </span>
        <span className="flex-1">
          <span className="block font-bold">Ask {t('agriBuddy')} — by voice or text</span>
          <span className="block text-sm text-leaf-50">“What should I eat for diabetes?” · “Foods rich in iron” · “Today's tomato rate”</span>
        </span>
        <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-leaf-700 sm:block">Start chat</span>
      </button>

      {/* Categories */}
      <nav className="sticky top-16 z-20 -mx-4 mt-8 bg-soil-50/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 dark:bg-leaf-950/90" aria-label={t('categories')}>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          <Chip active={active === 'all'} onClick={() => setActive('all')}>
            <LayoutGrid className="h-4 w-4" /> All
          </Chip>
          {categories.map((c) => (
            <Chip key={c.id} active={active === c.id} onClick={() => setActive(c.id)}>
              <img src={img(c.image, 48, 48)} alt="" className="h-5 w-5 rounded-full object-cover" />
              {c.name}
            </Chip>
          ))}
        </div>
      </nav>

      <div className="mt-4 flex items-baseline justify-between">
        <h2 className="text-lg font-bold">{active === 'all' ? 'All fresh produce' : categoryById[active].name}</h2>
        <p className="text-sm text-leaf-500">{visible.length} items</p>
      </div>

      {visible.length === 0 ? (
        <div className="card mt-4 p-10 text-center text-leaf-600">No items match “{query}”. Try another search.</div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visible.map((p, i) => (
            <ProductCard key={p.id} product={p} qty={cart[p.id] ?? 0} onAdd={(d) => add(p, d)} position={positions[i % positions.length]} />
          ))}
        </div>
      )}

      {/* Floating actions */}
      <div className="fixed right-4 bottom-4 z-30 flex gap-3 sm:right-6 sm:bottom-6">
        <button
          onClick={() => setBuddyOpen(true)}
          className="grid h-14 w-14 place-items-center rounded-full bg-white text-leaf-700 shadow-lg ring-1 ring-leaf-100 dark:bg-leaf-800 dark:text-leaf-100 dark:ring-leaf-700"
          aria-label={`Open ${t('agriBuddy')}`}
        >
          <Bot className="h-6 w-6" />
        </button>
        <button onClick={() => setCartOpen(true)} className="btn-primary h-14 !rounded-full !px-6 shadow-lg">
          <ShoppingBag className="h-5 w-5" /> {t('cart')}
          {count > 0 && <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-leaf-700">{count}</span>}
        </button>
      </div>

      <AgriBuddy open={buddyOpen} onClose={() => setBuddyOpen(false)} onAdd={(p) => add(p)} />

      {/* Cart drawer */}
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 z-40 bg-leaf-950/40 transition-opacity ${cartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-[24rem] max-w-[92vw] flex-col bg-white shadow-2xl transition-transform duration-300 dark:bg-leaf-900 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-leaf-100 px-5 py-4 dark:border-leaf-800">
          <h2 className="text-lg font-bold">Your basket</h2>
          <button onClick={() => setCartOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-leaf-50 dark:hover:bg-leaf-800" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>
        {ordered ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <CheckCircle2 className="h-14 w-14 text-leaf-500" />
            <p className="mt-4 font-display text-2xl font-semibold">Order placed!</p>
            <p className="mt-2 text-sm text-leaf-600 dark:text-leaf-300">Farmers are harvesting your order now. Every rupee goes straight to them.</p>
            <button
              className="btn-primary mt-6"
              onClick={() => {
                setOrdered(false)
                setCartOpen(false)
              }}
            >
              Continue shopping
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-leaf-500">
            <ShoppingBag className="h-12 w-12 text-leaf-200" />
            <p className="mt-3">Your basket is empty.</p>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-leaf-100 overflow-y-auto px-5 dark:divide-leaf-800">
              {lines.map(({ product: p, qty }) => (
                <li key={p.id} className="flex items-center gap-3 py-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-leaf-50 text-2xl dark:bg-leaf-800">{p.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-leaf-500">
                      ₹{p.price} · {p.unit} · {p.farmer}
                    </p>
                  </div>
                  <Stepper qty={qty} onChange={(d) => add(p, d)} />
                  <button onClick={() => add(p, -qty)} className="p-1 text-leaf-400 hover:text-chilli-500" aria-label={`Remove ${p.name}`}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-leaf-100 p-5 dark:border-leaf-800">
              <div className="flex justify-between text-sm">
                <span className="text-leaf-600 dark:text-leaf-300">You save vs. market</span>
                <span className="font-semibold text-leaf-600">₹{saved}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button
                className="btn-primary w-full !py-3.5"
                onClick={() => {
                  setCart({})
                  setOrdered(true)
                }}
              >
                Place order
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition ${active ? 'border-leaf-600 bg-leaf-600 text-white' : 'border-leaf-200 bg-white text-leaf-800 hover:border-leaf-400 dark:border-leaf-700 dark:bg-leaf-900 dark:text-leaf-100'}`}
    >
      {children}
    </button>
  )
}

function ProductCard({ product: p, qty, onAdd, position }: { product: Product; qty: number; onAdd: (delta: number) => void; position: string }) {
  const { t } = useApp()
  const off = Math.round((1 - p.price / p.marketPrice) * 100)
  return (
    <article className="card group flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-leaf-50 dark:bg-leaf-800">
        <img
          src={img(categoryById[p.category].image, 480)}
          alt={p.name}
          loading="lazy"
          className={`h-full w-full scale-125 object-cover transition duration-500 group-hover:scale-[1.32] ${position}`}
        />
        <span className="absolute top-2.5 left-2.5 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-bold text-leaf-700 shadow-sm">{off}% below market</span>
        <span className="absolute right-2.5 bottom-2.5 grid h-10 w-10 place-items-center rounded-xl bg-white/95 text-2xl shadow-sm">{p.emoji}</span>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="text-sm leading-snug font-bold">{p.name}</h3>
        <p className="text-xs text-leaf-500">{p.local}</p>
        <p className="mt-1.5 truncate text-[11px] text-leaf-500">
          {p.farmer} · {p.village}
        </p>
        {p.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {p.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-md bg-leaf-50 px-1.5 py-0.5 text-[10px] font-medium text-leaf-700 dark:bg-leaf-800 dark:text-leaf-200">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div>
            <p className="text-base font-extrabold">
              ₹{p.price} <span className="text-xs font-medium text-leaf-400 line-through">₹{p.marketPrice}</span>
            </p>
            <p className="text-[11px] text-leaf-500">{p.unit}</p>
          </div>
          {qty > 0 ? (
            <Stepper qty={qty} onChange={onAdd} />
          ) : (
            <button onClick={() => onAdd(1)} className="rounded-xl bg-leaf-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-leaf-700">
              {t('add')}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

function Stepper({ qty, onChange }: { qty: number; onChange: (delta: number) => void }) {
  return (
    <div className="flex items-center rounded-xl bg-leaf-600 text-white">
      <button onClick={() => onChange(-1)} className="p-1.5" aria-label="Decrease">
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-5 text-center text-xs font-bold">{qty}</span>
      <button onClick={() => onChange(1)} className="p-1.5" aria-label="Increase">
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
