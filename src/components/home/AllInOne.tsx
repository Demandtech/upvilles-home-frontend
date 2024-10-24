import { FC } from "react";
import sectionImage from "../../assets/images/allinone-img.png";

const AllInOne: FC = () => {
	return (
		<section className="max-w-[1220px] bg-white py-10 lg:py-16 mx-auto px-6">
			<div className="flex flex-col md:flex-row gap-5 md:justify-between pb-5 md:pb-10   ">
				<h2 className="text-3xl md:text-4xl font-medium md:w-2/5 md:pr-10">
					All-in-One Property Asset Management and Tracking Solution
				</h2>
				<p className="md:w-2/5 text-sm text-accent">
					Upville Home is a robust platform designed to transform how you manage
					your property assets. From maintenance scheduling and security
					monitoring to regulatory compliance, our system automates processes,
					improves efficiency, and minimizes risks, ensuring your properties
					stay in top condition.
				</p>
			</div>
			<div
				style={{
					background: `url(${sectionImage}) no-repeat center`,
					backgroundSize: "cover",
				}}
				className="w-full h-[240px] md:h-[400px] rounded-2xl"
			>
				{/* <Image width="100%" className="object-cover" src={sectionImage} /> */}
			</div>
		</section>
	);
};

export default AllInOne;
