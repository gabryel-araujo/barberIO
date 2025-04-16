import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AditionalInfo() {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="flex flex-col gap-6 w-2/5">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Complete seu cadastro</CardTitle>
            <CardDescription>
              Insira as informações adicionais para completar o seu cadastro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label>Data de nascimento</Label>
                  <Input type="date" placeholder="01/01/1970" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label>Senha</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label>Confirmar Senha</Label>
                  </div>
                  <Input id="confirmPassword" type="password" required />
                </div>
                <div className="grid gap-2">
                  <Label>Iniciou a carreira em:</Label>
                  <Input type="date" placeholder="01/01/1970" required />
                </div>
                <Button type="submit" className="w-full">
                  Concluir
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
