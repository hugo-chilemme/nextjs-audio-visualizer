"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
	const [clickedLoaded, setClickedLoaded] = useState(false);

	if (!clickedLoaded) {
		return (
			<div 
				className="relative flex flex-col h-screen w-full items-center justify-center bg-black"
				onClick={() => setClickedLoaded(true)}
			>
				<span className="font-medium">Click anywhere to start the animation</span>

				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-sm text-white">
					<span className="text-orange-500 font-semibold">Did you know?</span> Websites can't play audio (like music) automatically—you need to interact with the page first, such as by clicking.
				</div>
			</div> 
		)
	}

	return (
		<div className="relative flex h-screen w-full items-center justify-center bg-black">
			<video
				className="absolute top-0 left-0 h-full w-full object-cover"
				autoPlay
				loop
				muted
			>
				<source src="/video.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			{/* Overlay noir avec animation */}
			<div
				className={`absolute top-0 left-0 h-full w-full bg-black transition-opacity duration-1000 opacity-50`}
			></div>
			<div className="relative z-10">{children}</div>
		</div>
	);
}