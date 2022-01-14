import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"
import { BalanceEventType, SetBalanceData } from "../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../helpers/common"

function getBalanceSetEvent(ctx: EventHandlerContext): SetBalanceData {
    let event = new events.BalancesBalanceSetEvent(ctx)
    if (event.isV0) {
        let [account, free, res] = event.asV0
        return new SetBalanceData({
            who: encodeID(account),
            free: free,
            reserved: res
        })
    } else {
        let { who, free, reserved } = event.asLatest
        return new SetBalanceData({
            who: encodeID(who),
            free: free,
            reserved: reserved
        })
    }
}


export async function handleBalanceSetEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.BalanceSet, getBalanceSetEvent)
}