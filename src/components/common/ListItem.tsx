import { motion, useInView } from "framer-motion";
import { ListItemIconSvg } from "../svgs";
import { useRef } from "react";

const ListItem = ({ text, index }: { text: string; index: number }) => {
	const ref = useRef(null);

	const isInView = useInView(ref, { once: true });

	return (
		<motion.li
			ref={ref}
			transition={{
				delay: index * 0.1,
				duration: 30000,
				type: "spring",
				damping: 30,
				stiffness: 300,
			}}
			initial={{ opacity: 0, y: -20, x: -20 }}
			animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
		>
			<div className="flex gap-3">
				<div>
					<ListItemIconSvg />
				</div>
				<div>
					<p className="text-accent text-sm">{text}</p>
				</div>
			</div>
		</motion.li>
	);
};

export default ListItem;
