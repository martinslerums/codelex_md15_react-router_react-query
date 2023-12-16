import styles from "./MyForm.module.css"

type FormProps = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children? : React.ReactNode
}

const MyForm = ({onSubmit, children}: FormProps) => {
    return ( 
        <div className={styles.form__wrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                {children}
            </form>
        </div>
     );
}
 
export default MyForm;