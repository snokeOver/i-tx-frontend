const SecondaryButton = ({ btntext }) => {
  return (
    <button className="btn  py-2  md:py-3 md:px-7 rounded-sm text-gray-800 border-primary bg-primary hover:bg-transparent hover:text-primary hover:border-primary">
      {btntext}
    </button>
  );
};

export default SecondaryButton;
