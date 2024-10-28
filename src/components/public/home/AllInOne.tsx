import { FC } from "react";
import sectionImage from "../../../assets/images/allinone-img.png";

const AllInOne: FC = () => {
	return (
		<section className="max-w-[1220px] bg-white py-10 lg:py-16 mx-auto px-6">
			<div className="flex flex-col md:flex-row gap-5 md:justify-between pb-5 md:pb-10   ">
				<div className='md:w-2/5'>
					<h2 className="text-2xl md:text-4xl font-medium">
						All-in-One Property Asset Management and Tracking Solution
					</h2>
				</div>
				<div className='md:w-6/12 lg:pl-10'>
					<p className="text-sm text-accent">
						Upville Home is a robust platform designed to transform how you
						manage your property assets. From maintenance scheduling and
						security monitoring to regulatory compliance, our system automates
						processes, improves efficiency, and minimizes risks, ensuring your
						properties stay in top condition.
					</p>
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
