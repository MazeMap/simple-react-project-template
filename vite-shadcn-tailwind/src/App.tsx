import Layout from "@/layout"
import { useHash } from "@/hooks/use-location"

import Home from './pages/home';

import { useMemo } from "react";

function App() {

  const hash = useHash();

  const page = useMemo(() => {
    switch (hash) {
        case '#home':
        default:
          return <Home />;
    }
  }, [hash]);

  return (
    <Layout>

      {page}

    </Layout>
  )
}

export default App
