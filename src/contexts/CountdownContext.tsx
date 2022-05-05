import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { challengeContext } from "./ChallengeContext";

interface CountdawnProviderProps {
    children: ReactNode;
}   

interface CounrdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive:boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

export const CountdownContext = createContext({} as CounrdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdawnProviderProps) {
    const {startNewChanlenge} = useContext(challengeContext)
    
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    
    const seconds = time % 60;
    

    function startCountdown() {
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false); 
        setTime(25 * 60);
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChanlenge();
        }
    }, [isActive, time])

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}
