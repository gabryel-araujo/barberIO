const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <img src={"/barberio.png"} alt="BarberiO" className="h-8 mb-4" />
            <p className="text-secondary-foreground/80 max-w-sm">
              O sistema completo de gestão para barbearias modernas.
              Simplifique, organize e cresça.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Recursos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Preços
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
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
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Termos de uso
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Política de privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8">
          <p className="text-center text-secondary-foreground/60">
            © {new Date().getFullYear()} BarberiO. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
