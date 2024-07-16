const PrimaryButton = ({ text, icon: Icon }) => {
  return (
    <button
      type="submit"
      className="btn  py-2  md:py-3 md:px-7 rounded-sm text-primary border-primary bg-transparent hover:bg-primary hover:text-gray-800 dark:hover:border-primary"
    >
      {Icon && <Icon className="text-xl mr-3" />} {text}
    </button>
  );
};

export default PrimaryButton;
