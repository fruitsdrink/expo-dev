import { useEffect, useState } from "react";
import { Platform } from "react-native";
import AppleHealthKit, {
  HealthKitPermissions,
  HealthInputOptions
} from "react-native-health";

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps, // 步数
      AppleHealthKit.Constants.Permissions.FlightsClimbed, // 已爬楼层
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning // 步行+跑步距离
    ],
    write: []
  }
};

export const useHealthData = ({ date }: { date: Date }) => {
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const [steps, setSteps] = useState<number>(0);
  const [filghts, setFilghts] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    if (Platform.OS !== "ios") {
      console.log("[ERROR] HealthKit is only available on iOS!");
      return;
    }

    AppleHealthKit.isAvailable((err, isAvailable) => {
      if (err) {
        console.log("[ERROR] Cannot check availability!");
        return;
      }

      if (!isAvailable) {
        console.log("[ERROR] HealthKit is not available!");
        return;
      }

      AppleHealthKit.initHealthKit(permissions, (err) => {
        if (err) {
          setHasPermissions(false);
          console.log("[ERROR] Cannot grant permissions!");
          // 需要用户手动打开健康app授权
          return;
        }

        setHasPermissions(true);
      });
    });
  }, []);

  useEffect(() => {
    if (hasPermissions === false) {
      return;
    }

    const options: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: false
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log("[ERROR] Cannot get step count!", err);
        return;
      }

      console.log(results);
      setSteps(results.value);
    });

    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
        console.log("[ERROR] Cannot get flights climbed!", err);
        return;
      }

      console.log(results);
      setFilghts(results.value);
    });

    AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
      if (err) {
        console.log("[ERROR] Cannot get distance!", err);
        return;
      }

      console.log(results);
      setDistance(results.value);
    });
  }, [hasPermissions]);

  return { hasPermissions, steps, filghts, distance };
};
