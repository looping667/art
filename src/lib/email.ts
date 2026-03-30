import { Resend } from "resend";

const fromEmail = "Atelier Toile <onboarding@resend.dev>";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface OrderDetails {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  format: string;
  messageArtiste?: string;
  imageUrl: string;
  orderId: string;
}

export async function sendConfirmationEmail(order: OrderDetails) {
  const resend = getResend();
  await resend.emails.send({
    from: fromEmail,
    to: order.email,
    subject: "Votre commande Atelier Toile a bien été reçue",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #3D2B1F;">
        <h1 style="color: #C4714A;">Merci ${order.prenom} !</h1>
        <p>Votre commande de peinture a bien été enregistrée.</p>
        <p><strong>Format :</strong> ${order.format}</p>
        <p><strong>Référence :</strong> ${order.orderId}</p>
        ${order.messageArtiste ? `<p><strong>Votre message :</strong> ${order.messageArtiste}</p>` : ""}
        <img src="${order.imageUrl}" alt="Aperçu de votre peinture" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" />
        <p>Notre équipe vous contactera sous 48h pour finaliser les détails.</p>
        <p style="color: #C9A84C;">— L'équipe Atelier Toile</p>
      </div>
    `,
  });
}

export async function sendAdminNotification(order: OrderDetails) {
  const resend = getResend();
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  await resend.emails.send({
    from: fromEmail,
    to: adminEmail,
    subject: `Nouvelle commande de ${order.prenom} ${order.nom}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Nouvelle commande</h1>
        <p><strong>Client :</strong> ${order.prenom} ${order.nom}</p>
        <p><strong>Email :</strong> ${order.email}</p>
        <p><strong>Téléphone :</strong> ${order.telephone || "Non renseigné"}</p>
        <p><strong>Format :</strong> ${order.format}</p>
        <p><strong>Référence :</strong> ${order.orderId}</p>
        ${order.messageArtiste ? `<p><strong>Message artiste :</strong> ${order.messageArtiste}</p>` : ""}
        <img src="${order.imageUrl}" alt="Image générée" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" />
      </div>
    `,
  });
}
