import image1 from "../raw/sample-listing-images/1.jpg";
import image2 from "../raw/sample-listing-images/2.jpg";
import image3 from "../raw/sample-listing-images/3.jpg";
import image4 from "../raw/sample-listing-images/4.jpg";
import image5 from "../raw/sample-listing-images/5.jpg";
import image6 from "../raw/sample-listing-images/6.jpg";
import image7 from "../raw/sample-listing-images/7.jpg";
import image8 from "../raw/sample-listing-images/8.jpg";
import image9 from "../raw/sample-listing-images/9.jpg";
import image10 from "../raw/sample-listing-images/10.jpg";
import image11 from "../raw/sample-listing-images/11.jpg";
import image12 from "../raw/sample-listing-images/12.jpg";
import image13 from "../raw/sample-listing-images/13.jpg";

import Carousel from "../../ui/Images/Carousel";

export default function Listings() {
	const images = [
		image1,
		image2,
		image3,
		image4,
		image5,
		image6,
		image7,
		image8,
		image9,
		image10,
		image11,
		image12,
		image13,
	];
	return (
		<div className="justify-center flex flex-col gap-3 my-24">
			<h2 className="my-8 text-3xl font-bold tracking-tight sm:text-4xl text-center">
				Some of our Homes
			</h2>
			<Carousel images={images.map((img) => img.src)} />
		</div>
	);
}
