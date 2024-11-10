import { FC, useRef } from "react";
import {
	FeatureArrowSvg,
	PredictiveIconSvg,
	ComplianceIconSvg,
	EhnaceIconSvg,
	ComprehensiveIconSvg,
} from "../../svgs";
import { motion, useInView } from "framer-motion";

const Features: FC = () => {
	const headerRef = useRef(null);
	const isHeaderInView = useInView(headerRef, { once: true });

	const headingVariant = {
		initial: { x: -20, opacity: 0 },
		visible: { x: 0, opacity: 1 },
	};
	const cardVariants = {
		initial: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<section className="bg-lightGrey py-10 lg:py-14">
			<div className="max-w-[1220px] gap-6 lg:gap-10  mx-auto px-6 flex flex-col lg:flex-row">
				<div
					ref={headerRef}
					className="lg:w-2/5 md:pr-5 lg:pr-10 flex flex-col"
				>
					<motion.h2
						initial="initial"
						animate={isHeaderInView ? "visible" : ""}
						variants={headingVariant}
						transition={{
							type: "spring",
							damping: 10,
							duration: 0.3,
							stiffness: 100,
							delay: 0.1,
						}}
						className="text-2xl w-full md:text-4xl font-semibold"
					>
						Powerful Features
					</motion.h2>
					<motion.h2
						initial="initial"
						animate={isHeaderInView ? "visible" : ""}
						variants={headingVariant}
						transition={{
							type: "spring",
							damping: 20,
							duration: 0.3,
							stiffness: 200,
							delay: 0.2,
						}}
						className="text-2xl w-full md:text-4xl font-semibold"
					>
						to Simplify Your
					</motion.h2>
					<motion.h2
						initial="initial"
						animate={isHeaderInView ? "visible" : ""}
						variants={headingVariant}
						transition={{
							type: "spring",
							damping: 10,
							duration: 0.3,
							stiffness: 100,
							delay: 0.1,
						}}
						className="text-2xl w-full md:text-4xl font-semibold"
					>
						Property Management
					</motion.h2>
					<div className="hidden lg:block mt-auto">
						<FeatureArrowSvg />
					</div>
				</div>
				<div className="grid md:grid-cols-2 flex-1 gap-3">
					{[
						{
							icon: <PredictiveIconSvg />,
							title: "Predictive Maintenance",
							description:
								"Avoid unexpected breakdowns with proactive maintenance scheduling based on data-driven insights.",
						},
						{
							icon: <ComplianceIconSvg />,
							title: "Compliance Tracking",
							description:
								"Stay on top of regulatory requirements and minimize audit risks with automated compliance management.",
						},
						{
							icon: <EhnaceIconSvg />,
							title: "Enhanced Security Management",
							description:
								"Monitor incidents, set alerts, and track security logs to safeguard your property.",
						},
						{
							icon: <ComprehensiveIconSvg />,
							title: "Comprehensive Reporting",
							description:
								"Generate detailed reports on maintenance, compliance, and property performance for data-driven decision-making.",
						},
					].map((feature, index) => (
						<motion.div
							key={index}
							variants={cardVariants}
							initial="initial"
							whileInView="visible"
							viewport={{ once: true }}
							transition={{
								type: "spring",
								damping: 25,
								stiffness: 200,
								delay: index * 0.15,
							}}
							className="bg-white space-y-3 p-5 rounded-lg shadow-lg shadow-default-100"
						>
							{feature.icon}
							<h3 className="font-semibold text-base md:text-lg">
								{feature.title}
							</h3>
							<p className="text-accent text-xs md:text-sm">
								{feature.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
