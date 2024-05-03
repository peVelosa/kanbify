"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function PasswordInput<T>({ field }: { field: T }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toogleVisible = () => setIsVisible(!isVisible);

  return (
    <>
      <div className="relative">
        <Input
          placeholder="******"
          type={isVisible ? "text" : "password"}
          {...field}
        />
        <Button
          className="absolute inset-y-[5px] right-2 mr-auto h-auto w-fit p-2 shadow-none"
          type="button"
          onClick={toogleVisible}
          size={"sm"}
          tabIndex={-1}
        >
          {isVisible ? <FaRegEyeSlash /> : <FaRegEye />}
        </Button>
      </div>
    </>
  );
}
