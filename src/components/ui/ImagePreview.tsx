import { motion } from "framer-motion";
import { CloseIcon, ChevronLeft, ChevronRight } from "../svgs";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { setImagePreview } from "../../redux/slices/app";
import { useEffect, useState } from "react";

const ImagePreview = ({
	imageUrl,
	currentItemIndex = 0,
}: {
	imageUrl: string[];
	currentItemIndex: number;
}) => {
	const dispatch = useDispatch();

	const [currentIndex, setCurrentIndex] = useState<number>(currentItemIndex);

	const backdropVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		exit: { opacity: 0 },
	};

	const modalVariants = {
		hidden: { scale: 0.8, opacity: 0 },
		visible: {
			scale: 1,
			opacity: 1,
			transition: { type: "spring", stiffness: 200 },
		},
		exit: { scale: 0.8, opacity: 0 },
	};

	useEffect(() => {
		setCurrentIndex(currentItemIndex);
	}, [currentItemIndex]);

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={backdropVariants}
			className="fixed top-0 left-0 w-full h-full z-50 bg-default"
		>
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={backdropVariants}
				className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
			>
				<div className="flex justify-end pt-5 px-4 absolute top-0 right-0">
					<Button
						onPress={() =>
							dispatch(
								setImagePreview({
									showPreview: false,
									imageUrl: [],
									currentItemIndex: 0,
								})
							)
						}
						isIconOnly
						variant="flat"
						className="z-50 bg-default-300"
					>
						<CloseIcon className="w-10" />
					</Button>
				</div>
				<div className="max-w-[800px] max-h-[200px] overflow-hidden lg:max-h-[500px] mx-auto relative w-full h-full">
					{imageUrl.map((url: string, index) => (
						<motion.div
							key={index}
							custom={index}
							initial={{ x: "100%" }}
							animate={{ x: `${100 * (index - currentIndex)}%` }}
							exit={{ x: "-100%" }}
							transition={{ type: "spring", stiffness: 200, damping: 30 }}
							className={`h-full w-full absolute`}
						>
							<motion.img
								className={`object-cover h-full w-full`}
								src={url}
								width="100%"
								height="100%"
								loading="lazy"
								alt="Property images slides"
								variants={modalVariants}
								initial="initial"
								animate="visible"
								exit="exit"
							/>
						</motion.div>
					))}
				</div>
			</motion.div>
			<div className="absolute px-3 left-0 right-0 top-1/2 flex justify-between">
				<Button
					onClick={() =>
						setCurrentIndex((curr) =>
							curr > 0 ? curr - 1 : imageUrl.length - 1
						)
					}
					disabled={imageUrl.length < 2}
					color="primary"
					ariaLabel="Previous Button"
					type="button"
					isIconOnly
				>
					<ChevronLeft />
				</Button>
				<Button
					onClick={() =>
						setCurrentIndex((curr) =>
							curr < imageUrl.length - 1 ? curr + 1 : 0
						)
					}
					disabled={imageUrl.length < 2}
					color="primary"
					ariaLabel="Next Button"
					type="button"
					isIconOnly
				>
					<ChevronRight />
				</Button>
			</div>
			<div className="text-white/70 absolute bottom-0 text-center w-full pb-4 text-lg">
				{currentIndex + 1}/{imageUrl.length}
			</div>
		</motion.div>
	);
};

export default ImagePreview;
