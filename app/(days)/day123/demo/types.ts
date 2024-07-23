export type RootStackParamList = {
  Home: undefined;
  Detail:
    | {
        item: {
          id: string;
          imageUri: string;
          title: string;
        };
      }
    | undefined;
};
