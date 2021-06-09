import { Container } from '@material-ui/core'
import Image from 'next/image'
import React from 'react'

export default function Layout({ children }) {
  return (
    <div style={{ overflow: 'hidden', minHeight: '100vh', padding: '32px 0' }}>
      <Container maxWidth="md">{children}</Container>
    </div>
  )
}
