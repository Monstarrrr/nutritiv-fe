import React, { useState } from 'react'
import { apiAddUserAddress } from '../Api/nutritivApi'

export const ProfileAddress = () => {
  const fields = {
    street: "Street",
    zip: "Postal code",
    city: "City",
    country: "Country",
    phoneNumber: "Phone number"
  }
  const isNumberField = ["zip", "phoneNumber"]
  
  const [addressInput, setAddressInput] = useState({
    [fields.street]: "",
    [fields.zip]: "",
    [fields.city]: "",
    [fields.country]: "",
    [fields.phoneNumber]: ""
  })
  
  // HANDLERS
  const handleChange = (e) => {
    setAddressInput({
      ...addressInput,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmitUpdateAddress = async (e) => {
    e.preventDefault();
    // API FUNCTION
    const data = await apiAddUserAddress(addressInput)
    
    // IN ANY CASE
    
    
    // IF ERROR
    if(data?.response) {
      console.error(data.response.status)
      return;
    }
    
    // IF SUCCESS
    setAddressInput(null)
  }
  
  return (
    <div>
      <h3>
        Add address
      </h3>
      <form onSubmit={handleSubmitUpdateAddress}>
        {
          Object.keys(fields).map((field, i) => (
            <React.Fragment key={i}>
              <label htmlFor={field}>
                {fields[field]}:
              </label>
              <br />
              <input
                name={field}
                onChange={handleChange}
                placeholder="..."
                type={
                  isNumberField.includes(field) ? "number" : "text"
                }
                value={addressInput?.field}
              />
              <br />
            </React.Fragment>
          ))
        }
        <input type="submit" value="Add address" />
      </form>
    </div>
  )
}
