import { BalanceData, BalanceEventType, BalanceTransaction } from "../../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"

export async function handleBalanceEvent(ctx: EventHandlerContext,
    eventType: BalanceEventType,
    getter: (ctx: EventHandlerContext) => BalanceData) {
    let data = getter(ctx)

    let transaction = new BalanceTransaction({
        id: ctx.event.id,
        blockHash: ctx.block.hash,
        blockNumber: ctx.event.blockNumber,
        extrinisicHash: ctx.extrinsic?.hash,
        date: new Date(ctx.block.timestamp),
    })
    transaction.data = data
    transaction.event = eventType
    await ctx.store.save(transaction)
}