import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
	const pathname = useLocation().pathname;
	useLayoutEffect(() => {
		window.document.body.scrollTo(0, 0);
		console.log(window.innerWidth);
	}, [pathname]);
	return null;
}

export default ScrollToTop;
