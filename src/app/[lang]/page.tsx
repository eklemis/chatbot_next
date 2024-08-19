import { getDictionary } from "./dictionaries";
import { AssistantList } from "./admin/_views/list-assistant.readonly";
import Link from "next/link";
export default async function Page({ params }: { params: { lang: string } }) {
	const lang = params.lang;
	const dict = await getDictionary(lang);
	return (
		<>
			<nav className="flex py-1 px-4 justify-end">
				<Link
					href={"/admin"}
					className="flex bg-orange-700 text-white p-2 rounded-sm"
				>
					Admin
				</Link>
			</nav>
			<section className="flex flex-col items-center justify-center p-2 gap-y-8 w-screen pb-8 h-[calc(100svh-48px)] max-h-screen">
				<h3 className=" text-gray-600 text-center">Welcome to Virtual HR</h3>
				<h1 className=" text-6xl text-center">Who Do You Want to Talk With?</h1>
				<section className="w-full md:w-5/12 flex justify-center">
					<AssistantList />
				</section>
			</section>
		</>
	);
}
