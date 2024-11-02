import { ImageGallery, PropertyInfo } from ".";

const TopWrapper = ({ id }: { id: string }) => {
  return (
    <section
      id="property-section"
      className="bg-lightBg py-8 px-4 rounded-xl flex gap-5 md:gap-8 flex-col lg:flex-row lg:items-center"
    >
      <ImageGallery />
      <PropertyInfo id={id} />
    </section>
  );
};

export default TopWrapper;
