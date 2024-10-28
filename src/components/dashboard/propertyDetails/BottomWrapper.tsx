
import Table from "../../common/Table";
import { PlusIcon } from "../../svgs";
import Button from "../../ui/Button";

const BottomWrapper = () => {

	return (
		<div className="w-full bg-lightBg py-8 px-4 rounded-xl" id='tenant-section'>
			<div className="flex items-center justify-between mb-5">
				<div>
					<p className="font-bold sm:font-lg">Tenant Information</p>
				</div>
				<div>
					<Button
						startContent={<PlusIcon size={20} />}
						type="button"
						color="primary"
						size="sm"
						className="rounded-sm ml-auto"
					
					>
						Add Tenant
					</Button>
				</div>
			</div>
			<Table />
		</div>
	);
};

export default BottomWrapper;
