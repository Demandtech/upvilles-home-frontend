import { ImageGallery, PropertyInfo } from ".";

const TopWrapper = ({
  id,
  thumbnails,
}: {
  id: string;
  thumbnails: string[];
}) => {
  return (
    <section
      id="property-section"
      className="bg-lightBg py-8 px-4 rounded-xl flex gap-5 md:gap-8 flex-col lg:flex-row lg:items-center"
    >
      <ImageGallery thumbnails={thumbnails || []} />
      <PropertyInfo id={id} />
    </section>
  );
};

export default TopWrapper;
