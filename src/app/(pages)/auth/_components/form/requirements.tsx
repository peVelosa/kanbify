import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";

type RequirementsProps = {
  upperCase: boolean;
  lowerCase: boolean;
  number: boolean;
  specialCharacter: boolean;
};

export default function Requirements({
  lowerCase,
  number,
  specialCharacter,
  upperCase,
}: RequirementsProps) {
  return (
    <div className="rounded-md bg-neutral-100/80 p-2">
      <div>
        <p className="flex items-center gap-4">
          {upperCase ? (
            <FaRegCheckCircle className="fill-emerald-700" />
          ) : (
            <FaRegTimesCircle className="fill-red-700" />
          )}{" "}
          Uppercase
        </p>
      </div>
      <div>
        <p className="flex items-center gap-4">
          {lowerCase ? (
            <FaRegCheckCircle className="fill-emerald-700" />
          ) : (
            <FaRegTimesCircle className="fill-red-700" />
          )}{" "}
          Lowercase
        </p>
      </div>
      <div>
        <p className="flex items-center gap-4">
          {number ? (
            <FaRegCheckCircle className="fill-emerald-700" />
          ) : (
            <FaRegTimesCircle className="fill-red-700" />
          )}{" "}
          Number
        </p>
      </div>
      <div>
        <p className="flex items-center gap-4">
          {specialCharacter ? (
            <FaRegCheckCircle className="fill-emerald-700" />
          ) : (
            <FaRegTimesCircle className="fill-red-700" />
          )}{" "}
          Special character
        </p>
      </div>
    </div>
  );
}
