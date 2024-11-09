import Button from "../../ui/Button";
import { ArrowTopSvg } from "../../svgs";

function SupportItem({
	name,
	text,
	href,
}: {
	name: string;
	text: string;
	href: string;
}) {
	return (
		<div className="p-5 bg-white rounded-lg shadow-md shadow-default-100">
			<div></div>
			<div>
				<h4 className="font-bold mb-3">{name}</h4>
				<p className="text-sm text-darkGrey mb-5">{text}</p>

				<Button
					endContent={<ArrowTopSvg className="fill-[#007AFF]" />}
					className="pl-0 text-[#007AFF]"
					variant="light"
				>
					{href}
				</Button>
			</div>
		</div>
	);
}

export default SupportItem;
