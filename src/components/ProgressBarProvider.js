'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

const ProgressBarProvider = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="40px"
        color="#111"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  )
}

export default ProgressBarProvider