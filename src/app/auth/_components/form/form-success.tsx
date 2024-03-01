import { FaCheckCircle } from "react-icons/fa";

const FormSuccess = ({ success }: { success: string }) => {
  if (!success) return null;

  return (
    <div className="flex items-center gap-4 rounded-sm bg-emerald-100 p-2 font-bold text-emerald-500">
      <FaCheckCircle className="fill-emerald-500" />
      {success}
    </div>
  );
};

export default FormSuccess;
