import React from 'react'




interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>


      {children}
      {/* <Footer /> */}

    </>
  )
}

export default Layout