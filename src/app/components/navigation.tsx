
export function Navigation() {
  return (
    <nav className="flex justify-between items-center p-4">
      <h1 className="text-2xl">Broadhill Estate</h1>
      <ul className="flex space-x-4">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}