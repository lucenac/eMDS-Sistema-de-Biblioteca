interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'; // Amarelo (Login) ou Roxo
  isLoading?: boolean;
}
export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  return <button {...props} />;
};