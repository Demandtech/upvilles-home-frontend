import { Spinner } from "@nextui-org/spinner";
import { ImageGallery, PropertyInfo } from ".";
import { ImageUrl } from "../../../../types/common";

const TopWrapper = ({
	id,
	thumbnails,
	isLoading,
}: {
	id: string;
	thumbnails: ImageUrl[];
	isLoading: boolean;
}) => {
	return (
		<section
			id="property-section"
			className="bg-lightBg py-8 px-4 rounded-xl flex gap-5 md:gap-8 flex-col lg:flex-row lg:items-center"
		>
			{isLoading ? (
				<div className="min-h-[400px] w-full  flex items-center justify-center">
					<Spinner size="lg" label="Loading..." />
				</div>
			) : (
				<>
					<ImageGallery thumbnails={thumbnails || []} />
					<PropertyInfo id={id} />
				</>
			)}
		</section>
	);
};

export default TopWrapper;
