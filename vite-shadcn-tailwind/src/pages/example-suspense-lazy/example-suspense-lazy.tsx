import { useState, Suspense, lazy } from 'react';
import { Button } from '@/components/ui/button'

const DelayedCodeComponent = lazy(() => delayForDemo(import('./DelayedCodeComponent.tsx')));

export default function ExampleSuspenseLazy() {
    const [showLazyLoad, setShowLazyLoad] = useState(false);

    return <div className="m-10 space-y-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Example: Suspense + Lazy</h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            This page demonstrates the use of Suspense and Lazy.
        </h4>
        <hr />
        <Button onClick={() => setShowLazyLoad(true)}>Show lazy load</Button>
        <hr />
        {showLazyLoad && (
            <Suspense fallback={<Loading />}>
                <DelayedCodeComponent />
            </Suspense>
        )}
  </div>
}

function Loading() {
    return <p><i>Loading...</i></p>;
}


// Add a fixed delay so you can see the loading state
function delayForDemo(promise) {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    }).then(() => promise);
}