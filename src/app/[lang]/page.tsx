import { getDictionary } from "./dictionaries";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { lang: string } }) {
	const lang = params.lang;
	console.log("Lang:", lang);
	const dict = await getDictionary(lang); // en
	const button_label = dict.products.cart;
	return <Button>{button_label}</Button>; // Add to Cart
}
