import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) { }
  async execute(request: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(recipientId);

    if (!count) {
      throw new NotificationNotFoundError();
    }

    return {
      count,
    }
  }
}
