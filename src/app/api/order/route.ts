import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendConfirmationEmail, sendAdminNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { generationId, nom, prenom, email, telephone, format, messageArtiste, imageUrl } =
      await req.json();

    if (!generationId || !nom || !prenom || !email || !format) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert order into database
    const { data: order, error: dbError } = await getSupabaseAdmin()
      .from("commandes")
      .insert({
        generation_id: generationId,
        nom,
        prenom,
        email,
        telephone: telephone || null,
        format,
        message_artiste: messageArtiste || null,
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("DB error:", dbError);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    const orderDetails = {
      nom,
      prenom,
      email,
      telephone,
      format,
      messageArtiste,
      imageUrl,
      orderId: order.id,
    };

    // Send emails (non-blocking — don't fail the order if emails fail)
    try {
      await Promise.all([
        sendConfirmationEmail(orderDetails),
        sendAdminNotification(orderDetails),
      ]);
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
