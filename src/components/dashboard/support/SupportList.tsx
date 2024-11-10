import SupportItem from "./SupportItem";

const supports = [
	{
		name: "Knowledge Base",
		text: "A searchable library of common questions, covering topics like account setup, property management features, tenant management, maintenance tracking, and reporting.",
		href: "Find Answers Quickly",
	},
	{
		name: "Live Chat Support",
		text: "Connect with a customer support agent in real-time via a chat interface within the app.x",
		href: "Connect Now",
	},
	{
		name: "Contact Support",
		text: "A searchable library of common questions, covering topics like account setup, property management features, tenant management, maintenance tracking, and reporting.",
		href: "Submit a Detailed Inquiry",
	},
	{
		name: "Troubleshooting Guide",
		text: "Get solutions for common issues like login problems, data sync issues, and mobile app troubleshooting tips.",
		href: "Explore Quick Fixes",
	},
	{
		name: "Product Updates & Announcement",
		text: "Get Information on new features, updates, or enhancements, keeping users informed about improvements.",
		href: "See Latest Features",
	},
	{
		name: "Knowledge Base",
		text: "A searchable library of common questions, covering topics like account setup, property management features, tenant management, maintenance tracking, and reporting.",
		href: "Find Answers Quickly",
	},
	{
		name: "Knowledge Base",
		text: "A searchable library of common questions, covering topics like account setup, property management features, tenant management, maintenance tracking, and reporting.",
		href: "Find Answers Quickly",
	},
	{
		name: "Knowledge Base",
		text: "A searchable library of common questions, covering topics like account setup, property management features, tenant management, maintenance tracking, and reporting.",
		href: "Find Answers Quickly",
	},
	{
		name: "Knowledge Base",
		text: "A searchable library of common questions, covering topics like account setup, property management features, tenant management, maintenance tracking, and reporting.",
		href: "Find Answers Quickly",
	},
];
function SupportList() {
	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
			{supports.map((item, index) => {
				return <SupportItem {...item} key={index} />;
			})}
		</div>
	);
}

export default SupportList;
