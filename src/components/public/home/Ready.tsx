import { FC, useRef } from "react";
import Button from "../../ui/Button";
import { EmailIconSvg, AddressIconSvg, PhoneIconSvg } from "../../svgs";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const Ready: FC = () => {
	const navigate = useNavigate();

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<section className="sm:py-10">
			<div className="sm:max-w-[1220px] mx-auto sm:px-6 md:px-8 lg:px-12">
				<div
					ref={ref}
					className="bg-primary flex flex-col gap-10 lg:flex-row lg:items-center text-white px-5 md:px-10 py-16 sm:rounded-3xl"
				>
					<div className="sm:w-4/5 lg:w-1/2 space-y-5 lg:space-y-8">
						<div>
							<motion.h2
								initial={{ opacity: 0, x: -20 }}
								animate={isInView ? { opacity: 1, x: 0 } : ""}
								transition={{
									type: "spring",
									damping: 10,
									duration: 0.3,
									stiffness: 100,
									delay: 0.1,
								}}
								className="text-2xl w-full lg:text-4xl font-semibold"
							>
								Ready to Take Control of
							</motion.h2>
							<motion.h2
								initial={{ opacity: 0, x: 20 }}
								animate={isInView ? { opacity: 1, x: 0 } : ""}
								transition={{
									type: "spring",
									damping: 20,
									duration: 0.3,
									stiffness: 200,
									delay: 0.2,
								}}
								className="text-2xl w-full lg:text-4xl font-semibold"
							>
								Your Property Management?
							</motion.h2>
						</div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : ""}
							transition={{
								type: "spring",
								damping: 20,
								duration: 0.3,
								stiffness: 200,
								delay: 0.2,
							}}
							className="text-xs leading-4 md:text-sm text-white/80"
						>
							Sign up for a free, schedule a demo, or contact us to learn more
							about how Upville Homes can help you streamline your property
							management processes.
						</motion.p>
						<Button
							size="lg"
							type="submit"
							className="bg-white text-default px-10 lg:px-16"
							onPress={() => navigate("/auth/signup")}
						>
							Get Started
						</Button>
					</div>
					<div className="space-y-2 md:w-4/5 lg:w-2/6 lg:ml-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : ""}
							transition={{
								type: "spring",
								damping: 10,
								duration: 0.3,
								stiffness: 100,
								delay: 0.1,
							}}
							className="flex gap-2"
						>
							<div>
								<EmailIconSvg />
							</div>
							<div>
								<h3 className="font-semibold text-sm md:text-base mb-0.5">
									Email
								</h3>
								<p className="text-white/80 text-xs sm:text-sm">
									upvillehomes@gmail.com
								</p>
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : ""}
							transition={{
								type: "spring",
								damping: 20,
								duration: 0.3,
								stiffness: 200,
								delay: 0.2,
							}}
							className="flex gap-2"
						>
							<div>
								<PhoneIconSvg />
							</div>
							<div>
								<h3 className="font-semibold text-sm md:text-base mb-0.5">
									Phone
								</h3>
								<p className="text-white/80 text-xs sm:text-sm">
									+234 8109 7891 45
								</p>
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : ""}
							transition={{
								type: "spring",
								damping: 30,
								duration: 0.3,
								stiffness: 300,
								delay: 0.3,
							}}
							className="flex gap-2"
						>
							<div>
								<AddressIconSvg />
							</div>
							<div>
								<h3 className="font-semibold text-sm md:text-base mb-0.5">
									Address
								</h3>
								<p className="text-white/80 text-xs sm:text-sm">
									1, Old Olowora, Omole Phase 1, Ojodu Berger, Lagos Nigeria.
								</p>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Ready;
