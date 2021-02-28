import { useContext } from 'react';
import { challengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(challengeContext)

    return (
        <div className={styles.profileContainer}>
            <img src="https://instagram.fssa21-1.fna.fbcdn.net/v/t51.2885-15/e35/s480x480/42068846_547093959086702_3530168650571193204_n.jpg?tp=1&_nc_ht=instagram.fssa21-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Lf0B3t4LlYEAX82Wufj&oh=74124fd656a1d078e2a7a718b813d70a&oe=6063F934" alt="Yan César"/>
            <div>
                <strong>TalitinhaPG</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}