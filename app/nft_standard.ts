export interface NFTStandard {
  name: string;
  description: string;
  image: string;
  animationURL?: string;
  externalURL?: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  properties: {
    files: {
      uri: string;
      type: string;
      cdn: boolean;
    }[];
    category: string;
  };
}
