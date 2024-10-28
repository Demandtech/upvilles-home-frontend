import { FC } from "react";
import {
	FeatureArrowSvg,
	PredictiveIconSvg,
	ComplianceIconSvg,
	EhnaceIconSvg,
	ComprehensiveIconSvg,
} from "../../svgs";

const Features: FC = () => {
	return (
		<section className="bg-lightGrey py-10 lg:py-14">
			<div className="max-w-[1220px] gap-6 lg:gap-10  mx-auto px-6 flex flex-col lg:flex-row">
				<div className="lg:w-2/5 md:pr-5 lg:pr-10 flex flex-col">
					<h2 className="text-xl w-full md:text-4xl font-medium">
						Powerful Features to Simplify Your Property Management
					</h2>
					<div className="hidden lg:block mt-auto">
						<FeatureArrowSvg />
					</div>
				</div>
				<div className="grid  md:grid-cols-2 flex-1 gap-3">
					<div className="bg-white space-y-3 p-5 rounded-lg">
						<PredictiveIconSvg />
						<h3 className="font-semibold text-base md:text-lg">
							Predictive Maintenance
						</h3>
						<p className="text-accent text-xs md:text-sm">
							Avoid unexpected breakdowns with proactive maintenance scheduling
							based on data-driven insights.
						</p>
					</div>
					<div className="bg-white space-y-3 p-5 rounded-lg">
						<ComplianceIconSvg />
						<h3 className="font-semibold text-base md:text-lg">
							Compliance Tracking
						</h3>
						<p className="text-accent text-sm  ">
							Stay on top of regulatory requirements and minimize audit risks
							with automated compliance management.
						</p>
					</div>
					<div className="bg-white space-y-3 p-5 rounded-lg">
						<EhnaceIconSvg />
						<h3 className="font-semibold text-base md:text-lg">
							Enhanced Security Management
						</h3>
						<p className="text-accent text-sm">
							Monitor incidents, set alerts, and track security logs to
							safeguard your property.
						</p>
					</div>
					<div className="bg-white space-y-3 p-5 rounded-lg">
						<ComprehensiveIconSvg />
						<h3 className="text-default font-semibold md:text-lg">
							Comprehensive Reporting
						</h3>
						<p className="text-accent text-sm">
							Generate detailed reports on maintenance, compliance, and property
							performance for data-driven decision-making
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Features;
