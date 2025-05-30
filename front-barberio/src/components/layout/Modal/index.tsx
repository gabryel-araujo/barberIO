import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

type ModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  description: string;
  handleSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void>;
  schedule?: () => void;

  footerButtons: React.ReactNode;
  buttonLabel?: string;
}: ModalProps) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}
        <div className="flex items-center justify-between">
          {footerButtons}
          {/* <Button
            className="w-[150px] cursor-pointer"
            variant="secondary"
            onClick={() => setOpen(!open)}
          >
            Cancelar
          </Button>
          <Button
            className="w-[150px] cursor-pointer"
            onClick={handleSubmit ? handleSubmit : schedule}
          >
            Finalizar
          </Button> */}
            {buttonLabel ? buttonLabel : "Finalizar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
