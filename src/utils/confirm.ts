import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export async function confirmDialog(options?: {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: 'warning' | 'question' | 'info' | 'error' | 'success';
}): Promise<boolean> {
  const result = await MySwal.fire({
    title: options?.title ?? 'Are you sure?',
    text: options?.text ?? 'This action cannot be undone.',
    icon: options?.icon ?? 'warning',
    showCancelButton: true,
    confirmButtonText: options?.confirmButtonText ?? 'Yes, proceed',
    cancelButtonText: options?.cancelButtonText ?? 'Cancel',
    focusCancel: true,
    reverseButtons: true,
  });
  return !!result.isConfirmed;
}


