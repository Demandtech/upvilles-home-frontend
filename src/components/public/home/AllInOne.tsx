import { FC, useRef } from "react";
import sectionImage from "../../../assets/images/allinone-img.png";
import { motion, useInView } from "framer-motion";

const AllInOne: FC = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	const headingVariant = {
		initial: { x: -20, opacity: 0 },
		visible: { x: 0, opacity: 1 },
	};

	return (
		<section className="max-w-[1220px] bg-white py-10 lg:py-16 mx-auto px-6">
			<div
				ref={ref}
				className="flex flex-col md:flex-row gap-5 md:justify-between pb-5 md:pb-10   "
			>
				<div className="md:w-2/5">
					<div>
						<motion.h2
							initial="initial"
							animate={isInView ? "visible" : ""}
							variants={headingVariant}
							transition={{
								type: "spring",
								damping: 10,
								duration: 0.3,
								stiffness: 100,
								delay: 0.1,
							}}
							className="text-2xl md:text-4xl font-semibold"
						>
							All-in-One Property Asset
						</motion.h2>
						<motion.h2
							initial="initial"
							animate={isInView ? "visible" : ""}
							variants={headingVariant}
							transition={{
								type: "spring",
								damping: 20,
								duration: 0.3,
								stiffness: 200,
								delay: 0.2,
							}}
							className="text-2xl md:text-4xl font-semibold"
						>
							Management and Tracking
						</motion.h2>
						<motion.h2
							initial="initial"
							animate={isInView ? "visible" : ""}
							variants={headingVariant}
							transition={{
								type: "spring",
								damping: 30,
								duration: 0.3,
								stiffness: 300,
								delay: 0.3,
							}}
							className="text-2xl md:text-4xl font-semibold"
						>
							Solution
						</motion.h2>
					</div>
				</div>
				<div className="md:w-6/12 lg:pl-10">
					<motion.p
						initial={{ x: 20, opacity: 0 }}
						animate={isInView ? { x: 0, opacity: 1 } : {}}
						transition={{ type: "spring", duration: 0.3, delay: 0.1 }}
						className="text-sm text-accent"
					>
						Upville Home is a robust platform designed to transform how you
						manage your property assets. From maintenance scheduling and
						security monitoring to regulatory compliance, our system automates
						processes, improves efficiency, and minimizes risks, ensuring your
						properties stay in top condition.
					</motion.p>
				</div>
			</div>
			<div
				style={{
					background: `url(${sectionImage}) no-repeat center`,
					backgroundSize: "cover",
				}}
				className="w-full h-[240px] md:h-[400px] rounded-2xl"
			></div>
		</section>
	);
};

export default AllInOne;
