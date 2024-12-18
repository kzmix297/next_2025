

const Sform = (props) => {
    
    
    return (
        <form className="flex flex-row gap-2 justify-center items-center" onSubmit={props.onSubmit}>
          <input
            className="border p-1  border-gray-500 rounded"
            type="text"
            name="link"
            id="link"
            placeholder="Link"
          />
          <button type="submit" className="bg-orange-300  rounded flex justify-center items-center w-36">
                    Cari
          </button>
        </form>
    )
}

export default Sform;