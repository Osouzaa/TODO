import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src="./public/Logo.svg" alt="Logo do site TODO" />
    </header>
  );
};
