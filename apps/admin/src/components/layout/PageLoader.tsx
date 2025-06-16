import { Loader2 } from 'lucide-react'

const PageLoader = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Loader2 className='animate-spin text-primary' size={32} />
    </div>
  )
}

export default PageLoader