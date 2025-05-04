import { useState } from "react"

type BucketProps = {
  name: string;
};

const BucketItem = ({ name }: BucketProps) => {
  
  return (
    <div className="bucketBox">
        <h3 className="semesterTitle">{name}</h3>
        
    </div>
  );
};

export default BucketItem;
