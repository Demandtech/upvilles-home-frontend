import { FC, useRef } from "react";
import img from "../../../assets/images/guide-img.png";
import ListItem from "../../common/ListItem";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { PreventIconSvg, ReduceIconSvg } from "../../svgs";
import { motion, useInView } from "framer-motion";

const guides: string[] = [
	"Create your account and set up your property portfolio.",
	"Start adding properties, equipment, and schedule predictive maintenance tasks.",
	"Track maintenance activities, compliance status, and security incidents from a single dashboard.",
	"Get detailed reports on property performance, maintenance costs, and compliance records.",
];
const GuideStep: FC = () => {
	const navigate = useNavigate();
	const ref1 = useRef(null);
	const ref2 = useRef(null);

	const isInView1 = useInView(ref1, { once: true });
	const isInView2 = useInView(ref2, { once: true });

	return (
		<div className="bg-lightGrey py-16">
			<div className="max-w-[1220px]  gap-10 mx-auto px-6 flex justify-between flex-col md:flex-row-reverse lg:items-center">
				<div ref={ref1} className="md:w-3/6 relative">
					<div
						style={{
							background: `url(${img}) center no-repeat`,
							backgroundSize: "cover",
						}}
						className="min-h-[250px] md:min-h-[350px] overflow-hidden rounded-xl h-full w-full"
					></div>

					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={isInView1 ? { scale: 1, opacity: 1 } : {}}
						transition={{
							type: "spring",
							duration: 300,
							stiffness: 300,
							damping: 30,
						}}
						className="flex gap-3 items-center px-3 py-2 absolute bottom-5 -left-5 md:-left-10 bg-white border border-[#EDEAEA] rounded-lg"
					>
						<ReduceIconSvg />
						<p className="text-xs md:text-sm">Reduced maintenance downtime</p>
					</motion.div>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={isInView1 ? { scale: 1, opacity: 1 } : {}}
						transition={{
							type: "spring",
							duration: 300,
							stiffness: 300,
							damping: 30,
						}}
						className="flex gap-3 items-center px-3 py-2 absolute bottom-1/2 translate-y-1/2 bg-white -right-5 md:-right-10 border border-[#EDEAEA] rounded-lg"
					>
						<PreventIconSvg />
						<p className="text-xs md:text-sm">
							Prevent issues before they arise
						</p>
					</motion.div>
				</div>

				<div ref={ref2} className="w-full sm:w-3/6 lg:w-2/6 space-y-5">
					<motion.h2
						initial={{ opacity: 0, x: 20 }}
						animate={isInView2 ? { opacity: 1, x: 0 } : ""}
						transition={{
							type: "spring",
							damping: 10,
							duration: 0.3,
							stiffness: 100,
							delay: 0.1,
						}}
						className="text-2xl md:text-4xl font-semibold"
					>
						Step-by-Step Guide
					</motion.h2>
					<ul className="space-y-3">
						{guides.map((text, index) => (
							<ListItem index={index} text={text} key={text} />
						))}
					</ul>
					<Button
						disabled={false}
						type="button"
						className="px-16"
						color="primary"
						size="lg"
						onPress={() => {
							navigate("/auth/signup");
						}}
						ariaLabel="Sign up navigation button"
					>
						Sign Up
					</Button>
				</div>
			</div>
		</div>
	);
};

export default GuideStep;
