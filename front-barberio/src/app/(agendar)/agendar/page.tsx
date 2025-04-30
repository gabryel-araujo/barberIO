"use client";
import { Button } from "@/components/ui/button";
import { Step1 } from "./components/step1";
import {
  AgendamentoAction,
  useForm,
} from "../../../contexts/AgendamentoContext";
import { Steps } from "./components/steps";
import { Step2 } from "./components/step2";
import { Step3 } from "./components/step3";
import { Step4 } from "./components/step4";
const agendar = () => {
  const { state, dispatch } = useForm();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
      <Steps />
      <div className="w-full flex flex-col items-center justify-center">
        {state.currentStep == 1 && (
          <div className="w-full">
            <Step1 />
          </div>
        )}
        {state.currentStep == 2 && (
          <div>
            <Step2 />
          </div>
        )}
        {state.currentStep == 3 && (
          <div>
            <Step3 />
          </div>
        )}
        {state.currentStep == 4 && (
          <div>
            <Step4 />
          </div>
        )}
      </div>
    </div>
  );
};
export default agendar;
