import { getDictionary } from "./dictionaries";
import { AssistantList } from "./admin/_views/list-assistant.readonly";

export default async function Page({ params }: { params: { lang: string } }) {
	const lang = params.lang;
	console.log("Lang:", lang);
	const dict = await getDictionary(lang);
	return (
		<section className="flex flex-col items-center justify-center gap-y-8 w-screen pb-8 h-screen">
			<h3 className=" text-gray-600">Welcome to Virtual HR</h3>
			<h1 className=" text-6xl">Who Do You Want to Talk With?</h1>
			<section className="w-5/12">
				<AssistantList />
			</section>
		</section>
	); // Add to Cart
}
