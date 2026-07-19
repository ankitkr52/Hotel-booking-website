import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Loader = () => {
    const { navigate } = useAppContext()
    const { nextUrl } = useParams()

    useEffect(() => {
        if (nextUrl) {
            setTimeout(() => {
                navigate(`/${nextUrl}`)
            }, 3000)  
        }
    }, [nextUrl])

    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4 text-center">
               
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-orange-500" />
                
               
                <p className="text-gray-700 font-medium text-lg">
                    Processing your payment...
                </p>
                <p className="text-gray-400 text-sm">
                    Please wait, do not refresh the page
                </p>
            </div>
        </div>
    )
}

export default Loader