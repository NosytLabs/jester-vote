// TypeScript declarations for Twitter/X widgets

declare global {
  interface Window {
    twttr?: {
      widgets: {
        createTweet: (
          tweetId: string,
          container: HTMLElement | null,
          options?: {
            theme?: "light" | "dark";
            cards?: "hidden" | "visible";
            conversation?: "none" | "all";
            align?: "left" | "center" | "right";
            dnt?: boolean;
            width?: number | string;
          }
        ) => Promise<HTMLElement | null>;
        createTimeline: (
          source: object,
          container: HTMLElement | null,
          options?: object
        ) => Promise<HTMLElement | null>;
        load: () => void;
      };
      ready: (callback: (twttr: Window["twttr"]) => void) => void;
    };
  }
}

export {};
