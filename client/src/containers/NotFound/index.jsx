import { SiIconfinder } from "react-icons/si";
import { BoldLink } from "../../components/AccountBox/FormElements";

export default function NotFound() {
  return (
    <div className="h-full w-full min-h-screen min-w-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <SiIconfinder className="text-white text-[32px]" />
        <div className="text-white text-2xl font-bold">404 | Not Found</div>
        <div className="flex items-center gap-4">
        <BoldLink to="/"> Home </BoldLink> <span className="text-md text-white"> | </span> <BoldLink to="/auth/register"> Register </BoldLink>
        </div>
      </div>
    </div>
  );
}
