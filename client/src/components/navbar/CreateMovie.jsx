import React, {useState} from 'react'

function CreateMovie() {


  return (
    <div className="movieForm">
      <h2>New Movie</h2>
      <span>Title</span>
      <input type="text" />
      <br/>
      <span>Desc</span>
      <input type="text" />
      <br/>
      <span>img</span>
      <input type="file" />
      <br/>
      <span>imgSm</span>
      <input type="file" />
      <br/>
      <span>Trailer</span>
      <input type="file" />
      <br/>
      <span>Video</span>
      <input type="file" />
      <br/>
      <span>Year</span>
      <input type="number" />
      <br/>
      <span>Limit +</span>
      <input type="number" />
      <br/>
      <span>Genre</span>
      <input type="text" />
      <br/>
      <span>isSeries</span>
      <select>
        <option>true</option>
        <option>false</option>
      </select>

      <br/>
      <button type='submit'>Submit</button>
    </div>
  )
}

export default CreateMovie
