// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Component Imports
import BuyNowButton from '@components/buy-now-button'

// Config Imports
import { i18n } from '@configs/i18n'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

import ProgressBarProvider from './ProgressBarProvider'

export const metadata = {
  title: 'Jewels Store POS',
  description: 'Jewels Store POS'
}

const RootLayout = ({ children, params }) => {
  // Vars
  const direction = i18n.langDirection[params.lang]

  return (
    <html id='__next' lang={params.lang} dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <ProgressBarProvider>{children}</ProgressBarProvider>
        {/* <BuyNowButton /> */}
      </body>
    </html>
  )
}

export default RootLayout
