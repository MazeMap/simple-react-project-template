import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useRef } from 'react'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import { resolve } from 'path';
//   import { getTodos, postTodo } from '../my-api'

interface Todo {
    id: number;
    title: string;
}

const hardCodedTodos: Todo[] = [{
    id: 1,
    title: 'Get groceries',
  },
  {
    id: 2,
    title: 'Do Laundry',
  },
  {
    id: 3,
    title: 'Clean room',
  },
];

function getTodos(): Promise<Todo[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(hardCodedTodos)
        }, 1000)
    });
}

function postTodo(args: {id: number, title: string}): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            hardCodedTodos.push({
                id: args.id,
                title: args.title,
            });
            resolve()
        }, 500)
    });
}


  // Create a client
  const queryClient = new QueryClient()

  export default function PageExampleReactQuery() {
    return (
        <div className="m-10 space-y-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Example: React Query</h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            This page demonstrates the use of React Query.
        </h4>
        <hr />
        <QueryClientProvider client={queryClient}>
            <Todos />
        </QueryClientProvider>
        </div>
    )
  }

  function Todos() {
    // Access the client
    const queryClient = useQueryClient()

    // Queries
    const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

    // Mutations
    const addTodoMutation = useMutation({
      mutationFn: postTodo,
      onSettled: async () => {
        return await queryClient.invalidateQueries({ queryKey: ['todos'] })
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      },
    })

    const inputRef = useRef<HTMLInputElement>(null)

    const { isPending, mutate, variables } = addTodoMutation;

    const { status } = query;

    console.log('todods', status, isPending, query.data);

    return (
      <div>
        <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">Todos</h2>
        { (query.isPending) ? <p>Loading...</p> : null }
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            {query.data?.map((todo) => <li className="" key={todo.id}>{todo.title}</li>)}
            {isPending && <li style={{ opacity: 0.5 }}>{variables.title}</li>}
        </ul>


        <Input onKeyUp={(ev) => {
            if (ev.key === 'Enter') {
                const inputValue = inputRef.current?.value;
                if (!inputValue) return;

                mutate({
                    id: Date.now(),
                    title: inputValue,
                });

                inputRef.current!.value = '';

                inputRef.current?.focus();
            }

        }} ref={inputRef} disabled={query.isPending} placeholder="Enter todo" />
        <Button
            className="mt-4"
            disabled={query.isPending || isPending}
            onClick={() => {
                const inputValue = inputRef.current?.value;
                if (!inputValue) return;

                mutate({
                    id: Date.now(),
                    title: inputValue,
                });

                inputRef.current!.value = '';

                inputRef.current?.focus();
            }}
        >
          Add Todo
        </Button>
      </div>
    )
  }