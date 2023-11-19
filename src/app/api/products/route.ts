import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { isAdmin, isAuthenticted } from "../../../../lib/session";

export async function POST(request: NextRequest) {
  const res = await request.json();

  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isAdmin();

  if (!isLogin)
    return NextResponse.json({
      success: false,
      message: "authentication failed",
      status: 401,
    });

  if (!hasPermission)
    return NextResponse.json({
      success: false,
      message: "authorization failed",
      status: 403,
    });

  try {
    const new_product = await prisma.product.create({
      data: res,
    });
  } catch (e) {
    console.error(e);
  }

  revalidatePath("/admin/products");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
