import { useContext } from 'react';
import { challengeContext } from '../contexts/ChallengeContext';
import styled from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const {currentExpirence, experienceToNextLevel} = useContext(challengeContext)

    const percentToNextLevel = Math.round(currentExpirence * 100) / experienceToNextLevel;

    return (
        <header className={styled.expirienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />

                <span className={styled.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
                    {currentExpirence} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}