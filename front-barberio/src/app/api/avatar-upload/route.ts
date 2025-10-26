import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type reqFileType = {
  base64: String;
  NomeBarbeiro: String;
  idBarbeiro: Number;
};

export async function POST(req: NextRequest) {
  try {
    // 1 extrair o json do body
    const body: reqFileType = await req.json();
    // 2 remover prefixo se vier junto (ex: "data:image/png;base64")
    const base64AData = body.base64.includes(",")
      ? body.base64.split(",")[1]
      : body.base64;
    // 3 converter para buffer
    const buffer = Buffer.from(base64AData, "base64");
    // 4 fazer upload
    const filePath = `img/${body.NomeBarbeiro}${body.idBarbeiro}.png`;
    const { data: fileImag, error } = await supabase.storage
      .from("barberiO")
      .upload(filePath, buffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (error) {
      console.error("Erro ao enviar Imagem: ", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // 5 Gerar url publica
    const { data: UrlImgPublica } = supabase.storage
      .from("barberiO")
      .getPublicUrl(filePath);
    return NextResponse.json({
      path: fileImag?.path,
      publicUrl: UrlImgPublica.publicUrl,
    });
  } catch (err: any) {
    console.error("Erro geral: ", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
