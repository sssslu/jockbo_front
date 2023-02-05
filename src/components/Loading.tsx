import { FadeLoader } from 'react-spinners';
import palette from '../utils/palette';

export default function Loading() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <FadeLoader
          color={palette.darkBrown}
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
      </div>
    </>
  );
}
