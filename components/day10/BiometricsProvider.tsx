import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import * as LocalAuthentication from "expo-local-authentication";

const BiometricsContext = createContext<{
  isUnlocked: boolean;
  authenticate: () => Promise<void>;
}>({
  isUnlocked: false,
  authenticate: async () => {},
});

const BiometricsProvider = ({ children }: PropsWithChildren) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const authenticate = async () => {
    // 获取设备支持的生物识别方式
    const enrolled = await LocalAuthentication.getEnrolledLevelAsync();
    console.log("🚀 ~ authenticate ~ enrolled:", enrolled);
    // 获取设备支持身份验证的类型
    const supported =
      await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log("🚀 ~ authenticate ~ supported:", supported);
    const hasHareware = await LocalAuthentication.hasHardwareAsync();
    console.log("🚀 ~ authenticate ~ hasHareware:", hasHareware);

    const res = await LocalAuthentication.authenticateAsync();
    console.log("🚀 ~ authenticate ~ res:", res);
    if (res.success) {
      setIsUnlocked(true);
    }
  };

  return (
    <BiometricsContext.Provider value={{ isUnlocked, authenticate }}>
      {children}
    </BiometricsContext.Provider>
  );
};

export default BiometricsProvider;

export const useBiometries = () => useContext(BiometricsContext);
