'use client'
import {useTranslations} from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';
import { useSession } from 'next-auth/react';
import useAxiosAuth from '@/lib/hook/useAxiosAuth';
import { useEffect } from 'react';

type Props = {
  params: {locale: string};
};

export default function PathnamesPage({params: {locale}}: Props) {

  const se: any = useSession()
  // const session = await getServerSession(auth);
  const authAxios = useAxiosAuth();
  console.log({se});
  useEffect(()=>{
    se && authAxios.get('Course').then((res)=>{
      console.log({res});
      
    })
  },[authAxios,se])

  const t = useTranslations('PathnamesPage');

  return (
      <div className="max-w-[490px]">
        {t.rich('description', {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          )
        })}
      </div>
  );
}
