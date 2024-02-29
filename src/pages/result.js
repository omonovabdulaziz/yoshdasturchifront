import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'

const Result = () => {
    const ResultPage = dynamic(() => import('@/features/result'), { ssr: false })
    return (
        <>
            <ResultPage />
        </>
    )
}

export default Result