import { ColorSchemeToggle } from '../components/color-scheme-toggle/color-scheme-toggle';
import { Welcome } from '../components/Welcome/Welcome';

export function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
