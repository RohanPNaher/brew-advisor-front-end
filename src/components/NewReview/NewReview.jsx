import { useState, useEffect, useRef } from 'react'

const NewReview = (props) => {
  const formElement = useRef()
  const [formData, setFormData] = useState({
    comment: ''
  })
  const [validForm, setValidForm] = useState(false)

  useEffect(() => {
    formElement.current.checkValidity() ?
    setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleChange= evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }
  const handleSubmit = evt => {
    evt.preventDefault()
    const reviewFormData = new FormData()
    reviewFormData.append('comment', formData.comment)
    console.log(formData)
    props.handleAddReview(formData)
  }

  return ( 
    <>
      <h2>Your Review</h2>
      <div>
      <form onSubmit={handleSubmit} autoComplete='off' ref={formElement}>
        <label htmlFor="comment">
          Feedback:
        </label>
        <textarea
          id='comment-input'
          name='comment' 
          value={formData.comment} 
          onChange={handleChange}
          required 
        />
        <div className="add-review">
          <button
            type='submit'
            disabled={!validForm}
          >
            Add Review
          </button>
        </div>
      </form>

      </div>
    </>
  );
}
 
export default NewReview