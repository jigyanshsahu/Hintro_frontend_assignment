import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'

import appCss from '../styles.css?url'
import { Providers } from '../../app/providers/Providers'
import { EmptyState } from '../../app/components/shared/EmptyState'
import { AlertCircle } from 'lucide-react'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Hintro – Analytics Dashboard' },
      {
        name: 'description',
        content: 'Analytics dashboard for Hintro – track your calls, usage, and performance.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' as const },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <EmptyState
          icon={<AlertCircle className="h-8 w-8 text-slate-400" />}
          title="Page Not Found"
          description="We couldn't find the page you're looking for."
          className="bg-white border border-slate-200 rounded-xl"
        />
      </div>
    </div>
  ),
})

function RootComponent() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <HeadContent />
      </head>
      <body className="h-full antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
