import styles from "./Form.module.css"
import { FormEvent } from "react";

type FormProps = {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    children? : React.ReactNode
}

const Form = ({onSubmit, children}: FormProps) => {
    return ( 
        <div className={styles.form__wrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                {children}
            </form>
        </div>
     );
}
 
export default Form;