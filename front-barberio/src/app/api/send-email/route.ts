import { Barbeiro } from "@/types/barbeiro";
import { Servico } from "@/types/servico";
import { formatarTelefone } from "@/utils/functions";
import { format } from "date-fns";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

export async function POST(req: Request) {
  const { barbeiro, data, horario, nome, servico, telefone } = await req.json();
  const barbeiroObj: Barbeiro = barbeiro;
  const servicoObj: Servico = servico;

  //dados para o html
  const telefoneCli = formatarTelefone(telefone);
  const dataFormatada = format(new Date(data), "dd/MM/yyyy");
  const horarioFormatado = horario.slice(0, 5);
  const valorFormatado = servicoObj.preco.toFixed(2);

  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "barberionotificacoes@gmail.com",
      pass: process.env.EMAIL_KEY,
    },
  });

  try {
    await transporter.sendMail({
      from: "BarberIO Notificações",
      to: "gabryelaraujo71@gmail.com",
      subject: "✂️ NOVO AGENDAMENTO",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
  <!-- Header -->
  <div style="background: linear-gradient(315deg, rgba(19, 36, 61, 1) 0%, rgba(43, 127, 255, 1) 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; color: white;">
    <p style="margin: 10px 0 0 0; opacity: 0.9; font-weight: bold;">Você tem um novo cliente agendado!</p>
  </div>
  
  <!-- Content -->
  <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    
    <!-- Detalhes do Agendamento -->
    <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 20px; border-radius: 0 5px 5px 0;">
      <h2 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">📅 Detalhes do Agendamento</h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">👤 Cliente:</td>
          <td style="padding: 8px 0; color: #333;">${nome}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">✂️ Barbeiro:</td>
          <td style="padding: 8px 0; color: #333;">${barbeiroObj.nome}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555;">📞 Telefone:</td>
          <td style="padding: 8px 0; color: #333;">${telefoneCli}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555;">📅 Data:</td>
          <td style="padding: 8px 0; color: #333; font-weight: bold;">${dataFormatada}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555;">⏰ Horário:</td>
          <td style="padding: 8px 0; color: #333; font-weight: bold;">${horarioFormatado}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555;">✂️ Serviço:</td>
          <td style="padding: 8px 0; color: #333;">${servicoObj.nome}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555;">💰 Valor:</td>
          <td style="padding: 8px 0; color: #28a745; font-weight: bold; font-size: 16px;">${valorFormatado}</td>
        </tr>
      </table>
    </div>
    
    <!-- Status -->
    <div style="text-align: center; margin: 20px 0;">
      <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); display: inline-block; padding: 12px 25px; border-radius: 25px; color: white; font-weight: bold;">
        ✅ Agendamento Confirmado
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
      <p style="color: #666; margin: 0; font-size: 12px;">
        Sistema de Agendamento - Barbearia<br>
        Este é um email automático, não responda a esta mensagem.
      </p>
    </div>
  </div>
</div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao enviar o email", err },
      { status: 500 }
    );
  }
}
