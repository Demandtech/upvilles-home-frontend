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
        <div className="flex w-full h-20 justify-between sm:h-32 gap-1">
          {thumbnails.slice(0, 4).map((thumbnail: string, index: number) => (
            <div
              className={`h-20 sm:h-28  ${
                selectedThumbnailIndex === index ? "opacity-60" : " opacity-100"
              }`}
              key={index}
            >
              <div
                className={`rounded-none flex-1 object-cover object-center w-full h-20 sm:h-28 relative${
                  selectedThumbnailIndex === index
                    ? "opacity-60"
                    : " opacity-100"
                }`}
                onClick={() => setSelectedThumbnailIndex(index)}
              >
                <Image
                  className={`rounded-none flex-1 object-cover object-center w-full`}
                  src={thumbnail}
                  alt="thumbnail"
                  width="100%"
                  height="100%"
                />
              </div>
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
