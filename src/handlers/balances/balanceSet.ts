import * as events from "../../types/events"

import { BalanceData, BalanceEventType } from "../../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../../helpers/common"
import { handleBalanceEvent } from "./baseHandler"

function getBalanceSetEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesBalanceSetEvent(ctx)
    if (event.isV0) {
        let [account, free, res] = event.asV0
        return new BalanceData({
            account: encodeID(account),
            free: free,
            reserved: res
        })
    } else {
        let { who, free, reserved } = event.asLatest
        return new BalanceData({
            account: encodeID(who),
            free: free,
            reserved: reserved
        })
    }
}


export async function handleBalanceSetEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.BalanceSet, getBalanceSetEvent)
}