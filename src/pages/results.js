import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'

const Results = () => {
  const ResultsPage = dynamic(() => import('@/features/Results'), {
    ssr: false,
  })
  return (
    <div>
      <ResultsPage />
    </div>
  )
}

export default Results