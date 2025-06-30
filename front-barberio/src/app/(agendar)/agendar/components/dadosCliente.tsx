"use client";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export const schema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter no mínimo 2 caracteres")
    .regex(/^[a-zA-Z\s]*$/, {
      message: "O campo deve conter apenas letras.",
    }),
  phone: z
    .string()
    .regex(/^\d{11}$/, "Telefone inválido, digite no formato XX 9XXXX XXXX"),
});

export type FormData = z.infer<typeof schema>;

type DadosClienteProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export function DadosCliente({ register, errors }: DadosClienteProps) {
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };
  return (
    <div className="flex flex-col gap-3">
      <form className="flex flex-col gap-3">
        <div>
          <p className="text-sm">Nome</p>
          <Input type="text" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 italic text-xs">{errors.name.message}</p>
          )}
        </div>
        <div>
          <p className="text-sm">Telefone</p>
          <Input
            type="text"
            inputMode="numeric"
            onInput={handlePhoneInput}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 italic text-xs">
              {errors.phone.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
