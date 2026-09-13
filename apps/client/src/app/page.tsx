'use client'
import { Button } from '../../../../packages/ui/src/components/button';

const page = () => {
  return (
    <div>
      <Button onClick={() => console.log('first')} className={''}>testing</Button>
    </div>
  );
};

export default page;
