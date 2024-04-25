import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  InputField,
} from '@mfe-tutorial/ui';

import useLogin from './hooks/use-login';

export default function LoginPage() {
  const { loginForm, onSubmit, loading, error, onResetError } = useLogin();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-y-4">
        <p className="text-2xl text-red-500">An error occurred!</p>
        <p className="text-red-500">{error}</p>
        <Button onClick={onResetError}>Retry</Button>
      </div>
    );
  }

  return (
    <Form {...loginForm}>
      <form
        className="flex flex-col items-center justify-center h-screen p-4 md:mx-auto"
        onSubmit={loginForm.handleSubmit(onSubmit)}
      >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Please enter your email and password to login.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputField
              control={loginForm.control}
              label="Email"
              name="email"
              type="email"
            />
            <InputField
              control={loginForm.control}
              description="Must be at least 8 characters long."
              label="Password"
              name="password"
              type="password"
            />
          </CardContent>
          <CardFooter className="flex w-full">
            <Button className="w-full" loading={loading} type="submit">
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
