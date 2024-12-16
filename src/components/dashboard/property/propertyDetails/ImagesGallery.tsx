import { Image } from "@nextui-org/image";
import { useCallback, useState } from "react";
import { ImageUrl } from "../../../../types/common";
import { ExpandIcon } from "../../../svgs";
import Button from "../../../ui/Button";
import { useDispatch } from "react-redux";
import { setImagePreview } from "../../../../redux/slices/app";

const ImagesGallery = ({ thumbnails }: { thumbnails: ImageUrl[] }) => {
	const dispatch = useDispatch();
	const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0);

	const handlePreviewImage = useCallback(() => {
		dispatch(
			setImagePreview({
				showPreview: true,
				imageUrl: thumbnails.map((thumbnail) => thumbnail.url),
				currentItemIndex: selectedThumbnailIndex,
			})
		);
	}, [selectedThumbnailIndex]);
	
	return (
		<div className="w-full lg:w-3/5 flex flex-col">
			<div className="flex flex-col gap-1">
				<div className="min-h-60 relative sm:min-h-80">
					<Image
						src={thumbnails[selectedThumbnailIndex]?.url}
						width="100%"
						className={"object-cover h-60 sm:h-80 rounded-none w-full"}
						alt="main"
					/>
					<div className="absolute z-20 top-3 right-3 backdrop-blur-sm">
						<Button
							onClick={handlePreviewImage}
							isIconOnly
							className=""
							variant="light"
						>
							<ExpandIcon className="w-5 h-5" color="#ddddd" />
						</Button>
					</div>
				</div>
				<div className="w-full flex gap-1">
					{thumbnails.slice(0, 4).map((thumbnail: ImageUrl, index: number) => (
						<div
							className={`relative flex-1 h-24  ${
								selectedThumbnailIndex === index
									? "opacity-60"
									: " opacity-100 cursor-pointer"
							}`}
							key={index}
							onClick={() => setSelectedThumbnailIndex(index)}
						>
							<Image
								className={`rounded-none h-full w-full object-cover `}
								src={thumbnail.url}
								width="100%"
								height={96}
								alt="thumbnail"
							/>
						</div>
					))}
				</div>
			</div>
			<p className="text-center text-sm text-darkGrey mt-5">
				Click each pictures to view in main screen
			</p>
		</div>
	);
};

export default ImagesGallery;
