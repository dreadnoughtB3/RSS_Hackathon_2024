import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const schema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
  company_code: z.string().min(8, '企業コードを入力してください'),
});

type FormData = z.infer<typeof schema>;

interface RegisterFormProps {
  onSubmit: (data: FormData) => void;
  isProcessing: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isProcessing }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitHandler: SubmitHandler<FormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="max-w-md mx-auto p-6 shadow-lg rounded-lg bg-neutral-800">
      <div className='text-center text-2xl font-bold text-gray-200'>アカウント作成</div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-400">名前</label>
        <input
          id="name"
          {...register('name')}
          className="mt-1 p-2 block w-full bg-neutral-900 text-gray-300 rounded-md shadow-sm outline-none"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-400">メールアドレス</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          required
          className="mt-1 p-2 block w-full bg-neutral-900 text-gray-300 rounded-md shadow-sm outline-none"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-400">パスワード</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="mt-1 p-2 block w-full bg-neutral-900 text-gray-300 rounded-md shadow-sm outline-none"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="company_code" className="block text-sm font-medium text-gray-400">企業コード</label>
        <input
          id="company_code"
          type="password"
          {...register('company_code')}
          className="mt-1 p-2 block w-full bg-neutral-900 text-gray-300 rounded-md shadow-sm outline-none"
        />
        {errors.company_code && <p className="text-red-500 text-sm mt-1">{errors.company_code.message}</p>}
      </div>
      <Button type="submit" disabled={isProcessing} className='bg-indigo-600 w-full p-2 rounded-0 hover:bg-indigo-700'>新規登録</Button>
      <Link href="/login">
      <div className='mt-4 text-gray-400 font-bold text-sm'>既にアカウントを持っている場合</div>
      </Link>
    </form>
  );
};

export default RegisterForm;
