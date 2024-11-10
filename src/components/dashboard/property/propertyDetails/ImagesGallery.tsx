import { Image } from "@nextui-org/image";
import { useState } from "react";

const ImagesGallery = ({ thumbnails }: { thumbnails: string[] }) => {
	const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0);

	return (
		<div className="w-full lg:w-3/5 flex flex-col">
			<div className="flex flex-col gap-1">
				<div className="min-h-60 sm:min-h-80">
					<Image
						src={thumbnails[selectedThumbnailIndex]}
						width="100%"
						className={"object-cover h-60 sm:h-80 rounded-none w-full"}
						alt="main"
					/>
				</div>
				<div className="w-full flex gap-1">
					{thumbnails.slice(0, 4).map((thumbnail: string, index: number) => (
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
								src={thumbnail}
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
