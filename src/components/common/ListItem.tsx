import { ListItemIconSvg } from "../svgs";

const ListItem = ({ text }: { text: string }) => {
	return (
		<li>
			<div className="flex gap-3">
				<div>
					<ListItemIconSvg />
				</div>
				<div>
					<p className="text-accent text-sm">{text}</p>
				</div>
			</div>
		</li>
	);
};

export default ListItem;
