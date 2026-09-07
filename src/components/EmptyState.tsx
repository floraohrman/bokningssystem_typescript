// This component is used to display a message when there is no data to show. It provides an accessible message for screen readers, indicating that there is no content available.
// Flora Öhrman

interface EmptyStateProps {
  message: string;
}

function EmptyState({ message }: EmptyStateProps) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;