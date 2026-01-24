import css from './content.module.css';

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="content-container">
      <section className={css.content}>{children}</section>
    </div>
  );
}