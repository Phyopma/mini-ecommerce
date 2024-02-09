import { OrderWithAllDetails } from "@/app/types";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import AdminOrderItemDetailTable from "./admin-order-item-detail-table";
import CustomerInformation from "./customer-information";
import CustomerPaymentInformation from "./customer-payment-info";

export default function AdminOrderItem({
  order,
}: {
  order: OrderWithAllDetails;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible className="my-3" open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div
          className={cn(
            "grid grid-cols-5 items-center rounded-md bg-sky-50 p-4 text-start text-sm font-medium tracking-wide ",
            isOpen ? "rounded-b-none shadow-none" : "rounded-md shadow-md",
          )}
        >
          <span className="ml-2">
            {order.id.split("-").slice(-1).toString().toUpperCase()}
          </span>
          <span className="ml-2 flex flex-col text-xs font-light">
            <span className="mb-2 text-sm font-medium">
              {order.customer.name}
            </span>
            <span>{`${order.address.address}, ${order.address.city}`}</span>
            <span>{`${order.address.postalCode}, ${order.address.state}`}</span>
            <span>{`Phone: ${order.address.phoneNumber}`}</span>
          </span>
          <span className="ml-2 tracking-widest">
            $ {order.totalAmount.toFixed(2)}
          </span>
          <span className="ml-2 capitalize">{order.status.toLowerCase()}</span>
          <span className="ml-2 flex flex-col gap-3">
            {order.createdAt
              .toLocaleString()
              .split(",")
              .reverse()
              .map((s) => (
                <span>{s}</span>
              ))}
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Card className="rounded-t-none border-0 bg-slate-50 shadow-md">
          <CardHeader>
            <CardTitle className="text-base font-bold leading-9 tracking-widest">
              {order.id.toUpperCase()}
            </CardTitle>
            <CardDescription>{order.updatedAt.toUTCString()}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row gap-5">
            <div className="w-2/3">
              <AdminOrderItemDetailTable orderList={order.orderItems} />
              <CustomerPaymentInformation order={order} />
            </div>
            <div className="w-1/3">
              <CustomerInformation order={order} />
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
