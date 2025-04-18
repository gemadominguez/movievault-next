import './globals.css'

export const metadata = {
  title: 'MovieVault',
  description: 'Your ultimate movie app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
