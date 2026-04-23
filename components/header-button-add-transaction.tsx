"use client";

import { PlusIcon } from "lucide-react";
import DialogFormTransaction from "./dialog-form-transaction";
import { Button } from "./ui/button";

const HeaderButtonAddTransaction = () => {
  return (
    <DialogFormTransaction
      trigger={
        <Button
          size="icon"
          className="cursor-pointer rounded-full p-6 shadow-xl transition hover:scale-110"
        >
          <PlusIcon className="size-6" />
        </Button>
      }
    />
  );
};

export default HeaderButtonAddTransaction;
