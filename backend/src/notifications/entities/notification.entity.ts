import { randomUUID } from 'crypto';
import { LowdbService } from 'src/database/lowdb.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ResourceNotFoundException } from 'src/exceptions/exceptions';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class Notification {
    private static db: LowdbService;
    private readonly logger = new Logger(Notification.name);

    static injectDb(db: LowdbService) {
        this.db = db;
    }

    private _id: string;
    private _userId: string;
    private _message: string;
    private _read: boolean;
    private _createdAt: Date;

    constructor(userId: string, message: string) {
        this._id = randomUUID();
        this._userId = userId;
        this._message = message;
        this._read = false;
        this._createdAt = new Date();
    }

    // Getters
    get id() { return this._id; }
    get userId() { return this._userId; }
    get message() { return this._message; }
    get read() { return this._read; }
    get createdAt() { return this._createdAt; }

    // Convert to plain object
    toJSON() {
        return {
            id: this._id,
            userId: this._userId,
            message: this._message,
            read: this._read,
            createdAt: this._createdAt
        };
    }

    // Create from plain object
    static fromJSON(data: {
        id: string;
        userId: string;
        message: string;
        read: boolean;
        createdAt: Date | string;
    }): Notification {
        const notification = new Notification(data.userId, data.message);
        notification._id = data.id;
        notification._read = data.read;
        notification._createdAt = new Date(data.createdAt);
        return notification;
    }

    // Mark as read
    markAsRead() {
        this._read = true;
    }

    // Save notification
    async save(): Promise<Notification> {
        if (!Notification.db.data.notifications) {
            Notification.db.data.notifications = [];
        }

        const index = Notification.db.data.notifications.findIndex(n => n.id === this._id);
        const notificationData = this.toJSON();

        if (index >= 0) {
            Notification.db.data.notifications[index] = notificationData;
        } else {
            Notification.db.data.notifications.push(notificationData);
        }

        await Notification.db.write();
        return this;
    }

    // Find all notifications for a user
    static async findByUserId(userId: string): Promise<Notification[]> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const user = this.db.data.users.find((u) => u.id === userId);

        if (!user) {
            throw new ResourceNotFoundException('User', userId);
        }

        if (!this.db.data.notifications) {
            return [];
        }

        const userNotifications = this.db.data.notifications
            .filter(notification => notification.userId === userId)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map(notification => this.fromJSON(notification));

        return userNotifications;
    }

    // Mark all notifications as read
    static async markAllAsRead(userId: string): Promise<void> {
        if (!this.db.data.notifications) return;

        this.db.data.notifications = this.db.data.notifications.map(notification => {
            if (notification.userId === userId && !notification.read) {
                return { ...notification, read: true };
            }
            return notification;
        });

        await this.db.write();
    }

    // Create a notification for incomplete missions
    static async createIncompleteMissionsNotification(userId: string, incompleteMissionsCount: number): Promise<Notification> {
        const message = `You have ${incompleteMissionsCount} mission(s) to complete today!`;
        const notification = new Notification(userId, message);
        return notification.save();
    }
}
