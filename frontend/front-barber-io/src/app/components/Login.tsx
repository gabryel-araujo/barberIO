export default function Login() {
  function um_teste(nome: string): string {
    return `Olá ${nome}`;
  }

  return (
    <>
      <h1>Login aqui</h1>
      <p>{um_teste("Gabryel")}</p>
      <img
        src="../public/wallpaper-login"
        alt="imagem de um homem na barbearia"
      />
    </>
  );
}
