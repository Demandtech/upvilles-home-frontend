import {
	SupportEnvelopIcon,
	SupportAddressIcon,
	SupportPhoneIcon,
} from "../../svgs";
import img from "../../../assets/images/contact.gif";
import { Image } from "@nextui-org/image";

function ContactUs({ startChat }: { startChat: boolean }) {
	return (
		<div className="flex items-center gap-10 bg-white rounded-xl py-10 px-5 md:px-10 shadow-lg shadow-default-100">
			<div className=" flex flex-col gap-5 md:gap-8">
				<h5 className="text-lg sm:text-xl font-semibold">Contact Us</h5>
				<ul className="space-y-4">
					<li className="flex gap-3 md:gap-4">
						<div>
							<SupportEnvelopIcon className="h-7 w-7 md:w-10 md:h-10" />
						</div>
						<div>
							<h6 className="md:text-lg font-medium">Email</h6>
							<p className="text-darkGrey text-sm md:text-base">
								Send us a message at{" "}
								<span className="text-primary">support@example.com</span>, and
								our team will get back to you within 24 hours.
							</p>
						</div>
					</li>
					<li className="flex gap-3 md:gap-4">
						<div>
							<SupportAddressIcon className="h-7 w-7 md:w-10 md:h-10" />
						</div>
						<div>
							<h6 className="md:text-lg font-medium">Address</h6>
							<p className="text-darkGrey  text-sm md:text-base">
								If you prefer to visit us in person or send physical mail, you
								can find us at: 1, Isheri North GRA, Opic Berger, Lagos
							</p>
						</div>
					</li>
					<li className="flex gap-3 md:gap-4">
						<div>
							<SupportPhoneIcon className="h-7 w-7 md:w-10 md:h-10" />
						</div>
						<div>
							<h6 className="md:text-lg font-medium">Phone</h6>
							<p className="text-darkGrey text-sm md:text-base">
								Call us at <span className="text-primary">1-800-123-4567</span>{" "}
								for immediate support during business hours.
							</p>
						</div>
					</li>
				</ul>
			</div>
			{!startChat && (
				<div className="hidden lg:block min-w-[35%]">
					<Image src={img} alt="Assistance illustrator" />
				</div>
			)}
		</div>
	);
}

export default ContactUs;
