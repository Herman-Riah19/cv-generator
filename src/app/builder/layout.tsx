"use client"
import { LanguageProvider } from '@/context/LanguageContext';
import React from 'react'

export default function LayoutBuild({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <LanguageProvider>
        {children}
    </LanguageProvider>
    </div>
  )
}
