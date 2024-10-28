import { create } from 'zustand'
import { Button } from '@/components/ui/button'

interface BearStore {
    bears: number;
    increasePopulation: () => void;
    removeAllBears: () => void;
}

const useBearStore = create<BearStore>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

export default function ExampleZustand() {

    const { bears, increasePopulation, removeAllBears } = useBearStore();

    return <div className="m-10 space-y-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Example Zustand</h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            This page demonstrates the use of Zustand.
        </h4>
        <hr />
        <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">Bears: {bears}</h2>
        <div className="inline-flex gap-6">
            <Button onClick={increasePopulation}>Increase</Button>
            <Button onClick={removeAllBears}>Remove All</Button>
        </div>
  </div>
}