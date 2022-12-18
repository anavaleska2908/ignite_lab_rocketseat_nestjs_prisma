import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";
import { ReadNotification } from './read-notification';
import { UnreadNotification } from './unread-notification';

describe('Umread notification', () => {
  it('Should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationsRepository.notifications[0].readAt).toBeTruthy();
    expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
  })

  it('Should not b able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
      notificationId: 'fake-notification-id',
    })
    }).rejects.toThrow(NotificationNotFoundError);

  })
})