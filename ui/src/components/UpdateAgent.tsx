const UpdateAgent = ({ onChange, onClick }: any) => {
  return (
    <>
      <input onChange={onChange} />
      <button onClick={onClick}>Update</button>
    </>
  );
};

export default UpdateAgent;
