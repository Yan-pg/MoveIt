import { useContext } from 'react';
import { challengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
    const {challengesCompleted} = useContext(challengeContext)

    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}