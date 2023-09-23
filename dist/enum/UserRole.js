"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateUserRole = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["DEFAULT"] = "DEFAULT";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["PREMIUM"] = "PREMIUM";
})(UserRole || (exports.UserRole = UserRole = {}));
function translateUserRole(role) {
    // Обработка роли в текстовом виде
    if (!Object.values(UserRole).includes(role)) {
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
exports.translateUserRole = translateUserRole;
