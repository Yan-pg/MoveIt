import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie'
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';


interface challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData { 
    level: number;
    currentExpirence: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: challenge;
    levelUp: () => void;
    startNewChanlenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExpirence: number;
    challengesCompleted: number;
}   



export const challengeContext = createContext({} as ChallengeContextData);


export function ChallengesProvider({
     children,
     ...rest
    }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExpirence, setCurrentExpirence] = useState(rest.currentExpirence ?? 0); 
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0); 

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2); // número 4 define a dificuldade

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExpirence', String(currentExpirence))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExpirence, challengesCompleted])

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChanlenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎊', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    } 

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExpirence + amount;
     
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExpirence(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted +  1);
    }
    
    return (
    <challengeContext.Provider
     value={{ 
         level, 
         currentExpirence, 
         challengesCompleted, 
         levelUp,
         startNewChanlenge,
         activeChallenge,
         experienceToNextLevel,
         resetChallenge, 
         completeChallenge,
         closeLevelUpModal,
        }}
    >
        {children}
        {isLevelUpModalOpen && <LevelUpModal />}
    </challengeContext.Provider>

    )
}