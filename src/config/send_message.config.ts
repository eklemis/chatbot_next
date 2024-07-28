import { SendMessageService } from "@/lib/interview/domain/send_message.service";
import { OpenAiSendMessageAdapter } from "@/lib/interview/adapter/out/rest/openai_sendmessage.adapter.out";
export const SendMessageConfig = {
	sendMessageUseCase: new SendMessageService(new OpenAiSendMessageAdapter()),
};
