import { IErrorMessage } from "./types/ErrorMessage";
import { CircleX } from "lucide-react";


export default function ErrorMessage({ message }: IErrorMessage) {
  if (!message) return null;

  return (
    <div className="flex items-center w-full h-5 gap-2 mt-2">
      <CircleX color="#FF0000" />
      <span className="font-nunito text-[0.875rem] text-gray-400 font-normal leading-normal">
        {message}
      </span>
    </div>
  );
}
