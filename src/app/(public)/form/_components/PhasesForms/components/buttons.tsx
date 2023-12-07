import type { StoreApi } from "zustand";
import { useStore } from "zustand";
import { Button } from "~/components/common/ui/button";
import { type PhasesManagerStoreApi } from "../utils";

export default function PhaseFormButtons(props: {
  phasesManagerStore: PhasesManagerStoreApi;
  currentFormStore: StoreApi<{
    isDirty: boolean;
    submit: { isActive: boolean };
  }>;
  isDisabled?: boolean;
}) {
  const isDirty = useStore(props.currentFormStore, (store) => store.isDirty);
  const isActive = useStore(
    props.currentFormStore,
    (store) => store.submit.isActive,
  );

  const hasPrevPhase = useStore(
    props.phasesManagerStore,
    (store) =>
      store.currentPhase > store.minPhase && !props.isDisabled && !isActive,
  );
  const hasNextPhase = useStore(
    props.phasesManagerStore,
    (store) =>
      store.currentPhase < store.maxPhase &&
      !isDirty &&
      !props.isDisabled &&
      !isActive,
  );
  const setCurrentPhase = useStore(
    props.phasesManagerStore,
    (store) => store.setCurrentPhase,
  );

  return (
    <footer className="flex items-center justify-between">
      <Button
        onClick={() => hasPrevPhase && setCurrentPhase((prev) => prev - 1)}
        disabled={!hasPrevPhase}
        className="rounded-e-none rounded-s"
        classVariants={{ size: "lg" }}
      >
        prev
      </Button>
      <Button
        // onClick={() => hasNextPhase && setCurrentPhase((prev) => prev - 1)}
        disabled={!hasNextPhase}
        type="submit"
        className="rounded-e rounded-s-none"
        classVariants={{ size: "lg" }}
      >
        next
      </Button>
    </footer>
  );
}
