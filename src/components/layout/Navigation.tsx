export function Navigation() {
  return (
    <nav className="bg-pink-500 w-12 flex flex-col gap-2 p-4">
      <a href="#home" className="text-white hover:text-gray-200">@</a>
      <a href="#about" className="text-white hover:text-gray-200">#</a>
      <a href="#projects" className="text-white hover:text-gray-200">$</a>
      <a href="#contact" className="text-white hover:text-gray-200">%</a>
    </nav>
  );
}
