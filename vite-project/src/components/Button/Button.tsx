import styles from "./Button.module.css"

// type ButtonProps = {
//     text: string;
//     onClick?: () => void;
//     type?: HTMLButtonElement['type']
// }

// export const Button = ({ text, onClick, type = "button" }: ButtonProps) => {

//     return (
//         <button 
//             onClick={onClick} 
//             type={type}
//         >
//             {text}
//         </button>
//     );
// };
 
type ButtonProps = {
    text: string;
    onClick?: () => void;
    type?: HTMLButtonElement['type'];
    href?: string;
} 

export const Button = ({ text, onClick, type = "button", href}: ButtonProps) => {
    if (href) 
    {
        return ( 
        <a className={styles.button} target="_blank" rel="noopener noreferrer" href={href}>
            {text} 
        </a>
        )
    } 
        return <button className={styles.button} onClick={onClick} type={type}>{text}</button>;
};
