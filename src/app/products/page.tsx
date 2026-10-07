import { redirect } from "next/navigation";

export default function ProductsIndexRedirect() {
  redirect(encodeURI("/#সব-পণ্য"));
}
