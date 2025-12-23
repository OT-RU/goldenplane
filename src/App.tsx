import Lottie from 'lottie-react'
import { ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import styles from './App.module.css'

const App = () => {
	const [showAnimation, setShowAnimation] = useState(true)
	const [animationData, setAnimationData] = useState(null)
	const [scrollY, setScrollY] = useState(0)
	const [fadeOut, setFadeOut] = useState(false)

	useEffect(() => {
		fetch('/golden-plane-animation.json')
			.then(response => response.json())
			.then(data => {
				setAnimationData(data)
			})

		const timer = setTimeout(() => {
			setFadeOut(true)

			const hideTimer = setTimeout(() => {
				setShowAnimation(false)
			}, 500)

			return () => clearTimeout(hideTimer)
		}, 4000)
		
		const handleScroll = () => {
			setScrollY(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			clearTimeout(timer)
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const parallaxStyles = {
		gradientTopLeft: {
			transform: `translate(${scrollY * 0.02}px, ${scrollY * 0.03}px)`,
		},
		gradientTopRight: {
			transform: `translate(${-scrollY * 0.025}px, ${scrollY * 0.02}px)`,
		},
		gradientBottomLeft: {
			transform: `translate(${scrollY * 0.015}px, ${-scrollY * 0.025}px)`,
		},
		gradientBottomRight: {
			transform: `translate(${-scrollY * 0.02}px, ${-scrollY * 0.03}px)`,
		},
	}

	if (showAnimation) {
		return (
			<div
				className={`${styles.lottieContainer} ${fadeOut ? styles.fadeOut : ''}`}
			>
				{animationData ? (
					<Lottie
						animationData={animationData}
						loop={false}
						style={{ width: 100, height: 100 }}
					/>
				) : (
					<div className={styles.placeholderAnimation}>
						<div className={styles.spinner}></div>
						<h2>Golden Plane</h2>
					</div>
				)}
			</div>
		)
	}

	const openTelegram = () => {
		window.open('https://t.me/goldenplane', '_blank')
	}

	const openblum = () => {
		window.open(
			'https://x.com/xgoldenplane?s=21',
			'_blank'
		)
	}

	return (
		<div className={styles.app}>
			<div className={styles.backgroundGradients}>
				<div
					className={styles.gradientTopLeft}
					style={parallaxStyles.gradientTopLeft}
				></div>
				<div
					className={styles.gradientTopRight}
					style={parallaxStyles.gradientTopRight}
				></div>
				<div
					className={styles.gradientBottomLeft}
					style={parallaxStyles.gradientBottomLeft}
				></div>
				<div
					className={styles.gradientBottomRight}
					style={parallaxStyles.gradientBottomRight}
				></div>
			</div>

			<header className={styles.header}>
				<h1 className={styles.title}>Golden Plane</h1>
				<p className={styles.subtitle}>
					Your Gateway to Premium Crypto Experience
				</p>
			</header>

			<main className={styles.mainContent}>
				<div className={styles.buttonsContainer}>
					<div className={styles.desktopButtons}>
						<button
							className={`${styles.actionBtn} ${styles.telegramBtn}`}
							onClick={openTelegram}
						>
							<ExternalLink size={20} />
							Join Telegram
						</button>
						<button
							className={`${styles.actionBtn} ${styles.blumBtn}`}
							onClick={openblum}
						>
							<ExternalLink size={20} />
							View on X
						</button>
					</div>
				</div>
			</main>

			<div className={styles.mobileButtons}>
				<button
					className={`${styles.mobileBtn} ${styles.telegramBtn}`}
					onClick={openTelegram}
				>
					Telegram
				</button>
				<button
					className={`${styles.mobileBtn} ${styles.blumBtn}`}
					onClick={openblum}
				>
					X (Twitter)
				</button>
			</div>
		</div>
	)
}

export default App
