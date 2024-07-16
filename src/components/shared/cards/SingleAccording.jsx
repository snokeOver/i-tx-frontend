const SingleAccording = ({ data }) => {
  const { question, answer } = data;
  return (
    <div className="collapse collapse-plus bg-base-200">
      <input type="radio" name="my-accordion-3" defaultChecked />
      <div className="collapse-title text-xl font-medium">{question}</div>
      <div className="collapse-content">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default SingleAccording;
