import * as React from 'react'
import { Link } from '../i18n'

interface Props {
  href: string
  children: React.ReactNode
  prefetch?: boolean
  passHref?: boolean
}

export default function Link2({ href, children, passHref, prefetch = false }: Props) {
  if (href) {
    return <Link href={href}>{children}</Link>
  } else {
    return <>{children}</>
  }
}
