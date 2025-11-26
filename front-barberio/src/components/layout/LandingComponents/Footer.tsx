const Footer = () => {
  return (
    <footer className="bg-[#1a1f2c] text-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <img
              src={"/logo/logoCompletaCOR.png"}
              alt="BarberiO"
              className="h-40 mb-4"
            />
            {/* <p className="text-muted max-w-sm">
              O sistema completo de gestão para barbearias modernas.
              Simplifique, organize e cresça.
            </p> */}
          </div>

          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#recurso"
                  className="text-muted hover:text-muted transition-colors"
                >
                  Recursos
                </a>
              </li>
              <li>
                <a
                  href="#preco"
                  className="text-muted hover:text-muted transition-colors"
                >
                  Preços
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  className="text-muted hover:text-muted transition-colors"
                >
                  Demonstração
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted hover:text-muted transition-colors"
                >
                  Termos de uso
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted hover:text-muted transition-colors"
                >
                  Política de privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted hover:text-muted transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted/10 pt-12">
          <p className="text-center text-muted text-sm">
            © {new Date().getFullYear()} BarberiO. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
