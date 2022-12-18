import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";
import { SendNotification } from "./send-notification";

describe('Cancel notification', () => {
  it('Should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      content: new Content('This is a notification'),
      category: 'social',
      recipientId: 'example-recipient-id'
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationsRepository.notifications[0].canceledAt).toBeTruthy();
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
  })

  it('Should not b able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
      notificationId: 'fake-notification-id',
    })
    }).rejects.toThrow(NotificationNotFoundError);

  })
})