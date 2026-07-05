import { Fragment, type ReactElement } from "react";

/**
 * Render `**bold**` segments in a plain string as real React `<b>` nodes.
 * Safe by construction — no `dangerouslySetInnerHTML`, so content in
 * `lib/data.ts` can stay plain text.
 */
export function RichText({ text }: { text: string }): ReactElement {
  return (
    <>
      {text
        .split(/\*\*(.+?)\*\*/g)
        .map((part, i) =>
          i % 2 === 1 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>
        )}
    </>
  );
}
