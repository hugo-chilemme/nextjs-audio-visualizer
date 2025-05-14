"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Slider } from "@/components/ui/slider"

export default function LoadingScreen() {
	const [scale, setScale] = useState(1);
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [progress, setProgress] = useState(0);
	const [volume, setVolume] = useState(0.5);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		const audio1 = new Audio("/music.mp3");
		audioRef.current = audio1;
		audio1.loop = false;

		audio1.play();
		audio1.volume = volume;

		// Set up AudioContext for audio1
		const audioContext1 = new (window.AudioContext || (window as any).webkitAudioContext)();
		const analyser1 = audioContext1.createAnalyser();
		const source1 = audioContext1.createMediaElementSource(audio1);
		source1.connect(analyser1);
		analyser1.connect(audioContext1.destination);

		analyser1.fftSize = 256;
		const dataArray1 = new Uint8Array(analyser1.frequencyBinCount);

		const animate1 = () => {
			analyser1.getByteFrequencyData(dataArray1);
			const bassFrequencies1 = dataArray1.slice(0, dataArray1.length / 2);
			const avgBassFrequency1 = bassFrequencies1.reduce((a, b) => a + b, 0) / bassFrequencies1.length;
			const newScale1 = 1 + avgBassFrequency1 / (256 / 2);

			setScale(newScale1);

			requestAnimationFrame(animate1);
		};

		animate1();

		return () => {
			audio1.pause();
			audioContext1.close();
		};
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.code === "Space") {
				if (audioRef.current.paused) {
					audioRef.current.play();
					setPaused(false);
				} else {
					audioRef.current.pause();
					setPaused(true);
				}
			}
		};
	
		window.addEventListener("keydown", handleKeyDown);
	}, []);


	return (
		<div 
			className="flex h-screen w-full items-center justify-center relative bg-black" 
			
		>
			 
			<Image
				src="/logo.jpg?id=2"
				alt="Logo"
				className="fixed w-32 h-32 shadow-2xl rounded-full object-cover border-4 border-white"
				width={512}
				height={512}
				id="logo"
				style={{
					transform: `scale(${scale})`,
					boxShadow: `0 0 ${(scale - 1) * 40}px rgba(255, 255, 255, 1)`,
					transition: "transform 0.1s ease-out",
					
				}}
				priority
			/>

			<div className="fixed right-14 bottom-14 flex items-center gap-4">
				<span className="text-sm text-right font-medium">
					{Math.round(volume * 100)}%
					{(Math.round(volume * 100) === 0 && !paused) && (
						<span className="text-white-500"> (Muted)</span>
					)}
					{paused && (
						<span className="text-white-500"> (Paused)</span>
					)}

				</span>
				<Slider
					defaultValue={[volume]}
					onValueChange={(value) => {
					setVolume(value[0]);
					if (audioRef.current) {
						audioRef.current.volume = value[0];
					}
					}}
					max={1}
					step={0.01}
					min={0}
					className="w-32"
				/>
			</div>


		</div>
	);
}
