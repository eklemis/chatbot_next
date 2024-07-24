import { getDictionary } from "../../../dictionaries";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

export default async function Page({
	params,
}: {
	params: { lang: string; id: string };
}) {
	const lang = params.lang;
	const assistant_id = params.id;

	const dict = await getDictionary(lang); // en
	const button_label = dict.products.cart;
	return (
		<Button>
			<EnvelopeOpenIcon className="mr-2 h-4 w-4" /> {button_label}
		</Button>
	); // Add to Cart
}
