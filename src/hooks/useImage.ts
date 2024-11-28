import axios, { AxiosProgressEvent } from "axios";
import { Dispatch, SetStateAction } from "react";

export default function useImage() {
	const uploadImage = async (
		formData: FormData,
		onProgress?: Dispatch<SetStateAction<number>>
	) => {
		const response = await axios.post(
			`https://api.cloudinary.com/v1_1/${
				import.meta.env.VITE_CLOUDINARY_NAME
			}/image/upload`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress: onProgress
					? (progressEvent: AxiosProgressEvent) => {
							if (progressEvent.total) {
								const progress = Math.round(
									(progressEvent.loaded * 100) / progressEvent?.total
								);

								onProgress(progress);
							}
					  }
					: () => {},
				
			}
		);
		return response.data;
	};

	return { uploadImage };
}
