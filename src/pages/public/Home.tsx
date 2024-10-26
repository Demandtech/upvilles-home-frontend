import { FC } from "react";
import Header from "../../components/layouts/public/Header";
import Hero from "../../components/home/Hero";
import AllInOne from "../../components/home/AllInOne";
import Features from "../../components/home/Features";
import Experience from "../../components/home/Experience";
import GuideStep from "../../components/home/GuideStep";
import Ready from "../../components/home/Ready";
import Footer from "../../components/layouts/public/Footer";

const Home: FC = () => {
	return (
		<div className="max-w-[1440px] mx-auto">
			<Header />
			<main className="mx-auto">
				<Hero />
				<AllInOne />
				<Features />
				<Experience />
				<GuideStep />
				<Ready />
				<Footer />
			</main>
		</div>
	);
};

export default Home;
