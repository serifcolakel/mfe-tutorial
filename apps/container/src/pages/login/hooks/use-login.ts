import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoginRequest,
  loginRequestSchema,
  paths,
  usePlatziStoreAuth,
} from '@mfe-tutorial/data';
import { useToast } from '@mfe-tutorial/ui';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { error, handleLogin, loading, onResetError } = usePlatziStoreAuth();

  const loginForm = useForm<LoginRequest>({
    defaultValues: {
      email: 'john@mail.com',
      password: 'changeme',
    },
    resolver: zodResolver(loginRequestSchema),
  });

  async function onSubmit(data: LoginRequest) {
    const result = await handleLogin(data);

    toast({
      title: result.title,
      description: result.message,
      variant: result.success ? 'default' : 'destructive',
    });

    if (result.success) {
      navigate(paths.info);
    }
  }

  return {
    loginForm,
    loading:
      loading ||
      loginForm.formState.isLoading ||
      loginForm.formState.isSubmitting,
    error,
    onSubmit,
    onResetError,
  };
}
