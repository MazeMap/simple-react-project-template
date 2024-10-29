import React, { useEffect, useRef, useState, useMemo, useContext } from 'react';
import { Button } from '@/components/ui/button'
import { createRoot } from 'react-dom/client';
import Task from './Task';
import { tests as taskTests } from './tests';
import Description from './description';

// Create TaskContext
const TaskContext = React.createContext(null);

// TaskProvider component
const TaskProvider = ({ children }) => {
    const taskContentRef = useRef(null);
    const taskVerificationRunIncrement = useState(0);

    const startNewTaskVerification = () => {
        taskVerificationRunIncrement[1](taskVerificationRunIncrement[0] + 1);
    }

    return (
        <TaskContext.Provider value={{ taskContentRef, taskVerificationRunIncrement, startNewTaskVerification }}>
            {children}
        </TaskContext.Provider>
    );
};

export default function TaskWrapper() {
    return <TaskProvider>
    <div className="m-10 space-y-10">
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Task: Grocery App</h1>
    <Description />
    <hr />
    <TaskContent
    onTaskHtmlOutputChanged={(html) => {
        console.log(html);
    }}
    />
    <hr />
    <TaskRunButton />
    <TaskResult />
    </div>
    </TaskProvider>
}

function TaskRunButton() {
    const { taskContentRef, startNewTaskVerification } = useContext(TaskContext);

    return <Button onClick={() => {
        console.log('taskContentRef', taskContentRef.current);
        startNewTaskVerification();
    }}>Run Task Verification</Button>;
}

function TaskContent(props: {
    onTaskHtmlOutputChanged?: (html: string) => void
}) {
    const { taskContentRef } = useContext(TaskContext);
    const randomkey = Math.random().toString(36).substring(7);

    return <div ref={taskContentRef}>
        <Task key={randomkey} />
    </div>
}

const TaskResult = () => {
    const { taskContentRef, taskVerificationRunIncrement } = useContext(TaskContext);

    const booleanResultsRef = useRef([]);

    const [currentTestStep, setCurrentTestStep] = useState(0);

    const [renderIncrement, setRenderIncrement] = useState(0);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!taskContentRef.current) {
            return;
        }
        if (!mounted) {
            return;
        }
        if (currentTestStep >= taskTests.length) {
            return;
        }

        booleanResultsRef.current[currentTestStep] = 0;
        setRenderIncrement((prev) => prev + 1);
        taskTests[currentTestStep].test(taskContentRef.current).then((result) => {
            console.log('test completed', currentTestStep, result);
            booleanResultsRef.current[currentTestStep] = result;
            setCurrentTestStep((prevStep) => prevStep + 1);
        });

    }, [taskContentRef, taskVerificationRunIncrement, currentTestStep, mounted]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        booleanResultsRef.current = [];
        setCurrentTestStep(0);
        console.log('taskVerificationRunIncrement', taskVerificationRunIncrement);
    }, [taskVerificationRunIncrement]);

    return (
        <div>
            <h4 className="font-bold">Task Results</h4>
            <ul>
            {booleanResultsRef.current && booleanResultsRef.current.map((result, index) => {
                const title = taskTests[index].title;
                let color = 'bg-yellow-100';
                let state = 'Pending';
                if (result === true) {
                    color = 'bg-green-100';
                    state = 'Correct';
                } else if (result === false) {
                    color = 'bg-red-100';
                    state = 'Incorrect';
                }
                return <li className={``} key={index}>
                    <div className={`px-2 rounded m-1 ${color}`}>
                        {title}: <span className="font-bold ml-2">{state}</span>
                    </div>
                </li>;
            })}
            </ul>
        </div>
    );
};
