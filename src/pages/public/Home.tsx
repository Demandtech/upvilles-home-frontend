import { FC } from "react";
import Header from "../../layouts/public/Header";
import Hero from "../../components/public/home/Hero";
import AllInOne from "../../components/public/home/AllInOne";
import Features from "../../components/public/home/Features";
import Experience from "../../components/public/home/Experience";
import GuideStep from "../../components/public/home/GuideStep";
import Ready from "../../components/public/home/Ready";
import Footer from "../../layouts/public/Footer";

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
