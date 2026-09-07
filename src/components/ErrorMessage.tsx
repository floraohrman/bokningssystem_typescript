// This component is used to display an error message when an error occurs in the application. It provides an accessible message for screen readers, indicating that an error has occurred and displaying the error message.
// Flora 

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div role="alert">
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;