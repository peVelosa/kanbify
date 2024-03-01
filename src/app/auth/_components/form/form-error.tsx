import { FaExclamationTriangle } from "react-icons/fa";

const FormError = ({ error }: { error: string }) => {
  if (!error) return null;

  return (
    <div className="flex items-center gap-4 rounded-sm bg-red-100 p-2 font-bold text-red-500">
      <FaExclamationTriangle className="fill-red-500" />
      {error}
    </div>
  );
};

export default FormError;
