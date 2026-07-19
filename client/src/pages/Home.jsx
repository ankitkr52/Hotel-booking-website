import React, { lazy, Suspense } from 'react'

// ✅ Hero — NOT lazy (above the fold, pehle dikhna chahiye)
import Hero from '../components/Hero'

//  Lazy load — below the fold components
const RecommendedHotel = lazy(() => import('../components/RecomandedHotel'))
const FeaturedDestination = lazy(() => import('../components/FeaturedDestination'))
const ExclusiveOffer = lazy(() => import('../components/ExclusiveOffer'))
const Testimonial = lazy(() => import('../components/Testimonial'))
const NewsLetter = lazy(() => import('../components/NewsLetter'))

// Section Loader — lightweight spinner
const SectionLoader = () => (
    <div className="w-full py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-orange-500" />
    </div>
)

const Home = () => {
    return (
        <div>
           
            <Hero />

         
            <Suspense fallback={<SectionLoader />}>
                <RecommendedHotel />
            </Suspense>

            
            {/* <Suspense fallback={<SectionLoader />}>
                <FeaturedDestination />
            </Suspense> */}

          
            <Suspense fallback={<SectionLoader />}>
                <ExclusiveOffer />
            </Suspense>

          
            <Suspense fallback={<SectionLoader />}>
                <Testimonial />
            </Suspense>

          
            <Suspense fallback={<SectionLoader />}>
                <NewsLetter />
            </Suspense>
        </div>
    )
}

export default Home
