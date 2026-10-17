import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
      <div className='relative h-screen w-full'>
        <Image 
          src={'/login.png'} 
          alt='login'
          layout='fill'
          objectFit='cover'
          className='w-full h-full'
        />
      </div>
      <div className='flex justify-center items-center h-screen'>
      <SignIn fallbackRedirectUrl='/dashboard' />

      </div>
    </div>
  )
}

