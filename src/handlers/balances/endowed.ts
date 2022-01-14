import * as events from "../../types/events"

import { BalanceData, BalanceEventType } from "../../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../../helpers/common"
import { handleBalanceEvent } from "./baseHandler"

function getEndowedEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesEndowedEvent(ctx)
    if (event.isV0) {
        let [account, amount] = event.asV0
        return new BalanceData({
            account: encodeID(account),
            amount: amount,
        })
    } else {
        let { account, freeBalance } = event.asLatest
        return new BalanceData({
            account: encodeID(account),
            amount: freeBalance,
        })
    }
}


export async function handleEndowedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Endowed, getEndowedEvent)
}