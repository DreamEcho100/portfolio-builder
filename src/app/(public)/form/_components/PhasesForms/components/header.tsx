import type { ReactNode } from "react";
import Text from "~/components/common/Text";

export default function PhaseFormHeader(props: { heading: ReactNode }) {
  return (
    <header>
      <Text.H2 className="capitalize">{props.heading}</Text.H2>
    </header>
  );
}
