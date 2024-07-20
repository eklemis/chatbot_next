import { Card, CardContent } from "@/components/ui/card";
import { getDictionary } from "../dictionaries";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import { NewAssistantForm } from "@/components/forms/new-assistant";

export default async function Page({ params }: { params: { lang: string } }) {
	const lang = params.lang;
	const dict = await getDictionary(lang);

	return (
		<section className="flex flex-col items-center justify-center">
			<Carousel className="w-full max-w-sm">
				<CarouselContent className="-ml-1">
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem
							key={index}
							className="pl-1 md:basis-1/2 lg:basis-1/3"
						>
							<div className="p-1">
								<Card>
									<CardContent className="flex aspect-square items-center justify-center p-6">
										<span className="text-2xl font-semibold">{index + 1}</span>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>

			<NewAssistantForm dictionary={dict} />
		</section>
	);
}
