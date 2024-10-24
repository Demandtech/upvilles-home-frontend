import { FC } from "react";
import Button from "../ui/Button";
import { EmailIconSvg, AddressIconSvg, PhoneIconSvg } from "../svgs";
import { useNavigate } from "react-router-dom";

const Ready: FC = () => {
	const navigate = useNavigate();
	return (
		<section className="py-10">
			<div className="max-w-[1220px] mx-auto px-6 md:px-8 lg:px-12">
				<div className="bg-primary flex flex-col gap-10 lg:flex-row lg:items-center text-white px-10 py-16 rounded-3xl">
					<div className="sm:w-4/5 lg:w-1/2 space-y-5 lg:space-y-8">
						<h2 className="text-xl md:text-2xl w-full lg:text-4xl font-medium">
							Ready to Take Control of Your Property Management?
						</h2>
						<p className="text-xs leading-4 md:text-sm text-white/80">
							Sign up for a free, schedule a demo, or contact us to learn more
							about how Upville Homes can help you streamline your property
							management processes.
						</p>
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
						<div className="flex gap-2">
							<div>
								<EmailIconSvg />
							</div>
							<div>
								<h3 className="font-semibold text-base mb-0.5">Email</h3>
								<p className="text-white/80 text-sm">upvillehomes@gmail.com</p>
							</div>
						</div>
						<div className="flex gap-2">
							<div>
								<PhoneIconSvg />
							</div>
							<div>
								<h3 className="font-semibold text-base mb-0.5">Phone</h3>
								<p className="text-white/80 text-sm">+234 8109 7891 45</p>
							</div>
						</div>
						<div className="flex gap-2">
							<div>
								<AddressIconSvg />
							</div>
							<div>
								<h3 className="font-semibold text-lg mb-0.5">Address</h3>
								<p className="text-white/80 text-sm">
									1, Old Olowora, Omole Phase 1, Ojodu Berger, Lagos Nigeria.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Ready;
