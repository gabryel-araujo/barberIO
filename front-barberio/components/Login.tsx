import styles from "../src/app/styles/login.module.css";

export default function Login() {
  return (
    <>
      <main className={`${styles.img} ${styles.page}`}>
        <div>
          <h1 className={styles.textBlack}>BarberIO</h1>
        </div>

        <div>
          <h2 className={styles.textOrange}>Bem vindo</h2>
          <div className={`${styles.flex}`}>
            <button className={styles.loginButton}>Login</button>
            <button className={styles.registerButton}>Cadastre-se</button>
          </div>
        </div>
      </main>
    </>
  );
}
