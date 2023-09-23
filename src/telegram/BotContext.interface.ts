import {MessageContext} from "puregram";
import {TwitchLink, Viewer} from "@prisma/client";


export interface BotContext extends MessageContext {
    viewer?: Viewer
    twitchLink?: TwitchLink
    command?: ICommandsList
}


interface ICommandsList {
    commandName: string
    args: string[]
}