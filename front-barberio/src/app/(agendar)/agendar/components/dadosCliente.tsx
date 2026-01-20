"use client";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { maskPhone } from "@/lib/utils";

export const schema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter no mínimo 2 caracteres")
    .regex(/^[a-zA-ZáàâãäéèêëíìîïóòôõöúùûüçÇ\s]*$/, {
      message: "O campo deve conter apenas letras.",
    }),
  phone: z
    .string()
    .regex(/^\d{10,11}$/, "Telefone inválido, digite no formato XX XXXXX XXXX"),
});

export type FormData = z.infer<typeof schema>;

type DadosClienteProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export function DadosCliente({ register, errors }: DadosClienteProps) {
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
            {...register("phone", {
              onChange: (e) => {
                e.target.value = maskPhone(e.target.value);
              },
              setValueAs: (value) => value.replace(/\D/g, ""),
            })}
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
