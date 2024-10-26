const ImagesGallery = () => {
	return (
		<div className="w-full md:w-3/5 min-h-[400px] bg-white flex flex-col">
			<div className="grid grid-cols-4 h-full bg-purple-500 auto-rows-fr">
				<div className="row-span-4 col-span-4 bg-yellow-600">Main</div>
				<div className="col-span-1 bg-pink-600">Thumbnail</div>
				<div className="col-span-1  bg-slate-600">Thumbnail</div>
				<div className="col-span-1 bg-red-600">Thumbnail</div>
				<div className="col-span-1 bg-emerald-600">Thumbnail</div>
			</div>
			<p className="mt-auto text-center py-4 text-sm text-darkGrey">
				Click each pictures to view in main screen
			</p>
		</div>
	);
};

export default ImagesGallery;
