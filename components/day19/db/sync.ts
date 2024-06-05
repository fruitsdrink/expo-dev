import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from ".";
import { supabase } from "@/lib/day19/supabase";

const supabaseSync = async () => {
  await synchronize({
    database: database,
    sendCreatedAsUpdated: true,
    // 拉取
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      console.log("🔥 拉取数据");
      console.log({ lastPulledAt, schemaVersion, migration });
      const { data, error } = await supabase.rpc("pull", {
        last_pulled_at: lastPulledAt,
        schemaversion: schemaVersion,
        migration
      });
      if (error) {
        console.error(error);
        throw new Error("拉取失败");
      }
      console.log("🔥 拉取数据完成: ", JSON.stringify(data));
      return {
        changes: data.changes,
        timestamp: data.timestamp
      };
      // return {
      //   changes: {},
      //   timestamp: +new Date()
      // };
    },
    // 推送
    pushChanges: async ({ changes, lastPulledAt }) => {
      console.log("🔥 推送数据");
      console.log(changes);
      const { error } = await supabase.rpc("push", { changes });
      if (error) {
        console.error(error);
        // reject
        throw new Error("推送失败");
      }
    }
    // 本地数据库版本
    // migrationsEnabledAtVersion: 1
  });
};

export { supabaseSync };
