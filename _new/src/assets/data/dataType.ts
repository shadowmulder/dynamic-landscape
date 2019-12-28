export type DemoData = {
  provider: Providers;
  providerIcon: string;
  category: Array<string>;
  service: string;
  webLink: string;
  img: string;
  description: string;
  keywords: Array<string>;
  // [key: string]: any;
};

export type Providers = 'Google' | 'AWS' | 'Azure' | null;

export type DataFilter = {
  provider: Providers[];
  category: any;
};
