import { ImageGallery, PropertyInfo } from ".";

const TopWrapper = () => {
	return (
		<div className="bg-lightBg py-8 px-4 rounded-xl flex gap-5 md:gap-10 flex-col md:flex-row">
			<ImageGallery />
			<PropertyInfo />
		</div>
	);
};

export default TopWrapper;
