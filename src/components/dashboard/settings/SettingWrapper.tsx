import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
	TableColumn,
} from "@nextui-org/table";
import { Switch } from "@nextui-org/switch";
import { useState } from "react";
const SettingWrapper = () => {
	const [settings, setSettings] = useState({
		notifications: false,
		security_option: false,
		property_management: true,
		data_management: false,
		product_updates: false,
	});

	const handleSettings = (val: boolean, name: string) => {
		setSettings((prev) => ({ ...prev, [name]: val }));
	};

	return (
		<div className="bg-white py-10 px-8 h-full scrollbar-hide rounded-md shadow-lg shadow-default-100 overflow-auto">
			<div className="text-center max-w-lg mx-auto mb-10">
				<h3 className="text-3xl font-bold mb-3">
					Optimize Your Settings for a Better Upville Homes Experience!
				</h3>
				<p className="text-sm text-darkGrey">
					To make the most out of your Upville Homes account, you can easily
					customize your experience by turning settings on or off whenever
					needed.
				</p>
			</div>
			<div>
				<Table
					classNames={{
						wrapper: "shadow-none rounded-none",
						tr: "rounded-none",
					}}
					className="shadow-none"
					// isStriped
					aria-label="Settings table"
					removeWrapper
				>
					<TableHeader className="">
						<TableColumn className="py-5 sm:pl-10 !rounded-bl-none text-default bg-[#F8F8F8] lg:text-base">
							Settings
						</TableColumn>
						<TableColumn className="text-default bg-[#f8f8f8] lg:text-base">
							Description
						</TableColumn>
						<TableColumn className="text-default sm:pr-10 !rounded-br-none bg-[#f8f8f8] lg:text-base">
							Action
						</TableColumn>
					</TableHeader>
					<TableBody>
						<TableRow key="1" className="bg-[#fffdfd] border-b-4 border-white">
							<TableCell className="font-medium text-nowrap md:pl-10 rounded-tl-xl">
								Notifications
							</TableCell>
							<TableCell className="font-normal text-darkGrey">
								Turn on notifications for important updates like rent reminders
								or maintenance alerts to keep your management flow smooth.
							</TableCell>
							<TableCell className="rounded-tr-xl">
								<Switch
									name="notification"
									onValueChange={(val) => handleSettings(val, "notifications")}
									isSelected={settings.notifications}
									size="sm"
								/>
							</TableCell>
						</TableRow>
						<TableRow key="2" className="bg-lightBg border-b-4 border-white">
							<TableCell className="text-nowrap font-medium sm:pl-10 rounded-tl-xl">
								Security Options
							</TableCell>
							<TableCell className="text-darkGrey font-normal">
								Enable Two-Factor Authentication (2FA) by turning it on to add
								an extra layer of security to your account. If you don’t require
								this for now, you can keep it off.
							</TableCell>
							<TableCell className="rounded-tr-xl">
								<Switch
									size="sm"
									onValueChange={(val) =>
										handleSettings(val, "security_option")
									}
									isSelected={settings.security_option}
								/>
							</TableCell>
						</TableRow>
						<TableRow key="3" className="bg-[#FFFDFD] border-b-4 border-white">
							<TableCell className="text-nowrap sm:pl-10 rounded-tl-xl">
								Property Management Preferences
							</TableCell>
							<TableCell className="text-darkGrey font-normal">
								Prefer a specific layout for your property dashboard? Toggle
								Card View on to see all properties in card format. Toggle it off
								if you prefer a more compact list view.
							</TableCell>
							<TableCell className="rounded-tr-xl">
								<Switch
									size="sm"
									onValueChange={(val) =>
										handleSettings(val, "property_management")
									}
									isSelected={settings.property_management}
								/>
							</TableCell>
						</TableRow>
						<TableRow key="4" className="bg-lightBg border-b-4 border-white">
							<TableCell className="sm:pl-10 text-nowrap rounded-tl-xl">
								Data Management
							</TableCell>
							<TableCell className="text-darkGrey font-normal">
								Turn on Auto-Sync to keep your data up-to-date across devices
								without manual refreshes. If you’re working offline, simply
								switch it off until needed.
							</TableCell>
							<TableCell className="rounded-tr-xl">
								<Switch
									size="sm"
									onValueChange={(val) =>
										handleSettings(val, "data_management")
									}
									isSelected={settings.data_management}
								/>
							</TableCell>
						</TableRow>
						<TableRow key="5" className="bg-[#fffdfd]">
							<TableCell className="sm:pl-10 text-nowrap rounded-tl-xl">
								Product Updates & Support
							</TableCell>
							<TableCell className="text-darkGrey font-normal">
								Toggle Product Updates on to get notified about new features and
								enhancements, or turn it off if you’d rather explore updates at
								your own pace.
							</TableCell>
							<TableCell className="rounded-tr-xl">
								<Switch
									size="sm"
									onValueChange={(val) =>
										handleSettings(val, "product_updates")
									}
									isSelected={settings.product_updates}
								/>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default SettingWrapper;