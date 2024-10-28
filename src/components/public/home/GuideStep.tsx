import { FC } from "react";
import img from "../../../assets/images/guide-img.png";
import ListItem from "../../common/ListItem";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { PreventIconSvg, ReduceIconSvg } from "../../svgs";

const guides: string[] = [
	"Create your account and set up your property portfolio.",
	"Start adding properties, equipment, and schedule predictive maintenance tasks.",
	"Track maintenance activities, compliance status, and security incidents from a single dashboard.",
	"Get detailed reports on property performance, maintenance costs, and compliance records.",
];
const GuideStep: FC = () => {
	const navigate = useNavigate();
	return (
		<div className="bg-lightGrey py-16">
			<div className="max-w-[1220px]  gap-10 mx-auto px-6 flex justify-between flex-col md:flex-row-reverse lg:items-center">
				<div className="md:w-3/6 relative">
					<div
						style={{
							background: `url(${img}) center no-repeat`,
							backgroundSize: "cover",
						}}
						className="min-h-[250px] md:min-h-[350px] overflow-hidden rounded-xl h-full w-full"
					></div>

					<div className="flex gap-3 items-center px-3 py-2 absolute bottom-5 -left-6 bg-white border border-[#EDEAEA] rounded-lg">
						<ReduceIconSvg />
						<p className="text-sm">Reduced maintenance downtime</p>
					</div>
					<div className="flex gap-3 items-center px-3 py-2 absolute bottom-1/2 translate-y-1/2 bg-white -right-6 border border-[#EDEAEA] rounded-lg">
						<PreventIconSvg />
						<p className="text-sm">Prevent issues before they arise</p>
					</div>
				</div>

				<div className="w-full sm:w-3/6 lg:w-2/6 space-y-5">
					<h2 className="text-3xl md:text-4xl font-medium">
						Step-by-Step Guide
					</h2>
					<ul className="space-y-3">
						{guides.map((text) => (
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

export default GuideStep;
