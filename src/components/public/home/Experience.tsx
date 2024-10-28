import { FC } from "react";
import img1 from "../../../assets/images/exp-img1.png";
import img2 from "../../../assets/images/exp-img2.png";
import img3 from "../../../assets/images/exp-img3.png";
import ListItem from "../../common/ListItem";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const experiences: string[] = [
	"Keep your assets in optimal condition with efficient scheduling and real-time monitoring.",
	"Minimize risks by staying updated on incidents and potential threats.",
	"Meet regulatory standards with ease and prevent costly audit failures.",
	"Our system is designed specifically to address the unique challenges and regulatory landscape in Nigeria.",
];

const Experience: FC = () => {
	const navigate = useNavigate();

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

				<div className="w-full lg:w-2/6 space-y-5">
					<h2 className="text-3xl md:text-4xl font-medium">
						Experience the Benefits of a Smarter Property Management Solution
					</h2>
					<ul className="space-y-3">
						{experiences.map((text) => (
							<ListItem text={text} key={text} />
						))}
					</ul>
					<Button
						disabled={true}
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

export default Experience;
