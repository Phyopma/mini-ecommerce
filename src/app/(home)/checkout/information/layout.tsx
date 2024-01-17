import React from "react";
import { isAuthenticted } from "../../../../../lib/session";
import { redirect } from "next/navigation";

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
  addressModal: React.ReactNode;
}) {
  if (!(await isAuthenticted())) {
    redirect("/authTab?callbackUrl=/checkout/information");
  }

  return <>{children}</>;
}
