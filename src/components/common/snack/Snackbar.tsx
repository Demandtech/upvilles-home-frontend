import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeToast } from "../../../redux/slices/app";
interface SnackbarProps {
	message: string;
	// onClose: () => void;
	duration?: number;
}

export default function Snackbar({ message, duration = 3000 }: SnackbarProps) {
	const dispatch = useDispatch();

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(closeToast());
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, message]);

	return (
		<>
			{!message && (
				<div
					// initial={{ opacity: 0, x: 50 }}
					// animate={{ opacity: 1, y: 0 }}
					// exit={{ opacity: 0, x: 50 }}
					// transition={{ type: "spring", stiffness: 300, damping: 20 }}
					className="absolute top-5 right-10 bg-black text-white px-4 py-2 rounded shadow-lg"
				>
					{message} An error occured!
				</div>
			)}
		</>
	);
}
