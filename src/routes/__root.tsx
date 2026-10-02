import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'


import { AuthModal } from '@/components/AuthModal'
import { TopBar } from '@/components/TopBar'
import { AppProvider } from '@/lib/app-context'
import '../styles.css'

const siteName = 'Uzhavar Bhoomi (உழவர் பூமி) — Direct Farmer-to-Consumer Platform'
const siteDescription = 'Uzhavar Bhoomi connects Indian farmers directly with consumers — fair prices for farmers, fresh produce for families, with AI-powered farm tools.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Tamil:wght@400;600&family=Noto+Sans+Devanagari:wght@400;600&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <AppProvider>
          <TopBar />
          <main>{children}</main>
          <AuthModal />
        </AppProvider>
        <Scripts />
      </body>
    </html>
  )
}
