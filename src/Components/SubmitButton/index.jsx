import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <>
      <button
        type="submit"
        disabled={pending}
        className="text-white bg-teal-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        {pending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Waiting...
          </>
        ) : (
          <>
            <span>Submit</span>
          </>
        )}
      </button>
    </>
  )
}

export default SubmitButton;
