import loader from '../images/loading.gif';
import uberlogo from '../images/logo.svg';

export const Loading = () => (
  <div className='h-screen flex justify-center items-center'>
    {/* <span className='font-medium text-xl tracking-wider animate-ping'>
      잠시만 기다려 주세요...
    </span> */}
    <img src={uberlogo} alt={'logo'} className='animate-ping' />
  </div>
);

export const Loader = () => {
  return (
    <div className='flex items-center justify-center'>
      <img src={loader} alt='loading' className='w-14 loader' />
    </div>
  );
};
