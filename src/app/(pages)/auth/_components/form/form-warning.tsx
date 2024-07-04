import { FaExclamationTriangle } from "react-icons/fa";

const FormWarning = ({ warning }: { warning?: string | null }) => {
  if (!warning) return null;

  return (
    <div className="flex items-center gap-4 rounded-sm bg-yellow-100 p-2 font-bold text-yellow-500">
      <FaExclamationTriangle className="fill-yellow-500" />
      {warning}
    </div>
  );
};

export default FormWarning;
