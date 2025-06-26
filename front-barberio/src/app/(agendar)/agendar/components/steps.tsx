"use client";

import { StepItem } from "./StepItem";

export const Steps = () => {
  const arrSteps = [1, 2, 3, 4];

  return (
    <>
      <p className="text-3xl font-bold">
        Agende seu <span className="texto-azul">horário</span>
      </p>
      <div className="bg-slate-200 rounded-full flex gap-3 px-3 py-2">
        {arrSteps.map((item) => (
          <StepItem pageNumber={item} key={item} />
        ))}
      </div>
    </>
  );
};
