declare const graphql: (query: TemplateStringsArray) => void;

// navigator.clipboard.d.ts

// Type declarations for Clipboard API
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
declare interface Clipboard {
  writeText(newClipText: string): Promise<void>;
  // Add any other methods you need here.

  readText(): Promise<string>;
}

declare interface NavigatorClipboard {
  // Only available in a secure context.
  readonly clipboard?: Clipboard;
}

declare interface Navigator extends NavigatorClipboard { }