import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Lottie({
	button = false,
	src,
	loop = false,
	autoplay = false,
}: {
	button?: boolean;
	src: string;
	loop: boolean;
	autoplay: boolean;
}) {
	const [playAnimation, setPlayAnimation] = useState(false); // State to control animation
	const [animationComplete, setAnimationComplete] = useState(false); // State to control animation

	const [dotLottie, setDotLottie] = useState<any>(null);

	const dotLottieRefCallback = (dotLottie: any) => {
		setDotLottie(dotLottie);
	};
	const lottie = {
		src: src,
		loop: loop,
		autoplay: autoplay,
		dotLottieRefCallback: dotLottieRefCallback,
	};

	function play() {
		if (dotLottie) {
			dotLottie.play();
		}
	}

	function pause() {
		if (dotLottie) {
			dotLottie?.pause();
		}
	}

	function stop() {
		if (dotLottie) {
			dotLottie.stop();
		}
	}

	function seek() {
		if (dotLottie) {
			dotLottie.setFrame(30);
		}
	}

	return (
		<div>
			<div className="flex justify-center items-center">
				<DotLottieReact {...lottie} />
			</div>
			{button && (
				<button
					className="btn btn-primary"
					onClick={() => {
						playAnimation ? pause() : play();
						setPlayAnimation(!playAnimation);
					}}
				>
					{playAnimation ? "Pause Animation" : "Play Animation"}
				</button>
			)}
		</div>
	);
}
