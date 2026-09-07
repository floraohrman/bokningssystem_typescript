// This component is used to display a loading state while data is being fetched or processed. It provides an accessible message for screen readers, indicating that the content is currently loading.
// Flora Öhrman

function Loading() {
  return (
    <div role="status" aria-live="polite">
      Laddar...
    </div>
  );
}

export default Loading;