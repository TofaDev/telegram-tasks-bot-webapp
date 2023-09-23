export class DateFormatter {

    static format(date: Date): string {
    // Устанавливаем часовой пояс Москвы
    const moscowTimeZoneOffset = 3 * 60;
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset() + moscowTimeZoneOffset);

    // Функция для форматирования числа (добавляет 0 перед однозначными числами)
    const formatNumber = (num: number): string => (num < 10 ? '0' : '') + num;

    const day = formatNumber(date.getDate());
    const month = formatNumber(date.getMonth() + 1); // Месяцы в JavaScript начинаются с 0
    const year = date.getFullYear();
    const hours = formatNumber(date.getHours());
    const minutes = formatNumber(date.getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
}