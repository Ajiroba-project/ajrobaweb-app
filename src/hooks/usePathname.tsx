import React, { Fragment, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export const usePathName =()=>{
    const pathname = usePathname()
    const [path, setPath] = useState<string>('')

    const decodedPaths = pathname
      .split('/')
      .filter(path => path !== '')
      .map(path => decodeURIComponent(path))

    useEffect(() => {
      if (decodedPaths.length > 0) {
        setPath(decodedPaths[decodedPaths.length - 1])
      }
    }, [decodedPaths])
    return decodedPaths
}

