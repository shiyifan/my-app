import { useOptimistic } from 'react';

export default function SomeForm() {
  const [submitting, setSubmitting] = useOptimistic(false);

  return (
    <form action={formAction}>
      <input type="text" name="username" />
      <input type="submit" value="Submit" />
      {submitting && '...'}
    </form>
  );

  async function formAction(data: FormData) {}
}
