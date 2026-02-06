import css from './header.module.css';
import FireFlameCurved from "@/components/svgs/fireFlameCurved";

export default function Header() {
  return <header className={css.header}>
    <div className={css.icon}>
      <FireFlameCurved/>
    </div>
    <div className={css.text}>VollVille | Troestler Chauffage</div>    
  </header>;
}