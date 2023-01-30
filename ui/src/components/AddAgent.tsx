import React from "react";

const AddAgent = ({ register, errors, error }: any) => {
  return (
    <>
      <input {...register("name", { required: true })} />
      {errors.name && <span>Field cannot be empty</span>}
      {error && <span>{error}</span>}
    </>
  );
};

export default AddAgent;
