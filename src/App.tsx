import Lottie from 'lottie-react'
import { CopyIcon, ExternalLink } from 'lucide-react'
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
			'https://t.me/blum/app?startapp=memepadjetton_GP10_bgPxw-ref_b5Kcew7dwQ',
			'_blank'
		)
	}

	const copyText = () => {
		navigator.clipboard.writeText(
			'EQCZup7zV9qkqO1sjVoNRYSWqVk7oX_6eg3wDMJJFCR2CJQ8'
		)
		alert('Copied!')
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
				<div className={styles.tokenInfo}>
					<div className={styles.infoCard}>
						<div className={styles.cardHeader}>
							<h2>Token Information</h2>
						</div>

						<div className={styles.infoGrid}>
							<div className={styles.infoItem}>
								<span className={styles.label}>Token Name:</span>
								<span className={styles.value}>Golden Plane (GP10)</span>
							</div>
							<div className={styles.infoItem}>
								<span className={styles.label}>Blockchain:</span>
								<span className={styles.value}>TON</span>
							</div>
							<div className={styles.infoItem} onClick={copyText}>
								<span className={styles.label}>Contract:</span>

								<span className={styles.value}>
									<CopyIcon size={15} style={{ marginRight: '10px' }} />
									EQCZ...CJQ8
								</span>
							</div>
						</div>

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
								View on Blum
							</button>
						</div>
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
					Blum
				</button>
			</div>
		</div>
	)
}

export default App
