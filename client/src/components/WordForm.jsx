import { useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"

export default function WordForm({ submit, register, btnLabel }) {
  const { id } = useParams()

  return (
    // <form onSubmit={submit}>
    //   <div className="inputs">
    //     <div className="input">
    //       <input
    //         required
    //         id="word"
    //         type="text"
    //         className="form-control"
    //         placeholder="First language"
    //       />
    //     </div>
    //     <div className="input">
    //       <input
    //         required
    //         id="transl"
    //         type="text"
    //         className="form-control"
    //         placeholder="Second language"
    //       />
    //     </div>
    //   </div>
    //   <Link className="btn btn-secondary" to={`/${id}`}>
    //     Cancel
    //   </Link>
    //   <button className="btn btn-primary">Save</button>
    // </form>

    <form onSubmit={submit} className="card-body mb-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Word</span>
        </label>
        <input
          {...register("word")}
          type="text"
          placeholder="Word"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Translation</span>
        </label>
        <input
          {...register("transl")}
          type="text"
          placeholder="Word"
          className="input input-bordered"
          required
        />
      </div>
      <div className="flex flex-row mt-6 gap-2">
        <Link className="btn btn-secondary" to="/">
          Cancel
        </Link>
        <button className="btn btn-primary">{btnLabel}</button>
      </div>
    </form>
  )
}
