import { FC, useRef } from "react";
import img1 from "../../../assets/images/exp-img1.png";
import img2 from "../../../assets/images/exp-img2.png";
import img3 from "../../../assets/images/exp-img3.png";
import ListItem from "../../common/ListItem";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const experiences: string[] = [
	"Keep your assets in optimal condition with efficient scheduling and real-time monitoring.",
	"Minimize risks by staying updated on incidents and potential threats.",
	"Meet regulatory standards with ease and prevent costly audit failures.",
	"Our system is designed specifically to address the unique challenges and regulatory landscape in Nigeria.",
];

const Experience: FC<{ name: string }> = ({ name }) => {
	const navigate = useNavigate();
	const ref = useRef(null);

	const isInView = useInView(ref, { once: true });

	return (
		<div className="py-16">
			<div className="max-w-[1220px] gap-10 mx-auto px-6 flex md:justify-between flex-col lg:flex-row">
				<div className="w-full lg:w-3/6 min-h-[250px] sm:min-h-[300px] gap-2 grid grid-cols-2 grid-rows-5">
					<div
						style={{
							background: `url(${img1}) center no-repeat`,
							backgroundSize: "cover",
						}}
						className="rounded-lg bg-no-repeat bg-center bg-cover row-span-5 h-full w-full"
					/>

					<div
						style={{
							background: `url(${img2}) center no-repeat`,
							backgroundSize: "cover",
						}}
						className="row-span-3 bg-no-repeat bg-center bg-cover rounded-lg h-full"
					/>

					<div
						style={{
							background: `url(${img3}) center no-repeat`,
							backgroundSize: "cover",
						}}
						className="row-span-2 bg-no-repeat bg-center bg-cover rounded-lg h-full w-full"
					/>
				</div>

				<div ref={ref} className="w-full lg:w-5/12 space-y-5">
					<div>
						<motion.h2
							initial={{ opacity: 0, x: -20 }}
							animate={isInView ? { opacity: 1, x: 0 } : ""}
							transition={{
								type: "spring",
								damping: 10,
								duration: 0.4,
								stiffness: 100,
								delay: 0.1,
							}}
							className="text-2xl md:text-4xl font-semibold"
						>
							Experience the Benefits
						</motion.h2>
						<motion.h2
							initial={{ opacity: 0, x: -20 }}
							animate={isInView ? { opacity: 1, x: 0 } : ""}
							transition={{
								type: "spring",
								damping: 20,
								duration: 0.4,
								stiffness: 200,
								delay: 0.2,
							}}
							className="text-2xl md:text-4xl font-semibold"
						>
							of a Smarter Property
						</motion.h2>
						<motion.h2
							initial={{ opacity: 0, x: -20 }}
							animate={isInView ? { opacity: 1, x: 0 } : ""}
							transition={{
								type: "spring",
								damping: 30,
								duration: 0.4,
								stiffness: 300,
								delay: 0.3,
							}}
							className="text-2xl md:text-4xl font-semibold"
						>
							Management Solution
						</motion.h2>
					</div>
					<ul className="space-y-3 lg:w-5/6">
						{experiences.map((text, index) => (
							<ListItem index={index} text={text} key={text} />
						))}
					</ul>
					<Button
						type="button"
						className="px-16"
						color="primary"
						size="lg"
						onPress={() => {
							navigate(name ? "/dashboard/properties" : "/auth/signup");
						}}
						ariaLabel="Sign up navigation button"
					>
						{name ? "Dashboard" : "Sign Up"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Experience;
