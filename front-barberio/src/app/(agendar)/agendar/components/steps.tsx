import { useForm } from "../../../../contexts/AgendamentoContext";

export const Steps = () => {
  const { state } = useForm();

  return (
    <>
      <p className="text-3xl font-bold">
        Agende seu <span className="texto-azul">horário</span>
      </p>
      <div className="bg-slate-200 rounded-full flex gap-3 px-3 py-2">
        <div
          className={`rounded-full text-sm size-7 flex items-center justify-center
            ${state.currentStep === 1 ? "bg-azul text-white" : ""}
            ${state.currentStep > 1 ? "bg-azul-50 text-white" : ""}
            ${state.currentStep < 1 ? "bg-white text-black" : ""}
            `}
        >
          1
        </div>
        <div
          className={`rounded-full text-sm size-7 flex items-center justify-center
            ${state.currentStep === 2 ? "bg-azul text-white" : ""}
            ${state.currentStep > 2 ? "bg-azul-50 text-white" : ""}
            ${state.currentStep < 2 ? "bg-white text-black" : ""}
            `}
        >
          2
        </div>
        <div
          className={`rounded-full text-sm size-7 flex items-center justify-center
            ${state.currentStep === 3 ? "bg-azul text-white" : ""}
            ${state.currentStep > 3 ? "bg-azul-50 text-white" : ""}
            ${state.currentStep < 3 ? "bg-white text-black" : ""}
            `}
        >
          3
        </div>
        <div
          className={`rounded-full text-sm size-7 flex items-center justify-center
            ${state.currentStep === 4 ? "bg-azul text-white" : ""}
            ${state.currentStep > 4 ? "bg-azul-50 text-white" : ""}
            ${state.currentStep < 4 ? "bg-white text-black" : ""}
            `}
        >
          4
        </div>
      </div>
    </>
  );
};
