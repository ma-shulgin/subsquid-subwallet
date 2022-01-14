import * as ss58 from "@subsquid/ss58"

export function encodeID(ID: Uint8Array) {
    return ss58.codec('polkadot').encode(ID);
}