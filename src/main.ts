import './style.css';
import { setupCounter } from './counter.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
    
  </main>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
