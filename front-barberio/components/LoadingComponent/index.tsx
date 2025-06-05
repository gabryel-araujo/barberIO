export function LoadingComponent() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black/60 z-50">
      <div className="w-16 h-16 animate-spin infinite border-white border-4 border-t-transparent  rounded-full"></div>
      <p className="text-white text-2xl font-bold">Carregando</p>
    </div>
  );
}
