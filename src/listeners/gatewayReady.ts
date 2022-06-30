import { ClusterClient, GatewayClientEvents } from 'detritus-client';
import { ClientEvents } from 'detritus-client/lib/constants';

export const readyTimestamp = Date.now();

export default {
    name: ClientEvents.GATEWAY_READY,

    execute(payload: GatewayClientEvents.GatewayReady, cluster: ClusterClient) {
        console.log(`\nI'm ready! ${cluster.shardCount} shards loaded. - ${payload.raw.user.username}`);
    }
};