import Spline from '@splinetool/react-spline';
import { useState, useEffect } from 'react';


const Anim = () => {

    return (
          <Spline scene="
          scene (3).splinecode
          " 
                    />

      );
}
// scene (1).splinecode

// import React, { Suspense } from 'react';

// const Spline = React.lazy(() => import('@splinetool/react-spline'));

// const Anim = () => {
//   return (
//     <div className="md:hidden absolute block top-0 left-0 right-0 bottom-0 bigh md:h-screen w-full -z-10" >
//       <Suspense fallback={<Spline scene="scene (1).splinecode" />}>
//         <Spline scene="scene (1).splinecode" />
//       </Suspense>
//     </div>
//   );
// }

export default Anim