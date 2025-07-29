function CreateTaskForm({ onUpdateData }) {
  const handleSubmit = async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newData = {
      owner: formData.get("owner"),
      description: formData.get("desc"),
    };

    let response = await fetch(
      "http://localhost:3000/tasks/",

      {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await fetch("http://localhost:3000/tasks");
    const listData = await response.json();
    onUpdateData(listData);
    event.target.reset();
  };

  return (
    <>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="owner">Owner</label>
        <input id="owner" name="owner"></input>
        <label htmlFor="desc">Description</label>
        <input id="desc" name="desc"></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateTaskForm;
