import Layout from "@/layout"
import { useHash } from "@/hooks/use-location"

import Home from './pages/home';
import ExampleZustand from './pages/example-zustand';
import ExampleReactQuery from './pages/example-react-query';
import ExampleSuspenseLazy from "./pages/example-suspense-lazy/example-suspense-lazy";
import TaskGroceryApp from "./pages/task-grocery-app";

import { useMemo } from "react";

function App() {

  const hash = useHash();

  const page = useMemo(() => {
    switch (hash) {
      case '#example-suspense-lazy':
        return <ExampleSuspenseLazy />;
      case '#example-zustand':
        return <ExampleZustand />;
      case '#example-react-query':
        return <ExampleReactQuery />;
      case '#task-grocery-app':
        return <TaskGroceryApp />;
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
