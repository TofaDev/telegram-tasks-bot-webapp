export enum UserRole {
    DEFAULT = "DEFAULT",
    ADMIN = "ADMIN",
    PREMIUM = "PREMIUM"
}

export function translateUserRole(role: UserRole | string): string {

    // Обработка роли в текстовом виде
    if (!Object.values(UserRole).includes(role as UserRole)) {
        return "Неизвестная роль";
    }

    switch (role) {
        case UserRole.DEFAULT:
            return "Пользователь";
        case UserRole.ADMIN:
            return "Администратор";
        case UserRole.PREMIUM:
            return "Випер";
        default:
            return "Неизвестная роль";
    }
}