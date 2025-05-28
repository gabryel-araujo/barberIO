import { Input } from "@/components/ui/input";
import { z } from "zod";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export const schema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  phone: z.string().min(11, "Telefone inválido"),
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
          <Input type="text" {...register("phone")} />
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
