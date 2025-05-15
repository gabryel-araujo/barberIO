import { useForm } from "@/contexts/AgendamentoContextProvider";

type StepItemProps = {
  pageNumber: number;
};

export function StepItem({ pageNumber }: StepItemProps) {
  const { state } = useForm();

  return (
    <div
      className={`rounded-full text-sm size-7 flex items-center justify-center
            ${state.currentStep === pageNumber ? "bg-azul text-white" : ""}
            ${state.currentStep > pageNumber ? "bg-azul-50 text-white" : ""}
            ${state.currentStep < pageNumber ? "bg-white text-black" : ""}
            `}
    >
      {pageNumber}
    </div>
  );
}
