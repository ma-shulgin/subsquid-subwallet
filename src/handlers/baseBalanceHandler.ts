import { BalanceData, BalanceEventType, BalanceTransaction } from "../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"

export type BalanceEvent = BalanceData

export async function handleBalanceEvent(ctx: EventHandlerContext, eventType: BalanceEventType, getter: (ctx: EventHandlerContext) => BalanceEvent) {
    let data = getter(ctx)

    await ctx.store.save(new BalanceTransaction({
        id: ctx.event.id,
        success: true,
        blockHash: ctx.block.hash,
        blockNumber: ctx.event.blockNumber,
        extrinisicHash: ctx.extrinsic?.hash,
        date: new Date(ctx.block.timestamp),
        data: data,
        event: eventType
    }))
}