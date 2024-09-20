import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
	useParallaxEffect,
	handleSmoothScroll,
} from "../../../utils/hooks/effects";

import Front from "../../../public/images/real-estate-hero/Front.svg";
import Middle from "../../../public/images/real-estate-hero/Middle.svg";
import Back from "../../../public/images/real-estate-hero/Back.svg";
import FarBack from "../../../public/images/real-estate-hero/FarBack.svg";

export default function Hero() {
	const content = {
		header: "Building Your Path to Home",
		subheader: "No Credit? Bad Credit? We can help!",
		button: "Learn More",
	};

	const style = {
		hero: {
			main: "hero-content relative mx-auto px-4 pt-24 flex flex-col gap-4 lg:flex-row items-center justify-between",
			textArea: "lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0",
			header: "leading-tight text-7xl lg:text-7xl font-bold mb-6 drop-shadow-lg",
			subheader: "text-xl mb-8",
			button: "btn btn-primary",
		},
		blur: "absolute h-[75vh] w-[75vw] rounded-full animate-gradient-xy filter blur-3xl opacity-5",
		blurColor: "bg-gradient-to-r from-blue-500 to-blue-800",
		image: "rounded-xl absolute top-0 left-0 w-full h-full",
	};

	const { ref, y1, y2, y3, y4 } = useParallaxEffect();

	return (
		<div ref={ref} className="hero min-h-[90vh]">
			{/* Glowing gradient background with radial fade */}
			<motion.div
				style={{ y: y1 }}
				className={`${style.blur} ${style.blurColor} top-50`}
			></motion.div>

			<div className={style.hero.main}>
				{/* Hero text */}
				<div className={style.hero.textArea}>
					<h1 className={style.hero.header}>{content.header}</h1>
					<p className={style.hero.subheader}>{content.subheader}</p>
					<button className={style.hero.button}>
						<Link href="#our-mission" onClick={handleSmoothScroll}>
							{content.button}
						</Link>
					</button>
				</div>

				{/* Parallax images */}
				<div className="w-full lg:w-1/2 relative h-64 lg:h-96">
					<motion.div
						style={{ y: y2 }}
						className={`${style.image} z-40`}
					>
						<Image
							src={Front}
							alt="House 1"
							layout="fill"
							objectFit="fill"
							className="rounded-lg"
						/>
					</motion.div>
					<motion.div
						style={{ y: y2 }}
						className={`${style.image} z-30`}
					>
						<Image
							src={Middle}
							alt="House 2"
							layout="fill"
							objectFit="fill"
							className="rounded-lg"
						/>
					</motion.div>
					<motion.div
						style={{ y: y3 }}
						className={`${style.image} z-20`}
					>
						<Image
							src={Back}
							alt="House 3"
							layout="fill"
							objectFit="fill"
							className="rounded-lg"
						/>
					</motion.div>
					<motion.div
						style={{ y: y4 }}
						className={`${style.image} z-10`}
					>
						<Image
							src={FarBack}
							alt="House 4"
							layout="fill"
							objectFit="fill"
							className="rounded-lg"
						/>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
