//View that list paged assitants
"use client";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import { SkeletonCard } from "@/components/compounded/skeleton-card";

axios.defaults.baseURL = process.env.BASE_PATH;

import Link from "next/link";

interface Assistant {
	id: string;
	name: string;
	model: string;
	description: string;
	instruction: string;
	tools: string[];
	avatar: string;
	top_p: number;
	temperature: number;
}

export function AssistantList(dictionary: any) {
	const dict = dictionary.dictionary;
	const [assistants, setAssistants] = useState<Assistant[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const imageList = [
		"https://i.ibb.co.com/SKwpx5z/openart-assistant-6.jpg",
		"https://i.ibb.co.com/zxSXs0q/openart-assistant-2.jpg",
		"https://i.ibb.co.com/PNBTv9R/openart-assistant-1.jpg",
		"https://i.ibb.co.com/Wc72vLP/openart-assistant-5.jpg",
		"https://i.ibb.co.com/ftjn7JD/openart-assistant-4.jpg",
		"https://i.ibb.co.com/h9SGvb4/openart-assistant-3.jpg",
	];

	useEffect(() => {
		const fetchAssistants = async () => {
			try {
				const response: AxiosResponse<Assistant[]> = await axios.get(
					"/api/assistants"
				);
				setAssistants(response.data);
			} catch (error) {
				console.error("Failed fetching assistants:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchAssistants();
	}, []);

	return (
		<Carousel className="w-56 md:w-full">
			{!loading && (
				<CarouselContent className="-ml-2 gap-x-2 w-full md:w-11/12 lg:w-11/12">
					{assistants.map((assistant, index) => (
						<CarouselItem
							key={index}
							className="pl-2 basis-48 md:basis-1/2 lg:basis-1/3"
						>
							<Card className="border h-full">
								<CardContent className="p-0">
									<Link
										href={"/interview/" + assistant.id + "/" + assistant.name}
										className="w-full h-full flex flex-col aspect-square items-center justify-between p-4 gap-y-2 relative"
									>
										<div className="flex flex-col gap-y-2 items-center">
											<Avatar className="w-20 h-20">
												<AvatarImage
													className="object-cover"
													src={imageList[index]}
													alt="@shadcn"
												/>
												<AvatarFallback>
													{assistant.name.substring(0, 2).toUpperCase()}
												</AvatarFallback>
											</Avatar>
											<span className="font-semibold text-gray-700 text-center">
												{assistant.name}
											</span>
										</div>
										<div className="w-full flex flex-col gap-y-2 min-h-24 max-w-60 rounded-sm">
											<p className="text-sm text-gray-500 self-start">
												Model:
												<span className="font-bold text-gray-700">
													{" " + assistant.model}
												</span>
											</p>
											<span className="text-gray-500 text-sm">
												{assistant.description ? assistant.description : "-"}
											</span>
										</div>
									</Link>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
			)}
			{loading && (
				<div className="flex gap-x-2">
					<SkeletonCard />
					<SkeletonCard />
					<SkeletonCard />
				</div>
			)}
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
