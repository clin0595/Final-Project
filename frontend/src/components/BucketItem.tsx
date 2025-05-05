import { useState } from "react";

type BucketProps = {
  name: string;
  onDelete: () => void;
};

const BucketItem = ({ name, onDelete }: BucketProps) => {
  return (
    <div className="bucketBox">
      <h3 className="semesterTitle">{name}</h3>
      <button onClick={onDelete}>X</button>
    </div>
  );
};

export default BucketItem;