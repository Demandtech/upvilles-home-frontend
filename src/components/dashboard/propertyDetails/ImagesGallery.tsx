import { Image } from "@nextui-org/image";
import { useState } from "react";

const ImagesGallery = () => {
	const thumbnails = [
		"https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		"https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		"https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		"https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	];
	const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0);

	return (
		<div className="w-full lg:w-3/5 flex flex-col">
			<div className="flex flex-col gap-1">
				<div className="min-h-60 sm:min-h-80">
					<Image
						src={thumbnails[selectedThumbnailIndex]}
						width="100%"
						className={"object-cover h-60 sm:h-80 rounded-none w-full z-0"}
					/>
				</div>
				<div className="flex w-full h-20 justify-between sm:h-28 overflow-x-auto gap-1">
					{thumbnails.slice(0, 4).map((thumbnail, index) => (
						<div
							className={`h-20 sm:h-28  ${
								selectedThumbnailIndex === index ? "opacity-60" : " opacity-100"
							}`}
							key={index}
						>
							<Image
								className={`rounded-none flex-1 object-cover object-center w-full h-20 sm:h-28 z-0 ${
									selectedThumbnailIndex === index
										? "opacity-60"
										: " opacity-100"
								}`}
								src={thumbnail}
								onClick={() => setSelectedThumbnailIndex(index)}
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
