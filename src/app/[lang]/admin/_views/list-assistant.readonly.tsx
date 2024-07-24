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
import { Button } from "@/components/ui/button";
axios.defaults.baseURL = process.env.BASE_PATH;

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
		<Carousel className="w-full">
			{!loading && (
				<CarouselContent className="-ml-1 gap-x-2 w-11/12">
					{assistants.map((assistant, index) => (
						<CarouselItem
							key={index}
							className="pl-1 md:basis-1/2 lg:basis-1/3"
						>
							<Card className="border w-46 h-full">
								<CardContent className="p-0">
									<Button
										variant={"outline"}
										className="w-full h-full flex flex-col aspect-square items-center justify-between p-4 gap-y-2 relative"
									>
										<Avatar className="w-20 h-20">
											<AvatarImage
												src="https://github.com/shadcn.png"
												alt="@shadcn"
											/>
											<AvatarFallback>
												{assistant.name.substring(0, 2).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<span className="font-semibold text-gray-700 mt-2 text-center">
											{assistant.name}
										</span>
										<span className="text-gray-500 font-semibold">
											{assistant.description}
										</span>
										<span className="text-sm text-gray-500 absolute bottom-2 mb-1">
											{assistant.model}
										</span>
									</Button>
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
