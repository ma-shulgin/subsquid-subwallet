import * as ss58 from "@subsquid/ss58"

import { BalanceEventType, BalanceStatus, BalanceTransaction } from "../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"

export interface BalanceEvent {
    accounts: Uint8Array[]
    amounts: bigint[]
    status?: BalanceStatus
}

export async function handleBalanceEvent(ctx: EventHandlerContext, eventType: BalanceEventType, getter: (ctx: EventHandlerContext) => BalanceEvent) {
    let event = getter(ctx)
    let accounts = event.accounts.map(account => ss58.codec('polkadot').encode(account))

    await ctx.store.save(new BalanceTransaction({
        id: ctx.event.id,
        success: true,
        blockHash: ctx.block.hash,
        blockNumber: ctx.event.blockNumber,
        extrinisicHash: ctx.extrinsic?.hash,
        date: new Date(ctx.block.timestamp),
        accounts: accounts,
        amounts: event.amounts,
        status: event.status,
        event: eventType
    }))
}