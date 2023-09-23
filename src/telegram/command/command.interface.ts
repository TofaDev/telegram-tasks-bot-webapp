import { UserRole } from "../../enum/UserRole"
import { BotContext } from "../BotContext.interface"

export interface ICommand {
    name: string
    desk: string
    role: UserRole
    execute(context: BotContext): Promise<void>
}